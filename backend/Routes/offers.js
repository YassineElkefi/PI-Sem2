const express = require('express')
const router = express.Router()
const Offer = require('../Models/Offer')
const Request = require('../Models/Request')
const requests = require('../Routes/requests');
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
        const { title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date,price } = req.body;
        const offer = await Offer.create({
            title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date,price
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
        const { title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date } = req.body;
        await Offer.findByIdAndUpdate(offerId, {
            title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date
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

router.patch("/acceptRequest/:id/:offerId", async (req, res) => {
    const requestId = req.params.id;
    const offerId = req.params.offerId;
    try {
        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        const { sender, receiver, departure, arrival, state } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.state = "Approved";
        await request.save();

        if (offer.type === 'Carpooling') {
            offer.nb_ppl = Math.max(0, offer.nb_ppl - 1);
        } else if (offer.type === 'Delivery') {
            offer.nb_pkg = Math.max(0, offer.nb_pkg - 1);
        }

        await Offer.findByIdAndUpdate(offerId, {
            title: offer.title,
            description: offer.description,
            path: offer.path,
            type: offer.type,
            nb_ppl: offer.nb_ppl,
            nb_pkg: offer.nb_pkg,
            departure_time: offer.departure_time,
            departure_date: offer.departure_date
        });

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