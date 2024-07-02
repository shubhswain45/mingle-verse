import React, { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useAllPostStore from '../store/AllPostStore'

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false)

  const showToast = useShowToast()
  const {user} = useAuthStore()

  const {addComment} = useAllPostStore()

  const handlePostComment = async(postId, comment) => {
   
    if(isCommenting) return;
    if(!user) return showToast("Error", "You need to Login or Sign up first before Commenting", "error")
    setIsCommenting(true)
    const newComment = {
        comment:comment,
        createdAt:Date.now(),
        createdBy:user.uid,
        postId:postId,
    }
    try {
        await updateDoc(doc(firestore,"posts", postId), {
            comments: arrayUnion(newComment)
        })
        addComment(postId, newComment) 
    } catch (error) {
        showToast("Error", error.message, "error")
    }
    finally{
        setIsCommenting(false)
    }
  }
  return { isCommenting, handlePostComment }
}

export default usePostComment
