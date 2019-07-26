import React from "react";
import Layout from '../components/layout';
import Head from "../components/head"
import numericInputModule from './numericInputModule'

const NumericPage = () => {
const addTestResultRow = function(id, input, description) {
    const tablebody = document.getElementById('testingresult')
    let row = tablebody.insertRow()
    row.insertCell(0).appendChild(document.createTextNode(id))
    row.insertCell(1).appendChild(document.createTextNode(input))
    row.insertCell(2).appendChild(document.createTextNode(description))
}

const removeTestResultRows = function() {
    const tablebody = document.getElementById('testingresult')
    let j
    let rowTotal = tablebody.rows.length;
    for(j = 0; j < rowTotal; j++) {
        tablebody.deleteRow(0);
    }
}

const setMessage = function(msg) {
    const message = document.getElementById('message')
    if(msg) {
        message.classList.add('alert')
        message.classList.add('alert-success')
        message.innerHTML = msg
    } else {
        message.classList.remove('alert')
        message.classList.remove('alert-success')
        message.innerHTML = ''
    }
}

const test = function() {
    let numericInput = document.getElementById('number').value
    let result = numericInputModule.numericInputTest(numericInput)
    numericInput = encodeURI(numericInput)
    addTestResultRow(result.Id, encodeURI(numericInput), result.Description)
    setMessage('Added test ID ' + result.Id + ' for input ' + numericInput + '. ' + result.Description)  
}

return (
    <Layout activemenu="testing">
        <Head title="Testing Numeric Input" 
            description="An exercise is testing numeric input" />
        <div>
            <h1>Testing Numeric Input</h1>
            <p>
                By: Dan Stewart<br />
                July 19, 2014<br />
                <a href="https://mit-license.org">MIT License</a>
            </p><p>
                Testing numeric input was inspired 
                by <a href="https://www.amazon.com/Lessons-Learned-Software-Testing-Context-Driven/dp/0471081124">Lessons Learned 
                in Software Testing: A Context Driven Approach</a> by Cem Kaner, James Bach, and Bret Pettichord.
            </p><p>
                Here is a numeric field. Go ahead and test it for input validation. You do not need to test the &quot;-ilities&quot; such 
                as reliability, or usability.
            </p>
            <h1>I&apos;m thinking of a number between 1 and 100</h1>
            <p>
                <input type="text" id="number" maxLength="14" onKeyPress={event => {
                    if(event && event.key == 'Enter') {
                        test()
                    }}} /> 
                <input type="button" value="Test It" id="testButton" onClick={test} />
            </p><p>
                <input type="button" value="Show All Tests" id="moreTestsButton" onClick={() => {
                        removeTestResultRows()
                        setMessage('')
                        let i
                        for(i = 0; i < numericInputModule.numericInputTestResults.length; i++) {
                            addTestResultRow(numericInputModule.numericInputTestResults[i].Id, 
                                numericInputModule.numericInputTestResults[i].Input,
                                numericInputModule.numericInputTestResults[i].Description)
                        }
                    }
                }
                />
            </p><p>
                <input type="button" value="Reset" id="resetButton" onClick={() => {
                    removeTestResultRows()
                    setMessage('')
                }} />
            </p>
            <div id="message" role="alert"></div>
            <h1>Test result</h1>
            <table id="testresult" className="table">
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