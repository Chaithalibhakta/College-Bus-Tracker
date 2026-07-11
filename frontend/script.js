const API_URL = "http://localhost:3000/buses";
// ==========================
// BUS DATA
// ==========================

const buses = {

    "Ramakrishnanagar": {
        busNo: "KA09 AB 1234",
        driver: "Ramesh Kumar",
        location: "Ramakrishnanagar Circle",
        eta: "10 Minutes",
        status: "On Time"
    },

    "Kuvempunagar": {
        busNo: "KA09 AB 2345",
        driver: "Suresh",
        location: "Kuvempunagar Bus Stop",
        eta: "8 Minutes",
        status: "On Time"
    },

    "Saraswathipuram": {
        busNo: "KA09 AB 3456",
        driver: "Mahesh",
        location: "Saraswathipuram Signal",
        eta: "12 Minutes",
        status: "Delayed by 2 Minutes"
    },

    "TJ Layout": {
        busNo: "KA09 AB 4567",
        driver: "Ravi",
        location: "T.J. Layout Main Road",
        eta: "15 Minutes",
        status: "On Time"
    },

    "Hebbal": {
        busNo: "KA09 AB 5678",
        driver: "Prakash",
        location: "Hebbal Ring Road",
        eta: "9 Minutes",
        status: "On Time"
    }

};

// ==========================
// SEARCH BUS
// ==========================

function searchBus() {

    let route = document.getElementById("route").value;
    let result = document.getElementById("result");

    if (route == "") {

        result.innerHTML = "<h3>Please Select a Route</h3>";

        return;

    }

    let bus = buses[route];

    result.innerHTML = `
        <h3>${route}</h3>

        <p><strong>🚌 Bus Number :</strong> ${bus.busNo}</p>

        <p><strong>👨 Driver :</strong> ${bus.driver}</p>

        <p><strong>📍 Current Location :</strong> ${bus.location}</p>

        <p><strong>⏱ ETA :</strong> ${bus.eta}</p>

        <p><strong>✅ Status :</strong> ${bus.status}</p>
    `;

}

// ==========================
// SHOW BUS FORM
// ==========================

function addBus() {

    document.getElementById("busForm").style.display = "block";

}

// ==========================
// SAVE BUS
// ==========================

// ==========================
// ADD BUS TO SERVER
// ==========================

async function saveBus() {

    let busNo = document.getElementById("busNo").value;
    let route = document.getElementById("busRoute").value;
    let driver = document.getElementById("driverName").value;
    let status = document.getElementById("busStatus").value;


    if(busNo=="" || route=="" || driver=="" || status==""){

        alert("Please fill all fields");

        return;

    }


    let newBus = {

        id: Date.now(),

        busNo: busNo,

        route: route,

        driver: driver,

        location: route,

        eta: "10 Minutes",

        status: status

    };


    await fetch(API_URL, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(newBus)

    });


    alert("Bus Added Successfully");


    document.getElementById("busNo").value="";
    document.getElementById("busRoute").value="";
    document.getElementById("driverName").value="";
    document.getElementById("busStatus").value="";


    document.getElementById("busForm").style.display="none";


    loadBuses();

}
// ==========================
// EDIT BUS
// ==========================

// ==========================
// EDIT BUS
// ==========================

async function editBus(id){

    let busNo = prompt("Enter Bus Number");

    let route = prompt("Enter Route");

    let driver = prompt("Enter Driver Name");

    let status = prompt("Enter Status");


    if(busNo==null || route==null || driver==null || status==null){

        return;

    }


    let updatedBus = {

        id:id,

        busNo:busNo,

        route:route,

        driver:driver,

        location:route,

        eta:"10 Minutes",

        status:status

    };


    await fetch(`${API_URL}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(updatedBus)

    });


    alert("Bus Updated Successfully");


    loadBuses();

}

// ==========================
// DELETE BUS
// ==========================

// ==========================
// DELETE BUS FROM SERVER
// ==========================

async function deleteBus(id){

    let confirmDelete = confirm(
        "Are you sure you want to delete this bus?"
    );


    if(!confirmDelete){
        return;
    }


    await fetch(`${API_URL}/${id}`,{

        method:"DELETE"

    });


    alert("Bus Deleted Successfully");


    loadBuses();

}

// ==========================
// SEND NOTIFICATION
// ==========================

function sendNotification() {

    let message = document.getElementById("notification").value;

    if (message == "") {

        alert("Please enter a notification.");

        return;

    }

    alert("Notification Sent Successfully!\n\n" + message);

    document.getElementById("notification").value = "";

}

// ==========================
// CONTACT DRIVER
// ==========================

function contactDriver() {

    alert("Calling Driver...\n\nPhone: +91 9876543210");

}

// ==========================
// LOGOUT
// ==========================

function logout() {

    if (confirm("Do you want to logout?")) {

        window.location.href = "login.html";

    }

}

// ==========================
// PAGE LOADED
// ==========================

window.onload = function () {

    console.log("College Bus Tracker Loaded Successfully.");

};
// ==========================
// LOAD BUSES FROM SERVER
// ==========================

async function loadBuses(){

    let response = await fetch(API_URL);

    let buses = await response.json();

    let table = document.getElementById("busTable");

    // remove old rows except heading
    table.innerHTML = `
    <tr>
        <th>Bus Number</th>
        <th>Route</th>
        <th>Driver</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    `;


    buses.forEach(bus => {

        let row = table.insertRow(-1);

        row.insertCell(0).innerHTML = bus.busNo;
        row.insertCell(1).innerHTML = bus.route;
        row.insertCell(2).innerHTML = bus.driver;
        row.insertCell(3).innerHTML = bus.status;

        row.insertCell(4).innerHTML =
        `
        <button onclick="deleteBus(${bus.id})">
Delete
</button>
        `;

    });

}
// ==========================
// DRIVER FUNCTIONS
// ==========================

function startTrip(){

    alert("Trip Started Successfully!");

}


function endTrip(){

    alert("Trip Ended Successfully!");

}


async function updateLocation() {

    let route = document.getElementById("driverRoute").value;

    let location = document.getElementById("location").value;

    if (location === "") {

        alert("Please enter the current location.");

        return;

    }

    let response = await fetch("http://localhost:3000/location", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            route: route,

            location: location,

            status: "On Route"

        })

    });

    let data = await response.json();

    alert(data.message);

    document.getElementById("location").value = "";

}
async function loadBuses() {

    const response = await fetch("http://localhost:3000/buses");

    const buses = await response.json();

    let table = document.getElementById("busTable");

    table.innerHTML = `

        <tr>
            <th>Bus No</th>
            <th>Route</th>
            <th>Driver</th>
            <th>Status</th>
        </tr>

    `;

    buses.forEach(bus => {

        table.innerHTML += `

            <tr>

                <td>${bus.busNo}</td>

                <td>${bus.route}</td>

                <td>${bus.driver}</td>

                <td>${bus.status}</td>

            </tr>

        `;

    });

}

// Load when page opens

window.onload = loadBuses;
if (document.getElementById("busTable")) {
    loadBuses();
}