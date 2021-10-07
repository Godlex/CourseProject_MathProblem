namespace MathProblem.Web_Api.Controllers
{
    using System.Threading.Tasks;
    using Contracts.Commands;
    using Contracts.Queries;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [ApiController]
    public class MathProblemController : ControllerBase
    {
        /*private readonly IMediator _mediator;
        private readonly ILogger<MathProblemController> _logger;

        public MathProblemController(IMediator mediator, ILogger<MathProblemController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("/{id}")]
        public async Task<IActionResult> GetTodoById(string id)
        {
            var response = await _mediator.Send(new GetMathProblemByAuthorId.Query(id));
            return response == null ? NotFound() : Ok(response);
        }
        
        [HttpPost("")]
        public async Task<IActionResult> AddTodo(AddMathProblem.Command command)
        {
            return Ok(await _mediator.Send(command));
        }*/
    }
}