using backend.Controllers;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
public class ImageController : BaseController<ImageController>
{

    public ImageController()
    {
        
    }


    [HttpGet("{imageName}")]
    public IActionResult GetImage(string imageName)
    {
        try
        {
            string uploadsFolder = Path.Combine("uploads", "images");
            string filePath = Path.Combine(uploadsFolder, imageName);

            if (System.IO.File.Exists(filePath))
            {
                var imageFileStream = System.IO.File.OpenRead(filePath);
                return File(imageFileStream, "image/jpeg"); // Adjust the content type based on your image type
            }
            else
            {
                return NotFound("Image not found");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadImages([FromForm] List<IFormFile> imageFiles)
    {
        try
        {
            if (imageFiles != null && imageFiles.Count > 0)
            {
                List<string> imageUrls = new List<string>();

                foreach (var imageFile in imageFiles)
                {
                    string uploadsFolder = Path.Combine("uploads", "images");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }

                    string imageUrl = $"{Request.Scheme}://{Request.Host}/api/{uniqueFileName}";
                    imageUrls.Add(imageUrl);
                }

                return Ok(new { ImageUrls = imageUrls });
            }
            else
            {
                return BadRequest("No image files provided");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}


