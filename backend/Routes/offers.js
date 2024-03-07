const express = require('express')
const router = express.Router()
const Offer = require('../Models/Offer')


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
        const { title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date } = req.body;
        const offer = await Offer.create({
            title, description, path, type, nb_ppl, nb_pkg, departure_time, departure_date
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