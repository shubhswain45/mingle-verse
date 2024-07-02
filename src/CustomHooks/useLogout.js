import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import { useNavigate } from "react-router-dom"

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth)
    const nevigate = useNavigate()
    const showToast = useShowToast()
    const {logout} = useAuthStore()

    const handleLogout = async() => {
        try {
            await signOut();
            localStorage.removeItem('user-info')
            logout()
        } catch (error) {
            showToast("Error", error.message, "error");
        }
        finally{
            nevigate('/auth')

        }
    }
    return {handleLogout, loading, error}
}

export default useLogout
