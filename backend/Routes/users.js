const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const User = require('../Models/User')


//Routes
router.post('/register',async (req,res)=>{
    try{
    const {cin,firstName,lastName,password,email,phone,address,car,nb_strikes} = req.body
    
    let user = await User.findOne({cin});

    if(user){
        return res.status(400).json({msg:"User already exists"})
    }

    user = new User({
        cin,
        firstName,
        lastName,
        password,
        email,
        phone,
        address,
        car,
        nb_strikes
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();

    res.status(201).json({msg:"User created successfully"});
}catch(err){
    console.error(err.message);
    res.status(500).send('Internal Server Error')


}});

router.post('/login',async (req,res)=>{
    try{
        const {cin,password} = req.body;
        
        const user = await User.findOne({cin});
        if(!user){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1h'});
        
        res.status(200).json({
            token,
            user:{
                id:user._id,
                cin:user.cin,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                phone:user.phone,
                address:user.address,
                car:user.car,
                nb_strikes:user.nb_strikes
            }
        });

        // res.json({
        //     token,
        //     user:{
        //         id:user._id,
        //         cin:user.cin,
        //         firstName:user.firstName,
        //         lastName:user.lastName,
        //         email:user.email,
        //         phone:user.phone,
        //         address:user.address,
        //         car:user.car,
        //         nb_strikes:user.nb_strikes
        //     }
        // });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
});
module.exports = router;

