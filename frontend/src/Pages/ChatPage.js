
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from './Components/auth/chatui/SideDrawer'
import MyChats from './Components/auth/chatui/MyChats'
import ChatBox from './Components/auth/chatui/ChatBox'
import "./stylesheet.css"
import { useState } from 'react'

const ChatPage = () => {
    const {user} = ChatState()
    const[fetchAgain,setFetchAgain] = useState(false); 
   
  return (
    <div style={{width:'100%'}}>
        {user && <SideDrawer/>}
        <Box className='CBox'>
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
    </div>)
}

export default ChatPage
