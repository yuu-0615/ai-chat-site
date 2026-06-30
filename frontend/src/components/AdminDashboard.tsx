import { BarChart3, Users, MessageSquare } from 'lucide-react'

interface Analytics {
  totalUsers: number
  totalChats: number
  totalMessages: number
  timestamp: string
}

function AdminDashboard({ analytics }: { analytics?: Analytics }) {
  const stats = [
    {
      label: 'ユーザー数',
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'チャット数',
      value: analytics?.totalChats || 0,
      icon: BarChart3,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'メッセージ数',
      value: analytics?.totalMessages || 0,
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboard
