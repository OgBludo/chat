import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

import './s1.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileModel = ({user,children}) => {
    const {isOpen,onOpen,onClose}=useDisclosure();
  return (
    <>{
        children?<span onClick={onOpen}>{children}</span>
        : (
            <IconButton display={{base:"flex"}} icon={<AccountCircleIcon/>} onClick={onOpen}/>
        )
    }
     <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='MDheader'></ModalHeader>
          <ModalCloseButton />
          <ModalBody className='Mbody'>
            <div className='divMbody'>
                <Image className='bgpic' src={user.uPic}>
                
                </Image>
                <Image className='fgpic' src={user.uPic}>
                
                </Image>
            </div>
            <Text className='Userinf'>Имя:{user.name}<br></br>Почта:{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Закрыть
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel