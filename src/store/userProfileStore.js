import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (newProfile) => set({ userProfile: newProfile }),
   addPost: (post) =>
		set((state) => ({
			userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
		})),
    	decreamentPostCount: (postId) =>
            set((state) => ({
                userProfile: {
                    ...state.userProfile,
                    posts: state.userProfile.posts.filter((id) => id !== postId),
                },
            })),
    
}));

export default useUserProfileStore;
