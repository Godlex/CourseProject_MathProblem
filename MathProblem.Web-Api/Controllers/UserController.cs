namespace MathProblem.Web_Api.Controllers
{
    using System.Threading.Tasks;
    using Contracts.Queries;
    using DAL;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Models.Entities;


    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        /*private readonly IMediator _mediator;
        private readonly ILogger<UserController> _logger;

        public UserController(IMediator mediator, ILogger<UserController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("/{id}")]
        public async Task<IActionResult> GetTodoById(string id)
        {
            var response = await _mediator.Send(new GetUserById.Query(id));
            return response == null ? NotFound() : Ok(response);
        }*/
    }
}