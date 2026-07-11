const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===============================
// BUS DATABASE
// ===============================

let buses = [

    {
        id: 1,
        busNo: "KA09 AB1234",
        route: "Ramakrishnanagar",
        driver: "Ramesh Kumar",
        location: "Ramakrishnanagar Circle",
        status: "On Time",
        eta: "10 Minutes"
    },

    {
        id: 2,
        busNo: "KA09 AB2345",
        route: "Kuvempunagar",
        driver: "Suresh",
        location: "Kuvempunagar Bus Stop",
        status: "On Time",
        eta: "8 Minutes"
    },

    {
        id: 3,
        busNo: "KA09 AB3456",
        route: "Saraswathipuram",
        driver: "Mahesh",
        location: "Saraswathipuram Signal",
        status: "Delayed",
        eta: "12 Minutes"
    },

    {
        id: 4,
        busNo: "KA09 AB4567",
        route: "TJ Layout",
        driver: "Ravi",
        location: "TJ Layout Main Road",
        status: "On Time",
        eta: "15 Minutes"
    },

    {
        id: 5,
        busNo: "KA09 AB5678",
        route: "Hebbal",
        driver: "Prakash",
        location: "Hebbal Ring Road",
        status: "On Time",
        eta: "9 Minutes"
    }

];

// ===============================
// GET ALL BUSES
// ===============================

app.get("/buses", (req, res) => {

    res.json(buses);

});

// ===============================
// ADD NEW BUS
// ===============================

app.post("/buses", (req, res) => {

    const newBus = req.body;

    buses.push(newBus);

    res.json({

        message: "Bus Added Successfully",

        bus: newBus

    });

});
// ===============================
// UPDATE BUS
// ===============================

app.put("/buses/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = buses.findIndex(bus => bus.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Bus Not Found"
        });

    }

    buses[index] = {
        ...buses[index],
        ...req.body
    };

    res.json({
        message: "Bus Updated Successfully",
        bus: buses[index]
    });

});

// ===============================
// DELETE BUS
// ===============================

app.delete("/buses/:id", (req, res) => {

    const id = parseInt(req.params.id);

    buses = buses.filter(bus => bus.id !== id);

    res.json({
        message: "Bus Deleted Successfully"
    });

});

// ===============================
// GET LOCATION BY ROUTE
// ===============================

app.get("/location", (req, res) => {

    const route = req.query.route || "Ramakrishnanagar";

    const bus = buses.find(b => b.route === route);

    if (!bus) {

        return res.status(404).json({
            message: "Route Not Found"
        });

    }

    res.json(bus);

});

// ===============================
// DRIVER UPDATES LOCATION
// ===============================

app.put("/location", (req, res) => {

    const { route, location, status } = req.body;

    const bus = buses.find(b => b.route === route);

    if (!bus) {

        return res.status(404).json({
            message: "Route Not Found"
        });

    }

    if (location) {
        bus.location = location;
    }

    if (status) {
        bus.status = status;
    }

    res.json({
        message: "Location Updated Successfully",
        bus: bus
    });

});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(`🚍 College Bus Tracker Server Running`);
    console.log(`🌐 http://localhost:${PORT}`);

});