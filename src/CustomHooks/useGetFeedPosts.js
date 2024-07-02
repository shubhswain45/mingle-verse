import { useEffect, useState } from "react";
import useAllPostStore from "../store/AllPostStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, query, where, getDocs } from "firebase/firestore"; // unified imports
import { firestore } from "../firebase/firebase"; // no need to import auth here

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = useAllPostStore();
    const { user } = useAuthStore();
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            if (!user?.following?.length) {
                setIsLoading(false);
                setPosts([]);
                return;
            }

            const q = query(
                collection(firestore, "posts"),
                where("createdBy", "in", user.following.slice(0, 10)) // limiting to 10 elements
            );

            try {
                const feedPosts = [];
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach(doc => {
                    feedPosts.push({ ...doc.data(), id: doc.id });
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt); // fixed field name
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (user && user.following) {
            getFeedPosts();
        }
    }, [user, showToast, setPosts]);

    return { isLoading, posts };
};

export default useGetFeedPosts;
