const fs = require("fs").promises;
let db = require("data/message.json");

export default async function handler(req, res){

    const {method, body} = req;

    switch(method){
        case "GET" : dataGet(); break;
        case "POST" : await dataCreate(); break;
        case "PUT" : await dataUpdate(); break;
        case "DELETE" : await dataDelete(); break;
    }

    async function dataCreate(){
        db.push(body);
        await saveData();
    }

    function dataGet(){
        res.status(200).json(db)
    }

    async function dataUpdate(){
        let user = db.find(obj => obj.id == body.id);
        Object.assign(user, body);
        await saveData();
    }

    async function dataDelete(){
        db = db.filter(obj => obj.id !== body);
        await saveData();
    }

    async function saveData(){
        await fs.writeFile("data/message.json", JSON.stringify(db));
        res.status(200).json(db);
    }
}
