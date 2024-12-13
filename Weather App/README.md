# Weather Dashboard React Application

## Project Overview

This Weather Dashboard is a React-based web application that allows users to retrieve and manage weather information for multiple cities. The application provides features like adding cities, searching for weather data, and dynamically updating city information.

## Features

- **Add Cities**: 
  - Retrieve weather for predefined cities
  - Limit to a maximum of 4 active city weather displays

- **Weather Information**:
  - City name
  - Weather description (editable)
  - Temperature in Celsius
  - Atmospheric pressure
  - Data age

- **Interaction Capabilities**:
  - Dynamic city selection
  - Editable weather descriptions
  - Delete individual city weather entries
  - Prevent duplicate city entries
  - Highlight existing city entries

## Technologies Used

- React
- Axios (HTTP requests)
- Tailwind CSS (Styling)
- FontAwesome (Icons)

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/weather-dashboard.git
```

2. Navigate to the project directory
```bash
cd weather-dashboard
```

3. Install dependencies
```bash
npm install
```

4. Install additional required packages
```bash
npm install axios @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome tailwindcss
```

## Running the Application

```bash
npm start
```

## Usage Guide

### Adding Cities
- Click "Get Weather" to automatically add the next available city
- Use the search bar to add a specific city by name
- Maximum of 4 cities can be active simultaneously

### Managing Weather Entries
- Edit weather descriptions directly in the table
- Delete city entries using the trash icon
- Attempting to add an existing city will highlight the current entry

## API Integration

The application uses a custom weather API endpoint:
`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityName}`

### Note on Data
- Weather data is fetched dynamically
- Data age is randomly generated for demonstration purposes

## Styling

Styled using Tailwind CSS with:
- Responsive design
- Color-coded interactions
- Clean, modern UI

## Potential Improvements
- Add error handling for API requests
- Implement persistent storage
- Create more robust city validation
- Add more detailed weather information

## License

[Specify your license - e.g., MIT License]

## Contact

Aditya Mishra
[adityadevansh2002@gmail.com]