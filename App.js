class App {
    constructor() { }
    getState() { }
    updateState() { }
    start() {
        form = new Form();
        form.display();
    }
    createButtons() {
        //var subButtons = [];
        // var bookButtons = [];
        for (var subject in bag) {
            var subButtons = [];
            var subjectName = bag[subject].name;
            var subjectButton = createButton(subjectName);
            subjectButton.style("visibility", "hidden");
            //console.log(subject);
            subButtons.push(subjectButton);
            for (var book in bag[subject]) {
                console.log(book);
                var bookButtons = [];
                var name = bag[subject][book].name;
                // console.log(name);
                var tempButton = createButton(name);
                tempButton.style("visibility", "hidden");
                bookButtons.push(tempButton);
                subButtons.push(bookButtons);
                Buttons.push(subButtons);
            }
        }
    }

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