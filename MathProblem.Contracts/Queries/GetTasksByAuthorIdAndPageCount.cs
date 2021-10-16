namespace MathProblem.Contracts.Queries
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;
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
                var tasks = _context.Set<PostTask>().Where(task => task.AuthorId == request.Id).Skip((request.Page-1)*10);
                if (tasks.Count() >= 10)
                {
                    tasks = tasks.Take(10);
                }
                return tasks == null
                    ? null
                    : new Response(tasks);
            }
        }

        //Response
        public record Response(IQueryable<PostTask> PostTasks);
    }
}