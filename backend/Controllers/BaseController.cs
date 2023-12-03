using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/")]
    [ApiController]
    public class BaseController<T> : ControllerBase where T : BaseController<T>
    {
       
    }
}