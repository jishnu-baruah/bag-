class Bag {
    constructor() { }
    calculateAproxWeight() { }
    static getBooks() {
        var bagRef = database.ref("test/");
        //console.log(bagRef);
        bagRef.on("value", function (data) {
            bag = data.val();
            console.log(bag);
        })
        //console.log("getBooks");
    }
}