const conn = require("../db");


module.exports = {
    async getUser(email){
        try{
            sql = "SELECT id,name,email,password FROM utilisateurs WHERE email = ?";
            const [rows, field] =  await conn.execute(sql, [email]);
            if (rows.length == 1)
                return rows[0];
            return false;
        }catch{
            console.log("Erreur lors de la selection");
            return false;
        }
    },

    async addUser(name,email,  password){
        try{
            var sql = `INSERT INTO utilisateurs (name, email, password) VALUES ('${name}', '${email}', '${password}');`;
            await conn.execute(sql)
        }catch{
            console.log("erreur lors de l'unsertion ")
        }
    },
    async getUserById(id){
        try{
            sql = "SELECT id,name,email,password FROM utilisateurs WHERE id = ?";
            const [rows, field] =  await conn.execute(sql, [id]);
            if (rows.length == 1)
                return rows[0];
            return false;
        }catch{
            console.log("Erreur lors de la selection");
            return false;
        }
    }
};