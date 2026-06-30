import { Chat as ChatType } from '../api/chat'
import { Trash2 } from 'lucide-react'

interface ChatSidebarProps {
  chats: ChatType[]
  currentChatId: string | null
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
  loading: boolean
}

function ChatSidebar({
  chats,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  loading,
}: ChatSidebarProps) {
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        {chats.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">チャットなし</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center group ${
                currentChatId === chat.id
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div
                onClick={() => onSelectChat(chat.id)}
                className="flex-1 truncate"
              >
                <p className="font-semibold truncate">{chat.title}</p>
                <p className="text-xs opacity-75">{chat.messageCount} 件のメッセージ</p>
              </div>
              <button
                onClick={() => onDeleteChat(chat.id)}
                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-500 hover:text-white rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChatSidebar
