class ExtraMaterials {
    constructor() {
        this.bookButtons = [];

    }
    createMaterialsButton() {
        for (var subject in bag) {
            if (bag[subject].name === "Extra materials") {
                var button = createButton("Extra materials");
                button.style("visibility", "hidden");
                app.bag.bookButtons.push(button);
            }
        }
    }

    createBookButton() {

        for (var subject in bag) {
            if (bag[subject].name === "Extra materials") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type" && book !== "status") {
                        var name = bag[subject][book].name;
                        var bookButton = createButton(name);
                        bookButton.style("visibility", "hidden");
                        this.bookButtons.push(bookButton);
                        var statusRef = database.ref("bag/" + subject + "/" + book + "/" + "status/").on("value", function (data) {
                            var status = data.val();
                            if (status === 0) {
                                bookButton.style('background-color', "red");
                            }
                            else if (status === 1) {
                                bookButton.style('background-color', "green");
                            }
                        })


                    }
                }
            }
        }
    }
    showBookButtons() {
        var position = 120;
        // console.log("showBookButtons");
        for (var button of this.bookButtons) {
            button.style("visibility", "visible");
            button.position(displayWidth / 2 - 100, position);
            position += 40;
            button.mousePressed(function () {
                console.log(this);
                clickedMaterial = this.html();
                app.bag.extraMaterials.changeStatus();
                var status = app.bag.extraMaterials.checkStatus();
                console.log("status" + status);
                // console.log("##" + clickedMaterial);
                if (status === 1) {
                    this.style('background-color', "green");
                    // console.log("yes");
                }
                else if (status === 0) {
                    this.style('background-color', "red");
                    //  console.log("no");
                }

            })
        }
    }
    checkStatus() {
        for (var subject in bag) {
            if (bag[subject].name === "Extra materials") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== "type") {
                        if (bag[subject][book].name === clickedMaterial) {
                            return (bag[subject][book].status);
                        }
                    }
                }
            }
        }
    }
    changeStatus() {

        for (var subject in bag) {
            //   console.log(bag[subject].name);
            if (bag[subject].name === "Extra materials") {
                for (var book in bag[subject]) {
                    if (book !== "name" && book !== bag[subject].type) {
                        if (bag[subject][book].name === clickedMaterial) {
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
    // checkCommonStatus() {
    //     for (var subject in bag) {
    //         if (bag[subject].name === "Extra materials") {
    //             for (var book in bag[subject]) {
    //                 if (book !== "name" && book !== "type") {

    //                     console.log(bag[subject][book].status);

    //                 }
    //             }
    //         }
    //     }
    // }
}
































    // createExtraButton() {
    //     this.createExtraMaterials();
    //     var extraButton = createButton("Extra materials");
    //     extraButton.position(200, 200);
    //     extraButton.mousePressed(function () {
    //         app.bag.showExtraMaterials();
    //     });
    // }
    // changeMaterialStatus() {
    //     for (var material in extraMaterials) {
    //         if (material = clickedMaterial) {

    //         }
    //     }
    // } 
    // showExtraMaterials() {
    //     console.log(this.extraButtons);

    //     for (var button of this.bookButtons) {
    //         button.hide();
    //     }
    //     var positionY = 120
    //     for (button of this.extraButtons) {
    //         if (button != "name") {

    //             button.style("visibility", "visible");
    //             button.position(300, positionY);
    //             positionY += 40;
    //             button.mousePressed(function () {
    //                 clickedMaterial = this.html();
    //                 console.log(clickedMaterial);
    //             })
    //         }
    //     }
    // }

