const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")



const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
    initDB();
}


    

const initDB = async() => {
    await   Listing.deleteMany({});
    initData.data= initData.data.map((obj) => ({...obj, owner: "6971d969f90f4678369a3059",}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};




