---
title: "Bowling Game Kata Change int to list"
description: "The bowling game unit tests with a generic list using C#"
date: 2017-10-04T00:00:00-00:00
lastmod: 2017-10-04T00:00:00-00:00
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/bowlinggame">Bowling Game</a></li>
    <li class="breadcrumb-item"><a href="/post/bowlinggame-conclusion">Conclusion</a></li>
    <li class="breadcrumb-item">Generic List</li>
  </ol>
</nav>

# Bowling Game Kata Change int to list

By: Dan Stewart\
October 4, 2017\
[MIT License](https://mit-license.org)

In the Bowling Game Kata we used a primitive int[] and all the cool kids are using
generic List&lt;int&gt;.

BowlingGame/Game.cs

```csharp
using System.Collections.Generic;

namespace BowlingGame
{
    public class Game
    {
        private readonly List<int> rolls = new List<int>( 21 );
        private int score;

        public void Roll( int pins )
        {
            rolls.Add( pins );
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