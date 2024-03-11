const mongoose =require( "mongoose");
const bcrypt =require( 'bcryptjs')


const users = [
    {
        name:'Admin User',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John Doe',
        email:'john@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'Jane User',
        email:'jane@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
]

// export default users;