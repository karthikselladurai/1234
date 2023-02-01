const createBus = require('./busServiceFn')
const logger = require('../../../services/logger')
const smsService = require('../../../services/notification/twilio')

exports.createBusService =  async (req,res)=> {
    try{
        let resp = await createBus.createBusService(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}})
    }   
}   
exports.updateBusService =  async (req,res)=> {
    try{
        let resp = await createBus.updateBusService(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}})
    }
}
exports.readBusService =  async (req,res)=> {
    try{
        let resp = await createBus.readBusService(req);
        res.send(resp);
    //    let smsResp = await  smsService.sendSms();
    //    console.log(smsResp);
       

    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}})
    }
}
exports.deleteBusService =  async (req,res)=> {
    try{
        let resp = await createBus.deleteBusService(req);
        res.send(resp)
    }catch(err){
        logger.error({status:"unsuccess",message:err,data:{}})
    }
}

