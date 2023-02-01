const createUserFn = require('./createUserFn')
const logger = require('../../services/logger')


exports.register =  async (req,res)=> {
    try{
        let resp = await createUserFn.create(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:"Update Api end point failed",data:err})
    }   
} 
exports.updateUser = async (req,res)=>{
    try{
         let resp = await createUserFn.update(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:"Update Api end point failed",data:err})
    }
}  