using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IImageService
    {
        Task<ActionResult> UploadImage([FromForm] UploadImage request);
    }
}
