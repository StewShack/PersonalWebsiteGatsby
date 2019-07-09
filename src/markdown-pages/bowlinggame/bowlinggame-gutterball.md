---
title: "Bowling Game Kata - Part 2"
description: "A bowling game with a gutterball score unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/kata">Kata</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item">Gutterball</li>
  </ol>
</nav>

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

Let's write our first test. In this test we score a game where every throw was a
zero (gutterball).

![Gutterball Game](/images/kata/bowlinggame/gutterball.gif)

BowlingGame.Test/GameTest.cs

```csharp
using NUnit.Framework;

namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
        [Test]
        public void Game_AllZeros_ReturnsScore()
        {
            var game = new Game();
        }
    }
}
```
                
At this point we cannot even run the test because the compiler is returning an error.
We need to add a Game class. 

* Add a Game class to the BowlingGame project.
* Add a reference to the BowlingGame project in the BowlingGame.Test project.

The next step is to roll 20 zeros.

BowlingGame.Test/GameTest.cs

```csharp
using NUnit.Framework;

namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
        [Test]
        public void Game_AllZeros_ReturnsScore()
        {
            var game = new Game();

            for ( var i = 0; i < 20; i++ )
            {
                game.Roll( 0 );
            }
        }
    }
}
```
        
The Roll method does not exist, so we cannot compile.

Add the Roll method in BowlingGame.Game.

BowlingGame/Game.cs

```csharp
using System;

namespace BowlingGame
{
    public class Game
    {
        public void Roll( int pins )
        {
            throw new NotImplementedException();
        }
    }
}
```
        
Running the tests results in the following error:

<div class="alert alert-danger" role="alert">1 test failed "System.NotImplementedException"</div>

We need to get the test passing with as little code as possible. This helps us take
small, incremental steps and keeps our code always working.

So, what is it going to take to get this test passing? It's tempting to go ahead
and code the scoring ability. Doing that would require more code than what would
be needed to get the test to pass.

Let's take a look at 
[Uncle Bob's Transformation Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html). 
The first transformation we should try is "nil". Can we get the test to pass by doing nothing?

BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        public void Roll( int pins )
        {
        }
    }
}
```
        
We remove the exception and run the test again.

<div class="alert alert-success" role="alert">1 test passed</div> 

Now that we have a passing test, we can refactor. This is the Red, Green, Refactor
pattern from Kent Beck's book, 
[Test Driven Design by Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530/).

Now we can continue with the gutterball test.

BowlingGame.Test/GameTest.cs

```csharp
using NUnit.Framework;

namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
        [Test]
        public void Game_AllZeros_ReturnsScore()
        {
            var game = new Game();

            for ( var i = 0; i < 20; i++ )
            {
                game.Roll( 0 );
            }

            Assert.That( game.Score(), Is.EqualTo( 0 ) );
        }
    }
}
```

We made our first assertion. We assert that we expect zero to be the returned value
of scoring the game. The score method does not exist. To get the code to compile
we need to add the Score method.

BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        public void Roll(int pins)
        {
        }

        public int Score()
        {
            throw new NotImplementedException();
        }
    }
}
```
        
Unfortunately doing "nil" will not work this time. So, let's see what's next on
Uncle Bob's Transformation Priority Premise. It's "constant". Can we return a constant
to get the test to pass? Yes, we can return a zero.

BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        public void Roll( int pins )
        {
        }

        public int Score()
        {
            return 0;
        }
    }
}
```

[Next &raquo;](/post/bowlinggame-normalgame)