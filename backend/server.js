const path = require("path")
const express =  require('express')
const dotenv =require('dotenv')
const AppError =require('./utils/appError')
const globalerror =require('./Controller/errorcontroller')
dotenv.config()
const connectDB =require('./config/db')
const parser = require("cookie-parser")
const productrouter =require('./routes/productrouter');
const userrouter = require('./routes/userrouter');
const orderrouter = require("./routes/orderrouter")
const paymentrouter = require("./routes/bookingrouter")
const bookingrouter = require("./routes/bookingrouter")
const uploadrouter = require("./routes/uploadroutes")
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser"); 
const port = process.env.PORT || 5000;

connectDB(); // connecting to database

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())


// app.get('/',(req,res)=>{
//     res.send("API is running")
// })

app.use('/api/products/',productrouter)
app.use('/api/users/',userrouter)
app.use('/api/orders/',orderrouter)
app.use('/api/checkout-session/',bookingrouter)
app.use("/api/uploads",uploadrouter)

const _dirname = path.resolve();
app.use("/uploads",express.static(path.join(_dirname,"/uploads")))

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname,"/frontend/build")));

//     // app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"frontend","build","index.html")))
// }else{
//     app.get("/",(req,res)=>{
//         res.send("API is running")
// //     })
// }

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  } 





// app.get('/api/products/:id',(req,res)=>{
//     const product = products.find((p)=>p._id === req.params.id)
//     res.json(product)
//  })

//  app.all("*",(req,res,next)=>
// {    const err = new AppError(`can't find the ${req.originalUrl} on this server`,404));}
 
app.all("*",(req,res,next)=>{
//   res.status(404).json({
//        status:"Error",
//        message:`can't find the ${req.originalUrl} on this server`
//   })

    // const err = new AppError(`can't find the ${req.originalUrl} on this server`,404)
    // next(err);
    next(new AppError(`can't find the ${req.originalUrl} on this server`,404))
})

// app.use((err,req,res,next)=>{
//     console.log(err.stack)
//     err.statuscode = err.statuscode || 500;
//     err.status = err.status || "Error";

//     res.status(err.statuscode).json({
//         status : err.status,
//         message : err.message
//     })

// });
app.use(globalerror);




app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


module.exports = app;