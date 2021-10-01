namespace MathProblem.Contracts.Queries
{
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetUserById
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
                var user = await _context.Users.FirstOrDefaultAsync(x=>x.Id==request.Id, cancellationToken: cancellationToken);
                return user == null ? null : new Response(user.Id, user.UserName);
            }
        }

        //Response
        public record Response(string Id, string Name);
    }
}