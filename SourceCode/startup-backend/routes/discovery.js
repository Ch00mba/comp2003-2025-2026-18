const express = require('express');
const router = express.Router();

//discovery feed
router.get('/places', async (req, res) => {
    const places = await Place.find(); //mongoDB query
    res.json(places);
});

//single place details
router.get('/places/:id', async (req, res) => {
    const place = await Place.findById(req.params.id); 
    res.json(place);
});

//search
router.get('/places/search', async (req, res) => {
    const query = req.query.query;
    const results = await Place.find({ name: new RegExp(query, 'i') }); 
    res.json(results);
});

//filter
router.get('/places/filter', async (req, res) => {
    const { category, location } = req.query;
    const results = await Place.find({ category, location }); 
    res.json(results);
});

module.exports = router;

