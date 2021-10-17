namespace MathProblem.Contracts.Queries
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Models.Entities;

    public class GetAllMathProblem
    {
        //Query
        public record Query(int Page) : IRequest<Response>;

        //Handler
        //business logic
        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var mathProblem = _context.Set<PostTask>().OrderByDescending(task => task.Rating)
                    .Skip(request.Page * 10).Take(10);
                return new Response(await mathProblem.ToListAsync(cancellationToken: cancellationToken));
            }
        }

        //Response
        public record Response(IReadOnlyCollection<PostTask> PostTasks);
    }
}