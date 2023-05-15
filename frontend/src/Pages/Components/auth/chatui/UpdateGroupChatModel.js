
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    useToast,
    Box,
    Input,
    FormControl,
    Spinner,
  } from '@chakra-ui/react'
import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { ChatState } from '../../../../context/ChatProvider';
import UserBadgeItem from '../userAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../userAvatar/UserListItem';

function UpdateGroupChatModel({fetchMessages,fetchAgain,setFetchAgain}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameloading] = useState(false);
    const toast = useToast();
    const {selectedChat,setSelectedChat,user} = ChatState()

      const handleSearch = async (query)=>{
              setSearch(query)
              if(!query){
                  return;
              }
              try {
                  setLoading(true)

                  const config = {
                      headers:{
                          Authorization:`Bearer ${user.token}`,
                      },
                    };

                    const {data} = await axios.get(`/api/user?search=${search}`,config)
                    console.log(data);
                    setLoading(false);
                    setSearchResult(data);
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
    const handleRemove = async(user1)=>{
        if (selectedChat.isGrAdm._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Только администратор может добавлять пользователей",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            return;
          }
      
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/groupremove`,
              {
                chatId: selectedChat._id,
                userId: user1._id,
              },
              config
            );
      
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
          } catch (error) {
            toast({
              title: "О",
              
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
          setGroupChatName("");
    }

    const handleAddUser = async(user1)=>{
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
              title: "Пользователь уже в группе",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
          }
      
          if (selectedChat.isGrAdm._id !== user._id) {
            toast({
              title: "Только администратор может добавлять пользователей",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
        }

        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast({
            title: "Ошибка",
           
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
      };
    

    const handleRename = async()=>{
        if(!groupChatName) return

        try {
            setRenameloading(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
              };
              const {data} = await axios.put('/api/chat/rename',{
                chatId:selectedChat._id,
                chatName: groupChatName,
              },config);
              setSelectedChat(data);
              setFetchAgain(!fetchAgain);
              setRenameloading(false);
        } catch (error) {
            toast({
                title: "Чтобы-изменения вступили в силу необходимо перезагрузить страницу",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "top-left",
            });
            setRenameloading(false);
        }
        setGroupChatName("");
    }
    


    return (
        <>
          <IconButton display={{base:"flex"}} icon={<SettingsIcon/>} onClick={onOpen}>Open Modal</IconButton>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'} fontSize='30px' fontFamily='Oswald'>{selectedChat.chatName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box w={'100%'} display={'flex'} flexWrap={'wrap'}pb={3}>
                        {selectedChat.users.map(u=>(
                            <UserBadgeItem key={user._id} user={u}
                            handleFunction={()=>handleRemove(u)}
                        />
                        ))}
                    </Box>
                <FormControl display="flex"  fontFamily='Oswald'>
                    <Input
                        placeholder="Имя чата"
                        mb={3}
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button
                        fontFamily='Oswald'
                        variant="solid"
                        bg={'aqua'}
                        ml={1}
                        isLoading={renameloading}
                        onClick={handleRename}
                    >
                        Обновить
                    </Button>
                </FormControl>
                <FormControl>
                    <Input
                        fontFamily='Oswald'
                        placeholder="Добавить пользователя"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                {loading ?(
                    <Spinner size={'lg'}/>
                ):(
                    searchResult?.map((user)=>(
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>handleAddUser(user)}/>
                    ))
                )}
              </ModalBody>
              <ModalFooter>
                <Button fontFamily='Oswald' colorScheme='red' bg='crimson' mr={3} onClick={()=>handleRemove(user)}>
                  Покинуть группу
                </Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateGroupChatModel