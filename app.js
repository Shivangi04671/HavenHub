const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
//const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}



app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.engine('ejs', ejsMate);

app.get("/", (req,res) => {
    res.send("hi");
});

app.get("/listings", async (req,res) => {
    const allListings = await Listing.find({});
    res.json({allListings});
    res.render("listings/index.ejs", {allListings});
    
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")

});

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.json({listing});
    res.render("listings/show.ejs", {listing});
});

// create route
app.post("/listings", async (req ,res) => {
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");

});




// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//  //       });
//
    // await sampleListing.save();
    //console.log("sample was saved");
    //res.send("successful testing");
//
// });
app.listen(8080, () => {
    console.log("server is listening");
});