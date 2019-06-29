---
title: "Bowling Game Kata Part 4 - The Spare Game"
description: "A bowling game with a spare unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/kata">Kata</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item">Spare Game</li>
  </ol>
</nav>

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

If bowling was scored just by knocking down pins, our job would be easy. The first
special case is the game where you knock down a few pins on your first throw and
then knock down the rest on the next throw. This is called a "spare".

![Spare](/images/kata/bowlinggame/spare.gif)

![Spare box](/images/kata/bowlinggame/sparebox.gif)

When you make a spare, you darken half the score box. You also get a bonus. You
take the 10 pins you knocked down in the frame and add the amount of the first roll
in the next frame.

In our example above: 10 + 3 = 13. The rest of the game is scored normally.

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Spare_ReturnsScorePlusBonus()
{
    game.Roll( 5 );
    game.Roll( 5 ); // spare
    game.Roll( 3 );
    RollMany( 17, 0 );

    Assert.That( game.Score(), Is.EqualTo( 16 ) );
}
```
        
Let's compile and run the test.

<span style="color: red">1 test failed "Expected: 16 But was: 13"</span>

We didn't get our bonus. Our code has no concept of keeping track of frames and
adding a bonus to an earlier score.

We need to fix this, but it's 5:00 and we need to go home. Let's ignore this
test for now and add a message. That way we can check-in our code, leave
work for the day, and not break the build.

BowlingGame.Test/GameTest.cs

```csharp
[Test]
[Ignore( "A game with a spare is not giving the bonus." )]
public void Game_Spare_ReturnsScorePlusBonus()
{
    game.Roll( 5 );
    game.Roll( 5 ); // spare
    game.Roll( 3 );
    RollMany( 17, 0 );

    Assert.That( game.Score(), Is.EqualTo( 16 ) );
}
```
                
Now when we run the tests we see yellow.

<span style="color: orange">Inconclusive: A game with a spare is not giving the bonus.</span>
        
We come back to work the next day ready to tackle the "spare" problem. We can pick right back up 
where we left off by running the tests and seeing the comment.

Right now, our Game is using a variable to hold the score. This score is now conditional
on the need to add a bonus. Looking at 
[Uncle Bob's Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html) 
the next step after the use of a variable is an unconditional statement.

Let's start by adding the unconditional statement of keeping track of every roll
in every frame.

BowlingGame/Game.cs

```csharp
namespace BowlingGame
{
    public class Game
    {
        private int currentRoll;
        private readonly int[] rolls = new int[21];
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
                score += rolls[roll] + rolls[roll + 1];
                roll += 2;
            }

            return score;
        }
    }
}
```

We can remove the Ignore attribute and run the tests. 
This code passes our existing tests, but it still fails to give a bonus to a spare.

The next step in 
[Uncle Bob's Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html) 
is an "if" statement. We wrote unconditional
statements in the form of for loops, now we need a conditional statement to determine
if the frame had a spare.

BowlingGame/Game.cs

```csharp
public int Score()
{
    var roll = 0;
    for ( var frame = 0; frame < 10; frame++ )
    {
        if ( rolls[roll] + rolls[roll + 1] == 10 )
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

<span style="color: green">3 tests passed</span> 

Our tests are passing, it's time to refactor.

The line "if (rolls[roll] + rolls[roll + 1] == 10)" means we rolled a spare. Let's
extract a method that tells us this.

BowlingGame/Game.cs

```csharp
public int Score()
{
    var roll = 0;
    for ( var frame = 0; frame < 10; frame++ )
    {
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

private bool Spare( int roll )
{
    return rolls[roll] + rolls[roll + 1] == 10;
}
```
        
We compile and run the tests.

<span style="color: green">3 tests passed</span>

Looking at our test we see that these two lines simulate rolling a spare:

```csharp
game.Roll( 5 );
game.Roll( 5 );
```
        
Again, we extract these two lines out to a method.

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Spare_ReturnsScorePlusBonus()
{
    RollSpare();
    game.Roll( 3 );
    RollMany( 17, 0 );

    Assert.That( game.Score(), Is.EqualTo( 16 ) );
}

private void RollSpare()
{
    game.Roll( 5 );
    game.Roll( 5 );
}
```

[Next &raquo;](/post/bowlinggame-strikegame)