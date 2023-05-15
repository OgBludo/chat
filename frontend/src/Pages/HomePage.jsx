import React, { useEffect } from 'react'
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import './stylesheet.css'
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'
import { useHistory } from 'react-router-dom'

export default function HomePage() {
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) history.push("/chats");
  },[history]);

  return (
    //All size monitor
    <Container maxW='xl'centerContent>
      <Box className='Tbox'>
        <Text>Чат организации "ООО Какая-то компания"</Text>
      </Box>
      <Box className='Bbox'>
        <Tabs variant='soft-rounded' >
          <TabList className='TL'>
            <Tab className='tab'>Войти</Tab>
            <Tab className='tab'>Зарегестрироваться</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}
