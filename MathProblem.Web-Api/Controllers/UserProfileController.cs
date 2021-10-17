namespace MathProblem.Web_Api.Controllers
{
    using System.Threading.Tasks;
    using Contracts.Queries;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<UserProfileController> _logger;

        public UserProfileController(IMediator mediator, ILogger<UserProfileController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProfileById(string id)
        {
            var response = await _mediator.Send(new GetUserProfileByUserId.Query(id));
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet("GetTasks/{authorId}/{page}")]
        public async Task<IActionResult> GetTasksByAuthorIdAndPageCount(string authorId, int page)
        {
            var response = await _mediator.Send(new GetTasksByAuthorIdAndPageCount.Query(authorId, page));
            return response == null ? NotFound() : Ok(response);
        }
    }
}