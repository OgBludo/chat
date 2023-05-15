import React from 'react'
import { ChatState } from '../../../../context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react';
import './s2.css'

function UserListItem({user,handleFunction}) {

  return (
    <Box
        className='ulibox'
        onClick={handleFunction}
    >
        <Avatar 
            size={'sm'}
            mr={2}
            cursor={'pointer'}
            name={user.name}
            src={user.uPic}
        >
        </Avatar>
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize={'xs'}>
                <b>Почта : </b>
                {user.email}
            </Text>
        </Box>
    </Box>
  )
}

export default UserListItem