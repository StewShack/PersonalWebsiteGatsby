---
title: "Sorting Kata - Setup"
description: "Setting up the sorting kata"
date: 2013-07-26T00:00:00-00:00
lastmod: 2018-02-28T00:00:00-00:00
layout: "index"
activemenu: "web"
---

{{<breadcrumb "[Kata](/kata/)" "Sorting">}}

# Sorting Kata - Setup

By: Dan Stewart\
February 28, 2018\
[MIT License](https://mit-license.org)

Sorting is difficult, but it makes a great Kata. 

> Books are sorted on the shelf if they appear in alphabetical order by author, reading from left to right.
>If two books have the same author, then the one whose title is first alphabetically should go on the left.\
>[Algorithms Unlocked](https://www.amazon.com/Algorithms-Unlocked-Thomas-H-Cormen/dp/0262518805/) by Thomas H. Cormen

Let's create a C# Class Library named "BookSorting". After the project and solution are created, add another project. 
It will be a class library named "BookSorting.Test". 

Your solution should look like this. 

![Initial Solution](/images/kata/sortingkata/initialsolution.png)

Add the [NuGet NUnit package](https://nuget.org/packages/NUnit/) to the BookSorting.Test project. Now we are ready to write tests 
before we write the code.

Add a class to the BookSorting.Test project named SortingTest. 

BookSorting.Test/SortingTest.cs

```csharp
using NUnit.Framework;

namespace BookSorting.Test
{
  [TestFixture]
  public class SortingTest
  {
    [Test]
    public void Authors_SortedByLastNameUsingLinq()
    {
      var book1 = new Book();
    }
  }
}
```

We have to stop at this point because our Book class does not exist.

1. Create a Book class in the BookSorting project.
1. Add a reference to the BookSorting project in the BookSorting.Test project.

Now we add the properties to the Book. 

BookSorting.Test/SortingTest.cs

```csharp
using NUnit.Framework;

namespace BookSorting.Test
{
  [TestFixture]
  public class SortingTest
  {
    [Test]
    public void Authors_SortedByLastNameUsingLinq()
    {
      var book1 = new Book
      {
        Title = "Wait: The Art and Science of Delay",
        Author = new Author
        {
          LastName = "Partnoy",
          FirstName = "Frank",
        },
      };
    }
  }
}
```

Add the Author class and these properties to get the project to compile. 

We can add another book so that we have two things to sort. Then put the two books in a list to be sorted. 

BookSorting.Test/SortingTest.cs

```csharp
using System.Collections.Generic;

using NUnit.Framework;

namespace BookSorting.Test
{
  [TestFixture]
  public class SortingTest
  {
    [Test]
    public void Authors_SortedByLastNameUsingLinq()
    {
      var book1 = new Book
      {
        Author = new Author
        {
          LastName = "Partnoy",
          FirstName = "Frank",
        },
        Title = "Wait: The Art and Science of Delay",
      };

      var book2 = new Book
      {
        Author = new Author
        {
          LastName = "Watt",
          FirstName = "Andrew",
        },
        Title = "Beginning Regular Expressions",
      };

      var books = new List<Book>
      {
        book1,
        book2,
      };
    }
  }
}
```

The next step is the purpose of the Kata. How are we going to sort these books?

[Next &raquo;](/sortingkata/linqorderby/)