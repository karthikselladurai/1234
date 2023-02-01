const auth_fn = require('./authFn.js')
const logger = require('../../services/logger')


exports.auth =  async (req,res)=> {
    try{
        let resp = await auth_fn.authCheck(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}})
    }
    
}   