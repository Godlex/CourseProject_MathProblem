namespace MathProblem.Contracts.Queries
{
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Models.Entities;

    public static class GetUserProfileByUserId
    {
        //Query
        public record Query(string Id) : IRequest<Response>;

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
                var user = await _context.Set<User>()
                    .FirstOrDefaultAsync(x => x.UserId == request.Id, cancellationToken: cancellationToken);
                return user == null
                    ? null
                    : new Response(user.UserId, user.UserName, user.RightAnswerCount, user.TaskCreatedCount,
                        user.AverageTaskRating);
            }
        }

        //Response
        public record Response(string Id, string Name, int RightAnswerCount, int TaskCreatedCount,
            int? AverageTaskRating);
    }
}