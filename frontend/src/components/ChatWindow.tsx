import { Chat as ChatType, sendMessagePayload } from '../api/chat'
import MessageList from './chat/MessageList'
import MessageInput from './chat/MessageInput'
import ChatHeader from './chat/ChatHeader'
import { chatAPI } from '../api/chat'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ChatWindowProps {
  chat: ChatType
  onChatUpdate: () => void
}

function ChatWindow({ chat, onChatUpdate }: ChatWindowProps) {
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    try {
      setLoading(true)
      await chatAPI.sendMessage(chat._id, {
        content,
        model: chat.model,
      })
      onChatUpdate()
    } catch (error) {
      toast.error('メッセージの送信に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} />
      <MessageList messages={chat.messages || []} />
      <MessageInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  )
}

export default ChatWindow
