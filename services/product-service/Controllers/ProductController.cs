using Microsoft.AspNetCore.Mvc;
using ProductService.Dtos.Common;
using ProductService.Dtos.Product;
using ProductService.Middleware;
using ProductService.Services.Interfaces;

namespace ProductService.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController(IProductService service) : ControllerBase
{
    private readonly IProductService _service = service;

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var data = await _service.GetProductAsync(id) ?? throw new NotFoundException("Product not found");
        return Ok(BaseResponse<ProductResponse>.Ok(data));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductRequest request)
    {
        int idProduct = await _service.CreateAsync(request);
        return Ok(BaseResponse<int>.Ok(idProduct, $"Product with id: {idProduct} is created"));
    }

}

