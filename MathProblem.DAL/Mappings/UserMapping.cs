namespace MathProblem.DAL.Mappings
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models.Entities;

    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasOne<ApplicationUser>().WithOne().HasForeignKey<User>(x => x.UserId);
        }
    }
}