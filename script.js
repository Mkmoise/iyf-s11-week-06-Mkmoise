// Task 11.1 
//Exercise 1 - Understanding Asynchronous JavaScript

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

// Task 11.1
//Exercise 2 - Callback Pattern

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

// Task 11.2 
//Exercise 2 - Creating and Using a Promise

function getUserDataPromise(userId) {
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

getUserDataPromise(1)
    .then(user => {
        console.log("User:", user);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Task 11.3
// Exercise 1 - Promise Chaining

function getUserDataPromiseChain(userId) {
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

function getUserPostsPromiseChain(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostCommentsPromiseChain(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing!" }
            ]);
        }, 1000);
    });
}

getUserDataPromiseChain(1)
    .then(user => {
        console.log("User:", user);
        return getUserPostsPromiseChain(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostCommentsPromiseChain(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.log("Error:", error);
    });
//Exercise 2 - Promise.all()

function getUserDataChain(userId) {
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
    getUserDataChain(1),
    getUserDataChain(2),
    getUserDataChain(3)
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

function getUserDataAsync(userId) {
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
            getUserDataAsync(1),
            getUserDataAsync(2),
            getUserDataAsync(3)
        ]);

        console.log("Fetched Users:");
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

loadUsers();

// Task 11.4a
// Exercise 1 - Async/Await
function getUserDataAwait(userId) {
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

function getUserPostsAwait(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostCommentsAwait(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Nice work!" }
            ]);
        }, 1000);
    });
}

async function getDataWithAsyncAwait() {
    const user = await getUserDataAwait(1);
    const posts = await getUserPostsAwait(user.id);
    const comments = await getPostCommentsAwait(posts[0].id);

    console.log("User:", user);
    console.log("Posts:", posts);
    console.log("Comments:", comments);
}

getDataWithAsyncAwait();

// Exercise 2 - Try...Catch

function getUserDataTry(userId) {
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

async function fetchUserTry(userId) {
    try {
        const user = await getUserDataTry(userId);
        console.log("User:", user);
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchUserTry(1);
fetchUserTry(-1);

// Exercise 3 -parallel Async/Await

function getUserDataParallel(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: `User ${userId}`
            });
        }, 1000);
    });
}

async function getAllUsersParallel() {
    const users = await Promise.all([
        getUserDataParallel(1),
        getUserDataParallel(2),
        getUserDataParallel(3)
    ]);

    console.log("Parallel Users:", users);
}

getAllUsersParallel();

// Build - Rewrite Callback Hell

function getUserDataBuild(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: "John"
            });
        }, 1000);
    });
}

function getUserPostsBuild(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" }
            ]);
        }, 1000);
    });
}

function getPostCommentsBuild(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" }
            ]);
        }, 1000);
    });
}

async function loadDataBuild() {
    try {
        const user = await getUserDataBuild(1);
        const posts = await getUserPostsBuild(user.id);
        const comments = await getPostCommentsBuild(posts[0].id);

        console.log("Build User:", user);
        console.log("Build Posts:", posts);
        console.log("Build Comments:", comments);
    } catch (error) {
        console.log("Build Error:", error);
    }
}

loadDataBuild();
