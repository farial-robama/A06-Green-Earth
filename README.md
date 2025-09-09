
#### Answer to the following question:


#### 1) What is the difference between var, let, and const?
#### var
- Function-scoped.
- Can be re-declared and updated.
- Hoisted to the top of the scope, but initialized with undefined.
#### let
- Block-scoped. 
- Can be updated but not re-declared within the same scope.
#### const
- Block-scoped. 
- Must be initialized at the time of declaration.
- Cannot be re-declared or updated.

#### 2) What is the difference between map(), forEach(), and filter()? 
#### map()
- Return a new array after applying a function to each element.
- Does not modify the original array.
#### forEach()
- Executes a function on each element, but returns nothing.
- Typically used for side effects (logging, updating UI).
#### filter()
- Returns a new array containing only elements that satisfy the condition.
  
#### 3) What are arrow functions in ES6?
#### Arrow functions in ES6:
- A shorter syntax for writing functions.
- Do not have their own this or arguments.
- Commonly used for callbacks.
  
#### 4) How does destructuring assignment work in ES6?
#### Destructuring assignment:
Destructuring means picking values from arrays or objects and putting them into variables directly.
Instead of writing many lines to get values, we can do it in one step.
#### Example with array : 
const numbers = [10, 20, 30];  

//Old way  

const first = numbers[0];  

const second = numbers[1];  


//Destructuring way  

const [a, b, c] = numbers;  


console.log(a, b, c);
#### Example with object:
const person = { name: "Asha", age: 25 };

//Old way  

const personName = person.name;  

const personAge = person.age;  


//Destructuring way  

const { name, age } = person;  


console.log(name, age);

#### 5) Explain template literals in ES6. How are they different from string concatenation?
#### Template literals in ES6:
- Template Literals use backticks(`) instead of quotes.
- They let us insert variables directly inside a string using ${}.
- Also, we can write multi-line strings easily.
#### Difference:
String concatenation is longer and messy.
Template Literals are cleaner, easier and support multi-line.

