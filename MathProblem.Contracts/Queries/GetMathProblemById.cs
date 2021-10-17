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

    public class GetMathProblemById
    {
        
        //Query
        public record Query(string Id) : IRequest<Response>;

        //Handler
        //business logic
        public class Handler: IRequestHandler<Query,Response>
        {
            private readonly ApplicationDbContext _context;
            
            public Handler(ApplicationDbContext context )
            {
                _context = context;
            }
            
            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var mathProblem = await _context.Set<PostTask>().FirstOrDefaultAsync(x => x.PostTaskId == request.Id, cancellationToken: cancellationToken);
                return new Response(mathProblem.Name,mathProblem.Rating,mathProblem.TaskCondition,mathProblem.Tags);
            }
        }

        //Response
        public record Response(string Name,float Rating,string TaskCondition,string Tags);
    }
}