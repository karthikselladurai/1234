const logger = require('../../../services/logger');
const bookFn = require('./bookingFn');


exports.booking =  async (req,res)=> {
    try{
        let resp = await bookFn.update(req);
        res.send(resp);
    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}});
    }   
}   
