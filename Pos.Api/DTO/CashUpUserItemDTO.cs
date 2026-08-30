using Pos.Api.Entities;

namespace Pos.Api.DTO;

public class CashUpUserItemDTO
{
    public int Id { get; set; }
    public int CashUpUserId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public int OutletId { get; set; }
    public int CashUpUserItemTypeId { get; set; }
    public CashUpUserItemTypeDTO? CashUpUserItemType { get; set; }
    public decimal Value { get; set; }
}
