---
title: "Bowling Game Kata - Perfect Game Test"
description: "A bowling game with all strikes unit test with C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
layout: "index"
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/kata">Kata</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame-conclusion">Conclusion</a></li>
    <li class="breadcrumb-item">Perfect Game</li>
  </ol>
</nav>

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

Here is a test for a perfect game.

![Perfect Game](/images/kata/bowlinggame/perfect.gif)

BowlingGame.Test/GameTest.cs

```csharp
[Test]
public void Game_Perfect_ReturnsPerfectGameScore()
{
    RollMany( 12, 10 );

    Assert.That( game.Score(), Is.EqualTo( 300 ) );
}
```