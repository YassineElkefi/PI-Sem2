const express = require('express')
const router = express.Router()
const Offer = require('../Models/Offer')
const Request = require('../Models/Request')
const requests = require('../Routes/requests');
const User = require('../Models/User');
const findReqById = requests.findReqById;


const findOfferById = async (id) => {
    try {
        const offer = await Offer.findById(id);
        if (!offer) {
            console.log('Offer not found');
            return null;
        }
        console.log('Offer found:', offer);
        return offer;
    } catch (err) {
        console.error("Error fetching offer by ID:", err);
        throw err;
    }
};

router.get("/findOfferById/:id", async(req,res) =>{
    const offerId = req.params.id;
    try{
        const data = await findOfferById(offerId)
        res.json(data)
    } catch (error){
        res.status(500).json({message:err.message})
    }
})

router.get('/allOffers', async(req,res) =>{
    try{
        const data = await Offer.find();
        res.json(data)
    } catch (error){
        res.status(500).json({message:err.message})
    }
});


router.post("/addOffer", async (req, res) => {
    try {
        const { title, path, type, nb_ppl, nb_pkg, departure_time, departure_date,price,car, offeror, state,participants, rate } = req.body;
        const offer = await Offer.create({
            title, path, type, nb_ppl, nb_pkg, departure_time, departure_date,price, car, offeror, state,participants, rate
        });
        res.status(201).json({ message: 'Offer posted', offer });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.patch("/editOffer/:id", async (req, res) => {
    try {
        const offerId = req.params.id;
        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        const { title, path, type, nb_ppl, nb_pkg, departure_time, departure_date, state } = req.body;
        await Offer.findByIdAndUpdate(offerId, {
            title, path, type, nb_ppl, nb_pkg, departure_time, departure_date, state
        });
        res.json({ message: 'Offer updated' });
    } catch (err) {
        console.error("Error updating offer:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete("/deleteOffer/:id", async (req, res) => {
    try {
        const offerId = req.params.id;
        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        await Offer.findByIdAndDelete(offerId);
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        console.error("Error deleting the offer:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch("/acceptRequest/:id", async (req, res) => {
    const requestId = req.params.id;
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const offer = await Offer.findById(request.offer._id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        if (offer.type === 'Carpooling') {
            if (offer.nb_ppl === 0) {
                return res.status(400).json({ message: 'Offer is completed' });
            }
            offer.nb_ppl--;
            offer.participants.push(request.sender);
        } else if (offer.type === 'Delivery') {
            if (offer.nb_pkg === 0) {
                return res.status(400).json({ message: 'Offer is completed' });
            }
            offer.nb_pkg--;
            offer.participants.push(request.sender);

        }

        request.state = "Approved";
        await request.save();
        await offer.save();

        const user = await User.findById(request.sender.id);
        if(user){
            user.currentOffer = offer;
            user.haveRated = false;
            await user.save();
        }

        res.json({ message: 'Request and Offer updated' });
    } catch (err) {
        console.error("Error updating request and offer:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.patch("/declineRequest/:id", async (req, res) => {
    const requestId = req.params.id;
    try {
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        console.log(request)
        request.state = "Declined";
        await request.save();

        res.json({ message: 'Request declined successfully' });
    } catch (err) {
        console.error("Error :", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.patch("/completeOffer/:id", async (req, res) => {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        offer.state = "Completed";
        await offer.save();
        res.json({ message: 'Offer completed successfully' });
    } catch (err) {
        console.error("Error :", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);


router.post("/rateOffer/:offerId/:userId/:rating", async (req, res) => {
    const { offerId, userId, rating } = req.params;
    
    try {
        // Find the offer by ID
        const offer = await findOfferById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate new rating and update ratings array
        const newRating = parseInt(rating);
        offer.ratings.push({
            rater: user,
            rating: newRating
        });

        // Update rate attribute
        const totalRatings = offer.ratings.length;
        const currentRating = offer.rate * (totalRatings - 1); // Previous total rating points
        const updatedRating = (currentRating + newRating) / totalRatings; // New average rating
        offer.rate = updatedRating;

        // Save changes to the offer
        await offer.save();

        // Update user's currentOffer and haveRated attributes
        user.currentOffer = null;
        user.haveRated = true;
        await user.save();

        // Send success response
        res.status(200).json({ message: 'Offer rated successfully', updatedRating });
    } catch (err) {
        console.error("Error rating offer:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/",(req,res)=>{
    res.send("<h1>Requests working</h1>")
})

module.exports= router




/*function insertPostData(){
    Offer.insertMany([{
        title: "test",
        description: "desc test",
        path: "tunis - ariana",
        type: "livraison",
        nb_ppl: 0,
        nb_pkg: 4,
        departure_time: "9am",
        departure_date: "monday"
    }])
}


insertPostData();*/