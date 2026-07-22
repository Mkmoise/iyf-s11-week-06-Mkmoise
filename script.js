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

// Task 11.2 Exercise 1 - Callback Hell

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({
            id: userId,
            name: "John"
        });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing!" }
        ]);
    }, 1000);
}

getUserData(1, function(user) {
    console.log("User:", user);

    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

// Task 11.2 Exercise 2 - Creating and Using a Promise

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John"
                });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

getUserData(1)
    .then(user => {
        console.log("User:", user);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Task 11.3
//Exercise 2 - Promise.all()

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User ${userId}`
                });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

Promise.all([
    getUserData(1),
    getUserData(2),
    getUserData(3)
])
.then(users => {
    console.log("All Users:", users);
})
.catch(error => {
    console.log("Error:", error);
});

// Exercise 3 - Promise.race()

const fast = new Promise(resolve => {
    setTimeout(() => {
        resolve("Fast!");
    }, 100);
});

const slow = new Promise(resolve => {
    setTimeout(() => {
        resolve("Slow!");
    }, 500);
});

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });

// Build - Fetch 3 Users Simultaneously

function getUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: `User ${userId}`
            });
        }, 1000);
    });
}

async function loadUsers() {
    try {
        const users = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        console.log("Fetched Users:");
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

loadUsers();
