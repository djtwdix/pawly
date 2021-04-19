import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserById from "../helpers/getUserById";
import { auth } from "../firebase/config";

export default function useProfileData() {
  const user = auth.currentUser;
  const [profile, setUserProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    
    getUserById(params.id).then((res) => {
      setUserProfile(res.data);
    });
  }, [params]);

  return { profile, setUserProfile };
}
