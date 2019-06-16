---
title: "FizzBuzz"
description: "A kata using FizzBuzz exercises"
date: 2014-05-03T00:00:00-00:00
lastmod: 2014-05-03T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "FizzBuzz">}}

# FizzBuzz

By: Dan Stewart\
May 3, 2014\
[MIT License](https://mit-license.org)

Write a program that prints the numbers from 1 to 100. But for multiples of three
print "Fizz" instead of the number and for the multiples of five print "Buzz". For
numbers which are multiples of both three and five print "FizzBuzz".

FizzBuzz is a great way to practice concepts like ternary statements and extension methods. 
It's a fun problem because there are a 
[million ways](https://rosettacode.org/wiki/FizzBuzz) to solve it.

This is **not** something I would use in an interview. I just wanted to see if I could get this down to one line.

FizzBuzzTrickyTernaryOneLiner.cs

```csharp
public static void Main()
{
    for (int i = 1; i < 101; i++)
    {
        Console.WriteLine(
            i % 3 == 0 && i % 5 == 0
                ? "FizzBuzz"
                : i % 3 == 0
                        ? "Fizz"
                        : i % 5 == 0
                            ? "Buzz"
                            : i.ToString());
    }
}
```        

I am a big fan of guard clauses because they show you what conditions cause the program to exit the method.
        
FizzBuzzGuardClauseMethod.cs

```csharp
public static void Main()
{
    for (int i = 1; i < 101; i++)
    {
        Console.WriteLine(FizzBuzz(i));
    }
}

private static string FizzBuzz(int number)
{
    if (number % 3 == 0 && number % 5 == 0)
    {
        return "FizzBuzz";
    }

    if (number % 3 == 0)
    {
        return "Fizz";
    }

    if (number % 5 == 0)
    {
        return "Buzz";
    }

    return number.ToString();
}
```
        
Not everyone agrees with guard clauses. Here is an example of single entry and single exit code.
        
FizzBuzzSingleEntrySingleExit.cs

```csharp
public static void Main()
{
    for (int i = 1; i < 101; i++)
    {
        Console.WriteLine(FizzBuzz(i));
    }
}

private static string FizzBuzz(int number)
{
    var value = number.ToString();

    if (number % 3 == 0 && number % 5 == 0)
    {
        value = "FizzBuzz";
    }
    else if (number % 3 == 0)
    {
        value = "Fizz";
    }
    else if (number % 5 == 0)
    {
        value = "Buzz";
    }

    return value;
}
```
        
Extension methods allow you to extend C# data types with new methods.
        
FizzBuzzExtensionMethod.cs

```csharp
public static class Program
{
    public static void Main()
    {
        for (int i = 1; i < 101; i++)
        {
            Console.WriteLine(i.ToFizzBuzz());
        }
    }

    public static string ToFizzBuzz(this int number)
    {
        if (number % 3 == 0 && number % 5 == 0)
        {
            return "FizzBuzz";
        }

        if (number % 3 == 0)
        {
            return "Fizz";
        }

        if (number % 5 == 0)
        {
            return "Buzz";
        }

        return number.ToString();
    }
}
```

{{< activemenu "web" >}}