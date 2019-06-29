---
title: "Bowling Game Kata - Part 1"
description: "Setting up the Bowling Game unit testing kata with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
activemenu: "web"
---

{{<breadcrumb "[Kata](/kata/)" "Bowling Game">}}

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

The Bowling Game Kata was my first introduction to Test Driven Development. Uncle
Bob wrote about it on his 
[TheBowlingGameKata](http://www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata) page.

This walk-through will use NUnit 3.

## Goal

Write a simple class that scores a game of bowling.

## Iteration 0 - The Setup

Create a class library and name the project "BowlingGame".

Before we write a line of production code, we want to have a failing test to cover
it. In this example, I will be using NUnit 3 inside of a class library.

Add a new project to the Solution named "BowlingGame.Test".

After the project is created, add a class named GameTest.cs. Game is the name
of the class we will be testing, and "Test" is just a suffix that I like to add to
the end of tests.

Now add the ```csharp[TestFixture]``` attribute to the top of GameTest.

BowlingGame.Test/GameTest.cs

```csharp
namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
    }
}
```

Adding the TestFixture attribute causes a compile-time error. To fix it, we need
to bring in the NUnit 3 package using [NuGet](https://www.nuget.org/packages/NUnit/).

Now that you added NUnit, you can add the using statement for the NUnit.Framework namespace.

BowlingGame.Test/GameTest.cs

```csharp
using NUnit.Framework;

namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
    }
}
```

[Next &raquo;](/bowlinggame/gutterball)