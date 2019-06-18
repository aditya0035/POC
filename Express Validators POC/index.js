const express=require("express");
const {validationResult} =require('express-validator/check')
const app=express();
const validator=require("./validator")
const {parse} =require("querystring")
app.get("/v1/payments",[validator.PageValidation,validator.PageSizeValidation],(request,response,next)=>{
  const erro=validationResult(request);
  if(!erro.isEmpty()){
      var errorFilterForORField={
        pageORpagesize:false
      }
      var errorMessages=erro.array().map((item)=>{
        if(item.param==='page'&& !errorFilterForORField.pageORpagesize)
        {
          errorFilterForORField.pageORpagesize=true
          return item.msg;
        }
        else if(item.param==='pagesize' && !errorFilterForORField.pageORpagesize)
        {
          errorFilterForORField.pageORpagesize=true
          console.log(item.msg);
          return item.msg;
        }
      });
      response.status(400).json(errorMessages);
  }
  else{
    qsobject=request.query;
    var paymentMethod=qsobject.PaymentMethodId?[...qsobject.PaymentMethodId]:null;
    console.log(paymentMethod)
    response.send({"Message":qsobject})
  }
});

app.listen(4000);