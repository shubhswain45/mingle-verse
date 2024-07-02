import { Button, Icon } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../CustomHooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const { setUser } = useAuthStore();
  const { login } = useAuthStore();

  useEffect(() => {
    if (error) {
      showToast('Error', error.message, 'error');
    }
  }, [error]);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

      if(userSnap.exists()){
        const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				login(userDoc);
        showToast('Success', 'User Log in successfully', 'success');
      }
      else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split('@')[0],
          bio: '',
          profilePicURL: newUser.user.photoURL,
          gender:"",
          isPrivateAccount:false,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        setUser(userDoc);
        showToast('Success', 'User registered successfully', 'success');
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <Button
      leftIcon={<Icon as={FcGoogle} />}
      variant="solid"
      width="full"
      onClick={handleGoogleAuth}
      isLoading={loading}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
