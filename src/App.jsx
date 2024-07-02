import { Routes, Route, Navigate} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import PageLayout from "./Layout/PageLayout"
import ProfilePage from "./Pages/ProfilePage/ProfilePage"
import useAuthStore from "./store/authStore"

function App() {

  const {user} = useAuthStore()

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={user ? <HomePage/> : <Navigate to={"/auth"} />}/>
        <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to={"/"} />}/>
        <Route path="/:username" element={<ProfilePage/>}/>
      </Routes>
    </PageLayout>
  )
}

export default App
