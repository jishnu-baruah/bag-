var canvas, backgroundImage;
var app;
var appState = "login";
var database;
var loginForm;
var user;
var form;
var bag;
var testRef;
var test;
var bag = {
    book1: {
        name: "Math book",
        status: "not required"
    },
    book2: {
        name: "Advance Math book",
        status: "not required"
    },
    book3: {
        name: "English book",
        status: "not required"
    }
}

var allBooksInfo;

function setup() {
    canvas = createCanvas(displayWidth, displayHeight - 170);
    database = firebase.database();
    app = new App();
    app.getState();
    app.start();
    testRef = database.ref("test");
    testRef.on("value", function (data) {
        test = data.val();

    });
}
function draw() {
    console.log(test);
    if (user === "student") {
        app.showBooks();

    }
}
