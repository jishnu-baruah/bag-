class Bag {
    constructor() {
        this.subjectButtons = [];
        this.bookButtons = [];
        this.extraMaterials = new ExtraMaterials();

    }

    calculateAproxWeight() {
        var commonBooksWeight = 0;
        var electiveBooksWeight = 0;
        var milBooksWeight = 0;
        for (var subject in bag) {
            if (bag[subject].type === "Common") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = parseInt(bag[subject][book].weight);
                            commonBooksWeight = commonBooksWeight + bookWeight;
                            // console.log("##", typeof (bookWeight))

                        }
                    }
                }

            }
            if (bag[subject].type === "Elective") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = bag[subject][book].weight;
                            electiveBooksWeight = electiveBooksWeight + bookWeight / 3;
                        }
                    }
                }
            }
            if (bag[subject].type === "MIL") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
                        if (bag[subject][book].status === 1) {
                            var bookWeight = bag[subject][book].weight;
                            milBooksWeight = milBooksWeight + bookWeight / 2;
                        }
                    }
                }
            }
        }
        // console.log("1", typeof (commonBooksWeight));
        // console.log("2", typeof (electiveBooksWeight));
        // console.log("3", typeof (milBooksWeight));
        var netWeight = 1 + commonBooksWeight + electiveBooksWeight + milBooksWeight
        weight = netWeight.toFixed(2);
    }
    showWeight() {
        textSize(20);
        var dialog = "";

        if (weight <= 2) {
            fill("green");
            dialog = "👍 😊😊😊😊Alright  "
        } else if (weight > 2 && weight <= 4) {
            fill(255, 255, 0);
            dialog = "  😐😐😐Fine .. BUT I will be more happy if it was a little less  "
        } else if (weight > 4) {
            fill("red");
            dialog = "😞 very heavy  "
        }
        text(dialog, 100, 500);
        textSize(30);
        //fill("black");
        text("Today's weight : " + weight + "kg", 100, 400)
        text("Probable student reaction : ", 100, 450);
        console.log(weight + "kg");
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
            if (subjectName !== "Extra materials") {
                var subjectButton = createButton(subjectName);
                this.subjectButtons.push(subjectButton);
                console.log(subject);
            }
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
            this.hideSubject();
            if (this.bookButtons.length === 0) {
                this.createBookButtons();
                this.extraMaterials.createMaterialsButton();
            }
            this.showBookButtons();
        }
    }

    createBookButtons() {

        for (var subject in bag) {
            if (subject === clickedSubject) {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
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
        app.bag.createExtraMaterials
        var position = 120;
        for (var button of this.bookButtons) {
            button.style("visibility", "visible");
            button.position(displayWidth / 2 - 100, position);
            position += 40;
            button.mousePressed(function () {
                clickedBook = this.html();
                if (clickedBook === "Extra materials") {
                    app.appState = "extraMaterials";
                    app.bag.extraMaterials.createBookButton();
                    app.bag.hideBooks();
                }
                app.bag.changeStatus();
                var status = app.bag.checkStatus();
                console.log(status);
                if (status === 1) {
                    this.style('background-color', "green");
                }
                else if (status === 0) {
                    this.style('background-color', "red");
                }

                // if (this.html() === "Extra materials") {
                //     app.bag.showExtraMaterials();
                //     console.log("hi");
                // }
            })
        }
    }

    hideSubject() {
        for (var button of this.subjectButtons) {
            // if (button.html() != "Extra materials") {
            button.hide();
            // } else {
            //     button.position(100, 100);
            //     button.mousePressed(showExtraMaterials());
            // };
        }
    }
    hideBooks() {
        for (var button of this.bookButtons) {
            button.hide();
        }
    }

    checkStatus() {
        for (var subject in bag) {
            if (subject === clickedSubject) {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
                        if (bag[subject][book].name === clickedBook) {
                            return (bag[subject][book].status);
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
                    if (book !== "name" && book !== bag[subject].type) {
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

    createExtraMaterials() {
        var extraMaterialsRef = database.ref("bag/Extra_Materials").on("value", function (data) {
            extraMaterials = data.val();
        })
        for (var materials in extraMaterials) {
            if (materials != "name" && materials != "type") {
                name = extraMaterials[materials].name;
                var materialButton = createButton(name);
                materialButton.style("visibility", "hidden")

                var statusRef = database.ref("bag/Extra_Materials" + materials + "/").on("value", function (data) {
                    var status = data.val();
                    if (status === 0) {
                        materialButton.style('background-color', "red");
                    }
                    else if (status === 1) {
                        materialButton.style('background-color', "green");
                    }
                    this.extraButtons.push(materialButton);
                })
            }
        }
    }

    createAutoFillbutton() {
        var removeButton = createButton("Remove");
        removeButton.position(1200, 20);
        removeButton.mousePressed(function () {
            for (var subject in bag) {
                if (bag[subject].name !== "Extra materials") {
                    for (var book in bag[subject]) {
                        if (book !== "name" && book !== "type") {
                            var path = "bag/" + subject + "/" + book + "/"
                            database.ref(path).update({
                                "status": 0
                            })
                        }
                    }
                }
            }
        })

        var addButton = createButton("Add");
        addButton.position(1270, 20);
        addButton.mousePressed(function () {
            for (var subject in bag) {
                if (bag[subject].name !== "Extra materials") {
                    for (var book in bag[subject]) {
                        if (book !== "name" && book !== "type") {
                            var path = "bag/" + subject + "/" + book + "/"
                            database.ref(path).update({
                                "status": 1
                            })
                        }
                    }
                }
            }
        })
    }
}
