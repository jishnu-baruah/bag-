class App {
    constructor() {
        this.subjectButtons = [];
        this.bookButtons = [];
    }
    getState() { }
    updateState() { }
    start() {
        form = new Form();
        form.display();
    }
    createSubjectButtons() {
        for (var subject in bag) {
            console.log(subject);
            var subjectName = bag[subject].name;
            var subjectButton = createButton(subjectName);
            this.subjectButtons.push(subjectButton);

        }
    }
    showSubjectButtons() {
        form.hide();
        var positionY = 120;
        for (var button of this.subjectButtons) {
            button.position(displayWidth / 2, positionY);
            positionY += 40;

            button.mousePressed(function () {
                //console.log(this);
                clickedSubject = this.html();
                console.log(clickedSubject);

            });

        }
        if (clickedSubject !== undefined) {
            this.hide();
            if (this.bookButtons.length === 0) {
                this.createBookButtons();
                console.log(this.bookButtons.length);
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
                        console.log(book);
                        var bookButton = createButton(name);
                        bookButton.style("visibility", "hidden")
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
            button.position(displayWidth / 2, position);
            position += 40;
        }

    }
    hide() {
        for (var button of this.subjectButtons) {
            button.hide();
        }
    }
    // createButtons() {
    //     //var subButtons = [];
    //     // var bookButtons = [];
    //     for (var subject in bag) {
    //         var subButtons = [];
    //         var bookButtons = [];
    //         var subjectName = bag[subject].name;
    //         var subjectButton = createButton(subjectName);
    //         subjectButton.style("visibility", "hidden");
    //         //console.log(subject);
    //         subButtons.push(subjectButton);
    //         for (var book in bag[subject]) {
    //             console.log(book);

    //             var name = bag[subject][book].name;
    //             // console.log(name);
    //             var tempButton = createButton(name);
    //             tempButton.style("visibility", "hidden");
    //             bookButtons.push(tempButton);

    //         }
    //         subButtons.push(bookButtons);
    //         Buttons.push(subButtons);
    //     }
    // }

    showList() {
        console.log(Buttons)
        form.hide();
        var displayPosition = 200;
        var bookButton;
        for (var index in Buttons) {
            for (var subIndex in Buttons[index]) {
                Buttons[index][subIndex].style("visibility", "visible");
                Buttons[index][subIndex].position(400, displayPosition);
                displayPosition += 40;
                Buttons[index][subIndex].mousePressed(function () {
                    for (var i = 0; i < Buttons.length; i++) {
                        Buttons[i].hide();

                    }


                })
            }
        }
        function changeStatus() {

        }

        //     // bookButton.mousePressed(function () {
        //     //     bookButton.style('background-color', 100);
        //     // })
        // }
        // // for (var book in bag) {
        // //     //console.log(bag[book][0]);
        // //     var status = "NOT REQUIRED";
        // //     var option = "REQUIRED";
        // //     var reverse = 1;

        // //     if (bag[book].status === 1) {
        // //         status = "REQUIRED";
        // //         option = "NOT REQUIRED";
        // //         reverse = 0;
        // //     }

        // //     text(bag[book].name + " : " + status, 120, display_position);
        // //     var optionButton = createButton(bag[book].name);
        // //     optionButton.position(400, display_position + 10);
        // //     optionButton.mousePressed(function () {
        // //         optionButton.hide();
        // //         bag[book].status = reverse;
        // //         console.log("hi");
        // //     })
        // //     display_position = display_position + 40;

        // // }

    }
    showBooks() {
        form.hide();
        Bag.getBooks();
        textSize(30);
        var display_position = 200;
        text("Books required", 120, 150);
        textSize(25);
        console.log(bag);
        for (var book in bag) {
            //console.log(bag[book][0]);
            if (bag[book].status === 1) {
                text(bag[book].name, 120, display_position);

                display_position = display_position + 40;
            }
        }
        // console.log(bag);
    }
}