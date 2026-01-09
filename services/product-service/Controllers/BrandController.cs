// using Microsoft.AspNetCore.Mvc;
// using ProductService.Dtos.Common;
// using ProductService.Dtos.Product;

// namespace ProductService.Controllers;

// [ApiController]
// [Route("api/brands")]
// public class BrandController(IBrandService service) : ControllerBase
// {
//     private readonly IBrandService _service = service;
//     [HttpPost]
//     public async Task<IActionResult> Create([FromBody] CreateBrandRequest request)
//     {
//         int id = await _service.CreateAsync(request);
//         return Ok(BaseResponse<int>.Ok(id, "Brand is created successfully"));
//     }
// }