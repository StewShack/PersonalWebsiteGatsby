---
title: "Numeric Input"
description: "An exercise is testing numeric input"
date: 2014-07-19T00:00:00-00:00
lastmod: 2014-07-19T00:00:00-00:00
layout: "index"
---

# Testing Numeric Input

By: Dan Stewart\
July 19, 2014\
[MIT License](https://mit-license.org)

Testing numeric input was inspired by 
[Lessons Learned in Software Testing: A Context Driven Approach](https://www.amazon.com/Lessons-Learned-Software-Testing-Context-Driven/dp/0471081124) 
by Cem Kaner, James Bach, and Bret Pettichord.

Here is a numeric field. Go ahead and test it for input validation. You do not need to test the "-ilities" such as reliability, or usability.

## I'm thinking of a number between 1 and 100

<input type="text" id="number" maxlength="14"> <input type="button" value="Test It" id="testButton">
<input type="button" value="Show Additional Tests" id="moreTestsButton">
<input type="button" value="Reset" id="resetButton">

<div id="message" role="alert"></div>

## Test result

<table id="testresult">
<thead>
<tr>
<th>Test ID</th>
<th>Input</th>
<th>result</th>
</tr>
</thead>
<tbody id="testingresult">
</tbody>
</table>

<script src="/js/numericinput.js"></script>
<script type="text/javascript">
(function($) {
  var table = $('#testresult').DataTable({
                paging: false,
                searching: false
            });

  $('#number').keyup(function(event) {
    if(event && event.key == 'Enter') {
      test();
    }
  });

  $('#testButton').click(function() {
    test();
  });

  $('#resetButton').click(function() {
    table.clear().draw();
    $('#message').html('').removeClass('alert-danger').removeClass('alert-success');
  });

  $('#moreTestsButton').click(function() {
    var moreTestsFound = false;
    var testMessages = '';

    for (var i = 0; i < numericInputTestResults.length; i++) {

      if(table.column(0).data().indexOf(numericInputTestResults[i].Id) < 0) { 

        moreTestsFound = true;

        testMessages += 'Added test ID ' + numericInputTestResults[i].Id 
          + ' with example input ' + numericInputTestResults[i].Input + '.<br>';

        table.row.add([
          numericInputTestResults[i].Id,
          htmlEncode(numericInputTestResults[i].Input),
          numericInputTestResults[i].Description
        ]).draw();
      }
    }

    if(moreTestsFound) {
      $('#message').addClass('alert').removeClass('alert-danger').addClass('alert-success')
      .html(testMessages);
    } 
    else {
      $('#message').addClass('alert').removeClass('alert-danger').addClass('alert-success')
      .html('Added test for ' + result.Input + '.');
    }
  });

  function test() {
    var numericInput = $('#number').val();
    var result = numericInputTest(numericInput);

    if(table.column(0).data().indexOf(result.Id) >= 0 
      && table.column(1).data().indexOf(result.Input) >= 0) { 
      $('#message').addClass('alert').removeClass('alert-success').addClass('alert-danger')
      .html('A test for ' + result.Input + ' has already been performed.');
      return;
    }

    var input = htmlEncode(result.Input);

    table.row.add([
      result.Id,
      input,
      result.Description
    ]).draw();

    $('#message').addClass('alert').removeClass('alert-danger').addClass('alert-success')
      .html('Added test ID ' + result.Id + ' for input ' + input + '.');
  }

  function htmlEncode(value) {
    return $('<div/>').text(value).html();
  }
  })(jQuery)
  </script>
  <script>
  (function($){
  $('#testing').addClass('active');
})(jQuery);
</script>

{{< activemenu "testing" >}}