<img src="https://repository-images.githubusercontent.com/254569283/f914c480-7be0-11ea-8cb6-947b77526249" width=250px alt="ObjectQuery Logo"/>

## Introduction

ObjectQuery is a library to run queries against arrays of JavaScript objects, with the queries themselves being written as JavaScript objects. The aim of this is to make the syntax fairly intuitive, with as close to a 1:1 mapping with the structure of the original objects as possible.

## Installing and Running

Install the project by running the following:

~~~
npm install @geekfiftyfive/objectquery
~~~

You can then filter arrays of Objects as follows:

~~~
const ObjectQuery = require("objectquery");

let output = ObjectQuery.filter({ /* query object */ }, [ /* array of objects to filter */ ]);
~~~

## Syntax

### 1. Equality

Checking for equality is fairly intuitive. Say I have the following array of objects:

~~~
[
  {
    "project": "Awesome Project",
    "version:": "1.0.0",
    "language": "JavaScript",
    "dependencies": 3
  },
  {
    "project": "Superb Library",
    "version": "0.5.0",
    "language": "Java",
    "dependencies": 5
  },
  {
    "project": "Hello World",
    "version": "0.0.1",
    "language": "JavaScript",
    "dependencies": 1
  }
]
~~~

If I wanted to filter by projects with the `language` field being equal to `JavaScript`, then I would simply use the following object for my query:

~~~
{
  "language": "JavaScript"
}
~~~

running `ObjectQuery.filter` as shown above would then yield the following array:

~~~
[
  {
    "project": "Awesome Project",
    "version:": "1.0.0",
    "language": "JavaScript",
    "dependencies": 3
  },
  {
    "project": "Hello World",
    "version": "0.0.1",
    "language": "JavaScript",
    "dependencies": 1
  }
]
~~~

This also works on objects contained within a parent object. Using the previous example, if the objects were structured more like this:

~~~
{
  "project": "Awsome Project",
  "versions": {
    "lts": "1.0.0",
    "nightly": "1.0.1-SNAPSHOT"
  }
  "language": "JavaScript",
  "dependencies": 3
}
~~~

and I wanted to filter objects whose LTS version was `1.0.0` then the query object would look like this:

~~~
{
  "versions": {
    "lts": "1.0.0"
  }
}
~~~

### 2. Expressions

It's possible to do more than just check for equality against fields on the input objects. It's also possible to use expressions to do more complex filtering. To go back to our previous example:

~~~
[
  {
    "project": "Awesome Project",
    "version:": "1.0.0",
    "language": "JavaScript",
    "dependencies": 3
  },
  {
    "project": "Superb Library",
    "version": "0.5.0",
    "language": "Java",
    "dependencies": 5
  },
  {
    "project": "Hello World",
    "version": "0.0.1",
    "language": "JavaScript",
    "dependencies": 1
  }
]
~~~

If we wished to filter the libraries with more than 1 dependency, we can use an expression. Expressions have two fields called `op` and `value`. `op` defines what operation will be used to perform the filtering, and `value` defines the target value. In our example, we want to filter on the `dependencies` field, and we want objects with more than 1 dependency. Hence, our query object would look like this:

~~~
{
  "dependencies": {
    "op": ">"
    "value": 1
  }
}
~~~

The resulting array would look like this:

~~~
[
  {
    "project": "Awesome Project",
    "version:": "1.0.0",
    "language": "JavaScript",
    "dependencies": 3
  },
  {
    "project": "Superb Library",
    "version": "0.5.0",
    "language": "Java",
    "dependencies": 5
  }
]
~~~

At the time of writing expressions work for both numbers and strings, with the available `op` values documented below:

**Number Ops**

**>** Requires that the input value is greater than the `value` field
**<** Requires that the input value is less than the `value` field
**=** Requires that the input value matches the `value` field

**String Ops**

**!=** Requires that the input value does not match the `value` field
**=** Requires that the input value matches the `value` field. This is the same as using the above method of checking equivalance
**like** Requires that the `value` field is a substring of the input. The `%` sign is used to indicate where in the input string the substring is expected to be found.

### 3. Compound Queries

It is possible to filter by more than one field at the same time. To call back to our previous examples, if we wanted to build a query object that filters by objects that have `JavaScript` in their `language` field, and have more than 1 dependency, then the query object would look like this:

~~~
{
  "language": "JavaScript",
  "dependencies": {
    "op": ">",
    "value": 1
  }
}
~~~

### Concluding Statement

At the time of writing ObjectQuery is extremely young, and currently missing a lot of features. Below is a list of potential future features in a rough order of priority:

* Boolean logic on expressions
* Array expressions
* Improved implementation of the `like` operator
* More numeric operations