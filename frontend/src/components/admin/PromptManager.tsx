import { useQuery } from '@tanstack/react-query'
import { adminAPI } from '../../api/admin'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function PromptManager() {
  const { data: templates = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-prompts'],
    queryFn: () => adminAPI.getPromptTemplates().then((res) => res.data.data),
  })

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    category: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await adminAPI.createPromptTemplate(formData)
      refetch()
      setFormData({ name: '', description: '', content: '', category: '' })
      setShowForm(false)
      toast.success('プロンプトテンプレートを作成しました')
    } catch (error) {
      toast.error('作成失敗')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('削除してもよろしいですか？')) return
    try {
      await adminAPI.deletePromptTemplate(id)
      refetch()
      toast.success('削除しました')
    } catch (error) {
      toast.error('削除失敗')
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">読み込み中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">プロンプトテンプレート管理</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <Plus size={20} />
          新規作成
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                テンプレート名
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                説明
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                カテゴリ
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                プロンプト内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              >
                作成
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template: any) => (
          <div key={template._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
            <p className="text-xs text-gray-500 mb-4">カテゴリ: {template.category}</p>
            <p className="text-sm text-gray-700 mb-4 p-3 bg-gray-50 rounded line-clamp-3">
              {template.content}
            </p>
            <button
              onClick={() => handleDelete(template._id)}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-900 font-semibold py-2 transition"
            >
              <Trash2 size={16} />
              削除
            </button>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>プロンプトテンプレートがありません</p>
        </div>
      )}
    </div>
  )
}

export default PromptManager
