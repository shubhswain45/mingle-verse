import { useEffect, useState } from "react";
// import usePostStore from "../store/postStore";
import useAllPostStore from "../store/AllPostStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFetchUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = useAllPostStore();
	console.log(posts);
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getPosts = async () => { 
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const posts = [];
				querySnapshot.forEach((doc) => {
					posts.push({ ...doc.data(), id: doc.id });
				});

				posts.sort((a, b) => b.createAt - a.createAt);

				setPosts(posts);
			} catch (error) {
				showToast("Error", error.meussage, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [userProfile]);

	return { isLoading, posts };
};

export default useFetchUserPosts;