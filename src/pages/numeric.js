import React from "react";
import Layout from '../components/layout';
import Head from "../components/head"

const NumericPage = () => {
const lowerBound = 1
const upperBound = 100
let result

const numericInputTestResults = [
  {
    'Id': '0',
    'Input': 'valid input',
    'Description': 'Does it even work given a valid input? I think this is the first test that needs to be performed. If the happy path does not work, what\'s the point of further testing?'
  },
  {
    'Id': '1',
    'Input': 'no input',
    'Description': 'The nothing or empty test covers if the field is required. If a blank field is saved to the database, was it saved as NULL or an empty string?'
  },
  {
    'Id': '2',
    'Input': 'input with spaces',
    'Description': 'Testing with spaces. If a field with spaces is saved to the database, was it trimmed and saved as NULL, empty string, or were the spaces stored in the database. This is a real problem with leading and trailing spaces. Saving a trailing space in a password could make it hard to input the next time. Instead of entering the password \'beer\' you would have to enter \'beer \'. '
  },
  {
    'Id': '3',
    'Input': 'input that is not a number',
    'Description': 'The field should validate that a number is entered.'
  },
  {
    'Id': '4',
    'Input': 'zeros',
    'Description': 'Leading zeros should be ignored.'
  },
  {
    'Id': '5',
    'Input': 'lower bound minus 1',
    'Description': 'Lower bound -1 checks to make sure that we start at the lower bound and handle invalid input. This is a great way to check for an off-by-one error.'
  },
  {
    'Id': '6',
    'Input': 'lower bound',
    'Description': 'Lower bound checks to make sure that we start at the lowest number. This is a great way to check for an off-by-one error.'
  },
  {
    'Id': '7',
    'Input': 'upper bound',
    'Description': 'Upper bound checks to make sure that we end with the largest number. This is a great way to check for an off-by-one error.'
  },
  {
    'Id': '8',
    'Input': 'upper bound plus one',
    'Description': 'Upper bound plus one adds one to the largest possible number. How does the program handle invalid input. This is a great way to check for an off-by-one error.'
  },
  {
    'Id': '9',
    'Input': 'wrong data type',
    'Description': 'Wrong data type attempts to exceed the limits of a data type. What happens when you put a decimal? What about a really large number or a really small number? The largest possible number in JavaScript is 1.7976931348623157e+308. The smallest is 5e-324.'
  },
  {
    'Id': '10',
    'Input': 'less than 0',
    'Description': 'Less than the lower bound minus one. The smallest number in JavaScript is 5e-324.'
  },
  {
    'Id': '11',
    'Input': 'more than 101',
    'Description': 'More than the upper bound plus one. The largest possible number in JavaScript is 1.7976931348623157e+308.'
  },
  {
    'Id': '12',
    'Input': 'XSS attack',
    'Description': 'You entered a &lt; which makes me think this is a cross-site scripting attack. Cool! Whenever you see your input being displayed on a screen, attempt to input HTML. Does it displayed encoded or as HTML?'
  },
  {
    'Id': '13',
    'Input': 'SQL injection attack',
    'Description': 'You entered a dash dash (--) which makes me think this is a SQL injection attack. Cool! Whenever your input is being saved to a database, try \' OR 1 = 1 -- just to see what happens. This is especially great on a username field.'
  }
]

const inputNotNumber = function (value) {
  if (value.search(/</) >= 0) {
    let resultXssAttack = numericInputTestResults[12]
    resultXssAttack.Input = value
    return resultXssAttack
  }

  if (value.search(/--/gm) >= 0) {
    let resultSqlInjection = numericInputTestResults[13]
    resultSqlInjection.Input = value
    return resultSqlInjection
  }

  let resultNan = numericInputTestResults[3]
  resultNan.Input = value
  return resultNan
}

const truncateInput = function (value) {
  let maxInputLength = 14
  return value.length > maxInputLength
    ? value.substring(0, maxInputLength) + '&hellip;'
    : value
}

const numericInputTest = function (value) {
  if (value === '') {
    return numericInputTestResults[1]
  }

  if (value.search(/^[\s]?$/gm) >= 0) {
    return numericInputTestResults[2]
  }

  if (value.search(/^[\s][0-9]*$/gm) >= 0) {
    return numericInputTestResults[2]
  }

  if (value.search(/^[0-9]*[\s]$/gm) >= 0) {
    return numericInputTestResults[2]
  }

  if (isNaN(value)) {
    value = truncateInput(value)
    return inputNotNumber(value)
  }

  if (value.search(/^0[0-9]/gm) >= 0) {
    result = numericInputTestResults[4]
    result.Input = value
    return result
  }

  if (value.search(/^0$/gm) >= 0) {
    result = numericInputTestResults[5]
    result.Input = value
    return result
  }

  if (value.search(/^1$/gm) >= 0) {
    result = numericInputTestResults[6]
    result.Input = value
    return result
  }

  if (value.search(/^100$/gm) >= 0) {
    result = numericInputTestResults[7]
    result.Input = value
    return result
  }

  if (value.search(/^101$/gm) >= 0) {
    result = numericInputTestResults[8]
    result.Input = value
    return result
  }

  if (!isFinite(value) || value.search(/\./gm) >= 0 || (value > 0 && value < lowerBound)) {
    result = numericInputTestResults[9]
    result.Input = value
    return result
  }

  if (value < 0 || value < Number.MIN_VALUE) {
    result = numericInputTestResults[10]
    result.Input = value
    return result
  }

  if (value > 101 || value > Number.MAX_VALUE) {
    result = numericInputTestResults[11]
    result.Input = value
    return result
  }

  if (value > 1 && value < upperBound) {
    result = numericInputTestResults[0]
    result.Input = value
    return result
  }

  const returnValue = {
    'Id': '??',
    'Input': value,
    'Description': 'Congratulations, I did not expect that input.'
  }

  return returnValue
}

const test = function() {
    console.log('test');
    let numericInput = document.getElementById('number').value;
    
    let result = numericInputTest(numericInput);
    let table = document.getElementById('testresult');
    let tablebody = document.getElementById('testingresult');
/*
    if(table.column(0).data().indexOf(result.Id) >= 0 
        && table.column(1).data().indexOf(result.Input) >= 0) { 
        document.getElementById('message').classList.add('alert').classList.remove('alert-success').classList.add('alert-danger')
        .innerHTML('A test for ' + result.Input + ' has already been performed.');
        return;
    }
*/
    let row = tablebody.insertRow()
    row.insertCell(0).appendChild(document.createTextNode(result.Id))
    row.insertCell(1).appendChild(document.createTextNode(escape(numericInput)))
    row.insertCell(2).appendChild(document.createTextNode(result.Description))

    let message = document.getElementById('message')
    message.classList.add('alert')
    message.classList.remove('alert-danger')
    message.classList.add('alert-success')
    message.innerHTML = 'Added test ID ' + result.Id + ' for input ' + escape(numericInput) + '.'  
}

return (
    <Layout activemenu="testing">
        <Head title="Testing Numeric Input" 
            description="An exercise is testing numeric input" />
        <div>
            <p>
                By: Dan Stewart<br />
                July 19, 2014<br />
                <a href="https://mit-license.org">MIT License</a>
            </p><p>
                Testing numeric input was inspired by 
                <a hrf="https://www.amazon.com/Lessons-Learned-Software-Testing-Context-Driven/dp/0471081124">Lessons Learned 
                in Software Testing: A Context Driven Approach</a> by Cem Kaner, James Bach, and Bret Pettichord.
            </p><p>
                Here is a numeric field. Go ahead and test it for input validation. You do not need to test the "-ilities" such 
                as reliability, or usability.
            </p>
            <h1>I'm thinking of a number between 1 and 100</h1>
            <p>
                <input type="text" id="number" maxLength="14" onKeyPress={event => {
                    if(event && event.key == 'Enter') {
                        test();
                    }}} /> 
                <input type="button" value="Test It" id="testButton" onClick={test} />
            </p><p>
                <input type="button" value="Show Additional Tests" id="moreTestsButton" onClick={() => {
                    /*var moreTestsFound = false;
                    var testMessages = '';

                    for (var i = 0; i < numericInputTestResults.length; i++) {

                      if(table.column(0).data().indexOf(numericInputTestResults[i].Id) < 0) { 

                        moreTestsFound = true;

                        testMessages += 'Added test ID ' + numericInputTestResults[i].Id 
                          + ' with example input ' + numericInputTestResults[i].Input + '.<br>';

                        table.row.add([
                          numericInputTestResults[i].Id,
                          numericInputTestResults[i].Input,
                          numericInputTestResults[i].Description
                        ]).draw();
                      }
                    }

                    if(moreTestsFound) {
                      document.getElementById('message').classList.add('alert').classList.remove('alert-danger').classList.add('alert-success')
                      .innerHTML(testMessages);
                    } 
                    else {
                      document.getElementById('message').classList.add('alert').classList.remove('alert-danger').classList.add('alert-success')
                      .innerHTML('Added test for ' + result.Input + '.');
                    }*/
                    console.log('additional tests')
                }} />
            </p><p>
                <input type="button" value="Reset" id="resetButton" onClick={() => {
                    //table.clear().draw();
                    //document.getElementById('message').innerHTML('').classList.remove('alert-danger').classList.remove('alert-success');
                    console.log('reset');
                }} />
            </p>
            <div id="message" role="alert"></div>
            <h1>Test result</h1>
            <table id="testresult">
                <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Input</th>
                        <th>result</th>
                    </tr>
                </thead>
                <tbody id="testingresult"></tbody>
            </table>
        </div>
    </Layout>
    )
}

export default NumericPage; 