---
title: "Sorting Kata - List Sort"
description: "Sorting using List Sort in C#"
date: 2013-08-21T00:00:00-00:00
lastmod: 2018-03-02T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "[Sorting](/sortingkata/)" "List Sort">}}

# Sorting Kata - List Sort

By: Dan Stewart\
March 2, 2018\
[MIT License](https://mit-license.org)

In the [setup](/sortingkata/) we created a solution with two projects. The purpose of these two projects was for a Sorting Kata.

In [Linq OrderBy](/sortingkata/linqorderby/) we added a Bookshelf class to hold our sorting methods. I'm going to overwrite that code to keep the Kata short.

Now we can add further sorting methods to test. The List class has a built-in sort method. Let's try it out. First we write a failing test against 
the Bookshelf class ListSort method.

BookSorting.Test/SortingTest.cs
```csharp
[Test]
public void Authors_SortedByLastNameUsingListSort()
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
    book2,
    book1,
  };

  var bookshelf = new Bookshelf();

  books = bookshelf.ListSort(books);

  Assert.That(books.First(), Is.EqualTo(book1));
}
```

Add the ListSort method to the Bookshelf class so that the project compiles. Have the method return the list.

BookSorting/Bookshelf.cs
```csharp
public List<Book> ListSort(List<Book> books)
{
  return books;
}
```

Running the test results in:

{{< color "red" >}}
1 test failed Expected: &lt;Partnoy, Frank. Wait: The Art and Science of Delay&gt; But was: &lt;Watt, Andrew. Beginning Regular Expressions&gt;
{{< /color >}}

In [Linq OrderBy](/sortingkata/linqorderby/) we overrode the Book.ToString() to get the author and title.

We saw a failing test (Red), and we made sure the message was helpful. Now we can make it green.

BookSorting/Bookshelf.cs
```csharp
public List<Book> ListSort(List<Book> books)
{
  books.Sort();

  return books;
}
```

{{< color "red" >}}
1 test failed System.InvalidOperationException : Failed to compare two elements in the array.           
{{< /color >}}

The List Sort method does not know how to compare two books. We need the Book class to implement 
[IComparable](https://msdn.microsoft.com/en-us/library/System.IComparable.aspx).

BookSorting/Book.cs
```csharp
using System;

namespace BookSorting
{
  public class Book : IComparable
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

    public int CompareTo(object obj)
    {
      return -1;
    }
  }
}
```

{{< color "red" >}}
1 test failed Expected: &lt;Partnoy, Frank. Wait: The Art and Science of Delay&gt; But was: &lt;Watt, Andrew. Beginning Regular Expressions&gt;
{{< /color >}}

Returning -1 causes the test fail for the right reason and gives a helpful message. 

Let's try every constant that the CompareTo can return and test it.            

| Test Results | Value | Description |
|--------------|-------:|-------------|
| {{< color "red" >}}Fail{{< /color >}} | -1 | Less than zero means this instance of book precedes the compared book in the sort order. |
| {{< color "red" >}}Fail{{< /color >}} | 0 | Zero means this instance of book occurs in the same position in the sort order as the compared book.|
| {{< color "green" >}}Pass{{< /color >}} | 1 | Greater than zero means this instance of book follows compared book in the sort order. |

Returning 1 causes the test to pass when it should not. Let's update our test so that 1 also fails.

BookSorting.Test/SortingTest.cs

```csharp
[Test]
public void Authors_SortedByLastNameUsingListSort()
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

  var book3 = new Book
  {
    Author = new Author
    {
      LastName = "Weinberg",
      FirstName = "Steven",
    },
    Title = "Cosmology",
  };

  var books = new List<Book>
  {
    book2,
    book3,
    book1,
  };

  var bookshelf = new Bookshelf();

  books = bookshelf.ListSort(books);

  Assert.That(books.First(), Is.EqualTo(book1));
  Assert.That(books.Last(), Is.EqualTo(book3));
}
```

{{< color "red" >}}
1 test failed Expected: Weinberg, Steven. Cosmology 
But was: Watt, Andrew. Beginning Regular Expressions
{{< /color >}}

Good, all the possible constant values fail testing. Let's make it green by updating the CompareTo.

BookSorting/Book.cs
```csharp
public int CompareTo(object obj)
{
  // By convention put the nulls at the beginning of the sort order.
  if (obj == null)
  {
    return 1;
  }

  var comparedBook = obj as Book;

  if (comparedBook == null)
  {
    throw new ArgumentException("Could not sort the object because it is not a book.");
  }

  if (Author == null
    || (Author.LastName.Equals(comparedBook.Author.LastName, StringComparison.OrdinalIgnoreCase)
    && Author.FirstName.Equals(comparedBook.Author.FirstName, StringComparison.OrdinalIgnoreCase)))
  {
    return string.Compare(Title, comparedBook.Title, StringComparison.OrdinalIgnoreCase);
  }

  if (Author.LastName.Equals(comparedBook.Author.LastName, StringComparison.OrdinalIgnoreCase))
  {
    return string.Compare(
      Author.FirstName, comparedBook.Author.FirstName, StringComparison.OrdinalIgnoreCase);
  }

  return string.Compare(Author.LastName, 
    comparedBook.Author.LastName, 
    StringComparison.OrdinalIgnoreCase);
}
```

{{< color "green" >}}1 test passed.{{< /color >}}

We could write more tests:

* BooksWithNoAuthor_SortByTitle
* NullBooks_ArePlacedFirst
* Authors_SortedByLastName
* AuthorsSameLastName_SortedByLastAndFirstName
* AuthorsSameNamDifferentTitle_SortedByTitle

These tests would exercise the CompareTo method.

Now that we know how to compare books let's try some other sorting algorithms.

[Next &raquo;](/sortingkata/bubblesort)

{{< activemenu "web" >}}

{{< datatable >}}