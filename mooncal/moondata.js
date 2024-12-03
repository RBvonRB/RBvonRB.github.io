const lunarCycleDays = 29.53059; // Length of a lunar cycle in days

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to parse a given date string (YYYY-MM-DD) or return today's date
function parseDate(dateString) {
    if (dateString) {
        const parsedDate = new Date(dateString);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }
    return new Date(); // Default to today's date
}

// Function to format a Date object as YYYY-MM-DD for the API
function formatDateForAPI(date) {
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateForDisplay(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


// Function to get moon phase name based on normalized moon phase value
function getMoonPhaseName(normalizedPhase) {
    if (normalizedPhase === 0) {
        return 'Neumond';
    } else if (normalizedPhase > 0 && normalizedPhase < 0.25) {
        return 'Erstes Viertel';
    } else if (normalizedPhase === 0.25) {
        return 'Zunehmender Halbmond';
    } else if (normalizedPhase > 0.25 && normalizedPhase < 0.5) {
        return 'Zweites Viertel';
    } else if (normalizedPhase === 0.5) {
        return 'Vollmond';
    } else if (normalizedPhase > 0.5 && normalizedPhase < 0.75) {
        return 'Drittes Viertel';
    } else if (normalizedPhase === 0.75) {
        return 'Letztes Viertel';
    } else if (normalizedPhase > 0.75 && normalizedPhase < 1) {
        return 'Abnehmender Sichelmond';
    }
    return 'Neumond';
}

// Function to determine the closest moon phase image
function getMoonPhaseImage(normalizedPhase) {
    const totalImages = 30; // Total number of images (moonphase_1.png to moonphase_30.png)
    const closestIndex = Math.round(normalizedPhase * (totalImages - 1)); // Closest image index (1-based)
    return `assets/images/moonphases/moonphase_${closestIndex}.png`;
}


// Function to fetch moon phase data from the API
async function fetchMoonPhase(location, date, apiKey) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=us&key=${apiKey}&contentType=json`;
    console.log("Fetching API with URL:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        // Extract moon phase for the specified day
        const dayData = data.days[0]; // Assuming the first day's data matches the queried date
        if (dayData && dayData.moonphase !== undefined) {
            console.log("Moon phase found:", dayData.moonphase);
            return dayData.moonphase; // Return the normalized moon phase (0 - 1)
        }
    } catch (error) {
        console.error('Failed to fetch moon phase:', error);
    }

    return null; // Default to null if fetching fails
}

function getMoonPhasePercentage(normalizedPhase) {
    return Math.round(normalizedPhase * 100); // Convert to percentage and round off
}

// Initialize the page
async function initialize() {
    const queryDate = getQueryParam('date');
    const selectedDate = parseDate(queryDate);
    const dateForApi = formatDateForAPI(selectedDate);
    const location = getQueryParam('location') || 'Zurich, Switzerland'; // Default location
    const apiKey = 'B4FASJ2YJX3Z2PNFJSJV4GLBE'; // Replace with your actual API key

    // Fetch the moon phase from the API
    const apiMoonPhase = await fetchMoonPhase(location, dateForApi, apiKey);
    if (apiMoonPhase !== null) {
        const moonPhaseName = getMoonPhaseName(apiMoonPhase);
        const moonPhaseImage = getMoonPhaseImage(apiMoonPhase);
        const moonPhasePercentage = getMoonPhasePercentage(apiMoonPhase);

        // Update the UI with the moon phase data
        document.getElementById('moonPhaseImage').src = moonPhaseImage;
        const moonPhaseTextElement = document.getElementById('moonPhaseText');
        moonPhaseTextElement.innerHTML = `${moonPhaseName}<br>${moonPhasePercentage}%`;

    } else {
        document.getElementById('moonPhaseText').innerText = 'Unable to fetch moon phase.';
    }

    // Display the selected date
    const formattedDate = formatDateForDisplay(selectedDate);
    document.getElementById('date').innerText = formattedDate;
}

initialize();
