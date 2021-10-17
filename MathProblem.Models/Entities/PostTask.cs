namespace MathProblem.Models.Entities
{
    using System;

    public class PostTask
    {
        public string PostTaskId { get; set; }
        public string Name { get; set; }
        public string TaskCondition { get; set; }
        public string Tags { get; set; }
        public string RightAnswer { get; set; }
        public float Rating { get; set; }
        public string AuthorId { get; set; }
        public DateTime PublicationDateTime { get; set; }
    }
}