import { useEffect, useState } from 'react'
import { chatAPI, Chat as ChatType } from '../api/chat'
import { useChatStore } from '../store/chat'
import { useAuthStore } from '../store/auth'
import toast from 'react-hot-toast'
import ChatSidebar from '../components/ChatSidebar'
import ChatWindow from '../components/ChatWindow'
import { Plus, LogOut } from 'lucide-react'

function ChatPage() {
  const { logout } = useAuthStore()
  const { chats, setChats, currentChatId, setCurrentChatId } = useChatStore()
  const [loading, setLoading] = useState(true)
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null)

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      const response = await chatAPI.getChats()
      setChats(response.data.data)
    } catch (error) {
      toast.error('チャット一覧の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentChatId) {
      loadCurrentChat()
    }
  }, [currentChatId])

  const loadCurrentChat = async () => {
    if (!currentChatId) return
    try {
      const response = await chatAPI.getChat(currentChatId)
      setCurrentChat(response.data.data)
    } catch (error) {
      toast.error('チャットの読み込みに失敗しました')
    }
  }

  const handleNewChat = async () => {
    try {
      const response = await chatAPI.createChat({
        title: '新しいチャット',
        model: 'gpt-4-turbo',
      })
      const newChat = response.data.data
      setChats([newChat as any, ...chats])
      setCurrentChatId(newChat.id)
      toast.success('新しいチャットを作成しました')
    } catch (error) {
      toast.error('チャット作成に失敗しました')
    }
  }

  const handleDeleteChat = async (id: string) => {
    try {
      await chatAPI.deleteChat(id)
      await fetchChats()
      if (currentChatId === id) {
        setCurrentChatId(null)
        setCurrentChat(null)
      }
      toast.success('チャットを削除しました')
    } catch (error) {
      toast.error('チャット削除に失敗しました')
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* サイドバー */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <Plus size={20} />
            新しいチャット
          </button>
        </div>

        <ChatSidebar
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={setCurrentChatId}
          onDeleteChat={handleDeleteChat}
          loading={loading}
        />

        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <LogOut size={20} />
            ログアウト
          </button>
        </div>
      </div>

      {/* メインエリア */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <ChatWindow chat={currentChat} onChatUpdate={loadCurrentChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">チャットを選択</h2>
              <p className="text-gray-600">左のチャット一覧から選択するか、新しいチャットを作成してください</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
