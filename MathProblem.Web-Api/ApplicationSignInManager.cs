namespace MathProblem.Web_Api
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using DAL;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Models.Entities;

    public class ApplicationSignInManager : SignInManager<ApplicationUser>
    {
        private readonly ApplicationDbContext _context;

        public ApplicationSignInManager(
            UserManager<ApplicationUser> userManager,
            IHttpContextAccessor contextAccessor,
            IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory,
            IOptions<IdentityOptions> optionsAccessor,
            ILogger<
                SignInManager<ApplicationUser>> logger,
            IAuthenticationSchemeProvider schemes,
            IUserConfirmation<ApplicationUser> confirmation,
            ApplicationDbContext context)
            : base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
        {
            _context = context;
        }

        public override async Task SignInWithClaimsAsync(ApplicationUser user, AuthenticationProperties authenticationProperties,
            IEnumerable<Claim> additionalClaims)
        {
            await base.SignInWithClaimsAsync(user, authenticationProperties, additionalClaims);
            _context.Set<User>().Add(new User { RightAnswerCount = 0, TaskCreatedCount = 0, UserId = user.Id, PostTasks = new List<PostTask>(),UserName = user.UserName});
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}