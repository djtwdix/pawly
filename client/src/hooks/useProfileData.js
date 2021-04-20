import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserById from "../helpers/getUserById";

export default function useProfileData() {
  const [profile, setUserProfile] = useState({});

  //pulls params from url
  const params = useParams();

  //fetches user based on params of url and sets current user profile to result data
  useEffect(() => {
    let mounted = true;
    getUserById(params.id).then((res) => {
      if (mounted) {
        setUserProfile(res.data);
      }
    });
    return () => {
      mounted = false;
    }
  }, [params]);

  return { profile, setUserProfile };
}
