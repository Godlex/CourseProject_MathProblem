namespace MathProblem.DAL
{
    using System.Diagnostics;
    using System.Linq;
    using IdentityServer4.EntityFramework.Options;
    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
            
            /*foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(string) ))
            {
                property.SetMaxLength(760);
            }*/

            var a = builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(string) && p.Name.EndsWith("Id"));

            foreach (var property in a)
            {
                property.SetMaxLength(45);
            }
        }
    }
}