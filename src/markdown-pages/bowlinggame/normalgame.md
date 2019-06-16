---
title: "Bowling Game Kata Part 3 - The Normal Score Game"
description: "A bowling game with a normal score unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "[Bowling Game](/bowlinggame/)" "Normal Score Game">}}

By: Dan Stewart)\
October 4, 2017\
[MIT License](https://mit-license.org)

Let's write our next few tests. In these tests we score a normal game in which there
are no strikes or spares. We throw the ball down the lane and knock down a single pin.

![Normal Game](/images/kata/bowlinggame/allones.gif)

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_AllOnes_ReturnsScore()
{
    var game = new Game();

    for ( var i = 0; i < 20; i++ )
    {
        game.Roll( 1 );
    }

    Assert.That( game.Score(), Is.EqualTo( 20 ) );
}
```

Let's compile and run the test.

{{< color "red" >}}1 test failed "Expected: 20 But was: 0"{{< /color >}}

We need to get this code passing. Looking at the score method we are returning a
0. This is because we are at the "constant" stage of 
[Uncle Bob's Transformation Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html). 
We need to move to the level of "scalar". This will be a variable to hold the score of the game. 

BowlingGame/Game.cs

```csharp
private int score;

public void Roll( int pins )
{
    score += pins;
}

public int Score()
{
    return score;
}
```
        
Compile and run the tests.

{{< color "green" >}}2 tests passed{{< /color >}}

Now that our tests are passing, we can do some refactoring.

* Both tests instantiate a new Game.
* Both tests have a loop that rolls the ball.

Let's extract this duplicate code out.

BowlingGame.Test/GameTest.cs

```csharp
[SetUp]
public void TestSetup()
{
    game = new Game();
}

private Game game;

private void RollMany( int rolls, int pins )
{
    for ( var i = 0; i < rolls; i++ )
    {
        game.Roll( pins );
    }
}

[Test]
public void Game_AllOnes_ReturnsScore()
{
    RollMany( 20, 1 );

    Assert.That( game.Score(), Is.EqualTo( 20 ) );
}

[Test]
public void Game_AllZeros_ReturnsScore()
{
    RollMany( 20, 0 );

    Assert.That( game.Score(), Is.EqualTo( 0 ) );
}
```
        
The SetUp attribute indicates code that should run before each test. Before each
test runs, we want to instantiate a new Game.

We created a RollMany method to take care of the loop.

At the end of the Normal Game tests, our code looks like this:

BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        private int score;

        public void Roll( int pins )
        {
            score += pins;
        }

        public int Score()
        {
            return score;
        }
    }
}
```
                
BowlingGame.Test/GameTest.cs

```csharp
using NUnit.Framework;

namespace BowlingGame.Test
{
    [TestFixture]
    public class GameTest
    {
        [SetUp]
        public void TestSetup()
        {
            game = new Game();
        }

        private Game game;

        private void RollMany( int rolls, int pins )
        {
            for ( var i = 0; i < rolls; i++ )
            {
                game.Roll( pins );
            }
        }

        [Test]
        public void Game_AllOnes_ReturnsScore()
        {
            RollMany( 20, 1 );

            Assert.That( game.Score(), Is.EqualTo( 20 ) );
        }

        [Test]
        public void Game_AllZeros_ReturnsScore()
        {
            RollMany( 20, 0 );

            Assert.That( game.Score(), Is.EqualTo( 0 ) );
        }
    }
}
```

[Next &raquo;](/bowlinggame/sparegame)

{{< activemenu "web" >}}