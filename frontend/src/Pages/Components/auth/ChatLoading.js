import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

function ChatLoading() {
  return (
    <Stack>
        <Skeleton height='45px' pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
        <Skeleton height='45px'  pb="10px"/>
    </Stack>
  )
}

export default ChatLoading