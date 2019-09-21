class Bag {
    constructor() { }
    calculateAproxWeight() { }
    getBooks() {
        var bagData = database.ref("bag/").on("value", function (data) {
            bag = data.val();
            //.log(bag);
        })
        //console.log("getBooks");
    }
    // updateBookStatus(status) {
    //     database.ref("bag/).update({
    //         status: status
    //     })
}
