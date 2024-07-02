import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useAllPostStore from '../store/AllPostStore';

const useLike = (post) => {
  const [isLiking, setIsLiking] = useState(false); // Corrected typo
  const { user } = useAuthStore();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.uid));
  const showToast = useShowToast();
  const { addLike, removeLike } = useAllPostStore(); // Removed unnecessary posts

  const handleLikes = async () => {
    if (isLiking) return;
    if (!user) {
      showToast("Error", "You must be logged in or sign up first to like a post", "error");
      return; // Ensure to return to prevent further execution
    }
    setIsLiking(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });

      // Update state correctly based on like/unlike
      if (isLiked) {
        removeLike(post.id, user.uid); // Call removeLike for unliking
        setLikes(likes - 1);
      } else {
        addLike(post.id, user.uid); // Call addLike for liking
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked); // Toggle liked state

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLiking(false);
    }
  };

  return { isLiked, likes, handleLikes, isLiking };
};

export default useLike;
