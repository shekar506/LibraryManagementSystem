using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Library_DAL.Models;

public partial class BookIssue
{
    public int IssueId { get; set; }

    public int BookId { get; set; }

    public int MemberId { get; set; }

    public DateOnly IssueDate { get; set; }

    public DateOnly? ReturnDate { get; set; }

    [JsonIgnore]
    public virtual Book? Book { get; set; } = null!;

    [JsonIgnore]
    public virtual Member? Member { get; set; } = null!;
}
