import { executeQuery } from './db';


export default async function handler(req, res){

    const {method, body} = req;

    const seletData = async () => {
        try {
            let data = await executeQuery('select * from message order by id DESC', []);
            res.json(data);
        } catch (err) {
            res.send(err);
        }
    }

    const insertData = async () => {
        let {id, name, password, date, text} = body;
        console.log(body)
        let data = await executeQuery(
          'insert into message (id, name, password, date, text) value (?,?,?,?,?)',
          [id, name, password, date, text]
        );
        res.json(data)
    }

    const updateData = async () => {
        try{
            let { name, password, text, id } = body;
            console.log(body)
            console.log("수정")
            let data = await executeQuery(
            'update message set name=?, password=?,text=? where id=?',
            [name, password, text, body.id]
            )
            res.json(data)
        }catch(err){
            res.send(err);
        }
    }

    const deleteData = async () => {
        let {id} = body;
        let data = await executeQuery(
          'delete from message where id=?', [body]
        )
        res.json(data);
    }
    
    switch(method){
        case "GET" : seletData(); break;
        case "POST" : await insertData(); break;
        case "PUT" : await updateData(); break;
        case "DELETE" : await deleteData(); break;
    }

}
