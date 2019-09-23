class Student {
    constructor() { }
    uploadInfo() { }
    viewBag() {
        app.form.hide();
        var positionX = 120;
        var positionY = 180;
        for (var subject in bag) {
            textSize(15);
            text(subject, 100, positionY);

            positionX = 120;
            positionY += 40;
            for (var book in bag[subject]) {
                var path = "bag/" + subject + "/" + book + "/" + "status/";
                var statusRef = database.ref(path).on("value", function (data) {
                    var status = data.val();
                    if (status === 1) {
                        var path = "bag/" + subject + "/" + book + "/" + "name/"
                        var nameRef = database.ref(path).on("value", function (data) {
                            var name = data.val();
                            textSize(11);
                            text(name, positionX + 140, positionY - 40);
                        })
                        positionX += 100;
                        //if (positionY % 1000 === 0) {

                        //}

                    }
                });
            }
        }
    }
}