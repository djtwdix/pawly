import getDistanceByCoords from "./getDistanceByCoords";

export default function getNearPups(pups, location) {
  const nearPups = pups.filter((pup) => {
    return (
      getDistanceByCoords(pup.location.coordinates, location.coordinates) <
      10000000
    );
  });
  return nearPups;
}
