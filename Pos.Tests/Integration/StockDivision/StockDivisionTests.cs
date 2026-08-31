using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pos.Api.Data;
using Pos.Api.Entities;

namespace Integration.StockDivision;

[Collection(nameof(AppCollection))]
public class StockDivisionTests(App app) : TestBase<App>
{
    [Fact]
    public async Task GetAllStockDivisions_FiltersDeleted()
    {
        // Arrange
        await using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var outlet = await dbContext.Outlet.FirstAsync(app.Context.CancellationToken);
        var suffix = Guid.NewGuid().ToString("N");
        var activeDivisionName = $"Active Stock Division {suffix}";
        var deletedDivisionName = $"Deleted Stock Division {suffix}";

        var activeDivision = new Pos.Api.Entities.Division
        {
            DivisionName = activeDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = false,
        };
        dbContext.Division.Add(activeDivision);

        var deletedDivision = new Pos.Api.Entities.Division
        {
            DivisionName = deletedDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = true,
        };
        dbContext.Division.Add(deletedDivision);
        await dbContext.SaveChangesAsync(app.Context.CancellationToken);

        // Act
        var (rsp, res) = await app.ClientAuth.GETAsync<
            Pos.Api.Features.Stock.Division.GetAll.Endpoint,
            Pos.Api.Features.Stock.Division.GetAll.Request,
            List<Pos.Api.Entities.Division>
        >(new() { OutletId = outlet.Id });

        // Assert
        rsp.IsSuccessStatusCode.ShouldBeTrue();
        res.ShouldNotContain(d => d.DivisionName == deletedDivisionName);
        res.ShouldContain(d => d.DivisionName == activeDivisionName);
    }
}
