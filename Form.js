class Form {
    constructor() {
        this.teacherButton = createButton("Teacher");
        this.studentButton = createButton("Student");
    }
    display() {
        this.teacherButton.position(displayWidth / 2 - 40, displayHeight / 2 - 100);
        this.studentButton.position(displayWidth / 2 - 40, displayHeight / 2);
        this.teacherButton.mousePressed(() => {
            app.appState = "teacher"
            console.log(app.appState);
            app.bag.createSubjectButtons();
        })
        this.studentButton.mousePressed(() => {
            app.appState = "student"
            console.log(app.appState);
            //app.showBooks();
        })
    }
    hide() {
        this.teacherButton.hide();
        this.studentButton.hide();
    }

}
