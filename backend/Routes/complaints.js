const express = require('express')
const router = express.Router()
const Complaint = require('../Models/Complaint')
const Offer = require('../Models/Offer')
const User = require('../Models/User')
const offers = require('../Routes/offers');
const findOfferById = offers.findOfferById;


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deliveriniDep@gmail.com',
    pass: 'deliverini123'
  }
});

var subject = "Deletion notice"
var text = "you have been deleted"

router.get('/allComplaints', async(req,res) =>{
    try{
        const data = await Complaint.find();
        res.json(data)
    } catch (error){
        res.status(500).json({message:err.message})
    }
});

router.post("/addComplaint", async (req, res) => {
    try {
        const { object , description, user, offer, state } = req.body;
        const complaint = await Complaint.create({
            object, description, user, offer, state
        });
        res.status(201).json({ message: 'Complaint posted', complaint });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch("/acceptComplaint/:id", async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaint = await Complaint.findById(complaintId);
        const user = await User.findById(complaint.offer.offeror.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        complaint.state = 'Accepted';
        if (user.nb_strikes > 2) {
            


            try {
                const info = await transporter.sendMail({
                  from: 'deliveriniDep@gmail.com',
                  to: user.email,
                  subject: subject,
                  text: text
                });
            
                console.log('Email sent: ' + info.response);
                res.send('Email sent successfully');
              } catch (error) {
                console.error('Error sending email: ', error);
                res.status(500).send('Error sending email');
              }



            await User.findByIdAndDelete(user.id);
            console.log('User deleted');
        } else {
            user.nb_strikes += 1;
            await user.save();
        }
        //notification
        await complaint.save();
        res.json({ message: 'Complaint accepted', complaint });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.patch("/rejectComplaint/:id", async (req, res) => {
    try {
        const complaintId = req.params.id;
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        complaint.state = 'Rejected';
        await complaint.save();
        res.json({ message: 'Complaint rejected', complaint });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router