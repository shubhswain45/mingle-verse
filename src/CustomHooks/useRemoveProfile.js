import { useState } from "react";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useRemoveProfile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const {userProfile} = useUserProfileStore()
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    
	const showToast = useShowToast();
    
	const removeProfile = async () => {
		// if (isLoading || !authUser) return;
		if(userProfile.profilePicURL === ""){

			showToast("Error", "There is no profile pic to Remove", "error")
			return;
		} 
		setIsLoading(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
		
			const updatedUser = {
				...authUser,
				profilePicURL: ""
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile remove successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
        finally{
            setIsLoading(false)
        }
	}; 

	return { removeProfile, isLoading };
};

export default useRemoveProfile;