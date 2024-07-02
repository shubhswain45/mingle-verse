import { create } from "zustand";

// Define the store
const useAllPostStore = create((set) => ({
    posts: [],

    // Add a new post at the beginning
    createPost: (post) =>
        set((state) => ({
            posts: [post, ...state.posts],
        })),

    // Set the posts array
    setPosts: (posts) => set({ posts }),

    // Delete a post by id
    deletePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
        })),

    // Add a comment to a post by postId
    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...(post.comments || []), comment], // Ensure comments is an array
                    };
                }
                return post;
            }),
        })),

    // Add a like to a post by postId
    addLike: (postId, userId) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likes: [...(post.likes || []), userId], // Ensure likes is an array
                    };
                }
                return post;
            }),
        })),

    // Remove a like from a post by postId
    removeLike: (postId, userId) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likes: post.likes.filter((id) => id != userId), // Avoid variable shadowing
                    };
                }
                return post;
            }),
        })),
}));

export default useAllPostStore;
