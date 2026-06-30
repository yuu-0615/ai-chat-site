# AI チャットサイト - セットアップガイド

## 📋 前提条件

- Node.js 20+
- Docker & Docker Compose
- MongoDB 7+
- OpenAI API キー または Anthropic API キー

## 🚀 Docker で起動（推奨）

### 1. リポジトリをクローン

```bash
git clone https://github.com/yuu-0615/ai-chat-site.git
cd ai-chat-site
```

### 2. 環境変数を設定

```bash
cp .env.example .env
```

`.env` ファイルを編集して、API キーを設定：

```bash
OPENAI_API_KEY=sk-your-key-here
ANTHROPIC_API_KEY=sk-ant-your-key-here
JWT_SECRET=your-super-secret-key
```

### 3. Docker で起動

```bash
docker-compose up -d
```

### 4. アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:5000/api
- **MongoDB**: localhost:27017

## 🏠 ローカル開発

### 1. 全体をインストール

```bash
npm run install-all
```

### 2. 環境変数を設定

```bash
cp .env.example .env
```

### 3. MongoDB を起動

```bash
# Docker で起動する場合
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  mongo:7-alpine
```

### 4. 開発サーバーを起動

別々のターミナルで実行：

```bash
# ターミナル 1: バックエンド
cd backend
npm run dev

# ターミナル 2: フロントエンド
cd frontend
npm run dev
```

### 5. アクセス

- **フロントエンド**: http://localhost:5173
- **バックエンド API**: http://localhost:5000/api

## 🔐 デフォルトアカウント

```
メール: admin@example.com
パスワード: admin123456
```

※ 本番環境では必ず変更してください

## 📁 プロジェクト構造

```
ai-chat-site/
├── frontend/              # React フロントエンド
│   ├── src/
│   │   ├── components/   # React コンポーネント
│   │   ├── pages/        # ページコンポーネント
│   │   ├── api/          # API クライアント
│   │   ├── store/        # Zustand ストア
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Express バックエンド
│   ├── src/
│   │   ├── models/       # Mongoose スキーマ
│   │   ├── routes/       # API ルート
│   │   ├── controllers/  # ビジネスロジック
│   │   ├── services/     # AI 統合等
│   │   ├── middleware/   # カスタムミドルウェア
│   │   ├── sockets/      # WebSocket ハンドラ
│   │   ├── config/       # 設定ファイル
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Docker Compose 設定
├── .env.example           # 環境変数テンプレート
└── README.md
```

## 🔧 環境変数の詳細

### Backend

```bash
# 実行環境
NODE_ENV=development
PORT=5000

# データベース
MONGODB_URI=mongodb://root:root@mongo:27017/ai-chat-site?authSource=admin

# JWT トークン
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-opus-20240229

# ファイルアップロード
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads

# レート制限
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Frontend

```bash
# API エンドポイント
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=AI Chat Site
```

## 📦 依存関係の更新

### Backend

```bash
cd backend
npm update
```

### Frontend

```bash
cd frontend
npm update
```

## 🧪 テスト

### Backend

```bash
cd backend
npm test
npm run test:watch
```

### Frontend

```bash
cd frontend
# テストスイートは後で追加予定
```

## 🐛 トラブルシューティング

### MongoDB 接続エラー

```bash
# MongoDB が起動しているか確認
docker ps | grep mongo

# 再起動
docker restart ai-chat-mongo
```

### ポート競合

```bash
# ポート 5000 が使用中の場合
lsof -i :5000
kill -9 <PID>

# ポート 3000 が使用中の場合
lsof -i :3000
kill -9 <PID>
```

### API キーエラー

```bash
# .env ファイルが正しく設定されているか確認
cat .env | grep API_KEY

# Docker の場合、コンテナを再起動
docker-compose restart backend
```

### フロントエンドが API に接続できない

```bash
# CORS エラーの場合、.env で CORS_ORIGIN を確認
cat .env | grep CORS

# バックエンドのログを確認
docker-compose logs backend
```

## 🚢 デプロイメント

### Vercel にデプロイ（フロントエンド）

```bash
cd frontend
npm install -g vercel
vercel
```

### Railway / Render にデプロイ（バックエンド）

参考: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📚 その他のドキュメント

- [API リファレンス](./docs/API.md)
- [開発ガイド](./docs/DEVELOPMENT.md)
- [トラブルシューティング](./docs/TROUBLESHOOTING.md)
- [デプロイメント](./docs/DEPLOYMENT.md)

## 🤝 サポート

問題が発生した場合は [Issues](https://github.com/yuu-0615/ai-chat-site/issues) で報告してください。

## 📄 ライセンス

MIT License
