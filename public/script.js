// Loader removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('dateTime').textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateDateTime, 1000);

// Update Battery Level and Metrics for Both Batteries
function updateBatteryLevel(batteryId, level) {
    const batteryPercent = document.getElementById(`battery-percent-${batteryId}`);
    batteryPercent.style.width = `${level}%`;

    // Change color based on battery level
    if (level > 70) {
        batteryPercent.style.backgroundColor = '#71cc1c';
    } else if (level > 30) {
        batteryPercent.style.backgroundColor = '#f7e31a';
    } else {
        batteryPercent.style.backgroundColor = '#f65568';
    }
}

function updateMetrics(batteryId, data) {
    document.getElementById(`voltage-${batteryId}`).textContent = `${data.voltage} V`;
    document.getElementById(`current-${batteryId}`).textContent = `${data.current} A`;
    document.getElementById(`temperature-${batteryId}`).textContent = `${data.temperature} °C`;
}

// Simulate Real-Time Data Updates for Both Batteries
setInterval(() => {
    const simulatedData1 = {
        batteryLevel: Math.floor(Math.random() * 100),
        voltage: (Math.random() * 15).toFixed(2),
        current: (Math.random() * 5).toFixed(2),
        temperature: (Math.random() * 50).toFixed(2),
    };

    const simulatedData2 = {
        batteryLevel: Math.floor(Math.random() * 100),
        voltage: (Math.random() * 15).toFixed(2),
        current: (Math.random() * 5).toFixed(2),
        temperature: (Math.random() * 50).toFixed(2),
    };

    updateBatteryLevel(1, simulatedData1.batteryLevel);
    updateMetrics(1, simulatedData1);

    updateBatteryLevel(2, simulatedData2.batteryLevel);
    updateMetrics(2, simulatedData2);
}, 2000); // Update every 2 seconds

// Add this to your existing script.js
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const batteryId = data.batteryId;

    // Update temperature limit (example)
    if (data.tempLimit) {
        console.log(`Battery ${batteryId} temp limit: ${data.tempLimit}°C`);
    }

    // Update charge rate (example)
    if (data.chargeRate) {
        console.log(`Battery ${batteryId} charge rate: ${data.chargeRate}%`);
        // Add logic to adjust battery charging here
    }
};