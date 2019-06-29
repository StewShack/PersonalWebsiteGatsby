---
title: "Manipulating Strings with C#"
description: "Examples of string formats using C#"
date: 2017-11-23T00:00:00-00:00
lastmod: 2017-11-23T00:00:00-00:00
layout: "index"
activemenu: "web"
---

By: Dan Stewart\
November 23, 2017\
[MIT License](https://mit-license.org)

```csharp
int mySalary = 123456;

mySalary.ToString("C"); // $123,456.00
mySalary.ToString("C", 
System.Globalization.CultureInfo.CreateSpecificCulture("en-US"))); 
// $123,456.00

mySalary.ToString("C", 
System.Globalization.CultureInfo.CreateSpecificCulture("ja-JP"))); 
// &#165;123,456

mySalary.ToString("D"); // 123456
mySalary.ToString("D8"); // leading 0's 00123456

mySalary.ToString("E"); // 1.234560E+005
mySalary.ToString("F"); // 123456.00
mySalary.ToString("G"); // 123456
mySalary.ToString("N"); // 123,456.00
mySalary.ToString("X"); // 1E240
mySalary.ToString("P"); // 12,345,600.00 %
mySalary.ToString("P1"); // 12,345,600.0 %
mySalary.ToString("P0"); // 12,345,600 %
mySalary.ToString("# %"); // 12345600 %
mySalary.ToString("# '%'"); // 123456 %
mySalary.ToString("#,###"); // 123,456
mySalary.ToString("#,###.00"); // 123,456.00
mySalary.ToString("#,###.##"); // 123,456
mySalary.ToString("#,### lbs"); // 123,456 lbs

mySalary = -123456;

mySalary.ToString("#0"); // -123456
mySalary.ToString("#0;(#0)"); // (123456)
```

## Date Formats

If you need to save today's date in the 
[XSD:DateTime](https://www.w3.org/TR/xmlschema-2/#dateTime)
format use the following format:

```csharp
DateTime.Now.ToString("yyyy-MM-ddTHH:MM:ss");
// 2013-12-02T21:12:39
```

Here is an example format for the
[APA date retrieved](https://blog.apastyle.org/apastyle/2009/10/how-to-cite-wikipedia-in-apa-style.html).

```csharp
DateTime.Today.ToString("MMMM dd, yyyy") 
// December 02, 2017
```

Example:

Stewart, Dan. (November 23, 2017). Manipulating Strings with C#. Retrieved December 02, 2017,
from https://www.stewshack.com/post/strings/

>Do not include retrieval dates unless the source material 
may change over time (e.g., Wikis)\
>American Psychological Association, 2010, p. 192