using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Library_DAL.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    [JsonIgnore]
    public virtual Member? Member { get; set; }
}
