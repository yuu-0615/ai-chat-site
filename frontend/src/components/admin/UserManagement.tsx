import { useQuery } from '@tanstack/react-query'
import { adminAPI, User } from '../../api/admin'
import { Users } from 'lucide-react'
import toast from 'react-hot-toast'

function UserManagement() {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminAPI.getUsers().then((res) => res.data.data),
  })

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await adminAPI.updateUserRole(userId, newRole)
      refetch()
      toast.success('ユーザーロールを更新しました')
    } catch (error) {
      toast.error('ロール更新に失敗しました')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('このユーザーを削除してもよろしいですか？')) return
    try {
      await adminAPI.deleteUser(userId)
      refetch()
      toast.success('ユーザーを削除しました')
    } catch (error) {
      toast.error('削除に失敗しました')
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">読み込み中...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users size={28} />
        ユーザー管理
      </h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">メール</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ロール</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user: User) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="user">ユーザー</option>
                    <option value="admin">管理者</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'アクティブ' : '無効'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
