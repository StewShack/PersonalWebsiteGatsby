---
title: "Bowling Game Kata Typical Game Test"
description: "A typical bowling game kata unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "[Bowling Game](/bowlinggame/)" "[Conclusion](/bowlinggame/conclusion/)" "Typical Game">}}

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

Here is a test for a typical game.

![Typical Game](/images/kata/bowlinggame/typical.gif)

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Typical_ReturnsScore()
{
    RollSpare();
    game.Roll( 6 );
    game.Roll( 1 );
    game.Roll( 8 );
    game.Roll( 0 );
    game.Roll( 6 );
    game.Roll( 3 );
    RollStrike();
    game.Roll( 5 );
    game.Roll( 2 );
    game.Roll( 8 );
    game.Roll( 0 );
    game.Roll( 7 );
    game.Roll( 3 ); // spare
    game.Roll( 7 );
    game.Roll( 3 ); // spare
    game.Roll( 9 );
    game.Roll( 1 ); // spare in the 10th frame
    game.Roll( 7 ); // 10th frame bonus

    Assert.That( game.Score(), Is.EqualTo( 125 ) );
}
```

{{< activemenu "web" >}}