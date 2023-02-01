const { response } = require("express");
const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");


exports.transferAmount= async( req,res=response)=>{
try{
    const {amount, accountNumber, senderUserId}=req.body

    const userReceiver=await User.findOne({
        where:{
            status: true,
            accountNumber,
        }
    })
    
    const userMakeTransfer= await User.findOne({
        where: {
            status: true,
            id: senderUserId,
        }
    })
    console.log(userReceiver);
    const receiverUserId= userReceiver.id
    if(userReceiver===null){
        return res.status(404).json({
            status:'error',
            message:'User doesnt exist',
        });
    }
    if(userMakeTransfer===null){
        return res.status(404).json({
            status:'error',
            message:'User doesnt exist',
        });
    }

    if(amount> userMakeTransfer.amount){
        return res.status(404).json({
            status:'error',
            message:'Not enough funds',
        });
    }
    if(receiverUserId===senderUserId){
        return res.status(404).json({
            status:'error',
            message:'You cant transfer to yourself',
        });
    }
    const newAmountUserMakeTransfer= (userMakeTransfer.amount - amount)

    const newAmountUserReceiver= (userReceiver.amount + amount)

    await userMakeTransfer.update({ amount:newAmountUserMakeTransfer })

    await userReceiver.update({amount:newAmountUserReceiver})

    await Transfer.create({amount, senderUserId, receiverUserId})

    return res.status(201).json({
        status:'success',
        message:'Transfer done',

    });
} catch(error){
    console.log(error);
return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
})
}
}