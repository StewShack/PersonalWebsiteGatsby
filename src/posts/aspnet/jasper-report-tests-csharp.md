---
title: "Testing Jasper Reports with C#"
description: "Jasper reports can be tested using C# and API calls."
date: 2018-04-20T00:00:00-00:00
lastmod: 2018-04-20T00:00:00-00:00
layout: "index"
---

# Testing Jasper Reports with C# #

By: Dan Stewart\
April 20, 2018\
[MIT License](https://mit-license.org)
       
[Jasper Reports](https://community.jaspersoft.com/) is an open source reporting tool. They offer a REST service that 
we can use to write automated tests against.

The goal of the tests are to ensure that the report simply runs. So, it's more of a smoke test than a test for the correctness of the report.

Here is the program.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

namespace jasper_tests
{
  internal class Program
  {
    public static void Main(string[] args)
    {
      const string reporterUsername = "user";
      const string reporterPassword = "P@ssw0rd!";
      const string reportRoot = "http://reports.stewshack.com:8080/jasperserver/rest_v2/reports/";
      
      var reports = new List<string>
      {
        "Owners/AllOwnersReport",
        "Shacks/AllShacksReport"
      };

      foreach (var report in reports)
      {
        var start = DateTime.Now;
        string reportContents;
        
        Console.WriteLine( "Starting {0}", report );
        
        using ( var client = new WebClient() )
        {
          client.Credentials = new NetworkCredential( reporterUsername, reporterPassword );
          reportContents = client.DownloadString( reportRoot + report + ".csv" );
        }

        var runTime = DateTime.Now - start;

        if ( reportContents.IndexOf("errorCode", StringComparison.Ordinal) > 0 )
        {
          throw new Exception( report + " did not run." );
        }
        
        Console.WriteLine( "Run Time (sec): {0}", runTime.Seconds );
      }
      
      Console.WriteLine( "All reports have been tested." );
    }
  }
}
```

{{< activemenu "testing" >}}