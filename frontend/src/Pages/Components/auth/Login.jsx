
import { Button,FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


export default function Login() {
    const [show, setShow] = useState(false)
    const showClick = () => setShow(!show);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const submitHandler = async() => {
      
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Заполните поля",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
          return;
        }
    
        // console.log(email, password);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          console.log(JSON.stringify(data));
          
          toast({
            title: "Вход выполнен",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          history.push("/chats");
          window.location.reload();
        } catch (error) {
          toast({
            title: "ОШИБКА",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        }
    };

    

  return (
    <VStack spacing='10px'>
        <FormControl id='email' isRequired>
            <FormLabel> Почта </FormLabel>
                <Input value={email} placeholder='Введите почту'
                 onChange={(e)=>
                 setEmail(e.target.value)}>
                </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel> Пароль </FormLabel>
            <InputGroup>
                <Input value={password} type={show ?"text":'password'} placeholder='Введите пароль'
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
        <Button colorScheme='blue'
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading ={loading}>
            Войти
        </Button>
        <Button
        variant="solid"
        colorScheme='red'
        width="100%"
        style={{marginTop:15}}
        onClick={()=>
        {
          setEmail("guest@example.com");
          setPassword("12345");   
        }}>
            Войти в качестве гостя
        </Button>
    </VStack>
  )
}
