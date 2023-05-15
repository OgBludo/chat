import React from 'react'
import ScrollableFeed from'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderM } from '../../config/ChatLogics'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Tooltip, border } from '@chakra-ui/react'
import './auth/s3.css'

function ScrollableChat({messages}) {
    const {user} = ChatState()
  return (
   <ScrollableFeed >
        {messages && messages.map((m,i)=>(
            <div className='sfdiv' style={{display:"flex"}} key={m._id}>
                    {
                        (isSameSender(messages,m,i,user._id)
                        || isLastMessage(messages,i,user._id)
                        ) &&(
                            <Tooltip
                                label={m.sender.name}
                                placement="bottom-start"
                                hasArrow
                            >
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.uPic}
                                >

                                </Avatar>
                            </Tooltip>
                        )
                    }
                    <span style={{backgroundColor:`${m.sender._id === user._id ? "#BEE3F8":"#B9F5D0"}`,

                    marginLeft:isSameSenderM(messages,m,i,user._id)}} className='scspan'>
                        {m.content}
                    </span>
            </div>
        ))}
   </ScrollableFeed>
  )
}

export default ScrollableChat