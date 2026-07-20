// Task 11.1 Exercise 1 - Understanding Asynchronous JavaScript

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
    console.log("D");
}, 100);

console.log("E");

// Expected Output:
// A
// C
// E
// B
// D
