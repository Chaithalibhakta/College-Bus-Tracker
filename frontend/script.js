// =====================================
// API URL
// =====================================

const API_URL = "https://college-bus-tracker-7qxh.onrender.com";

// =====================================
// BUS DATA
// =====================================

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

// =====================================
// SEARCH BUS
// =====================================

function searchBus() {

    let route = document.getElementById("route").value;
    let result = document.getElementById("result");

    if (route === "") {

        result.innerHTML =
        "<h3>Please Select a Route</h3>";

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

// =====================================
// SHOW ADD BUS FORM
// =====================================

function addBus() {

    document.getElementById("busForm").style.display = "block";

}
// =====================================
// SAVE BUS
// =====================================

async function saveBus() {

    let busNo = document.getElementById("busNo").value;
    let route = document.getElementById("busRoute").value;
    let driver = document.getElementById("driverName").value;
    let status = document.getElementById("busStatus").value;

    if (busNo === "" || route === "" || driver === "" || status === "") {

        alert("Please fill all fields.");
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

    await fetch(`${API_URL}/buses`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newBus)

    });

    alert("Bus Added Successfully!");

    document.getElementById("busNo").value = "";
    document.getElementById("busRoute").value = "";
    document.getElementById("driverName").value = "";
    document.getElementById("busStatus").value = "";

    document.getElementById("busForm").style.display = "none";

    loadBuses();

}

// =====================================
// LOAD BUSES
// =====================================

async function loadBuses() {

    const response = await fetch(`${API_URL}/buses`);

    const buses = await response.json();

    const table = document.getElementById("busTable");

    if (!table) return;

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

        table.innerHTML += `

        <tr>

            <td>${bus.busNo}</td>

            <td>${bus.route}</td>

            <td>${bus.driver}</td>

            <td>${bus.status}</td>

            <td>

                <button onclick="editBus(${bus.id})">
                    Edit
                </button>

                <button onclick="deleteBus(${bus.id})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// =====================================
// EDIT BUS
// =====================================

async function editBus(id) {

    let busNo = prompt("Enter Bus Number");
    let route = prompt("Enter Route");
    let driver = prompt("Enter Driver Name");
    let status = prompt("Enter Status");

    if (busNo == null || route == null || driver == null || status == null) {

        return;

    }

    let updatedBus = {

        id: id,
        busNo: busNo,
        route: route,
        driver: driver,
        location: route,
        eta: "10 Minutes",
        status: status

    };

    await fetch(`${API_URL}/buses/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedBus)

    });

    alert("Bus Updated Successfully!");

    loadBuses();

}

// =====================================
// DELETE BUS
// =====================================

async function deleteBus(id) {

    let confirmDelete = confirm("Are you sure you want to delete this bus?");

    if (!confirmDelete) {

        return;

    }

    await fetch(`${API_URL}/buses/${id}`, {

        method: "DELETE"

    });

    alert("Bus Deleted Successfully!");

    loadBuses();

}
// =====================================
// DRIVER FUNCTIONS
// =====================================

// Start Trip
function startTrip() {

    alert("Trip Started Successfully!");

}

// End Trip
function endTrip() {

    alert("Trip Ended Successfully!");

}

// Emergency Alert
function emergencyAlert() {

    alert("Emergency Alert Sent to Admin!");

}

// Update Bus Location
async function updateLocation() {

    let route = document.getElementById("driverRoute").value;

    let location = document.getElementById("location").value;

    if (location === "") {

        alert("Please enter the current location.");

        return;

    }

    let response = await fetch(`${API_URL}/location`, {

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

// =====================================
// STUDENT LIVE TRACKING
// =====================================

async function loadTracking() {

    let route = document.getElementById("studentRoute").value;

    let response = await fetch(`${API_URL}/location?route=${route}`);

    let bus = await response.json();

    document.getElementById("studentTracking").innerHTML = `

        <p><strong>🚌 Route :</strong> ${route}</p>

        <p><strong>📍 Current Location :</strong> ${bus.location}</p>

        <p><strong>⏱ ETA :</strong> ${bus.eta}</p>

        <p><strong>✅ Status :</strong> ${bus.status}</p>

    `;

}
// =====================================
// SEND NOTIFICATION
// =====================================

function sendNotification() {

    let message = document.getElementById("notification").value;

    if (message === "") {

        alert("Please enter a notification.");

        return;

    }

    alert("Notification Sent Successfully!\n\n" + message);

    document.getElementById("notification").value = "";

}

// =====================================
// CONTACT DRIVER
// =====================================

function contactDriver() {

    alert("📞 Calling Driver...\n\nPhone: +91 9876543210");

}

// =====================================
// LOGOUT
// =====================================

function logout() {

    if (confirm("Do you want to Logout?")) {

        window.location.href = "login.html";

    }

}

// =====================================
// PAGE LOAD
// =====================================

window.onload = function () {

    console.log("College Bus Tracker Loaded Successfully.");

    // Load bus table only if it exists
    if (document.getElementById("busTable")) {

        loadBuses();

    }

    // Load student tracking only if student page is open
    if (document.getElementById("studentRoute")) {

        loadTracking();

    }

};