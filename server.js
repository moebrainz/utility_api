const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userController = require("./controller/Usercontrol");
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use(cors())



app.post("/login", userController.login)
app.post("/register", userController.signup)



app.use("*",(req,res)=>{
    res.status(404).json({status:false,message:"Resource not found"})
})

let myMainPort = 3005;

app.listen(myMainPort, () => {
  console.log(`server started, running on port ${myMainPort}`);
});
