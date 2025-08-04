using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Library_DAL.Models;

public partial class Member
{
    public int MemberId { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    [JsonIgnore]
    public virtual ICollection<BookIssue> BookIssues { get; set; } = new List<BookIssue>();

    // Removed:
    // public int? UserId { get; set; }
    // public virtual User? User { get; set; }
}