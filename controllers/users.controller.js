const { response } = require("express");
const User = require("../models/user.model");


exports.register= async(req,res)=>{
    try {
    const {name,password}=req.body;
    const newUser= await User.create({
    
        name: name.toLowerCase(),
        accountNumber: Math.floor(100000 + Math.random()*900000),
        password,
       
    })
    res.status(201).json({
        status:'success',
        message: 'User created',
        newUser,
    });
}catch(error){
    console.log(error);
return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
})
}
};

exports.login= async(req,res)=>{
try {
    
    const {accountNumber,password}=req.body;

    const user= await User.findOne({
        where:{
            accountNumber,
            status: 'true',
            password,
        },
    });
    if(user===null){
        return res.status(404).json({
            status:'error',
            message:'The user was not found',
        })
    }
    res.status(201).json({
        status:'success',
        message: 'User logged',
        user,
    });
} 
catch(error){
    console.log(error);
return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
})
}
};
