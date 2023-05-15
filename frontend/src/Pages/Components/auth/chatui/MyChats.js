import React, { useEffect, useState } from 'react'
import { ChatState } from '../../../../context/ChatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import "./s1.css"
import AddCommentIcon from '@mui/icons-material/AddComment';
import ChatLoading from '../ChatLoading';
import { getSender } from '../../../../config/ChatLogics';
import GroupChatModel from './GroupChatModel';

export default function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();
  const {user,selectedChat, setSelectedChat,chats,setChats} = ChatState();
  const toast = useToast();


  const fetchChats = async()=>{
    try {
      const config = {
        headers:{
            Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get("/api/chat",config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Ошибка",
        status:"error",
        duration: 5000,
        isClosable:true,
        position: "top-left",
    });
    }
  };

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[fetchAgain])
  
  return (
    <Box className='mcbox'
      display={{base:selectedChat?"none":"flex",md:"flex"}}
      w={{base:"100%", md:"31%"}}
    >
      <Box fontSize={{base:'28px',md:'30px'}} className='mcbox2'>
          Мои чаты
          <GroupChatModel>
              <Button  d="flex"
                fontSize={{base:"17px",md:"10px",lg:"17px"}}
                rightIcon={<AddCommentIcon className='mcicon'/>}
                bg="none" _hover={{bg:"#3a3a3e",color: "white"}}
              >
                <span className='mcbutton'>Новый групповой чат</span>
              </Button>
          </GroupChatModel>
      </Box>
      <Box className='mcbox3'>
            {chats?(
              <Stack overflowY="scroll">
                {chats.map((chat)=>(
                  <Box
                  fontFamily='Oswald'
                    onClick={()=>setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "aqua":"#e5e4f2"}
                    px={3}
                    py={2}
                    borderRadius="5px"
                    key={chat._id}
                  >
                    <Text>
                      {!chat.isGrChat 
                        ?getSender(loggedUser,chat.users)
                        :chat.chatName}
                    </Text>
                  </Box>
                ))}

              </Stack>
            ):(
              <ChatLoading/>
            )}
          </Box>
    </Box>
  )
}
