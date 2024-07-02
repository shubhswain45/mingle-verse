import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { getFirestore, collection, getDocs, orderBy, query, limit } from 'firebase/firestore'

const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()
  const firestore = getFirestore()

  useEffect(() => {
    const getSuggestedUser = async () => {
      try {
        const userRef = collection(firestore, "users")
        // Fetch users and filter them locally due to limitations of Firebase `not-in`
        const q = query(userRef, orderBy("uid"), limit(10))  // Fetch more than needed
        const querySnapshot = await getDocs(q)
        const users = []

        querySnapshot.forEach((doc) => {
          const userData = { ...doc.data(), id: doc.id }
          if (userData.uid !== authUser.uid && !authUser.following.includes(userData.uid)) {
            users.push(userData)
          }
        })

        setSuggestedUsers(users.slice(0, 3))  // Limit to 3 users
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsLoading(false)
      }
    }

    if (authUser) {
      getSuggestedUser()
    }
  }, [authUser, firestore, showToast])

  return { isLoading, suggestedUsers }
}

export default useGetSuggestedUser
