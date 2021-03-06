require('./infraestructura/conectionDB')
const typeDefs = require('./typeDef')
const resolvers = require('./resolver')
//mm
const express = require('express')
const  authRoute = require('./routes/auth.routes')
const {validarToken, admin} = require('./middleware/authjwt')
const jwt = require('jsonwebtoken');
const key = 'CLAVEDIFICIL';
/*
const proyectoAguas =new ProyectoModel({
    name:'Proyecto de aguas residuales'
})
proyectoAguas.save((err,document)=>{
    if(err){
        console.log(err);
        return;
    }
});

const consultaProyectos = async ()=>{
    return await ProyectoModel.find({});
}


api.get('/proyectos',(request,response)=>{
    consultaProyectos().then(function(resultado){
        response.json({ proyectos1 :resultado});
    })
});*/

const {ApolloServer} = require('apollo-server-express')

const iniciarServidor =async()=>{
    const api = express();
    const apollo= new ApolloServer(
        {
            typeDefs,
            resolvers
            // context: ({req}) => {
            //     const token = req.headers.authorization;
            //     try{
            //         const perfil = jwt.verify(token, key)
            //         if(perfil){
            //             rol = perfil.role
            //             return {rol}
            //         }
            //     }catch(error){
            //         console.log(error)
            //     }
            //     return{}
            
        });
    await apollo.start()
    apollo.applyMiddleware({app:api,path:'/consulta'})
    /*api.use((request, response)=>{
        response.send('Hola')
    })*/
    api.use(express.json())
    api.use('/api', authRoute)
    api.get('/api/dashboard', [validarToken, admin], (request, response)=>{
        response.json("Soy el dashboard");
    })
    api.listen('9091',()=>console.log('Inicio Server'))
}
iniciarServidor()