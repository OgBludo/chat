import { Button,FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
    
    const history = useHistory();
    const [uPic, setPic] = useState()
    const toast = useToast();
    const [show, setShow] = useState(false)
    const showClick = () => setShow(!show);
    const [loading, setLoading] = useState(false)
    
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confpwd, setConfpwd] = useState()

    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confpwd)
        {
            toast({
                title:"Заполните все поля",
                status:"warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }
        if(password !== confpwd)
        {
            toast({
                title:"Пароли не совпадают",
                status:"warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }
          try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
            const {data} = await axios.post(
                "/api/user",
            {name ,email ,password ,uPic }, config);
            console.log("ok");
            toast({
                title:"Вы успешно зарегестрированы",
                status:'success',
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
            window.location.reload();
        }catch(err){
            toast({
                title:"Ошибка",
                status:"error",
                
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
        }
    };
    const postDetails = (pics) => {
        setLoading(true);
        if(pics === undefined)
        {
            toast({
                title:"Картинка не выбрана",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png")
        {
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-ggpt");
            data.append("cloud_name","dnuoj41ca");
            fetch("https://api.cloudinary.com/v1_1/dnuoj41ca/image/upload",{
            method: "post",
            body: data,
        })
        .then((res)=>res.json())
        .then((data)=>{
            setPic(data.url.toString());
            setLoading(false);

        })
        .catch((err)=>
        {
            console.log(err);
            setLoading(false);
        });
        }
        else{
            toast({
                title:"Выбирете картинку",
                status:"warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }
    };
    

    

  return (
    <VStack spacing='10px'>
        <FormControl id='first-name' isRequired>
            <FormLabel> Имя </FormLabel>
                <Input placeholder='Введите ваше имя'
                 onChange={(e)=>
                 setName(e.target.value)}>
                </Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel> Почта </FormLabel>
                <Input placeholder='Введите почту'
                 onChange={(e)=>
                 setEmail(e.target.value)}>
                </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel> Пароль </FormLabel>
            <InputGroup>
                <Input type={show ?"text":'password'} placeholder='Введите пароль'
                    onChange={(e)=>
                    setPassword(e.target.value) }>
                    </Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={showClick} mr="10px"bg="none">
                        {show ? "Скрыть":"Показать"}
                    </Button>
                </InputRightElement>
                
            </InputGroup>
            
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel> Подтвердите Пароль </FormLabel>
            <InputGroup>
                <Input type={show ?"text":'password'} placeholder='Введите пароль'
                    onChange={(e)=>
                    setConfpwd(e.target.value) }>
                    </Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={showClick} mr="10px"bg="none">
                        {show ? "Скрыть":"Показать"}
                    </Button>
                </InputRightElement>
                
            </InputGroup>
            
        </FormControl>
        <FormControl id="uPic">
            <FormLabel>Загрузите ваше фото</FormLabel>
            <Input type='file' p={1.5} accept='image/*'
            onChange={(e)=>postDetails(e.target.files[0])}/>
        </FormControl>
        <Button colorScheme='blue'
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}>
            Зарегестрироваться
        </Button>
    </VStack>
  )
}
