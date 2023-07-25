# NodeJS tests talk

- [NodeJS tests talk](#nodejs-tests-talk)
  - [What is this ?](#what-is-this-)
  - [Tests scenarii](#tests-scenarii)
    - [`scenario-0`: I am not using automated tests](#scenario-0-i-am-not-using-automated-tests)
    - [`scenario-1`: I automate unit tests](#scenario-1-i-automate-unit-tests)
    - [`scenario-2`: I put my tests in a CI pipeline](#scenario-2-i-put-my-tests-in-a-ci-pipeline)
  - [Prerequisites (assuming you're on Ubuntu)](#prerequisites-assuming-youre-on-ubuntu)
  - [Contribution guidelines](#contribution-guidelines)
  - [Contributors](#contributors)


## What is this ?

This repo contains a few scenarii in NodeJS to help you get started with testing your NodeJS applications.

All the scenarii are located in the `scenarii` folder, and are organized into `scenario-<number>` subfolders.

## Tests scenarii

### `scenario-0`: I am not using automated tests

This process is slow and error-prone because manually checking the output to see if the tests passed or not is a hazard.

### `scenario-1`: I automate unit tests

After you have installed a few dependencies and set up some conf. and your `package.json` scripts, the first quick wins here are:

- faster to iterate
- well formatted output

### `scenario-2`: I put my tests in a CI pipeline

Since automated tests return a non-zero exit code when they fail, you can use this to your advantage and put them in a CI pipeline.

Also, you can be sure that you are testing frozen dependencies, which is not the case when you run the tests locally.

## Prerequisites (assuming you're on Ubuntu)

- NodeJS >=18.x.x 

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
