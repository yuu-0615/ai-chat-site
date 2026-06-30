import { useQuery } from '@tanstack/react-query'
import { adminAPI } from '../../api/admin'
import { Upload, Loader } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function TrainingManager() {
  const { data: trainingData = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-training'],
    queryFn: () => adminAPI.getTrainingData().then((res) => res.data.data),
  })

  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('name', file.name)
      formData.append('file', file)
      formData.append('dataType', 'dataset')

      await adminAPI.uploadTrainingData(formData)
      refetch()
      toast.success('トレーニングデータをアップロードしました')
    } catch (error) {
      toast.error('アップロード失敗')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('削除してもよろしいですか？')) return
    try {
      await adminAPI.deleteTrainingData(id)
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Upload size={28} />
        トレーニングデータ管理
      </h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition">
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            accept=".csv,.json,.txt"
          />
          <div className="text-center">
            {uploading ? (
              <>
                <Loader className="animate-spin mx-auto mb-2" size={32} />
                <p>アップロード中...</p>
              </>
            ) : (
              <>
                <Upload className="mx-auto mb-2" size={32} />
                <p className="font-semibold">ファイルをドラッグするか、クリックしてアップロード</p>
                <p className="text-sm text-gray-500 mt-1">CSV、JSON、TXT ファイルが対応しています</p>
              </>
            )}
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainingData.map((data: any) => (
          <div key={data._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{data.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{data.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  data.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : data.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {data.status}
              </span>
              <span className="text-sm text-gray-500">{data.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${data.progress}%` }}
              />
            </div>
            <button
              onClick={() => handleDelete(data._id)}
              className="w-full text-red-600 hover:text-red-900 font-semibold py-2 transition"
            >
              削除
            </button>
          </div>
        ))}
      </div>

      {trainingData.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>トレーニングデータがありません</p>
        </div>
      )}
    </div>
  )
}

export default TrainingManager
