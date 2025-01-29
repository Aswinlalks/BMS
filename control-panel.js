// Update charge rate display when slider changes
document.getElementById('charge-rate-1').addEventListener('input', (e) => {
    document.getElementById('charge-rate-display-1').textContent = `${e.target.value}%`;
});

document.getElementById('charge-rate-2').addEventListener('input', (e) => {
    document.getElementById('charge-rate-display-2').textContent = `${e.target.value}%`;
});

// Send temperature limit to the backend
function updateTemperatureLimit(batteryId) {
    const tempLimit = document.getElementById(`temp-limit-${batteryId}`).value;
    fetch('http://localhost:3000/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batteryId, tempLimit })
    }).then(response => {
        if (response.ok) {
            alert('Temperature limit updated!');
        }
    });
}

// Send charge rate to the backend (real-time)
document.getElementById('charge-rate-1').addEventListener('change', (e) => {
    const chargeRate = e.target.value;
    fetch('http://localhost:3000/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batteryId: 1, chargeRate })
    });
});

document.getElementById('charge-rate-2').addEventListener('change', (e) => {
    const chargeRate = e.target.value;
    fetch('http://localhost:3000/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batteryId: 2, chargeRate })
    });
});