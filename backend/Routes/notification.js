const express = require('express')
const router = express.Router()

const Notification = require('../Models/Notification')

router.get('/allNotifications', async(req,res) =>{
    try{
        const data = await Notification.find();
        res.json(data)
    } catch (error){
        res.status(500).json({message:err.message})
    }
});

router.post("/addNotification", async (req, res) => {
    try {
        const { text, user, state } = req.body;
        const notification = await Notification.create({
            text, user, state
        });
        res.status(201).json({ message: 'Notification posted', notification });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch("/readNotification/:id", async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.state = 'read';
        await notification.save();
        res.json({ message: 'Notification updated', notification });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;