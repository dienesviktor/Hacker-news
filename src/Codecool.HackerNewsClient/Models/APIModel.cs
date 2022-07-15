namespace HackerNewsClient.Models
{
    public class APIModel
    {
        public int Page { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string TimeAgo { get; set; }
        public string Url { get; set; }

        public APIModel(int page, string title, string author, string timeAgo, string url)
        {
            Page = page;
            Title = title;
            Author = author;
            TimeAgo = timeAgo;
            Url = url;
        }
    }
}
