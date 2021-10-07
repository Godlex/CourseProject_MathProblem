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

    public class GetMathProblemByAuthorId
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
                var mathProblems = _context.Set<PostTask>().Where(x => x.AuthorId == request.Id);
                return new Response(new List<PostTask>(mathProblems));
            }
        }

        //Response
        public record Response(List<PostTask> Tasks);
    }
}