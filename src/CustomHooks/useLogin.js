import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import useShowToast from "./useShowToast"
import { auth } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import { useEffect } from "react"
import { firestore } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore";

function useLogin() {
 const showToast = useShowToast()
 const {login} = useAuthStore()
 const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
 ] = useSignInWithEmailAndPassword(auth)

 useEffect(() => {
    if (error) {
        showToast("Error", error.message, "error");
    }
 }, [error]);

 const loginUser = async(inputs) => {
     if(!inputs.email || !inputs.password){
      showToast("Error", "Please fill all the field", "error");
      return;
     } 
    try {
        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
        if(userCred){
            const docRef = doc(firestore, "users", userCred.user.uid);
			const docSnap = await getDoc(docRef);
			localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
			login(docSnap.data());
            // Show success toast
			showToast("Success", "User Log in successfully", "success");
        }
    } catch (error) {
        showToast("Error", error.message, "error")
    }
 }
 return {loginUser, error, loading}
}

export default useLogin
