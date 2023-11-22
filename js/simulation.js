document.addEventListener('DOMContentLoaded', function () {
    const simulateButton = document.getElementById('simulateButton');
    simulateButton.addEventListener('click', simulateLED);
  });
  
  async function simulateLED() {
    const redInput = document.getElementById('red');
    const greenInput = document.getElementById('green');
    const blueInput = document.getElementById('blue');
  
    const red = parseInt(redInput.value, 10);
    const green = parseInt(greenInput.value, 10);
    const blue = parseInt(blueInput.value, 10);
    
    
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
      alert('Please enter valid RGB values.');
      return;
    }
  
    OrgdisplayLED(red,green,blue);
    ESP(red,green,blue);
    CS(red,green,blue);
    SVR(red,green,blue);
    // Perform the calculation (add +20 to each RGB value)
    const simulatedRed = Math.min(255, red + 10);
    const simulatedGreen = Math.min(255, green +28);
    const simulatedBlue = Math.min(255, blue + 18);
  
    // Display the simulated LED value
    displayLED(simulatedRed, simulatedGreen, simulatedBlue);
  
    // Send the data to your server
    const serverUrl = 'http://localhost:3486/post-data'; // Replace with your actual server URL
    const serverData = { red: red, green: green, blue: blue };
  
    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverData),
      });
  
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error sending data to server:', error.message);
    }
  }
  
  function displayLED(red, green, blue) {
    const ledContainer = document.getElementById('led-container');
    ledContainer.innerHTML = ''; // Clear previous content
  
    const svgCode = `
      <svg width="200px" height="200px" viewBox="0 0 24 24" fill="rgb(${red}, ${green}, ${blue})" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19.5H14M10.6667 22H13.3333" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M7.41058 13.6805L8.51463 14.7196C8.82437 15.0112 9 15.4177 9 15.843C9 16.482 9.518 17 10.157 17H13.843C14.482 17 15 16.482 15 15.843C15 15.4177 15.1756 15.0112 15.4854 14.7196L16.5894 13.6805C18.1306 12.2187 18.9912 10.2984 18.9999 8.30193L19 8.21807C19 4.8069 15.866 2 12 2C8.13401 2 5 4.8069 5 8.21807L5.00007 8.30193C5.00875 10.2984 5.86939 12.2187 7.41058 13.6805Z" stroke="#1C274C" stroke-width="1.5"/>
      </svg>
      <div class="rgb-values">
          <p>RED: ${red}, GREEN: ${green}, BLUE: ${blue}</p>
      </div>
    `;
  
    ledContainer.innerHTML = svgCode;
  }
  
  function OrgdisplayLED(red, green, blue) {
    const ledContainer = document.getElementById('org-container');
    ledContainer.innerHTML = ''; // Clear previous content
  
    const svgCode = `
      <svg width="200px" height="200px" viewBox="0 0 24 24" fill="rgb(${red}, ${green}, ${blue})" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19.5H14M10.6667 22H13.3333" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M7.41058 13.6805L8.51463 14.7196C8.82437 15.0112 9 15.4177 9 15.843C9 16.482 9.518 17 10.157 17H13.843C14.482 17 15 16.482 15 15.843C15 15.4177 15.1756 15.0112 15.4854 14.7196L16.5894 13.6805C18.1306 12.2187 18.9912 10.2984 18.9999 8.30193L19 8.21807C19 4.8069 15.866 2 12 2C8.13401 2 5 4.8069 5 8.21807L5.00007 8.30193C5.00875 10.2984 5.86939 12.2187 7.41058 13.6805Z" stroke="#1C274C" stroke-width="1.5"/>
      </svg>
      <div class="rgb-values">
          <p>RED: ${red}, GREEN: ${green}, BLUE: ${blue}</p>
      </div>
    `;
  
    ledContainer.innerHTML = svgCode;
  }

  function ESP(red, green, blue) {
    const ledContainer = document.getElementById('esp-container');
    ledContainer.innerHTML = ''; // Clear previous content

    // Create an image element
    const imgElement = document.createElement('img');

    // Set the image source (replace with the actual path)
    imgElement.setAttribute('src', 'images/1666364456Esp32_devkitc_v4.png');

    // Set the image size (replace with actual dimensions)
    imgElement.setAttribute('width', '300');
    imgElement.setAttribute('height', '300');

    imgElement.style.transform = 'rotate(90deg)';
    // Append the image element to the container
    ledContainer.appendChild(imgElement);

    // Add the RGB values
    const rgbValues = document.createElement('div');
    rgbValues.classList.add('rgb-values');
    rgbValues.innerHTML = `<p>RED: ${red}, GREEN: ${green}, BLUE: ${blue}</p>`;
    ledContainer.appendChild(rgbValues);

    
}

function CS(red, green, blue) {
  const ledContainer = document.getElementById('cs-container');
  ledContainer.innerHTML = ''; // Clear previous content

  // Create an image element
  const imgElement = document.createElement('img');

  // Set the image source (replace with the actual path)
  imgElement.setAttribute('src', 'images/cs.png');

  // Set the image size (replace with actual dimensions)
  imgElement.setAttribute('width', '300');
  imgElement.setAttribute('height', '300');

  imgElement.style.transform = 'rotate(90deg)';
  // Append the image element to the container
  ledContainer.appendChild(imgElement);

  // Add the RGB values
  const rgbValues = document.createElement('div');
  rgbValues.classList.add('rgb-values');
  rgbValues.innerHTML = `<p>RED: ${simulatedRed}, GREEN: ${simulatedGreen}, BLUE: ${simulatedBlues}</p>`;
  ledContainer.appendChild(rgbValues);

  
}

function SVGCIR(red, green, blue) {
  const ledContainer = document.getElementById('svg-container');
  ledContainer.innerHTML = ''; // Clear previous content

  const svgCode = ``;

  ledContainer.innerHTML = svgCode;
}

function SVR(red, green, blue) {
  const ledContainer = document.getElementById('server-container');
  ledContainer.innerHTML = ''; // Clear previous content

  // Create an image element
  const imgElement = document.createElement('img');

  // Set the image source (replace with the actual path)
  imgElement.setAttribute('src', 'images/server.png');

  // Set the image size (replace with actual dimensions)
  imgElement.setAttribute('width', '200');
  imgElement.setAttribute('height', '300');

  // imgElement.style.transform = 'rotate(90deg)';
  // Append the image element to the container
  ledContainer.appendChild(imgElement);

  // Add the RGB values
  const rgbValues = document.createElement('div');
  rgbValues.classList.add('rgb-values');
  rgbValues.innerHTML = `<p>RED: ${red}, GREEN: ${green}, BLUE: ${blue}</p>`;
  ledContainer.appendChild(rgbValues);

  
}
  