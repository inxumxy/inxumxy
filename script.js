const form = document.querySelector('form');
const latitudeInput = document.querySelector('#latitude');
const longitudeInput = document.querySelector('#longitude');
const timezoneInput = document.querySelector('#timezone');
const autoLocateButton = document.querySelector('#auto-locate');
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

autoLocateButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            latitudeInput.value = latitude;
            longitudeInput.value = longitude;
            timezoneInput.value = timezone;
            form.dispatchEvent(new Event('submit'));
        }, error => {
            console.error(error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function displayPrayerTimes(times) {
    const fajrTime = document.querySelector('#fajr');
    const dhuhrTime = document.querySelector('#dhuhr');
    const asrTime = document.querySelector('#asr');
    const maghribTime = document.querySelector('#maghrib');
    const ishaTime = document.querySelector('#isha');

    fajrTime.textContent = times.fajr;
    dhuhrTime.textContent = times.dhuhr;
    asrTime.textContent = times.asr;
    maghribTime.textContent = times.maghrib;
    ishaTime.textContent = times.isha;
}