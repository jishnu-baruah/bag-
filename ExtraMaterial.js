class ExtraMaterials {
    constructor() {
        this.bookButtons = [];
    }
    createMaterialsButton() {
        for (var subject in bag) {
            if (bag[subject].name === "Extra materials") {
                var button = createButton("Extra materials");
                button.style("visibility", "hidden");
                app.bag.bookButtons.push(buttons);
            }
        }
    }

    createBookButton() {
        for (var subject in bag) {
            if (bag[subject].name === "Extra materials") {
                for (var book in bag(subject)) {
                    if (book !== "name" && book !== "type") {
                        var name = bag[subject][book].name;
                        var bookButton = createButton(name);
                        bookButton.style("visibility", "hidden");
                        this.bookButtons.push(bookButton);
                    }
                }
            }
        }
    }
    showBookButtons() {
        var position = 120;
        for (var button of this.bookButtons) {
            button.style("visibility", "visible")
            button.position(displayWidth / 2 - 100, position);
            position += 40;
        }
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
}