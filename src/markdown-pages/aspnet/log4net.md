---
title: "Log4net"
description: "An example using log4net with C#"
date: 2017-09-12T00:00:00-00:00
lastmod: 2017-08-08T00:00:00-00:00
layout: "index"
activemenu: "web"
---

By: Dan Stewart\
September 12, 2017\
[MIT License](https://mit-license.org)

<iframe width="560" height="315" src="https://www.youtube.com/embed/fS00hjMVu9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This console application is written in C#, uses log4net, and targets [.NET Core 2](https://www.microsoft.com/net/download/windows).

Create a .NET Core 2 console application and name it LoggingFun.

Right-click on the project and choose Manage NuGet Packages. Add "log4net".

Right-click and add a text file named "log4net.config" to the project.

log4net.config

```xml
<?xml version="1.0"?>
<log4net debug="false">
  <appender name="LogToFile" type="log4net.Appender.FileAppender">
    <threshold value="INFO" />
    <file value="loggingfun.log" />
    <immediateFlush value="true" />
    <lockingModel type="log4net.Appender.FileAppender+MinimalLock" />
    <appendToFile value="false" />
    <layout type="log4net.Layout.PatternLayout"/>
  </appender>
  <root>
    <level value="ALL" />
    <appender-ref ref="LogToFile" />
  </root>
</log4net>
```

Right-click on log4net.config and choose properties. Make sure you copy the file to the output directory.

Let's write "Hello World!" to the log.

Program.cs

```csharp
using System.IO;
using System.Reflection;
using log4net;
using log4net.Config;

namespace LoggingFun
{
    public class Program
    {
        public static void Main()
        {
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());

            XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
            
            var logger = LogManager.GetLogger(typeof(Program));

            logger.Error("Hello World!");
        }
    }
}
```

Running this creates the "loggingfun.log" file.

The output in the file is simply "Hello World!". We can add formatting if we need the time and level of error displayed 
in the log. We do this with log4net's 
[PatternLayout Class](https://logging.apache.org/log4net/release/manual/configuration.html).

log4net.config

```xml
<?xml version="1.0"?>
<log4net debug="false">
  <appender name="LogToFile" type="log4net.Appender.FileAppender">
    <threshold value="INFO" />
    <file value="loggingfun.log" />
    <immediateFlush value="true" />
    <lockingModel type="log4net.Appender.FileAppender+MinimalLock" />
    <appendToFile value="false" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date %-5level - %message%newline" />
    </layout>
  </appender>
  <root>
    <level value="ALL" />
    <appender-ref ref="LogToFile" />
  </root>
</log4net>
```