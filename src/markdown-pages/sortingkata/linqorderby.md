---
title: "Sorting Kata - Linq Order By"
description: "Sorting using Linq in C#"
date: 2013-07-26T00:00:00-00:00
lastmod: 2018-02-28T00:00:00-00:00
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/sortingkata">Sorting</a></li>
    <li class="breadcrumb-item">Linq Order By</li>
  </ol>
</nav>

# Sorting Kata - Linq Order By

By: Dan Stewart\
February 28, 2018\
[MIT License](https://mit-license.org)

In the [setup](/post/sortingkata) we created a solution with two projects. The purpose of these two projects was for a Sorting Kata. Now we write a
sorting method to test.

BookSorting.Test/SortingTest.cs

```csharp
using System.Collections.Generic;
using System.Linq;

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

      var bookshelf = new Bookshelf();

      books = bookshelf.LinqOrderBy(books);

      Assert.That(books.First(), Is.EqualTo( book1 ));
    }
  }
}
```

Add the Bookshelf class to the BookSorting project. Then add the LinqOrderBy method.
Looking at [Uncle Bob's Transformation Priority Premise](https://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html), 
the first transformation we should try is "nil". Can we get the test to fail by doing nothing? No, our code will not compile unless 
we return something. The next step is a constant. Let's just return the books list as is.

BookSorting/Bookshelf.cs

```csharp
using System.Collections.Generic;

namespace BookSorting
{
  public class Bookshelf
  {
    public List<Book> LinqOrderBy(List<Book> books)
    {
      return books;
    }
  }
}
```

<div class="alert alert-success" role="alert">1 test passed</div>

We wanted this test to fail because we are using the Red, Green, Refactor pattern from Kent Beck's book, 
[Test Driven Design By Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530/).

Our test passed when we didn't want it to. Let's flip the order we put the books into the list.

BookSorting.Test/SortingTest.cs

```csharp
var books = new List<Book>
{
  book2,
  book1,
};
```

<div class="alert alert-danger" role="alert">
1 test failed: Expected: &lt;BookSorting.Book&gt; But was: &lt;BookSorting.Book&gt;
</div>

Alright, it failed for the right reason. Now we need to deal with that failing test message. It's not very helpful. We have two options, 
change the Assert method to have a message, or overwrite the Book ToString method to return the name of the book instead of the object 
name "BookSorting.Book".

Here's an updated assert.

BookSorting.Test/SortingTest.cs

```csharp
Assert.AreEqual(
  book1,
  books.First(),
  string.Format(
    "Expected {0}, {1}. {2} but was {3}, {4}. {5}",
    book1.Author.LastName,
    book1.Author.FirstName,
    book1.Title,
    books.First().Author.LastName,
    books.First().Author.FirstName,
    books.First().Title));
```

<div class="alert alert-danger" role="alert">
1 test failed Failed: Expected Partnoy, Frank. Wait: The Art and Science of Delay 
but was Watt, Andrew. Beginning Regular Expressions 
Expected: &lt;BookSorting.Book&gt; But was: &lt;BookSorting.Book&gt;
</div>

I would not want to write that much code for every assert. Plus, the expected message is still not helpful. Let's overwrite the Book 
ToString method.

BookSorting/Book.cs

```csharp
namespace BookSorting
{
  public class Book
  {
    public Author Author { get; set; }

    public string Title { get; set; }

    public override string ToString()
    {
      return string.Format(
        "{0}, {1}. {2}",
        Author.LastName,
        Author.FirstName,
        Title);
    }
  }
}
```

We can put our assert back to the simple one we started with.

BookSorting.Test/SortingTest.cs

```csharp
Assert.That(books.First(), Is.EqualTo(book1));
```

<div class="alert alert-danger" role="alert">
1 test failed Expected: &lt;Partnoy, Frank. Wait: The Art and Science of Delay&gt; 
But was: &lt;Watt, Andrew. Beginning Regular Expressions&gt;
</div>

I can see the advantage of calling Book.ToString() and getting the author and title instead of &lt;BookSorting.Book&gt; so let's 
stick with that for now.

We saw a failing test (Red), and we made sure the message was helpful. Now we can make it green.

BookSorting/Bookshelf.cs

```csharp
using System.Collections.Generic;
using System.Linq;

namespace BookSorting
{
  public class Bookshelf
  {
    public List<Book> LinqOrderBy(List<Book> books)
    {
      return books.OrderBy(b => b.Author.LastName)
        .ThenBy(b => b.Author.FirstName)
        .ThenBy(b => b.Title)
        .ToList();
    }
  }
}
```

<div class="alert alert-success" role="alert">1 test passed</div>

Let's continue the Kata by using the built-in sort method of a List.

[Next &raquo;](/post/listsort)