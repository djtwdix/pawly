import { useEffect, useState } from "react";

export default function useLocationData() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      setLocation({
        type: "Point",
        coordinates: [res.coords.longitude, res.coords.latitude],
      });
    });
  }, []);

  return {
    location,
  };
}
