---
title: "Crawling a Webpage Using C#"
description: "Using Abot and C# to crawl a webpage looking for broken links"
date: 2017-08-08T00:00:00-00:00
lastmod: 2017-08-08T00:00:00-00:00
layout: "index"
activemenu: "testing"
---

By: Dan Stewart\
August 8, 2017\
[MIT License](https://mit-license.org)

You can crawl a webpage using C# and Abot.

Create a new Console Application and use Nuget to add Abot. Then add a reference to System.Configuration.

The class below will be used to create the crawler and log the results.

Crawler.cs

```csharp
using System;
using System.Net;
 
using Abot.Core;
using Abot.Crawler;
 
namespace StewShack.Crawler
{
  public class Crawler
  {
    public void Crawl( Uri page )
    {
      using ( var crawler = new PoliteWebCrawler( 
        AbotConfigurationSectionHandler.LoadFromXml().Convert() ) )
      {
        crawler.PageCrawlCompletedAsync += CrawlerProcessPageCrawlCompleted;

        crawler.Crawl( page );
      }
    }

    private void CrawlerProcessPageCrawlCompleted( object sender, 
      PageCrawlCompletedArgs e )
    {
      var crawledPage = e.CrawledPage;

      if ( crawledPage.WebException != null
        || crawledPage.HttpWebResponse.StatusCode != HttpStatusCode.OK )
      {
        Console.WriteLine( "Crawl of page failed {0}. Status Code {1}. Exception {2}",
        crawledPage.Uri.AbsoluteUri,
        crawledPage.HttpWebResponse.StatusCode,
        crawledPage.WebException );
      }
    }
  }
}
```

We run the crawler in the program class.

Program.cs

```csharp
using System;
using log4net.Config;

namespace StewShack.Crawler
{
  public class Program
  {
    public static void Main( string[] args )
    {
      CrawlSite();
    }

    private static void CrawlSite()
    {
      XmlConfigurator.Configure();

      var fullUri = new Uri( "http://www.stewshack.com" );

      Console.WriteLine( "Crawling: {0}", fullUri.AbsoluteUri );

      new Crawler().Crawl( fullUri );
    }
  }
}
```

We configure Abot and log4net in the app.config.

app.config

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <configSections>
    <section name="log4net" 
      type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
    <section name="abot" type="Abot.Core.AbotConfigurationSectionHandler, Abot" />
  </configSections>
  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.6.2" />
  </startup>
  <log4net>
    <appender name="ConsoleAppender" type="log4net.Appender.ConsoleAppender">
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="[%date] [%thread] [%-5level] - %message%newline" />
      </layout>
    </appender>
    <appender name="AbotAppender" type="log4net.Appender.RollingFileAppender">
      <file value="abotlog.txt" />
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maxSizeRollBackups value="10" />
      <maximumFileSize value="10240KB" />
      <staticLogFileName value="true" />
      <preserveLogFileNameExtension value="true" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="[%date] [%-3thread] [%-5level] - %message%newline" />
      </layout>
    </appender>
    <logger name="AbotLogger">
      <level value="INFO" />
      <appender-ref ref="ConsoleAppender" />
      <appender-ref ref="AbotAppender" />
    </logger>
  </log4net>
  <abot>
    <crawlBehavior 
      crawlTimeoutSeconds="0" 
      downloadableContentTypes="text/html, text/plain" 
      httpRequestMaxAutoRedirects="0" 
      httpRequestTimeoutInSeconds="0" 
      httpServicePointConnectionLimit="200" 
      isExternalPageCrawlingEnabled="true" 
      isExternalPageLinksCrawlingEnabled="false" 
      isForcedLinkParsingEnabled="false" 
      isHttpRequestAutomaticDecompressionEnabled="true" 
      isHttpRequestAutoRedirectsEnabled="true" 
      isRespectUrlNamedAnchorOrHashbangEnabled="false" 
      isSendingCookiesEnabled="false" 
      isSslCertificateValidationEnabled="false" 
      isUriRecrawlingEnabled="false" 
      maxConcurrentThreads="1" 
      maxCrawlDepth="1" 
      maxLinksPerPage="0" 
      maxMemoryUsageCacheTimeInSeconds="0" 
      maxMemoryUsageInMb="0" 
      maxPageSizeInBytes="100000" 
      maxPagesToCrawl="0" 
      maxPagesToCrawlPerDomain="0" 
      maxRetryCount="1" 
      minAvailableMemoryRequiredInMb="0" 
      minRetryDelayInMilliseconds="12000" 
      userAgentString="abot v1.0 http://code.google.com/p/abot" />
    <authorization isAlwaysLogin="false" loginUser="" loginPassword="" />
    <politeness 
      isIgnoreRobotsDotTextIfRootDisallowedEnabled="false" 
      isRespectAnchorRelNoFollowEnabled="true" 
      isRespectHttpXRobotsTagHeaderNoFollowEnabled="true" 
      isRespectMetaRobotsNoFollowEnabled="true" 
      isRespectRobotsDotTextEnabled="true" 
      maxRobotsDotTextCrawlDelayInSeconds="120" 
      robotsDotTextUserAgentString="abot v1.0 http://code.google.com/p/abot" 
      minCrawlDelayPerDomainMilliSeconds="1000" />
  </abot>
  <runtime>
  <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
    <dependentAssembly>
      <assemblyIdentity name="log4net" publicKeyToken="669e0ddf0bb1aa2a" 
        culture="neutral" />
      <bindingRedirect oldVersion="0.0.0.0-2.0.7.0" newVersion="2.0.7.0" />
    </dependentAssembly>
  </assemblyBinding>
  </runtime>
</configuration>
```