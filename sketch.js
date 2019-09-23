var canvas;
var bag;
var app;
var database;
var clickedSubject;
var clickedBook;
var weight;
var clickedMaterial;


function setup() {
    canvas = createCanvas(displayWidth, displayHeight - 170);
    database = firebase.database();
    app = new App();

}

function draw() {
    background(255);
    app.bag.getBooks()
    app.display();
}


// var canvas, backgroundImage;
// var app;
// var appState = "login";
// var database;
// var loginForm;
// var user;
// var form;
// var bag;
// var testRef;
// var test;
// var buttonSprite;
// var bag;
// var Buttons = [];
// //var bookButtons = [];
// var clickedSubject;
// var clickedBook;
// var allBooksInfo;
// var bag;
// var appState = "start";
// function setup() {
//     canvas = createCanvas(displayWidth, displayHeight - 170);
//     database = firebase.database();
//     app = new App();
//     app.getState();

//     BAG = new Bag();
//     BAG.getBooks();

//     // testRef = database.ref("test");
//     // testRef.on("value", function (data) {
//     //     test = data.val();

//     // });
//     // app.createButtons();
//     // console.log(buttons);
// }
// function draw() {
//     // console.log(bag);
//     if (appState === "start") {
//         app.start();
//     }
//     if (user === "student") {
//         app.showBooks();

//     }
//     if (user === "teacher") {
//         app.showSubjectButtons();

//     }
//     // drawSprites();

// }
