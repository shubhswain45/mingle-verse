// src/icons.js

// Import icons from the correct packages
import { AiFillHome, AiOutlineSearch, AiFillBell, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { RiFullscreenExitLine } from "react-icons/ri";
import { RxExitFullScreen } from "react-icons/rx";

// Export icons with your preferred name



export const HomeIcon = AiFillHome;
export const SearchIcon = AiOutlineSearch;
export const NotificationIcon = AiFillBell;
export const CreateIcon = AiOutlinePlus;
export const ProfileIcon = AiOutlineUser;
export const CommentIcon = FaRegComment;
export const UnlikeIcon = FaRegHeart;
export const LikeIcon = FaHeart;
export const ShowIcon = BiSolidShow;
export const HideIcon = BiSolidHide;
export const photoIcon = MdAddPhotoAlternate;
export const MessageIcon = BiMessageRoundedCheck;
export const FullScreenIcon = RiFullscreenExitLine;
export const SmallScreenIcon = RxExitFullScreen;

