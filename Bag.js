class Bag {
    constructor() {
        this.subjectButtons = [];
        this.bookButtons = [];
    }

    calculateAproxWeight() {
        var commonBooksWeight = 0;
        var electiveBooksWeight = 0;
        var milBooksWeight = 0;
        for (var subject in bag) {
            if (bag[subject].type === "Common") {
                for (var book in bag[subject]) {
                    if (book !== name) {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = bag[subject][book].weight;
                            commonBooksWeight = commonBooksWeight + bookWeight;
                        }
                    }
                }
            }
            if (bag[subject].type === "Elective") {
                for (var book in bag[subject]) {
                    if (book !== name && book !== type) {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = bag[subject][book].weight;
                            electiveBooksWeight = electiveBooksWeight + bookWeight / 3;
                        }
                    }
                }
            }
            if (bag[subject].type === "MIL") {
                for (var book in bag[subject]) {
                    if (book !== name) {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = bag[subject][book].weight;
                            milBooksWeight = milBooksWeight + bookWeight / 2;
                        }
                    }
                }
            }
        }
        weight = commonBooksWeight + electiveBooksWeight + milBooksWeight;
    }
    showWeight() {
        text(weight, 20, 700);
        console.log(weight);
    }
    getBooks() {
        var bagData = database.ref("bag/").on("value", function (data) {
            bag = data.val();
        })
    }

    // updateBookStatus(status) {
    //     database.ref("bag/).update({
    //         status: status
    //     })

    createSubjectButtons() {
        for (var subject in bag) {
            var subjectName = bag[subject].name;
            var subjectButton = createButton(subjectName);
            this.subjectButtons.push(subjectButton);
            console.log(subject);
        }
    }

    showSubjectButtons() {
        app.form.hide();
        var positionY = 120;
        for (var button of this.subjectButtons) {
            button.position(displayWidth / 2 - 100, positionY);
            positionY += 40;

            button.mousePressed(function () {
                clickedSubject = this.html();
            });
        }
        if (clickedSubject !== undefined) {
            this.hide();
            if (this.bookButtons.length === 0) {
                this.createBookButtons();
            }
            this.showBookButtons();
        }
    }

    createBookButtons() {

        for (var subject in bag) {
            if (subject === clickedSubject) {
                for (var book in bag[subject]) {
                    if (book !== "name") {
                        var name = bag[subject][book].name
                        var bookButton = createButton(name);
                        bookButton.style("visibility", "hidden");
                        var statusRef = database.ref("bag/" + subject + "/" + book + "/" + "status/").on("value", function (data) {
                            var status = data.val();
                            if (status === 0) {
                                bookButton.style('background-color', "red");
                            }
                            else if (status === 1) {
                                bookButton.style('background-color', "green");
                            }
                        })

                        this.bookButtons.push(bookButton);
                    }
                }
            }
        }
    }

    showBookButtons() {
        var position = 120;
        for (var button of this.bookButtons) {
            button.style("visibility", "visible");
            button.position(displayWidth / 2 - 100, position);
            position += 40;
            button.mousePressed(function () {
                clickedBook = this.html();
                app.bag.changeStatus();
                var status = app.bag.checkStatus();
                console.log(status);
                if (status === 1) {
                    this.style('background-color', "green");
                }
                else if (status === 0) {
                    this.style('background-color', "red");
                }
            })
        }
    }

    hide() {
        for (var button of this.subjectButtons) {
            button.hide();
        }
    }

    checkStatus() {
        for (var subject in bag) {
            if (subject === clickedSubject) {
                for (var book in bag[subject]) {
                    if (book !== "name") {
                        if (bag[subject][book].name === clickedBook) {
                            return (bag[subject][book].status)
                        }
                    }
                }
            }
        }
    }

    changeStatus() {
        for (var subject in bag) {
            if (subject === clickedSubject) {
                for (var book in bag[subject]) {
                    if (book !== "name") {
                        if (bag[subject][book].name === clickedBook) {
                            if (bag[subject][book].status === 0) {
                                var path = "bag/" + subject + "/" + book + "/"
                                database.ref(path).update({
                                    "status": 1
                                })
                            } else if (bag[subject][book].status === 1) {
                                var path = "bag/" + subject + "/" + book + "/"
                                database.ref(path).update({
                                    "status": 0
                                })
                            }
                        }
                    }
                }
            }
        }
    }

    showBooks() {
        app.form.hide();
        var positionX = 120;
        var positionY = 180;
        for (var subject in bag) {
            textSize(15);
            text(subject, 100, positionY);

            positionX = 120;
            positionY += 40;
            for (var book in bag[subject]) {
                var path = "bag/" + subject + "/" + book + "/" + "status/";
                var statusRef = database.ref(path).on("value", function (data) {
                    var status = data.val();
                    if (status === 1) {
                        var path = "bag/" + subject + "/" + book + "/" + "name/"
                        var nameRef = database.ref(path).on("value", function (data) {
                            var name = data.val();
                            textSize(11);
                            text(name, positionX + 140, positionY - 40);
                        })
                        positionX += 100;
                        //if (positionY % 1000 === 0) {

                        //}

                    }
                });


            }
        }
    }
}



// class Bag {
//     constructor() { }
//     calculateAproxWeight() { }
//     getBooks() {
//         var bagData = database.ref("bag/").on("value", function (data) {
//             bag = data.val();
//             //.log(bag);
//         })
//         //console.log("getBooks");
//     }
//     // updateBookStatus(status) {
//     //     database.ref("bag/).update({
//     //         status: status
//     //     })
// }
