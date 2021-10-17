namespace MathProblem.DAL.Mappings
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class IdentityRolsMapping : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.Property(x => x.Name).HasMaxLength(255);

            builder.Property(x => x.NormalizedName).HasMaxLength(255);
        }
    }
}