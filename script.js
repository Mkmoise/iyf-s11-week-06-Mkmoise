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

// Task 11.1 Exercise 2 - Callback Pattern

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "John",
            age: 30
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:");
    console.log(user);
});
