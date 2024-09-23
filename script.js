const prayerTimesElement = document.querySelector('.prayer-times');
const detectLocationButton = document.querySelector('#detect-location');
const timezoneSelect = document.querySelector('#timezone');

// Aladhan API endpoint
const apiEndpoint = 'https://api.aladhan.com/v1/timings';

// Function to get all timezones
async function getAllTimezones() {
  const response = await fetch(`${apiEndpoint}/timezones`);
  const data = await response.json();
  return data.data;
}

// Function to populate timezone menu
async function populateTimezoneMenu() {
  const timezones = await getAllTimezones();
  timezones.forEach((timezone) => {
    const option = document.createElement('option');
    option.value = timezone;
    option.text = timezone;
    timezoneSelect.appendChild(option);
  });
}

// Call the function to populate the timezone menu
populateTimezoneMenu();

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

// Add event listener to detect location button
detectLocationButton.addEventListener('click', async () => {
  // Get user's location
  const location = await getLocation();
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  // Get selected timezone
  const timezone = timezoneSelect.value;

  // Get prayer times
  const prayerTimes = await getPrayerTimes(latitude, longitude, timezone);

  // Display prayer times
  displayPrayerTimes(prayerTimes);
});

// Function to get user's location
async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}