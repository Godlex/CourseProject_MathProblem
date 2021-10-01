namespace MathProblem.Contracts.Commands
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using DAL;
    using MediatR;

    public class AddMathProblem
    {
        //Command

        public record Command(string Name) : IRequest<string>;

        //Handler
        //Business logic

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly ApplicationDbContext _context;
            
            public Handler(ApplicationDbContext context )
            {
                _context = context;
            }
            
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                //add Math problem to DB
                throw new NotImplementedException();
            }
        }
    }
}