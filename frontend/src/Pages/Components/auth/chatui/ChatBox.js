import React from 'react'
import { ChatState } from '../../../../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import './s1.css'
import SingleChat from '../SingleChat'

export default function ChatBox({fetchAgain, setFetchAgain}) {
  const {selectedChat} = ChatState()
  return (
    <Box className='cbox'
      display={{base: selectedChat ? "flex":"none",md:"flex"}}
      w={{base:"100%",md:"68%"}}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}
