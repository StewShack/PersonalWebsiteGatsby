---
title: "Bowling Game Kata - Part 5 Strike Game"
description: "A bowling game of one strike unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/kata">Kata</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item">Strike Game</li>
  </ol>
</nav>

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

The second special case is the game where you knock down all of the pins on your
first throw. This is called a "strike".

![strike](/images/kata/bowlinggame/strike.gif)

When you make a strike, you put an X in the score box. You also get a double bonus.
You take the 10 pins you knocked down in first roll and add the amount of the next
two rolls in the next frame.

In our example above: 10 + 0 + 2 = 12. The rest of the game is scored normally.

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Strike_ReturnsScorePlusDoubleBonus()
{
    game.Roll( 10 );
    game.Roll( 0 );
    game.Roll( 2 );
    RollMany( 16, 0 );

    Assert.That( game.Score(), Is.EqualTo( 14 ) );
}
```

We compile and run the after refactoring.

<span style="color: green">4 tests passed</span> 

Wait! That test was supposed to fail! That's why we always want to see red when
we are writing tests. Red, Green, Refactor.

We can read the code and try to figure out what went wrong, or we can set a breakpoint
and step through the code.

Setting breakpoints and stepping through code is called "debugging".

Set a breakpoint somewhere inside the "Game_Strike_ReturnsScorePlusDoubleBonus" test. 

As you step through, you will see that the Spare method is returning true. Our first
roll is a 10, our next roll is a 0. So, 10 + 0 = 10 and that means a spare to our
program.

So, do we fix the test or fix the code? Well, where's the bug? It's in the code.
Our code is evaluating a strike as a spare if it is followed by a gutter ball.

Let's get this test to fail by writing a conditional statement to check for a strike.

BowlingGame/Game.cs

```csharp
public int Score()
{
    var roll = 0;
    for ( var frame = 0; frame < 10; frame++ )
    {
        if ( rolls[roll] == 10 )
        {
            throw new NotImplementedException();
        }
        if ( Spare( roll ) )
        {
            score += 10 + rolls[roll + 2];
        }
        else
        {
            score += rolls[roll] + rolls[roll + 1];
        }
        roll += 2;
    }

    return score;
}
```

Let's run the tests.

<span style="color: red">1 test failed "System.NotImplementedException"</span>

Good, now that we are seeing red, we can make it green.

BowlingGame/Game.cs

```csharp
public int Score()
{
    var roll = 0;
    for ( var frame = 0; frame < 10; frame++ )
    {
        if ( rolls[roll] == 10 )
        {
            score += 10 + rolls[roll + 1] + rolls[roll + 2];
            roll++;
        }
        else if ( Spare( roll ) )
        {
            score += 10 + rolls[roll + 2];
            roll += 2;
        }
        else
        {
            score += rolls[roll] + rolls[roll + 1];
            roll += 2;
        }
    }

    return score;
}
```

<span style="color: green">4 tests passed</span> 

Now that our tests pass, let's refactor. First the Game.

To Do:

* Abstract the score bonus and normal score.
* Add the Strike method to determine if the roll is a strike.

BowlingGame/Game.cs

```csharp
public int Score()
{
    var roll = 0;
    for ( var frame = 0; frame < 10; frame++ )
    {
        if ( Strike( roll ) )
        {
            score += StrikeBonus( roll );
            roll++;
        }
        else if ( Spare( roll ) )
        {
            score += SpareBonus( roll );
            roll += 2;
        }
        else
        {
            score += NormalScore( roll );
            roll += 2;
        }
    }

    return score;
}

private int NormalScore( int roll )
{
    return rolls[roll] + rolls[roll + 1];
}

private int SpareBonus( int roll )
{
    return 10 + rolls[roll + 2];
}

private int StrikeBonus( int roll )
{
    return 10 + rolls[roll + 1] + rolls[roll + 2];
}

private bool Strike( int roll )
{
    return rolls[roll] == 10;
}
```

We abstracted out the bonuses and normal scoring because it was a low-level detail.
We are striving to keep the Score method at "one level of abstraction" [Clean Code page 36](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/)

After refactoring we compile and run the tests.
        
<span style="color: green">4 tests passed</span> 

Now, let's take a look at the tests.

To Do:

* Add a RollStrike method.

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Strike_ReturnsScorePlusDoubleBonus()
{
    RollStrike();
    game.Roll( 0 );
    game.Roll( 2 );
    RollMany( 16, 0 );

    Assert.That( game.Score(), Is.EqualTo( 14 ) );
}

private void RollStrike()
{
    game.Roll( 10 );
}
```

Here's our code at the end of the strike test.
        
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

        private void RollSpare()
        {
            game.Roll( 5 );
            game.Roll( 5 );
        }

        private void RollStrike()
        {
            game.Roll( 10 );
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

        [Test]
        public void Game_Spare_ReturnsScorePlusBonus()
        {
            RollSpare();
            game.Roll( 3 );
            RollMany( 17, 0 );

            Assert.That( game.Score(), Is.EqualTo( 16 ) );
        }

        [Test]
        public void Game_Strike_ReturnsScorePlusDoubleBonus()
        {
            RollStrike();
            game.Roll( 0 );
            game.Roll( 2 );
            RollMany( 16, 0 );

            Assert.That( game.Score(), Is.EqualTo( 14 ) );
        }
    }
}
```
        
BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        private readonly int[] rolls = new int[21];
        private int currentRoll;
        private int score;

        public void Roll( int pins )
        {
            rolls[currentRoll] = pins;
            currentRoll++;
        }

        public int Score()
        {
            var roll = 0;
            for ( var frame = 0; frame < 10; frame++ )
            {
                if ( Strike( roll ) )
                {
                    score += StrikeBonus( roll );
                    roll++;
                }
                else if ( Spare( roll ) )
                {
                    score += SpareBonus( roll );
                    roll += 2;
                }
                else
                {
                    score += NormalScore( roll );
                    roll += 2;
                }
            }

            return score;
        }

        private int NormalScore( int roll )
        {
            return rolls[roll] + rolls[roll + 1];
        }

        private int SpareBonus( int roll )
        {
            return 10 + rolls[roll + 2];
        }

        private int StrikeBonus( int roll )
        {
            return 10 + rolls[roll + 1] + rolls[roll + 2];
        }

        private bool Strike( int roll )
        {
            return rolls[roll] == 10;
        }

        private bool Spare( int roll )
        {
            return rolls[roll] + rolls[roll + 1] == 10;
        }
    }
}
```

[Next &raquo;](/post/bowlinggame-conclusion)