import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
	const {setUser} = useAuthStore()

    // Effect to handle errors
    useEffect(() => {
        if (error) {
            showToast("Error", error.message, "error");
        }
    }, [error]);

    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    bio: "",
                    profilePicURL: "",
                    gender:"",
                    isPrivateAccount:false,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
				setUser(userDoc)
				// Show success toast
				showToast("Success", "User registered successfully", "success");
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
