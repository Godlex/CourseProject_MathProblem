namespace MathProblem.Models.Entities
{
    using System.Collections.Generic;

    public class User
    {
        public string UserId { get; set; }  
        public string UserName { get; set; }
        public ICollection<PostTask> PostTasks { get; set; }
        public int RightAnswerCount { get; set; }
        public int TaskCreatedCount { get; set; }
    }
}