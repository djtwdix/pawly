import getUserById from './getUserById';
//checks if each user is in each others like array
 const checkIfMatchExists = async (userId, ownerId) => {
  const result = await getUserById(ownerId);
  const likes = result.data.likes;
  if (likes) {
    return likes.includes(userId) ? true : false;
  }
 };

 export default checkIfMatchExists