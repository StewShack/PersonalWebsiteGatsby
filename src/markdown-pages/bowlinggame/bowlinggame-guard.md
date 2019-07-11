---
title: "Bowling Game Kata Guard Clause"
description: "The bowling game unit tests with a guard clause using C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame-conclusion">Conclusion</a></li>
    <li class="breadcrumb-item">Guard Clause</li>
  </ol>
</nav>

# Bowling Game Kata Guard Clause

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

Let's build on the [generic list refactor](/post/bowlinggame-genericlist/) and
remove the else statements to create 
[guard clauses](https://www.refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html). 
The use of a guard clause is up for debate. Some believe
in the [single entry, single exit](http://wiki.c2.com/?SingleFunctionExitPoint) approach to writing methods. 
The great thing about Katas is that you can experiment and see which you like best.

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
            continue;
        }

        if ( Spare( roll ) )
        {
            score += SpareBonus( roll );
            roll += 2;
            continue;
        }

        score += NormalScore( roll );
        roll += 2;
    }

    return score;
}
```