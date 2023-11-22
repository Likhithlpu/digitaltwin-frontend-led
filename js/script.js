// script.js

// Assume you have elements with IDs "led-container1" and "led-container2" for your LEDs in your HTML

function fetchLedColor() {
    return [255, 0, 0]; // Example: Red color
  }
  
  function updateLedColor(ledContainerId, rgbValues) {
    const ledContainer = document.getElementById(ledContainerId);
  
    if (ledContainer) {
      const [red, green, blue] = rgbValues;
      ledContainer.innerHTML = `
      <svg width="200px" height="200px" viewBox="0 0 24 24" fill="rgb(${red}, ${green}, ${blue})" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 19.5H14M10.6667 22H13.3333" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7.41058 13.6805L8.51463 14.7196C8.82437 15.0112 9 15.4177 9 15.843C9 16.482 9.518 17 10.157 17H13.843C14.482 17 15 16.482 15 15.843C15 15.4177 15.1756 15.0112 15.4854 14.7196L16.5894 13.6805C18.1306 12.2187 18.9912 10.2984 18.9999 8.30193L19 8.21807C19 4.8069 15.866 2 12 2C8.13401 2 5 4.8069 5 8.21807L5.00007 8.30193C5.00875 10.2984 5.86939 12.2187 7.41058 13.6805Z" stroke="#1C274C" stroke-width="1.5"/>
      </svg>
      <div class="rgb-values">
        <p>RED: ${red} , GREEN: ${green}, BLUE: ${blue}</p>
      </div>
      `;
    } else {
      console.error(`LED container with ID ${ledContainerId} not found.`);
    }
  }
  
  async function fetchData() {
    try {
      const response = await fetch('http://192.168.0.109:3486/latest-data-node2');
      const data = await response.json();
  
      // Extract RGB values
      const rgbLed1 = [data.current_led_red, data.current_led_green, data.current_led_blue];
      const rgbLed2 = [data.saved_sensor_red, data.saved_sensor_green, data.saved_sensor_blue];
  
      // Update LED colors
      updateLedColor('led-container1', rgbLed1);
      updateLedColor('led-container2', rgbLed2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Fetch data and update LED colors every 5 seconds (adjust as needed)
  setInterval(fetchData, 5000);

  

  document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the button
    document.getElementById('sendValuesButton').addEventListener('click', function () {
        // Get values from input boxes
        const red = document.getElementById('red').value;
        const blue = document.getElementById('blue').value;
        const green = document.getElementById('green').value;

        // Check if values are not empty
        if (red && blue && green) {
            // Prepare data to send to the backend API
            const data = {
                red: red,
                blue: blue,
                green: green
            };

            // Make an API request using fetch
            fetch('http://192.168.0.109:3486/post-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the API if needed
                    console.log('API Response:', data);

                    // Clear input values after a successful API request
                    document.getElementById('red').value = '';
                    document.getElementById('blue').value = '';
                    document.getElementById('green').value = '';

                    alert('Values sent successfully!');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please enter values in all three boxes.');
        }
    });
});

  