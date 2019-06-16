---
title: "Reading a file in C#"
description: "Using C# to read a file with System.IO and System.Text"
date: 2017-09-20T00:00:00-00:00
lastmod: 2017-09-20T00:00:00-00:00
layout: "index"
---

By: Dan Stewart\
September 20, 2017\
[MIT License](https://mit-license.org)
        

```csharp
using System.IO;
using System.Text;

namespace ReadingAFile
{
    public class Program
    {
        public static void Main()
        {
            string DeathStarPlans = @"C:\DeathStarPlans.txt";

            var R2D2 = new StringBuilder();

            using (var PrincessLeia = new StreamReader(DeathStarPlans))
            {
                while (PrincessLeia.Peek() >= 0)
                {
                    R2D2.Append(PrincessLeia.ReadLine());
                }
            }
        }
    }
}
```

{{< activemenu "web" >}}