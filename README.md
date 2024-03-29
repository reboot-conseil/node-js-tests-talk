# NodeJS tests talk

- [NodeJS tests talk](#nodejs-tests-talk)
  - [What is this ?](#what-is-this-)
  - [Prerequisites](#prerequisites)
  - [Tests scenarii](#tests-scenarii)
    - [`scenario-0`: I am not using automated tests](#scenario-0-i-am-not-using-automated-tests)
    - [`scenario-1`: I automate unit tests](#scenario-1-i-automate-unit-tests)
    - [`scenario-2`: I put my tests in a CI pipeline](#scenario-2-i-put-my-tests-in-a-ci-pipeline)
    - [`scenario-3`: the `arrange act assert` pattern](#scenario-3-the-arrange-act-assert-pattern)
    - [`scenario-4`: introducing state and errors checking in automated tests](#scenario-4-introducing-state-and-errors-checking-in-automated-tests)
    - [`scenario-5`: testing the endpoints of an API](#scenario-5-testing-the-endpoints-of-an-api)
    - [`scenario-6`: automated tests and I/O: uploads and fixtures](#scenario-6-automated-tests-and-io-uploads-and-fixtures)
    - [`scenario-7`: test theories](#scenario-7-test-theories)
    - [`scenario-8`: our first integration test against a database](#scenario-8-our-first-integration-test-against-a-database)
    - [`scenario-9`: spies and mocks](#scenario-9-spies-and-mocks)
    - [`scenario-X`: the Future =\> testing an NLP interface using AI](#scenario-x-the-future--testing-an-nlp-interface-using-ai)
    - [wrapping it up](#wrapping-it-up)
  - [Contribution guidelines](#contribution-guidelines)
  - [Contributors](#contributors)


## What is this ?

This repo contains a few scenarii in NodeJS to help you get started with testing your NodeJS applications.

All the scenarii are located in the `scenarii` folder, and are organized into `scenario-<number>` subfolders.

So let's enjoy this testing bonanza !

<!-- ! even the most elaborate test is just a demo, don't push the code as is in production -->

## Prerequisites

- NodeJS >=18.x.x
- a standard Docker Desktop installation

## Tests scenarii

### `scenario-0`: I am not using automated tests

This process is slow and error-prone because manually checking the output to see if the tests passed or not is a hazard.

### `scenario-1`: I automate unit tests

After you have installed a few dependencies and set up some conf. and your `package.json` scripts, the first quick wins here are:

- faster to iterate
- well formatted output

### `scenario-2`: I put my tests in a CI pipeline

Since automated tests return a non-zero exit code when they fail, you can use this to your advantage and put them in a CI pipeline. That way, you dramatically increase the confidence that you are not shipping unexpected behavior.

Also, you can be sure that:

- you build the application before testing it
- you are testing frozen dependencies, which is not the case when you run the tests locally.

### `scenario-3`: the `arrange act assert` pattern

In this scenario, we take a dive into the `arrange act assert` pattern, which is a way to structure your tests so that they are easy to read and maintain.

This pattern helps you build various tests scenarii for your application, and it is a good way to start thinking about the behavior of your application.

### `scenario-4`: introducing state and errors checking in automated tests

Sometimes, you want to test a function that depends on some state, and you want to test that function with different states. We also want to do that by keeping a consistent state. In this scenario, we will see how to do that.

Also, depending on what is the expected state of the program, you may want to throw some errors. We will see how to test that.

### `scenario-5`: testing the endpoints of an API

An integration test is a type of software testing that checks if different modules of an application work together as expected. It verifies that the components of the system can communicate and exchange data correctly.

It is unlikely that you wil only write pure functions in your application. You will probably also write some endpoints for a web API at some point, and you will want to test them.

We will use a lib called `supertest` to do that. This lib is a high-level abstraction of an HTTP client. This is why we can say that such tests are integration tests: they test the interaction between the client and the server under given conditions.

### `scenario-6`: automated tests and I/O: uploads and fixtures

In this scenario, we'll get acquainted with the concept of fixtures, which are files that are used as inputs for our tests. Also, we will see how to upload files to our API in our automated tests.

### `scenario-7`: test theories

Sometimes, writing more or less the same tests, but with different inputs, can be very tedious and repetitive, even with AI assisted tools. This is where test theories come into play.

In this scenario, we will see how to test theories, which are a way to test a function with different inputs and expected outputs.

### `scenario-8`: our first integration test against a database

In this scenario, we are adding to our previous tests a test that will check that our application is able to connect to a database and perform some operations on it.

We will use the scenario of a db service that runs migrations. We will test that the migrations are run correctly.

Containers have made that sooo much easier, so we will use a docker container to run our database. This allows to set up more complex scenarii, such as: "what happens when we lose the connection to the database ?"

We will also allow this to run in a CI.

### `scenario-9`: spies and mocks

In this scenario, we will see examples of how to use spies and mocks in automated tests.

### `scenario-X`: the Future => testing an NLP interface using AI

In this scenario, we will see how to test an NLP interface. It's sooooooooooooo 2023 and beyond !

In the meantime, we will see an actual functional test into play.

### wrapping it up

We did not practice TDD during this workshop because the main point here was to show you a few ways of solving common problems when writing automated tests in NodeJS. However I encourage you to always follow the `red green refactor` cycle when writing your applications.

You will spend more time building meaningful specs, you will be confident in your code, and you will ship less bugs in the long run!

Remember: _writing tests is actually writing code_.

## Contribution guidelines

Dear past, present, and future contributors, you have my many thanks, but please follow these guidelines:

- please use comments to explain your code, even if it's obvious to you, it might not be to someone else
- you are free to arrange the code, the folder structure, the file names, etc. as you see fit if you're able to provide a good reason for it

That's all, thank you for your time !

## Contributors

A big thanks goes to the contributors of this project:

<table>
<tbody>
    <tr>
        <td align="center"><a href="https://github.com/yactouat"><img src="https://avatars.githubusercontent.com/u/37403808?v=4" width="100px;" alt="yactouat"/><br /><sub><b>Yactouat</b></sub></a><br /><a href="https://github.com/yactouat"></td>
    </tr>
</tbody>
</table>
