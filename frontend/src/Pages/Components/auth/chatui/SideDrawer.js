import { Avatar,
     Box,
    Button, 
    Input, 
    Menu, 
    MenuButton, 
    MenuDivider, 
    MenuItem, 
    MenuList, 
    Spinner, 
    Text, 
    Tooltip, 
    useDisclosure,
    useToast
    } from '@chakra-ui/react'
import React, { useState } from 'react'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './s1.css'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatState } from '../../../../context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    //DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    //DrawerCloseButton,
  } from '@chakra-ui/react'
import ChatLoading from '../ChatLoading';
import axios from 'axios'
import UserListItem from '../userAvatar/UserListItem';

const SideDrawer = ()=> {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {user, selectedChat, setSelectedChat,chats,setChats} = ChatState();
    const history = useHistory()

    const toast = useToast();

    const logoutHandler = ()=>{
        localStorage.removeItem("userInfo");
        history.push("/");
        window.location.reload();
    }
    const handleSearch= async ()=>{
        if(!search){
            toast({
                title: "Введите что-нибудь",
                status:"warning",
                duration: 5000,
                isClosable:true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/user?search=${search}`,config);
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
    };

const accessChat = async (userId) =>{
    try {
        setLoadingChat(true)
        const config = {
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${user.token}`,
            },
        };

        const {data} = await axios.post('/api/chat',{userId},config);
        if(!chats.find((c)=>c.id === data._id))
            setChats([data,...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
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

  return (
    < >

        <Box className='SDBox'>
            <Tooltip label="Поиск пользователя" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                   <ManageSearchIcon></ManageSearchIcon>
                   <Text textShadow="3px 3px 10px #383831" display={{base:"none",md:"flex"}} px="4">
                     Найти пользователя
                   </Text>
                </Button>
            </Tooltip>
            <Text className='SDText'>Чат компании ООО Ослики</Text>
            <div className='rb'>
                <Menu>
                    <MenuButton display="flex" flexDir="row">
                        <MarkUnreadChatAltIcon className='MRCicon'/>
                    </MenuButton>
                    {/*<MenuList></MenuList>*/}
                </Menu>
                <Menu >
                <MenuButton className="SDMenuB" as={Button} rightIcon={<ExpandMoreIcon/>}>
                       <Avatar size='sm' cursor='pointer' name={user.name} src={user.uPic}></Avatar>
                    </MenuButton>
                    <MenuList>
                        <ProfileModel user={user}>
                            <MenuItem>
                                Мой профиль
                            </MenuItem>
                        </ProfileModel>
                        
                        <MenuDivider></MenuDivider>
                        <MenuItem onClick={logoutHandler}>
                            Выйти
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                    Найти пользователя
                </DrawerHeader>
                 <DrawerBody>
                <Box d="flex" pb={2}>
                    <Input w="70%" placeholder='Поиск пользователя' mr={2}
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}>

                    </Input>
                    <Button mb={1.5} w='25%' onClick={handleSearch}
                    >Найти</Button>
                </Box>
                {loading ?(
                    <ChatLoading/>
                ):
                (
                    searchResult?.map(user =>(
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>accessChat(user._id)}
                        />
                    ))
                )}
                {loadingChat && <Spinner ml='auto' d='dlex'/>}
            </DrawerBody>
            </DrawerContent>
           
        </Drawer>
    </>
  )
}
export default SideDrawer
