---
title: "Sorting Kata - Merge Sort"
description: "Sorting using Merge Sort in C#"
date: 2013-09-20T00:00:00-00:00
lastmod: 2018-03-03T00:00:00-00:00
layout: "index"
---

{{<breadcrumb "[Kata](/kata/)" "[Sorting](/sortingkata/)" "Merge Sort">}}

# Sorting Kata - Merge Sort

By: Dan Stewart\
March 3, 2018\
[MIT License](https://mit-license.org)

In the [setup](/sortingkata/) we created a solution with two projects. The purpose of these two projects was for a Sorting Kata. 

In [Linq OrderBy](/sortingkata/linqorderby/) we added a Bookshelf class to hold our sorting methods. 

In [List Sort](/sortingkata/listsort/) we used the built-in sort method of a list. This required us to implement IComparable in the Book class. 

In [Bubble Sort](/sortingkata/bubblesort/) we overloaded the &lt; and &gt; operators so that books could be sorted through a simple sort. 

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
        || (Author.LastName.Equals(comparedBook.Author.LastName, 
        StringComparison.OrdinalIgnoreCase)

        && Author.FirstName.Equals(comparedBook.Author.FirstName, 
        StringComparison.OrdinalIgnoreCase)))
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

Now we are going to write our own Merge Sort method. 

We write a failing test first.

BookSorting.Test/SortingTest.cs

```csharp
[Test]
public void Authors_SortedByLastNameMergeSort()
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

  books = bookshelf. MergeSort(books);

  Assert.That(books.First(), Is.EqualTo(book1));
  Assert.That(books.Last(), Is.EqualTo(book3));
}
```

Add the MergeSort method to the Bookshelf class that accepts the list of books and returns it.

BookSorting/Bookshelf.cs

```csharp
public List<Book> MergeSort(List<Book> books)
{
  return books;
}
```

{{< color "red" >}}
1 test failed Expected: &lt;Partnoy, Frank. Wait: The Art and Science of Delay&gt; 
But was: &lt;Watt, Andrew. Beginning Regular Expressions&gt;
{{< /color >}} 

In [Linq OrderBy](/sortingkata/linqorderby/) we overrode the Book.ToString() to get the author and title. 

We saw a failing test (Red), and we made sure the message was helpful. Now we can make it green. 

This is a big one. So far our sorts have dealt with taking a single book off the shelf and bubbling it up to the top, inserting it, 
or selecting it for placement. Up until now it would be (with a little practice) easy to understand what each algorithm is doing. 

With merge sort I really had to do some investigation. I read other websites, and I even watched a great 
[YouTube](https://www.youtube.com/watch?v=XaqR3G_NVoo) video on it. I finally understand what it is doing. 

Another difficult thing we encounter is recursion.

BookSorting/Bookshelf.cs

```csharp
public List<Book> MergeSort(List<Book> books)
{
  var bookCount = books.Count;

  if ( bookCount < 2 )
  {
    return books;
  }

  var middle = bookCount / 2;

  var firstHalf = books.GetRange( 0, middle);
  var secondHalf = books.GetRange( middle, bookCount - middle );

  firstHalf = MergeSort( firstHalf );
  secondHalf = MergeSort( secondHalf );

  var firstHalfIndex = 0;
  var secondHalfIndex = 0;
  var finalIndex = 0;

  while ( firstHalfIndex < middle 
    && secondHalfIndex < bookCount - middle )
  {
    if ( firstHalf[firstHalfIndex] > 
      secondHalf[secondHalfIndex] )
    {
      books[finalIndex] = firstHalf[firstHalfIndex];
      finalIndex++;
      firstHalfIndex++;
    }
    else
    {
      books[finalIndex] = secondHalf[secondHalfIndex];
      finalIndex++;
      secondHalfIndex++;
    }
  }

  while ( firstHalfIndex < middle )
  {
    books[finalIndex] = firstHalf[firstHalfIndex];
    finalIndex++;
    firstHalfIndex++;
  }

  while ( secondHalfIndex < bookCount - middle )
  {
    books[finalIndex] = secondHalf[secondHalfIndex];
    finalIndex++;
    secondHalfIndex++;
  }

  return books;
}
```

## Variables

We used a lot of variables in this algorithm. 

We stored the count of books in the bookCount variable. Each time we recursively call the method, the count gets smaller. 
Once it reaches less than two, we return. This if statement keeps from infinitely looping. 

Next, we split the books into two piles. The index of the middle is stored in a variable. We will use this to divide the 
piles of books and go through each pile.

We have a firstHalf and a secondHalf of books. Each gets merge sorted until we are comparing only one book. Eventually, 
the reoccurrence stops and we continue below the recursion to actually compare books.

We initialize three index variables:

1. firstHalfIndex keeps track of where we are in the first half of the books.
1. secondHalfIndex keeps track of where we are in the second half of the books.
1. finalIndex keeps us moving through each book in both stacks.

## First Loop 

In the first loop we look at every book from both piles and compare them to each other. If the first book from the first 
pile should come before the first book in the second pile, we place the first pile book into our final, sorted list. We 
increment the first and final indexes so that we keep moving through the pile. 

If the first book from the first pile should come after the first book in the second pile, we place the second pile book 
into our final, sorted list. We increment the second and final indexes so that we keep moving through the pile. 

## Additional Loops

At the end of the first loop we might have some books left over in either the first or second pile. We put these left over 
books on the end of the final, sorted book list. Finally, we return the sorted list.

When we run the test we see: 

{{< color "green" >}}1 test passing{{< /color >}} 

{{< activemenu "web" >}}

{{< datatable >}}