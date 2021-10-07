namespace MathProblem.Contracts.Commands
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Models.Entities;

    public class AddMathProblem
    {
        //Command

        public record Command(
            string Name,
            string TaskCondition,
            string Tags,
            string RightAnswer,
            float Rating,
            string AuthorId
        ) : IRequest<string>;

        //Handler
        //Business logic

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                //add Math problem to DB
                string taskId = new Guid().ToString();
                _context.Set<PostTask>().Add(new PostTask
                {
                    AuthorId = request.AuthorId, Name = request.Name, PostTaskId = taskId,
                    Rating = request.Rating, Tags = request.Tags, RightAnswer = request.RightAnswer,
                    TaskCondition = request.TaskCondition, PublicationDateTime = new DateTime()
                });
                return taskId;
            }
        }

        //Response 
        public record Response(string Id);
    }
}