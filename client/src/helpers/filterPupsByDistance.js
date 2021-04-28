import getDistanceByCoords from "./getDistanceByCoords";

export default function filterPupsByDistance(pups, location) {
  return pups.filter((pup) => {
    console.log(pups)
    return (
      getDistanceByCoords(pup.location.coordinates, location.coordinates) < 10000000
      
    );
  });
}
