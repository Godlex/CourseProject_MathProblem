namespace MathProblem.Web_Api.Controllers
{
    using System.Threading.Tasks;
    using Contracts.Commands;
    using Contracts.Queries;
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    [Route("api/[controller]")]
    public class MathProblemController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<MathProblemController> _logger;

        public MathProblemController(IMediator mediator, ILogger<MathProblemController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetMathProblemById(string id)
        {
            var response = await _mediator.Send(new GetMathProblemById.Query(id));
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet] 
        public async Task<IActionResult> GetAllMathProblem([FromQuery]int page)
        {
            var response = await _mediator.Send(new GetAllMathProblem.Query(page));
            return response == null ? NotFound() : Ok(response);
        }
        
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddMathProblem(AddMathProblem.Command command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}