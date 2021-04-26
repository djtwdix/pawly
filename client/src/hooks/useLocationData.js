import { useEffect, useState } from "react";

export default function useLocationData() {
  const [location, setLocation] = useState(null);

  //pulls location info from browser, to be used in location rendering, saved as state
  useEffect(() => {
    let mounted = true;
    navigator.geolocation.getCurrentPosition((res) => {
      if (mounted) {
        setLocation({
          type: "Point",
          coordinates: [res.coords.longitude, res.coords.latitude],
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    location,
  };
}
