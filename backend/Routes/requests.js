const express = require('express')
const router = express.Router()
const Request = require('../Models/Request')
const axios = require('axios')

//Get all requests
router.get("/allRequests", async (req,res)=>{
    try{
        const requests = await Request.find();
        res.json(requests)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//Post a request
router.post("/addRequest", async (req, res) => {
    try {
        const { sender, receiver, offer, departure, arrival } = req.body;
        const newRequest = await Request.create({
            sender,
            receiver,
            offer,
            departure,
            arrival
        });
        await axios.post('http://localhost:5000/notif/addNotification', {
            text: sender.firstName + ' ' + sender.lastName + ' has sent you a request to join your offer.',
            user: receiver,
            state: 'unread'
        });
        res.status(201).json({ message: 'Request created', newRequest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Delete Request By ID
router.delete("/deleteRequest/:id", async (req, res) => {
    try {
        console.log("Deleting request with ID:", req.params.id); // Log the ID being received
        const requestId = req.params.id;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        await Request.findByIdAndDelete(requestId); // Use findByIdAndDelete to remove the request
        res.json({ message: 'Request deleted' });
    } catch (err) {
        console.error("Error deleting request:", err); // Log any errors that occur
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Update Request By ID
router.patch("/updateRequest/:id", async (req, res) => {
    try {
        console.log("Updating request with ID:", req.params.id); // Log the ID being received
        const requestId = req.params.id;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        const { sender, receiver, offer, departure, arrival } = req.body;
        await Request.findByIdAndUpdate(requestId, {
            sender,
            receiver,
            offer,
            departure,
            arrival
        });
        res.json({ message: 'Request updated' });
    } catch (err) {
        console.error("Error updating request:", err); // Log any errors that occur
        res.status(500).json({ message: 'Internal server error' });
    }
});

const findReqById = async (id) => {
    try {
        const request = await Request.findById(id);
        if (!request) {
            console.log('Request not found');
            return null;
        }
        console.log('Request found:', request);
        return request;
    } catch (err) {
        console.error("Error fetching request by ID:", err);
        throw err;
    }
};

router.get("/",(req,res)=>{
    res.send("<h1>Requests working</h1>")
})

module.exports= router