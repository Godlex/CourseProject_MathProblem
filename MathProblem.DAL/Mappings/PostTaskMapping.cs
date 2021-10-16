namespace MathProblem.DAL.Mappings
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models.Entities;

    public class PostTaskMapping : IEntityTypeConfiguration<PostTask>
    {
        public void Configure(EntityTypeBuilder<PostTask> builder)
        {
            builder.HasOne<User>().WithMany().HasForeignKey(task => task.AuthorId);
            builder.HasKey(task => task.PostTaskId);
        }
    }
}