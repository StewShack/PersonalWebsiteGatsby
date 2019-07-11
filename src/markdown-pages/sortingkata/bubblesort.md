---
title: "Sorting Kata - Bubble Sort"
description: "Sorting using Bubble Sort in C#"
date: 2013-08-21T00:00:00-00:00
lastmod: 2018-03-02T00:00:00-00:00
activemenu: "web"
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/post/sortingkata">Sorting</a></li>
    <li class="breadcrumb-item">Bubble Sort</li>
  </ol>
</nav>

# Sorting Kata - Bubble Sort

By: Dan Stewart\
March 2, 2018\
[MIT License](https://mit-license.org)

In the [setup](/post/sortingkata) we created a solution with two projects. The purpose of these two projects was for a Sorting Kata. 

In [Linq OrderBy](/post/linqorderby) we added a Bookshelf class to hold our sorting methods. 

In [List Sort](/post/listsort) we used the built-in sort method of a list. This required us to implement IComparable in the Book class. 

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
  }
}
```

Now we are going to write our own Bubble Sort method. 

We write a failing test first.

BookSorting.Test/SortingTest.cs

```csharp
[Test]
public void Authors_SortedByLastNameBubbleSort()
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

  books = bookshelf. BubbleSort(books);

  Assert.That(books.First(), Is.EqualTo(book1));
  Assert.That(books.Last(), Is.EqualTo(book3));
}
```

Add the BubbleSort method that accepts the list of books and returns it.

BookSorting/Bookshelf.cs

```csharp
public List<Book> BubbleSort(List<Book> books)
{
  return books;
}
```

<div class="alert alert-danger" role="alert">
1 test failed Expected: Partnoy, Frank. Wait: The Art and Science of Delay But was:
Watt, Andrew. Beginning Regular Expressions 
</div>

In [Linq OrderBy](/post/linqorderby) we overrode the Book.ToString() to get the author and title. 

We saw a failing test (Red), and we made sure the message was helpful. Now we can make it green. 

BookSorting/Bookshelf.cs
```csharp
public List<Book> BubbleSort(List<Book> books)
{
  var keepSwapping = true;
  var bookCount = books.Count - 1;

  for (var bookIndex = 0;
    bookIndex <= bookCount && keepSwapping;
    bookIndex++)
  {
    keepSwapping = false;
    for (var allBooksIndex = bookCount;
      allBooksIndex >= bookIndex + 1;
      allBooksIndex--)
    {
      var previousBookIndex = allBooksIndex - 1;

      if (books[allBooksIndex] > books[previousBookIndex])
      {
        var swapBook = books[allBooksIndex];
        books[allBooksIndex] = books[previousBookIndex];
        books[previousBookIndex] = swapBook;
        keepSwapping = true;
      }
    }
  }

  return books;
}
```

Let me explain this code.

* "keepSwapping" is a Boolean that is initially set to true. It tells us if we had to swap any books. Inside the loop we set it to 
false and only set it back to true if we performed a swap. If we loop through all of the books and never perform a swap, we can stop. 
We simply exit out and stop trying to sort an already sorted list. 
* "swapBook" is a Book that we are going to swap. You can imagine it as the book that you are holding in your hand as you are rearranging 
the bookshelf. 
* "bookCount" is the number of books on the shelf. We get this from the count property of the list. We have to subtract one because our 
list is zero based. If we have three books on the shelf our count is three but we want the index to stop at 2. Our books are numbered 0, 1, 2. 

## Outer Loop

Now we begin the outer loop for each book. The first book's index is 0. So we initialize the "bookIndex" variable to be 0. We keep looping 
through the books as long as bookIndex is less than or equal to bookCount and we performed a swap at some point. Then we add 1 to bookIndex 
to keep moving through the list. 

The first thing we do inside the outer loop is set "keepSwapping" variable to false. It's up to the inner loop to change it back to true. 

## Inner Loop

Our inner loop starts with the last book on the shelf. It keeps looping to the last book we sorted. If you are looking at the book shelf. 
You would grab the last book and compare it to the book that sits next to it. If the book you are holding is greater than the book that 
is next to it, swap them. The &gt; symbol in this case should read as "precedes". If the book you are holding precedes the book next to
it, swap them. 

We swap books by taking the book off the shelf and putting it in a "swapBook" variable. Then we take the book that is next to it and put 
that book in the swapped book's spot. Then we put the book into that empty slot. 

Finally, we set the keepSwapping Boolean back to true to let the outer loop know that it needs to keep going. 

## Not Compiling

That was a wonderful explanation of code that does not compile. 

Why won't our code compile? The error message reads: 

Operator '&gt;' cannot be applied to operands of type 'BookSorting.Book' and ' BookSorting.Book'

Overloading the operators is really simple because we know how to compare two books. Just add these two methods to the Book class. 

BookSorting/Book.cs
```csharp
public static bool operator >(Book book, Book comparedBook)
{
  return comparedBook.CompareTo(book) > 0;
}

public static bool operator <(Book book, Book comparedBook)
{
  return comparedBook.CompareTo(book) < 0;
}
```

The program will not compile unless you implement both the greater than and the less than operators at the same time. 

I had to get out a piece of paper to understand the order of the parameters and the direction of the greater than and less than symbol. 

When we use the &gt; operator we have two books. It's Partnoy vs. Watt. Partnoy precedes Watt. If we look at the documentation of the 
[CompareTo](https://msdn.microsoft.com/en-us/library/system.icomparable.compareto.aspx) method we read: 

| Value | Meaning |
|-------|---------|
| Less than zero | This instance precedes obj in the sort order. |
| Zero | This instance occurs in the same position in the sort order as obj. |
| Greater than zero | This instance follows obj in the sort order. |

If we compare Partnoy to Watt we get back less than 1 because Partnoy precedes Watt. That means Partnoy &gt; Watt. A negative number means 
the book comes before the other book.

If we compare Watt to Partnoy we get back more than 1 because Watt follows Partnoy. That means Watt &lt; Partnoy. A positive number means 
the book comes after the other book.        
 
## Conclusion

When we run the test we see: 

<div class="alert alert-success" role="alert">1 test passing</div>

To get Bubble Sort working we had to teach the Book class when it was greater or less than another book. 

Then we run an outer loop for every book. The inner loop compares the last book to the book just before it. 

Our book then "bubbles up" the bookshelf to be placed in order.  

I recommend setting a breakpoint and watching the list of books change order.

[Next &raquo;](/post/insertionsort)