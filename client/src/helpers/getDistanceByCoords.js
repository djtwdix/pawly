const getDistanceByCoords = (array1, array2) => {
  // coordinate arrays
  if (array1 && array2) {
    const lat1 = array1[1];
    const lat2 = array2[1];
    const lon1 = array1[0];
    const lon2 = array2[0];

    const R = 6371e3; // Radius of the earth in m

    const latRad1 = (lat1 * Math.PI) / 180; // latitude 1 in Radians
    const latRad2 = (lat2 * Math.PI) / 180; // latitude 2 in Radians

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latRad1) *
        Math.cos(latRad2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = (R * c) / 1000; // Distance in km

    return Math.floor(distanceKm); //rounded
  }
};

export default getDistanceByCoords;
