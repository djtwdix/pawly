/**
 * getInitials() returns the first letter
 * based on the inputted first and last name
 */

export default function getInitials(name) {
  return name.split(" ")[0][0] + name.split(" ")[1][0];
}
