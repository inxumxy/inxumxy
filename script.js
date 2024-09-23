const prayerTimesElement = document.querySelector('.prayer-times');
const detectLocationButton = document.querySelector('#detect-location');
const timezoneSelect = document.querySelector('#timezone');

// Aladhan API endpoint
const apiEndpoint = 'https://api.aladhan.com/v1/timings';

// Function to get prayer times
async function getPrayerTimes(latitude, longitude, timezone) {
    const response = await fetch(`${apiEndpoint}/${latitude}/${longitude}/${timezone}`);
    const data = await response.json();
    return data.data.timings;
}

// Function to display prayer times
function displayPrayerTimes(prayerTimes) {
    prayerTimesElement.innerHTML = '';
    Object.keys(prayerTimes).forEach((key) => {
        const time = prayerTimes[key];
        const element = document.createElement('h2');
        element.textContent = `${key}: ${time}`;
        prayerTimesElement.appendChild(element);
    });
}

// Function