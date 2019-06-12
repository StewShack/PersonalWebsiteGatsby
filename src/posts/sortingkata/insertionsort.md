---
title: "Sorting Kata - Insertion Sort"
description: "Sorting using Insertion Sort in C#"
date: 2013-08-29T00:00:00-00:00
lastmod: 2018-03-02T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "[Sorting](/sortingkata/)" "Insertion Sort">}}

# Sorting Kata - Insertion Sort

By: Dan Stewart\
March 2, 2018\
[MIT License](https://mit-license.org)

In the [setup](/sortingkata/) we created a solution with two projects. The purpose of these two projects was for a Sorting Kata. 

In [Linq OrderBy](/sortingkata/linqorderby/) we added a Bookshelf class to hold our sorting methods. 

In [List Sort](/sortingkata/listsort/) we used the built-in sort method of a list. This required us to implement IComparable in the Book class. 

In [Bubble Sort](/sortingkata/bubblesort) we overloaded the &lt; and &gt; operators so that books could be sorted through a simple sort. 

Here is our Book class. 

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

      return string.Compare(Author.LastName, comparedBook.Author.LastName, StringComparison.OrdinalIgnoreCase);
    }

    public static bool operator >(Book book, Book comparedBook)
    {
      return comparedBook.CompareTo(book) > 0;
    }

    public static bool operator <(Book book, Book comparedBook)
    {
      return comparedBook.CompareTo(book) < 0;
    }
  }
}
```

Now we are going to write our own Insertion Sort method. 

We write a failing test first.

BookSorting.Test/SortingTest.cs

```csharp
[Test]
public void Authors_SortedByLastNameInsertionSort()
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

  books = bookshelf.InsertionSort(books);

  Assert.That(books.First(), Is.EqualTo(book1));
  Assert.That(books.Last(), Is.EqualTo(book3));
}
```

Add the InsertionSort method that accepts the list of books and returns it.

BookSorting/Bookshelf.cs

```csharp
public List<Book> InsertionSort(List<Book> books)
{
  return books;
}
```

{{< color "red" >}}
1 test failed Expected: &lt;Partnoy, Frank. Wait: The Art and Science of Delay&gt; But was:
&lt;Watt, Andrew. Beginning Regular Expressions&gt; 
{{< /color >}}

In [Linq OrderBy](/sortingkata/linqorderby/) we overrode the Book.ToString() to get the author and title. 

We saw a failing test (Red), and we made sure the message was helpful. Now we can make it green. 

BookSorting/Bookshelf.cs

```csharp
public List<Book> InsertionSort(List<Book> books)
{
  for (var bookIndex = 1; bookIndex < books.Count; bookIndex++)
  {
    for (var allBooksIndex = bookIndex;
      allBooksIndex > 0 
      && books[allBooksIndex] > books[allBooksIndex - 1];
      allBooksIndex--)
    {
      var swapBook = books[allBooksIndex];
      books[allBooksIndex] = books[allBooksIndex - 1];
      books[allBooksIndex - 1] = swapBook;
    }
  }

  return books;
}
```

## Outer Loop 

The first book's index is zero. We will be comparing a book to the book that precedes it. So we initialize the "bookIndex" variable 
to be 1 so that we can compare the second book on the shelf to the first book. We keep looping through the books as long as bookIndex 
is less than the number of books. We add 1 to bookIndex to keep moving through the list. 

## Inner Loop 

Our inner loop starts with the book that is defined in the outer loop. If you are looking at the bookshelf. You would grab the second 
book and compare it to the first book. If the book you are holding precedes the book that is next to it, swap them.
We swap books by taking the book off the shelf and putting it in a "swapBook" variable. Then we take the book that is next to it and insert 
that book in the swapped book's spot. Then we insert the book into that empty slot. 

When we run the test we see: 

{{< color "green" >}}1 test passing{{< /color >}}

[Next &raquo;](/sortingkata/selectionsort)

{{< activemenu "web" >}}