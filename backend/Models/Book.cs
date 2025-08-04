using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Library_DAL.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string Title { get; set; } = null!;

    public string? Author { get; set; }

    public string? Isbn { get; set; }

    public string AvailabilityStatus { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<BookIssue> BookIssues { get; set; } = new List<BookIssue>();
}
