import { ref } from 'vue';

export const fetchLocation = () => {
  const location = ref({ latitude: null as number | null, longitude: null as number | null });
  const city = ref('');
  const error = ref('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          location.value = { latitude, longitude };

          // Fetch city name from a geocoding service
          city.value = await fetchCity(latitude, longitude);
        },
        (err) => {
          error.value = `Error getting location: ${err.message}`;
          console.error(error.value);
        }
      );
    } else {
      error.value = 'Geolocation is not supported by this browser.';
      console.error(error.value);
    }
  };

  const fetchCity = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`, {
        headers: {
          'User-Agent': 'ChaseWeatherApp'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const address = data.address;
      return address.city || address.town || 'Unknown';
    } catch (err) {
      console.error('Error fetching city:', err);
      return 'Error fetching city';
    }
  };


  return { location, city, error, getLocation };
}
