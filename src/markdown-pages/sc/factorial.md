---
title: "Factorial Kata"
description: "A kata to write a factorial program"
date: 2013-07-22T00:00:00-00:00
lastmod: 2013-07-22T00:00:00-00:00
activemenu: "web"
---

# Factorial Kata

By: Dan Stewart\
July 22, 2013\
[MIT License](https://mit-license.org)

> For recursion to work, two properties must hold. First, there must be one or more **base cases**, where we compute the solution directly without recursion. Second, each recursive call of the procedure must be on a smaller instance of the same problem that will eventually reach a base case.

The quote above came from a chapter on recursion in the book, 
[Algorithms Unlocked](https://www.amazon.com/Algorithms-Unlocked-Thomas-H-Cormen/dp/0262518805/) 
by Thomas H. Cormen. I've always believed C# programming
can be broken down into assignment, iteration, and recursion. Recursion is the last
and most difficult concept to grasp.

A factorial is the result of starting with a number and multiplying it by itself
minus one. It is expressed with the n! notation where n is the number. 

5! = 5 &times; 4 &times; 3 &times; 1 = 120

If you have five marbles each with a different color, there are 120 ways of arranging
the marbles. 

FactorialKata.cs

```csharp
public class FactorialKata
{
    public static void Main()
    {
        Console.WriteLine( factorial( 5 ) );
    }

    private static int factorial( int number )
    {
        if ( number <= 1 )
        {
            return 1;
        }

        return number * factorial( number - 1 );
    }
}
```