var Hapi=require('@hapi/hapi');
var mysql=require('mysql');
const environment=require('./knexfile')
const knex=require('knex')(environment['development'])



const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'POST',
        path: '/create',
        handler: async(req, h) => {
            try{
                console.log(req.payload)
                const data=await knex('Navgurukul').insert(req.payload)
                console.log(req.payload)
                return (`succesfully done ${data}`) ;
            }catch(err){
                return h.response(err)
            }
        }
    

    });

    server.route({
        method:'GET',
        path:'/read/{id}',
        handler:async(req,hnd)=>{
            // console.log(req)
            try{
                const data=await knex('Navgurukul').where('id',req.params.id)
                return hnd.response(data)
            }
            catch(err){
                return hnd.response(err)
            }
        }
    })
    server.route({
        method:'PUT',
        path:'/update/{email}',
        handler:async(req,hnd)=>{
            console.log(">>>>>>>>>>>>>>>>>>>>>",req.payload)
            
            try{
                console.log(req.payload)
                const data=await knex('Navgurukul').where({'email':req.params.email}).update(req.payload)
                return hnd.response('updated')
            }
            catch(err){
                return hnd.response(err)
            }
        }
    });''
    
    server.route({
        method:'DELETE',
        path:'/delete/{email}',
        handler:async(req,hnd)=>{
            // const email=req.payload
            try{
                const data=await knex('Navgurukul').where('email',req.params.email).del(req.payload)
                return 'deleted'
            }
            catch(err){
                return err;
            }
        }
    })
    await server.start();
    console.log('Server running on %s', server.info.uri);

}
init()