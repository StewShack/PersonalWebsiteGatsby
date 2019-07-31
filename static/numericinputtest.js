class NumericInputTest {
  constructor() {
    this.numericInputTestResults = [
      {
        Id: '0',
        Input: 'valid input',
        Description: 'Does it even work given a valid input? I think this is the first test that needs to be performed. If the happy path does not work, what\'s the point of further testing?',
      },
      {
        Id: '1',
        Input: 'no input',
        Description: 'The nothing or empty test covers if the field is required. If a blank field is saved to the database, was it saved as NULL or an empty string?',
      },
      {
        Id: '2',
        Input: 'input with spaces',
        Description: 'Testing with spaces. If a field with spaces is saved to the database, was it trimmed and saved as NULL, empty string, or were the spaces stored in the database. This is a real problem with leading and trailing spaces. Saving a trailing space in a password could make it hard to input the next time. Instead of entering the password \'beer\' you would have to enter \'beer \'. ',
      },
      {
        Id: '3',
        Input: 'input that is not a number',
        Description: 'The field should validate that a number is entered.',
      },
      {
        Id: '4',
        Input: 'zeros',
        Description: 'Leading zeros should be ignored.',
      },
      {
        Id: '5',
        Input: 'lower bound minus 1',
        Description: 'Lower bound -1 checks to make sure that we start at the lower bound and handle invalid input. This is a great way to check for an off-by-one error.',
      },
      {
        Id: '6',
        Input: 'lower bound',
        Description: 'Lower bound checks to make sure that we start at the lowest number. This is a great way to check for an off-by-one error.',
      },
      {
        Id: '7',
        Input: 'upper bound',
        Description: 'Upper bound checks to make sure that we end with the largest number. This is a great way to check for an off-by-one error.',
      },
      {
        Id: '8',
        Input: 'upper bound plus one',
        Description: 'Upper bound plus one adds one to the largest possible number. How does the program handle invalid input. This is a great way to check for an off-by-one error.',
      },
      {
        Id: '9',
        Input: 'wrong data type',
        Description: 'Wrong data type attempts to exceed the limits of a data type. What happens when you put a decimal? What about a really large number or a really small number? The largest possible number in JavaScript is 1.7976931348623157e+308. The smallest is 5e-324.',
      },
      {
        Id: '10',
        Input: 'less than 0',
        Description: 'Less than the lower bound minus one. The smallest number in JavaScript is 5e-324.',
      },
      {
        Id: '11',
        Input: 'more than 101',
        Description: 'More than the upper bound plus one. The largest possible number in JavaScript is 1.7976931348623157e+308.',
      },
      {
        Id: '12',
        Input: 'XSS attack',
        Description: 'You entered a < which makes me think this is a cross-site scripting attack. Cool! Whenever you see your input being displayed on a screen, attempt to input HTML. Does it displayed encoded or as HTML?',
      },
      {
        Id: '13',
        Input: 'SQL injection attack',
        Description: 'You entered a dash dash (--) which makes me think this is a SQL injection attack. Cool! Whenever your input is being saved to a database, try \' OR 1 = 1 -- just to see what happens. This is especially great on a username field.',
      },
    ];
  }

  inputNotNumber(value) {
    if (value.search(/</) >= 0) {
      const resultXssAttack = this.numericInputTestResults[12];
      resultXssAttack.Input = value;
      return resultXssAttack;
    }

    if (value.search(/--/gm) >= 0) {
      const resultSqlInjection = this.numericInputTestResults[13];
      resultSqlInjection.Input = value;
      return resultSqlInjection;
    }

    const resultNan = this.numericInputTestResults[3];
    resultNan.Input = value;
    return resultNan;
  }

  truncateInput(value) {
    let returnValue = value;
    const maxInputLength = 14;
    if (value.length > maxInputLength) {
      returnValue = `${value.substring(0, maxInputLength)}&hellip;`;
    }
    return returnValue;
  }

  testInput(value) {
    const lowerBound = 1;
    const upperBound = 100;

    if (value === '') {
      return this.numericInputTestResults[1];
    }

    if (value.search(/^[\s]?$/gm) >= 0) {
      return this.numericInputTestResults[2];
    }

    if (value.search(/^[\s][0-9]*$/gm) >= 0) {
      return this.numericInputTestResults[2];
    }

    if (value.search(/^[0-9]*[\s]$/gm) >= 0) {
      return this.numericInputTestResults[2];
    }

    if (isNaN(value)) {
      value = this.truncateInput(value);
      return this.inputNotNumber(value);
    }

    if (value.search(/^0[0-9]/gm) >= 0) {
      const result = this.numericInputTestResults[4];
      result.Input = value;
      return result;
    }

    if (value.search(/^0$/gm) >= 0) {
      const result = this.numericInputTestResults[5];
      result.Input = value;
      return result;
    }

    if (value.search(/^1$/gm) >= 0) {
      const result = this.numericInputTestResults[6];
      result.Input = value;
      return result;
    }

    if (value.search(/^100$/gm) >= 0) {
      const result = this.numericInputTestResults[7];
      result.Input = value;
      return result;
    }

    if (value.search(/^101$/gm) >= 0) {
      const result = this.numericInputTestResults[8];
      result.Input = value;
      return result;
    }

    if (!isFinite(value) || value.search(/\./gm) >= 0 || (value > 0 && value < lowerBound)) {
      const result = this.numericInputTestResults[9];
      result.Input = value;
      return result;
    }

    if (value < 0 || value < Number.MIN_VALUE) {
      const result = this.numericInputTestResults[10];
      result.Input = value;
      return result;
    }

    if (value > 101 || value > Number.MAX_VALUE) {
      const result = this.numericInputTestResults[11];
      result.Input = value;
      return result;
    }

    if (value > 1 && value < upperBound) {
      const result = this.numericInputTestResults[0];
      result.Input = value;
      return result;
    }

    const returnValue = {
      Id: '??',
      Input: value,
      Description: 'Congratulations, I did not expect that input.',
    };

    return returnValue;
  }
}

module.exports = NumericInputTest;
