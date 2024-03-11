const mongoose =require( "mongoose");
const dotenv =require( 'dotenv');
const users =require( "./Data/users");
const products =require("./Data/products").default;
const User =require( './Models/usermodel');
const Product =require( "./Models/productmodel");
const Order =require( "./Models/ordermodel");
const connectDB =require( './config/db')

dotenv.config();

connectDB();


const importdata = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createduser = await User.insertMany(users);
        const adminuser = createduser[0]._id;

        const sampleproducts = products.map((products)=>{
            return {...products,user:adminuser}
        })

        await Product.insertMany(sampleproducts);
        console.log("Data imported");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}

const destroydata = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data destroyed");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroydata();
}else{
    importdata();
}