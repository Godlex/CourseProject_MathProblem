namespace MathProblem.DAL.Mappings
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class ApplicationUserMapping : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {

            builder.Property(x => x.UserName).HasMaxLength(255);

            builder.Property(x => x.Email).HasMaxLength(255);

            builder.Property(x => x.NormalizedEmail).HasMaxLength(255);

            builder.Property(x => x.NormalizedUserName).HasMaxLength(255);

            builder.Property(u => u.EmailConfirmed).HasConversion<Int16>();

            builder.Property(u => u.LockoutEnabled).HasConversion<Int16>();

            builder.Property(u => u.PhoneNumberConfirmed).HasConversion<Int16>();

            builder.Property(u => u.PhoneNumberConfirmed).HasConversion<Int16>();

            builder.Property(u => u.TwoFactorEnabled).HasConversion<Int16>();

            builder.Property(u => u.PhoneNumberConfirmed).HasConversion<Int16>();
        }
    }
}