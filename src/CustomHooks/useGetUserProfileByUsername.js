import { useEffect, useState } from "react";
import useShowToast from "../CustomHooks/useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";
import { useNavigate } from "react-router-dom";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const navigate = useNavigate()
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setUserProfile(null);
        } else {
          let userDoc = null;
          querySnapshot.forEach((doc) => {
            userDoc = doc.data();
          });
          setUserProfile(userDoc);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      getUserProfile();
    }
  }, [username]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
