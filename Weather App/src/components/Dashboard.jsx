import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [weatherDisplay, setWeatherDisplay] = useState([]);
  const [cities, setCities] = useState([
    { city: "Las Vegas", flag: false },
    { city: "London", flag: false },
    { city: "Los Angeles", flag: false },
    { city: "New York", flag: false },
  ]);

  const [cityName, setCityName] = useState();
  const [searchCity, setSearchCity] = useState("");
  const [highlightedCity, setHighlightedCity] = useState(null);

  const handleDescriptionChange = (weatherId, newDescription) => {
    const updatedWeatherDisplay = weatherDisplay.map((weather) => {
      if (weather.id === weatherId) {
        return { ...weather, description: newDescription };
      }
      return weather;
    });

    setWeatherDisplay(updatedWeatherDisplay);
  };

  const handleClick = (state, city = null) => {
    // Normalize the city name (trim and convert to lowercase)
    const normalizedCity = city ? city.trim().toLowerCase() : null;

    // Check if the city already exists in weatherDisplay
    const isCityExists = weatherDisplay.some(
      (weather) => weather.city.toLowerCase() === normalizedCity
    );

    if (isCityExists) {
      // Highlight the existing city
      setHighlightedCity(normalizedCity);
      setSearchCity(""); // Clear the search input
      return;
    }

    if (state === "Get Weather") {
      const updatedCities = [...cities];
      let selectedCity = null;
      for (let i = 0; i < updatedCities.length; i++) {
        if (updatedCities[i].flag === false) {
          updatedCities[i].flag = true;
          selectedCity = updatedCities[i].city;
          break;
        }
      }
      setCityName(selectedCity);
      setCities(updatedCities);
    } else if (city !== null) {
      const updatedCities = cities.map((val) => {
        if (val.city.toLowerCase() === normalizedCity) {
          return { ...val, flag: true };
        }
        return val;
      });

      setCities(updatedCities);
      setCityName(city);
      setSearchCity(""); // Clear the search input
    }
  };

  const handleDelete = (weatherId, city) => {
    const updatedWeatherDisplay = weatherDisplay.filter((weather) => {
      if (weather.id !== weatherId) {
        return weather;
      }
    });
    const updatedCities = [...cities];
    for (let i = 0; i < updatedCities.length; i++) {
      if (updatedCities[i].city === city) {
        updatedCities[i].flag = false;
        break;
      }
    }
    setCities(updatedCities);
    setWeatherDisplay(updatedWeatherDisplay);
    
    // Remove highlight if the deleted city was highlighted
    if (highlightedCity === city.toLowerCase()) {
      setHighlightedCity(null);
    }
  };

  useEffect(() => {
    // Reset highlight after a short delay
    const highlightTimer = setTimeout(() => {
      setHighlightedCity(null);
    }, 3000);

    return () => clearTimeout(highlightTimer);
  }, [highlightedCity]);

  useEffect(() => {
    if (cityName) {
      axios
        .get(
          `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityName}`
        )
        .then((res) => {
          const resObj = {
            id: Date.now(),
            city: cityName,
            description: res.data.description,
            temperature: res.data.temp_in_celsius,
            pressure: res.data.pressure_in_hPa,
            dataAge: Math.floor(Math.random() * 10),
          };
          setWeatherDisplay((prevData) => [...prevData, resObj]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cityName]);

  return (
    <>
      <div className="bg-blue-200 col-span-1 flex justify-center px-10">
        <div className="w-full h-1/2 mt-8 flex flex-col items-center gap-y-6">
          <button
            className="px-16 py-3 rounded-md text-white active:scale-95 duration-100 bg-blue-600"
            onClick={() => handleClick("Get Weather")}
          >
            Get Weather
          </button>
          <table className="border-2 border-black w-full font-semibold">
            <thead className="bg-blue-600 text-white border-b-2 border-black">
              <tr>
                <th className="py-2">City</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, idx) => {
                return (
                  <tr key={idx}>
                    <td
                      className={`py-4 px-1 border-2 ${
                        city.flag ? "border-green-400" : "border-black"
                      }`}
                    >
                      {city.city}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-indigo-200 col-span-4 border-l-4 border-l-black flex flex-col items-center gap-y-8 px-16">
        <div className="mt-8 w-full h-fit flex justify-end">
          <input
            type="text"
            placeholder="Enter your City"
            value={searchCity}
            className="w-2/5 px-2 py-4 rounded-tl-md rounded-bl-md"
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button
            className="px-12 py-4 bg-blue-600 rounded-tr-md rounded-br-md"
            onClick={() => handleClick(null, searchCity)}
          >
            <FontAwesomeIcon icon={faSearch} className="text-white mr-2" />
          </button>
        </div>
        <div className="w-full">
          <table className="min-w-full table-auto border-separate border border-gray-300 shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border border-gray-400">City</th>
                <th className="px-4 py-2 border border-gray-400">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Temperature (°C)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Pressure (hPa)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Data age (hrs)
                </th>
                {weatherDisplay.length !== 0 && (
                  <th className="px-4 py-2 border border-gray-400">Delete</th>
                )}
              </tr>
            </thead>
            <tbody>
              {weatherDisplay.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-2xl font-bold"
                  >
                    No data
                  </td>
                </tr>
              ) : (
                weatherDisplay.map((weather, idx) => (
                  <tr
                    key={idx}
                    className={
                      highlightedCity === weather.city.toLowerCase()
                        ? "bg-yellow-200"
                        : ""
                    }
                  >
                    <td className="px-4 py-2 border border-gray-500">
                      {weather.city}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      <input
                        type="text"
                        value={weather.description}
                        onChange={(e) =>
                          handleDescriptionChange(weather.id, e.target.value)
                        }
                        className="px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {weather.temperature}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {weather.pressure}
                    </td>
                    <td className="px-4 py-2 border border-gray-500">
                      {weather.dataAge}
                    </td>
                    <td className="px-4 py-2 border border-gray-500 text-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(weather.id, weather.city)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;