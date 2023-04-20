let fs = require("fs");
let db = require("data/message.json");

export default function handler(req, res){

    const {method, body} = req;

    switch(method){
        case "GET" : dataGet(); break;
        case "POST" : dataCreate(); break;
        case "PUT" : dataUpdate(); break;
        case "DELETE" : dataDelete(); break;
    }

    function dataCreate(){
        db.push(body);
        saveData();
    }

    function dataGet(){
        res.status(200).json(db)
    }

    function dataUpdate(){
        let user = db.find(obj => obj.id == body.id);
        Object.assign(user, body)
        saveData();
    }

    function dataDelete(){
        db = db.filter(obj => obj.id !== body);
        saveData();
    }

    function saveData(){
        fs.writeFileSync("data/message.json", JSON.stringify(db));
        res.status(200).json(db)
    }
}