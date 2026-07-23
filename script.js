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

// Build - Rewriting Callback Hell

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

// Task 12.1
// Exercise 1 - My First Fetch

function fetchSingleUser() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
            console.log("Response:", response);
            console.log("Status:", response.status);
            console.log("OK:", response.ok);

            return response.json();
        })
        .then(user => {
            console.log("User Data:", user);
        })
        .catch(error => {
            console.log("Fetch Error:", error);
        });
}

fetchSingleUser();

// Exercise 2 - Fetch with Async/Await

async function fetchUserAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const user = await response.json();
        console.log("Fetched User:", user);

    } catch (error) {
        console.log("Error:", error);
    }
}

fetchUserAsync(1);

// Practice - Fetch Multiple Resources

async function fetchPracticeData() {
    try {
        // One user
        const userResponse = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await userResponse.json();
        console.log("Single User:", user);

        // All users
        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await usersResponse.json();
        console.log("All Users:", users);

        // Posts for User 1
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");
        const posts = await postsResponse.json();
        console.log("User 1 Posts:", posts);

    } catch (error) {
        console.log("Error:", error);
    }
}

fetchPracticeData();

// Task 12.2 - Displaying API Data in the DOM

const loadingDisplay = document.getElementById("loading");
const errorDisplay = document.getElementById("error");
const usersContainer = document.getElementById("users-container");

async function loadUsersDOM() {

    try {

        loadingDisplay.style.display = "block";
        errorDisplay.textContent = "";
        usersContainer.innerHTML = "";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        users.forEach(user => {

            usersContainer.innerHTML += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <p>Company: ${user.company.name}</p>
                    <p>City: ${user.address.city}</p>
                </div>
            `;

        });

    } catch (error) {

        errorDisplay.textContent = error.message;

    } finally {

        loadingDisplay.style.display = "none";

    }

}

loadUsersDOM();

// Task 12.3 - POST Request

const postForm = document.getElementById("post-form");
const postResult = document.getElementById("post-result");

async function createPostRequest(title, body, userId) {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: userId
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        const data = await response.json();

        postResult.innerHTML = `
            <h3>Post Created Successfully</h3>

            <p><strong>ID:</strong> ${data.id}</p>

            <p><strong>Title:</strong> ${data.title}</p>

            <p><strong>Body:</strong> ${data.body}</p>

            <p><strong>User ID:</strong> ${data.userId}</p>
        `;

    } catch (error) {

        postResult.innerHTML = `<p style="color:red;">${error.message}</p>`;

    }

}

postForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value;

    const body = document.getElementById("body").value;

    const userId = document.getElementById("userId").value;

    createPostRequest(title, body, userId);

});
