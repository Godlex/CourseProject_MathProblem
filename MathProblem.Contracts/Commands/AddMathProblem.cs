namespace MathProblem.Contracts.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Models.Entities;

    public class AddMathProblem
    {
        //Command

        public record Command(
            string Name,
            string TaskCondition,
            IReadOnlyCollection<string> Tags,
            string RightAnswer
        ) : IRequest<string>;

        //Handler
        //Business logic

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly ApplicationDbContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(ApplicationDbContext context,IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                //add Math problem to DB
                string taskId = Guid.NewGuid().ToString();
                
                var userId =_httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier);
                
                _context.Set<PostTask>().Add(new PostTask
                {
                    AuthorId = userId , Name = request.Name, PostTaskId = taskId,
                    Rating = 0, Tags = string.Join(",",request.Tags), RightAnswer = request.RightAnswer,
                    TaskCondition = request.TaskCondition, PublicationDateTime = new DateTime()
                });

                await _context.SaveChangesAsync(cancellationToken);
                return taskId;
            }
        }

        //Response 
    }
}