const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const User = require('../Models/User')


//Routes
router.post('/register',async (req,res)=>{
    try{
    const {cin,firstName,lastName,password,email,phone,address,car,nb_strikes,avatar} = req.body
    
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
        nb_strikes,
        avatar
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
                nb_strikes:user.nb_strikes,
                avatar:user.avatar,
                currentOffer:user?.currentOffer,
                haveRated:user?.haveRated
            }
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
});
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/allUsers', async(req,res) =>{
    try{
        const data = await User.find();
        res.json(data)
    } catch (error){
        res.status(500).json({message:err.message})
    }
});

router.put('/user/updateProfile/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
  
      res.status(200).json({ user: updatedUser, message: 'Profile information updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(uploadDir, 'avatars'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });

// Route to update user's avatar
router.put('/user/updateAvatar/:userId', upload.single('avatar'), async (req, res) => {
    try {
        const { userId } = req.params;
        const avatarFileName = req.file.filename;

        const updatedUser = await User.findByIdAndUpdate(userId, { avatar: avatarFileName }, { new: true });

        res.status(200).json({ user: updatedUser, message: 'Avatar updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

