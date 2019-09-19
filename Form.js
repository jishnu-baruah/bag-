class Form {
    constructor() {
        this.teacherButton = createButton("Teacher");
        this.studentButton = createButton("Student");
    }
    display() {
        this.teacherButton.position(displayWidth / 2 - 40, displayHeight / 2 - 100);
        this.studentButton.position(displayWidth / 2 - 40, displayHeight / 2);
        this.teacherButton.mousePressed(() => {
            user = "teacher"
            console.log(user);
            app.createSubjectButtons();
        })
        this.studentButton.mousePressed(() => {
            user = "student"
            console.log(user);
            //app.showBooks();
        })
    }
    hide() {
        this.teacherButton.hide();
        this.studentButton.hide();
    }

}
