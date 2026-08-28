using Pos.Api.Data;
using Pos.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Integration.Division;

[Collection(nameof(AppCollection))]
public class DivisionTests(App app) : TestBase<App>
{
    [Fact, Priority(1)]
    public async Task CreateDivision_Fails_When_Not_Manager()
    {
        var (rsp, _) = await app.ClientAuth.POSTAsync<Pos.Api.Features.Division.Create.Endpoint, Pos.Api.Features.Division.Create.Request, Pos.Api.Entities.Division>(
            new()
            {
                DivisionTypeId = 1,
                Name = "Test Division",
                OutletId = 99
            });

        // User is not a manager, so auth policy rejects the request
        rsp.IsSuccessStatusCode.ShouldBeFalse();
    }

    [Fact]
    public async Task GetAllDivisions_FiltersDeleted()
    {
        // Arrange
        await using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var outlet = await dbContext.Outlet.FirstAsync();
        var suffix = Guid.NewGuid().ToString("N");
        var activeDivisionName = $"Test Division GetAll {suffix}";
        var deletedDivisionName = $"Deleted Division {suffix}";

        var division = new Pos.Api.Entities.Division
        {
            DivisionName = activeDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = false
        };
        dbContext.Division.Add(division);

        var deletedDivision = new Pos.Api.Entities.Division
        {
            DivisionName = deletedDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = true
        };
        dbContext.Division.Add(deletedDivision);
        await dbContext.SaveChangesAsync();

        // Act
        var (rsp, res) = await app.ClientAuth.GETAsync<Pos.Api.Features.Division.GetAll.Endpoint, Pos.Api.Features.Division.GetAll.Request, List<Pos.Api.Entities.Division>>(
            new() { OutletId = outlet.Id });

        // Assert
        rsp.IsSuccessStatusCode.ShouldBeTrue();
        res.ShouldNotContain(d => d.DivisionName == deletedDivisionName);
        res.ShouldContain(d => d.DivisionName == activeDivisionName);
    }

    [Fact]
    public async Task CreateDuplicateDivisionName_Throws_When_UsingDbContext()
    {
        // This test verifies the unique constraint directly via DbContext
        // (the endpoint is protected by Manager policy)
        await using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var outlet = await dbContext.Outlet.FirstAsync();
        var duplicateDivisionName = $"Unique Division Name {Guid.NewGuid():N}";

        var division1 = new Pos.Api.Entities.Division
        {
            DivisionName = duplicateDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = false
        };
        dbContext.Division.Add(division1);
        await dbContext.SaveChangesAsync();

        var division2 = new Pos.Api.Entities.Division
        {
            DivisionName = duplicateDivisionName,
            OutletId = outlet.Id,
            DivisionTypeId = 0,
            IsDeleted = false
        };

        // Saving a duplicate should throw due to the unique index
        dbContext.Division.Add(division2);
        await Should.ThrowAsync<DbUpdateException>(() => dbContext.SaveChangesAsync());
    }
}
