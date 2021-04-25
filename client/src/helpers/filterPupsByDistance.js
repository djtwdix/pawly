import getDistanceByCoords from "./getDistanceByCoords";

export default function filterPupsByDistance(pups, location) {
  return pups.filter((pup) => {
    return (
      getDistanceByCoords(pup.location.coordinates, location.coordinates) <
      10000000
    );
  });
}
