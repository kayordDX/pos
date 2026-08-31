using FastEndpoints.Swagger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;
using Pos.Api.Common.Extensions.Swagger;
using Pos.Api.Features.Auth;
using Scalar.AspNetCore;
using System.Threading.RateLimiting;

namespace Pos.Api.Common.Extensions;

public static class ApiExtensions
{
    public static void ConfigureApi(this IServiceCollection services)
    {
        services.AddResponseCompression(o =>
        {
            o.EnableForHttps = true;
        });
        services.AddTransient<IAuthorizationHandler, RoleTypeHandler>();
        services.AddFastEndpoints();

        services.AddRateLimiter(options =>
        {
            options.AddFixedWindowLimiter(Constants.RateLimitPolicy.PinLogin, opt =>
            {
                opt.PermitLimit = 10;
                opt.Window = TimeSpan.FromMinutes(5);
                opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                opt.QueueLimit = 0;
            });
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
        });

        services.AddAuthorization(o =>
        {
            o.AddPolicy(Constants.Policy.Manager, b => b.AddRequirements(new RoleTypeRequirement(Constants.Policy.Manager)).Build());
            o.AddPolicy(Constants.Policy.Feature, b => b.AddRequirements(new FeatureRequirement(Constants.Policy.Feature)).Build());
        });

        services.SwaggerDocument(o =>
        {
            o.EnableJWTBearerAuth = false;
            o.DocumentSettings = s =>
            {
                s.Title = AppDomain.CurrentDomain.FriendlyName;
                s.Version = "v1";
                s.MarkNonNullablePropsAsRequired();
                s.OperationProcessors.Add(new CustomOperationsProcessor());
                s.SchemaSettings.SchemaNameGenerator = new CustomSchemaNameGenerator(false);
            };
        });
    }

    public static IApplicationBuilder UseApi(this WebApplication app)
    {
        app.UseResponseCompression();
        app.UseRateLimiter();
        app.UseDefaultExceptionHandler()
            .UseFastEndpoints(c =>
            {
                c.Serializer.Options.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                c.Endpoints.Configurator = ep =>
                {
                    ep.Options(x => x.Produces<InternalErrorResponse>(500));
                };

                // Exclude test and sensitive endpoints in production
                if (!app.Environment.IsDevelopment())
                {
                    c.Endpoints.Filter = ep =>
                    {
                        if (ep.Routes.First().StartsWith("/test"))
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    };
                }
            });

        // Only Have docs available in development
        if (app.Environment.IsDevelopment())
        {
            app.UseOpenApi(c => c.Path = "/openapi/{documentName}.json");
            app.MapScalarApiReference(options =>
            {
                options.TagSorter = TagSorter.Alpha;
            });
        }
        return app;
    }
}
