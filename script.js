const form = document.querySelector('form');
const latitudeInput = document.querySelector('#latitude');
const longitudeInput = document.querySelector('#longitude');
const timezoneInput = document.querySelector('#timezone');
const prayerTimesSection = document.querySelector('#prayer-times');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;
    const timezone = timezoneInput.value;
    const prayTimes = new PrayTimes('ISNA');
    const times = prayTimes.getTimes(new Date(), [latitude, longitude], timezone);
    displayPrayerTimes(times);
});

function displayPrayerTimes(times) {
    const fajrTime = document.querySelector('#fajr');
    const dhuhrTime = document.querySelector('#dhuhr');
    const asrTime = document.querySelector('#asr');
    const maghribTime = document.querySelector('#maghrib');
    const ishaTime = document.querySelector('#isha');