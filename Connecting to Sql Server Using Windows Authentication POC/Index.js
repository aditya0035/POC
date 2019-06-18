const mssql=require("mssql/msnodesqlv8")
const express=require("express")
const app=express();
const config={
     database: "Payments",
     server: "localhost",
     driver: "msnodesqlv8",
     options: {
        trustedConnection: true
  }
}
const connectionString=process.env.ConnectionString||"server=localhost;Database=Payments;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const pool= new mssql.ConnectionPool(connectionString);


app.get("/Payments",(request,response,next)=>{
    pool.connect().then(connectionPool=>{
        var request=connectionPool.request();
        request.query("select top(1) * from PaymentInstruction").then(result=>{
            response.setHeader("content-type","text/json");
            response.send(result.recordsets);
            response.end();
            pool.close();
        });
    });
});

app.listen(4000)