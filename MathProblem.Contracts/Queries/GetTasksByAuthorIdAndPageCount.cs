namespace MathProblem.Contracts.Queries
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using Microsoft.EntityFrameworkCore;
    using Models.Entities;

    public class GetTasksByAuthorIdAndPageCount
    {
        //Query
        public record Query(string Id, int Page) : IRequest<Response>;

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
                var tasks = _context.Set<PostTask>().Where(task => task.AuthorId == request.Id)
                    .OrderBy(task => task.PublicationDateTime).Skip(request.Page * 10).Take(10);
                return new Response(await tasks.ToListAsync(cancellationToken: cancellationToken));
            }
        }

        //Response
        public record Response(IReadOnlyCollection<PostTask> PostTasks);
    }
}