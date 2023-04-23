const { createPool } = require("mysql");

const pool = createPool({
    host: "svc.sel3.cloudtype.app",
    user: "root",
    password: "1234",
    port: "30072",
    database: "portfolio"
})

pool.getConnection(()=>{
    console.log("success")
});

const executeQuery = async (query, arraParms) => {
    return await new Promise((resolve)=>{
        pool.query(query, arraParms, (err, data)=>{
            resolve(data)
        });
    })
}

module.exports = {executeQuery}