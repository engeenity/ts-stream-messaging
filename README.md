# ts-stream-messages

TypeScript stream messaging system.

[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

**Install NodeJS and npm**
Check out my tutorial on setting up a Typescript library, the first part of the tutorial goes over how to install NodeJS and npm [here](https://github.com/srepollock/ts-lib-tutorial).

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```sh
# Clone this project into a working directory on your computer:
git clone https://github.com/srepollock/ts-stream-messages.git ~/Documents/git/
# Move into the directory and install the project's dependencies
cd ~/Documents/git/ts-stream-messages; npm install
```

Now that you've setup your development environment, run the example:

```sh
npm start
```

## Running the tests

This project has unit, incremental and functional testing in hopes to cover all the essentials and release near bug-free code (nothing is ever perfect, but testing is the best way to show what's immediately wrong and unsafe).  
To run this project's test suite simple call in the command line:

```sh
npm test:all
```

### And coding style tests

Coding style will follow the K&R coding standards. TSLint has been setup in this project to follow the standards and can be checked by running:

```sh
npm run lint
```

## Deployment

This project utilizes Travis-CI for unit testing and deployment. All pull requests must pass all checks before being merged into master. Only administrators may merge with checks failing, and we ask that they please denote the reason in the pull request comments before doing so.

## Built With

* [TypeScript](https://www.typescriptlang.org/)
* [ts-bootstrap](https://github.com/srepollock/ts-bootstrap)
* [NodeJS](https://nodejs.org/en/)

## Versioning

We use [SemVer](http://semver.org/) and [Commitzen](https://github.com/commitizen/cz-cli) for versioning. Simple use `npm run commit` when working on your branch to follow our standards!. You do not have to change the package.json file, it is handled by Travis-CI

## Authors

* **Spencer Pollock** - *Initial work* - [srepollock](https://github.com/srepollock)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


> Created by [Spencer Pollock] (@srepollock).
