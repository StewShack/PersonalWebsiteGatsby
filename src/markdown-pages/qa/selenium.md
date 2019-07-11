---
title: "Selenium UI Testing with C#"
description: "Using C# to run Selenium tests"
date: 2018-02-21T00:00:00-00:00
lastmod: 2018-02-21T00:00:00-00:00
activemenu: "testing"
---

# Selenium UI Testing with C&#35;

By: Dan Stewart\
November 3, 2014\
[MIT License](https://mit-license.org)

Let's check on a web page using C#, Visual Studio, NUnit, and Selenium Web Driver.

Visual Studio -&gt; File -&gt; New Project

Select C# Class Library

Name it StewShack.Web.UI.Tests

Rename Class1.cs to DefaultTest.cs

Let's add the TestFixture attribute to our DefaultTest class.

DefaultTest
```csharp
namespace StewShack.Web.UI.Tests.Tests
{
  [TestFixture]
  public class DefaultTest
  {       
  }
}
```

Adding the TestFixture attribute causes a compile-time error. To fix it, we need to bring in the NUnit package using NuGet. Right-click on the project
and choose:

Manage NuGet Packages&hellip;

Search online for NUnit. Install it. You should now have references to the NUnit framework.

Now you can add the using statement for the NUnit.Framework namespace. Just put your cursor over the TestFixture attribute and press CTRL+. 
(control + period). This will pull up the Generate from Usage menu. Choose the first option to add the using statement.

DefaultTest

```csharp
using NUnit.Framework;

namespace StewShack.Web.UI.Tests.Tests
{
  [TestFixture]
  public class DefaultTest
  {
  }
}
```

Now we can add a test. I like to name my tests, 
What is being tested_The action being taken_The expected result.

DefaultTest

```csharp
using NUnit.Framework;

namespace StewShack.Web.UI.Tests.Tests
{
  [TestFixture]
  public class DefaultTest
  {
    [Test]
    public void Default_OpensInFirefox_NoBrokenLinks()
    {
      var driver = new FirefoxDriver();
      driver.Quit();
    }
  }
}
```

We cannot compile because we added code for Selenium without a reference. Manage Nuget packages and add Selenium WebDriver and Selenuim WebDriver 
Support Classes.

We added a Firefox driver, we need this driver to go to a page.

DefaultTest

```csharp
using NUnit.Framework;

using OpenQA.Selenium.Firefox;

namespace StewShack.Web.UI.Tests.Tests
{
  [TestFixture]
  public class DefaultTest
  {
    [Test]
    public void Default_OpensInFirefox_NoBrokenLinks()
    {
      var driver = new FirefoxDriver();

      driver.Navigate().GoToUrl( "http://www.stewshack.com" );

      driver.Quit();
    }
  }
}
```

Running this test launches the home page of StewShack and immediately closes the browser.