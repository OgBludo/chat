import React, { useEffect, useState } from 'react'
import { ChatState } from '../../../context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getSender, getSenderFull } from '../../../config/ChatLogics';
import ProfileModel from './chatui/ProfileModel';
import UpdateGroupChatModel from './chatui/UpdateGroupChatModel';
import axios from 'axios';
import './s3.css'
import ScrollableChat from '../ScrollableChat';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000"
var socket,selectedChatCompare;

function SingleChat({fetchAgain,setFetchAgain}) {
    const[messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [newMessage,setNewMessage] = useState('');
    const {user,selectedChat,setSelectedChat}=ChatState()
    const toast = useToast();
    const [socketConnected, setSocketConnected] = useState(false)

   useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user)
        socket.on('connection',()=> setSocketConnected(true))
    },[])
    const typingHandler =(e)=>{
        setNewMessage(e.target.value);
    }

    const fetchMessages = async()=>{
        if(!selectedChat) return;
        try {
            const config = {
                headers:{
                    
                    Authorization:`Bearer ${user.token}`,
                },
              };
              setLoading(true)
              const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);
              setMessages(data);
              setLoading(false);
              socket.emit('join chat',selectedChat._id)
        } catch (error) {
            toast({
                title: "Ошибка",
                status:"error",
                duration: 5000,
                isClosable:true,
                position: "top-left",
            });
        }
    }
    useEffect(() => {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }, [selectedChat])
    useEffect(() => {
        socket.on("ms recieved",(newMessageRecieved)=>{
            if(!selectedChatCompare 
                || selectedChatCompare._id
                !== newMessageRecieved.chat._id)
                {

                }
            else{
                setMessages([...messages,newMessageRecieved]);
            }
        })
    })
    
    const sendMessage = async(event)=>{
        if(event.key ==="Enter" && newMessage)
        {
            try {
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    },
                  };
                  setNewMessage("");
                  const {data} = await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat,
                  },config)
                  console.log(data);
                  
                  socket.emit('new message',data)
                  setMessages([...messages,data]);
            } catch (error) {
                toast({
                    title: "Ошибка",
                    status:"error",
                    duration: 5000,
                    isClosable:true,
                    position: "top-left",
                });
            }
        }
    }

 

  return (
    <>
        {selectedChat?(
            <>
            <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Oswald"
                display="flex"
                justifyContent={{ base: "space-between" }}
                alignItems="center"
            >
                <IconButton
                    display={{ base: "flex", md: "none" }}
                    icon={<KeyboardBackspaceIcon />}
                    onClick={() => setSelectedChat("")}
                >

                </IconButton>
                {!selectedChat.isGrChat?(
                    <>
                        {getSender(user,selectedChat.users)}
                        <ProfileModel user={getSenderFull(user,selectedChat.users)}></ProfileModel>
                    </>
                ):(
                    <>
                        {selectedChat.chatName.toUpperCase()}
                        <UpdateGroupChatModel
                         fetchMessages={fetchMessages}
                         fetchAgain={fetchAgain}
                         setFetchAgain={setFetchAgain}
                        />
                    </>
                )}
            </Text>
            <Box
                 display="flex"
                 flexDir="column"
                 justifyContent="flex-end"
                 p={3}
                 bg="#E8E8E8"
                 w="100%"
                 h="100%"
                 borderRadius="lg"
                 overflowY="hidden"
            >
                {loading ?(
                    <Spinner size={'xl'} w={20} h={20} alignSelf='center' margin='auto'/>
                ):(
                    <div className='messages'>
                        <ScrollableChat  messages={messages}/>
                    </div>
                )}
                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    <Input variant='filled' bg="E0E0E0"
                     placeholder='Введите сообщение'
                     onChange={typingHandler}
                     value={newMessage} />
                </FormControl>
            </Box>
            </>
        ):(
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}h="100%">
                <Text fontSize="3xl" pb={3} fontFamily={"Oswald"}>
                    Выберете чат
                </Text>
                
            </Box>
        )}
    </>
  )
}

export default SingleChat