import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminAPI } from '../api/admin'
import { useAuthStore } from '../store/auth'
import toast from 'react-hot-toast'
import { LogOut, Users, BarChart3, Upload } from 'lucide-react'
import AdminDashboard from '../components/AdminDashboard'
import UserManagement from '../components/admin/UserManagement'
import TrainingManager from '../components/admin/TrainingManager'
import PromptManager from '../components/admin/PromptManager'

type TabType = 'dashboard' | 'users' | 'training' | 'prompts'

function AdminPage() {
  const { logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const { data: analytics } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => adminAPI.getAnalytics().then((res) => res.data.data),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">管理パネル</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            <LogOut size={20} />
            ログアウト
          </button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4 py-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={20} />
              ダッシュボード
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={20} />
              ユーザー管理
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
                activeTab === 'training'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload size={20} />
              トレーニング
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition ${
                activeTab === 'prompts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              プロンプト管理
            </button>
          </nav>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <AdminDashboard analytics={analytics} />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'training' && <TrainingManager />}
        {activeTab === 'prompts' && <PromptManager />}
      </div>
    </div>
  )
}

export default AdminPage
