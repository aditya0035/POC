const config = {
    user: 'dbaUser',
    password: '123@Password',
    server: 'localhost',
    database: 'Payments'
}
const SqlConnection=require("./SqlConnection");
const SqlConnectionObj=new SqlConnection("server=localhost;database=payments;username=dbaUser;password=123@Password")
const SqlCommand=require("./SqlCommand");
const SqlCommandObj=new SqlCommand("Select top(1) * from outgoingpayment",SqlConnectionObj);
SqlCommandObj.CommandType=SqlCommand.CommandType.Text
SqlCommandObj.ExecuteReader((dataset)=>{
    console.log(dataset)
});




// var pool=new mssql.ConnectionPool(config)
// pool.connect().then(connectionPool=>{
//     var request=connectionPool.request();
//     request.stream=true;
//     request.query("select top(1) * from outgoingpayment");
//     request.on('recordset', columns => {
//         // Emitted once for each recordset in a query
//         console.log(columns)

//     })
 
//     request.on('row', row => {
//         // Emitted for each row in a recordset
//         //console.log(row)
//         //console.log(row)
//     })
 
//     request.on('error', err => {
//         // May be emitted multiple times
//         //console.log(err)
//     })
 
//     request.on('done', result => {
//         // Always emitted as the last one
//         //console.log(result)
//     })
// });