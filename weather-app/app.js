const apiKey = 'hidden';
const city = 'Delhi'; // or any city you want

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(url);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // console.log(data);        

        console.log(`Weather in ${city}:`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Condition: ${data.weather[0].description}`);
    } catch (err) {
        console.error('Error fetching weather data:', err.message);
    }
}

getWeather();
