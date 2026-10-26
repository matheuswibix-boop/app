const api=require('../server/core');
module.exports=(req,res)=>req.method==='POST'?api.postLead(req,res):api.listLeads(req,res);
