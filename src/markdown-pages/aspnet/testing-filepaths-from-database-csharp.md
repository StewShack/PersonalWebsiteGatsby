---
title: "Testing File Paths from a Database with C#"
description: "Test that file paths exist using C# and Dapper to get the paths from a database"
date: 2018-04-19T00:00:00-00:00
lastmod: 2018-04-19T00:00:00-00:00
layout: "index"
activemenu: "testing"
---

By: Dan Stewart\
April 19, 2018\
[MIT License](https://mit-license.org)
       
If you have a database filled with file paths, you can use C# and <a href="https://github.com/StackExchange/Dapper">Dapper</a> 
to verify that the files listed in the database exist on the server.

## Setup

Create a new C# console application named “file-tests”.

Add a class named "Program.cs" to the project. This class will have the Main method to run the program.

Using Nuget, add Dapper.

Here is the program.

```csharp
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using Dapper;

namespace file-tests
{
  public class Program
  {
    public static void Main(string[] args)
    {
      Console.WriteLine("Running");
      const string connectionString = "Server=databaseserver.stewshack.com;"
        + "Initial Catalog=stewdb;User ID=user;Password=P@ssw0rd!;Connection Timeout=300;";
      
      const string contentDirectory = @"\\stewfs\docs\";

      var contentKeys = new List<int>
      {
        777,
        888,
        999
      };

      var query = "SELECT '" + contentDirectory +
        "' + FileName AS Path " +
        "FROM Content " +
        "WHERE ContentKey IN (" + string.Join( ",", contentKeys ) + ")";

      List<ContentFile> allContentFiles;

      using (var connection = new SqlConnection(connectionString))
      {
        connection.Open();

        allContentFiles = connection.Query<ContentFile>( query ).ToList();

        connection.Close();
      }

      var missingContentFiles = allContentFiles.Where( cf => !File.Exists( cf.Path ) ).ToList();

      foreach (var contentFile in missingContentFiles)
      {
        Console.WriteLine("Missing file: " + contentFile.Path);
      }

      Console.WriteLine("Completed");
    }
  }

  public class ContentFile
  {
    public string Path { get; set; }
  }
}
```