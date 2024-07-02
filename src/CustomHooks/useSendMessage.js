import { useState } from 'react';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast'; // Assuming useShowToast is correctly implemented

const useSendMessage = () => {
  const [isSending, setIsSending] = useState(false);
  const showToast = useShowToast(); // Custom hook for showing toasts

  const sendMessage = async (userId="SJkvFuvxllW4FdZTzYz6f24uNWT2", sendToUserId="WeDoe1GvnwR4icycGSwGXHfD7sm2", message = "Hello") => {
    setIsSending(true);
    try {
      const newChat = {
        message: message,
        sendAt: Date.now(),
        userId: userId, // Include sender's user ID if needed
        sendToUserId: sendToUserId // Include recipient's user ID if needed
      };
      const docRef = await addDoc(collection(firestore, "Chats"), newChat);
      // Optionally, if you have an update function to update the document after adding
      await updateDoc(docRef, {
        // Any additional fields to update if needed
      });
      showToast("Message sent successfully", "success"); // Example of using showToast
    } catch (error) {
      console.error("Error sending message:", error.message);
      showToast("Failed to send message", "error"); // Example of showing error message
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendMessage };
};

export default useSendMessage;
