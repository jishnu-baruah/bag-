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
var buttonSprite;
var bag;
var Buttons = [];
//var bookButtons = [];
var clickedSubject;
var allBooksInfo;

function setup() {
    canvas = createCanvas(displayWidth, displayHeight - 170);
    database = firebase.database();
    app = new App();
    app.getState();
    app.start();
    // testRef = database.ref("test");
    // testRef.on("value", function (data) {
    //     test = data.val();

    // });
    // app.createButtons();
    // console.log(buttons);
}
function draw() {
    // console.log(bag);
    if (user === "student") {
        app.showBooks();

    }
    if (user === "teacher") {
        app.showSubjectButtons();

    }
    drawSprites();
}
