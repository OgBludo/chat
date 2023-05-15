import { Box } from '@chakra-ui/react'
import React from 'react'
import './s2.css'
import CancelIcon from '@mui/icons-material/Cancel';

function UserBadgeItem({user,handleFunction}) {
  return (
    <Box className='ubibox' variant='solid' onClick={handleFunction}>
        <span >{user.name}</span>
        <CancelIcon className='ubispan'/>
    </Box>
  )
}

export default UserBadgeItem