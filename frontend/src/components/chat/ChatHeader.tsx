import { Chat as ChatType } from '../../api/chat'
import { Download } from 'lucide-react'
import { chatAPI } from '../../api/chat'
import toast from 'react-hot-toast'

interface ChatHeaderProps {
  chat: ChatType
}

function ChatHeader({ chat }: ChatHeaderProps) {
  const handleExport = async (format: 'json' | 'md' | 'txt') => {
    try {
      await chatAPI.exportChat(chat._id, format)
      toast.success(`${format.toUpperCase()} 形式でエクスポートしました`)
    } catch (error) {
      toast.error('エクスポート失敗')
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{chat.title}</h2>
        <p className="text-sm text-gray-500">モデル: {chat.model}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleExport('json')}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded transition"
          title="JSON エクスポート"
        >
          <Download size={16} />
          JSON
        </button>
        <button
          onClick={() => handleExport('md')}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded transition"
          title="Markdown エクスポート"
        >
          <Download size={16} />
          MD
        </button>
        <button
          onClick={() => handleExport('txt')}
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded transition"
          title="テキスト エクスポート"
        >
          <Download size={16} />
          TXT
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
