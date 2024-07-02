import React from 'react'
import Home from './Home'
import CreatePost from './CreatePost'
import ProfileLink from './ProfileLink'
import Search from './Search'
import Notifications from './Notification'
import Message from './Message'

const SidebarItems = () => {
  return (
    <>
      <Home/>
      <Search/>
      <Message/>
      <Notifications/>
      <CreatePost/>
      <ProfileLink/>
    </>
  )
}

export default SidebarItems
