const express= require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { usersRouter } = require('../routes/users.routes');
const { transfersRouter } = require('../routes/transfers.routes');

class Server{
constructor(){
    this.app=express();
    this.port= process.env.PORT || 4000;

    this.paths={
        users: '/api/v1/users',
        transfers: '/api/v1/transfers'
    }
    this.database();
    this.middlewares();
    this.routes();
}
middlewares() {
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
   
  }
routes(){
this.app.use(this.paths.users, usersRouter);
this.app.use(this.paths.transfers, transfersRouter);
}

database(){
    db.authenticate()
    .then(()=>console.log('Database Authenticated'))
    .catch(error=>console.log(error));

    db.sync()
    .then(()=>console.log('Database synced'))
    .catch(error=>console.log(error));
}
listen(){
    this.app.listen(this.port,()=>{
        console.log(`Server listening on port ${this.port}`);
    });
}


}
module.exports= Server;