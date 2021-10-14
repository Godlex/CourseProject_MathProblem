namespace MathProblem.Web_Api
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using DAL;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Models.Entities;

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        private readonly ApplicationDbContext _context;
        
        public ApplicationUserManager(IUserStore<ApplicationUser> store, IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<ApplicationUser> passwordHasher,
            IEnumerable<IUserValidator<ApplicationUser>> userValidators,
            IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger, ApplicationDbContext context) :
            base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors,
                services, logger)
        {
            _context = context;
        }

        public override async Task<IdentityResult> CreateAsync(ApplicationUser user)
        {
            _context.Set<User>().Add(new User { RightAnswerCount = 0, TaskCreatedCount = 0, UserId = user.Id, PostTasks = new List<PostTask>(),UserName = user.UserName});
            return await base.CreateAsync(user);
        }
    }
}