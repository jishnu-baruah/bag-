class App {
    constructor() { }
    getState() { }
    updateState() { }
    start() {
        form = new Form();
        form.display();
    }
    showBooks() {
        form.hide();
        Bag.getBooks();
    }
}