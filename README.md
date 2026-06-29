# AI Chat Site - 制限無しの機能豊富なAIチャットプラットフォーム

![AI Chat Site](https://img.shields.io/badge/AI-Chat-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)

## 🌟 主な機能

### 🗨️ ユーザー機能
- **リアルタイムストリーミングチャット** - AI の回答をリアルタイムで表示
- **複数 AI モデル対応** - OpenAI、Anthropic など複数のプロバイダーに対応
- **チャット履歴管理** - 過去のチャットを保存・検索・削除
- **カスタムコンテキスト** - チャットのシステムプロンプトをカスタマイズ
- **プロンプトテンプレート** - よく使う設定を保存・再利用
- **ファイルアップロード** - 画像やドキュメント処理（スケーラブル）
- **エクスポート機能** - JSON、PDF、Markdown でのエクスポート
- **ダークモード対応** - 目に優しいテーマ切り替え
- **マルチ言語対応** - 日本語、英語、中国語など

### 🎛️ 管理パネル機能
- **カスタム AI 学習**
  - データセットのアップロード（CSV、JSON、TXT）
  - モデルのファインチューニング設定
  - トレーニング履歴と進捗管理
  - ベースモデルの切り替え
  
- **プロンプトエンジニアリング**
  - プロンプトテンプレートの作成・編集
  - テンプレートのテスト実行
  - バージョン管理とロールバック
  - テンプレート共有機能
  
- **ユーザー管理**
  - ユーザーアカウント管理
  - 権限・ロール設定（Admin、User、Guest）
  - 使用状況の監視
  - API キー発行・管理
  
- **API 統合管理**
  - OpenAI、Anthropic キー管理
  - プロバイダーの有効・無効切り替え
  - API レート制限設定
  - コスト追跡・課金管理
  
- **分析ダッシュボード**
  - リアルタイム統計情報
  - ユーザー行動分析
  - チャット数、トークン使用量の可視化
  - 日別・週別・月別レポート
  
- **システム設定**
  - レート制限の設定
  - ブラックリスト/ホワイトリスト
  - ログ管理
  - メンテナンスモード

## 🏗️ アーキテクチャ

```
┌─────────────────────────────────────────────────┐
│         Frontend (React + TypeScript)           │
│  ┌──────────────────────────────────────────┐  │
│  │ User Chat Interface / Admin Dashboard    │  │
│  └──────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────┘
                 │ REST API / WebSocket
                 ▼
┌─────────────────────────────────────────────────┐
│       Backend (Express + TypeScript)            │
│  ┌──────────────────────────────────────────┐  │
│  │ Auth │ Chat │ Admin │ AI Integration    │  │
│  └──────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌────────┐ ┌──────────┐ ┌─────────────┐
│MongoDB │ │OpenAI API│ │Anthropic API│
└────────┘ └──────────┘ └─────────────┘
```

## 🛠️ 技術スタック

### Frontend
- **React 18** - UI フレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **Tailwind CSS** - スタイリング
- **React Router** - ルーティング
- **Zustand** - 状態管理
- **Axios** - HTTP クライアント
- **Socket.io Client** - リアルタイム通信
- **React Markdown** - Markdown レンダリング
- **Recharts** - グラフ表示
- **React Query** - サーバー状態管理

### Backend
- **Node.js 20** - ランタイム
- **Express** - Web フレームワーク
- **TypeScript** - 型安全性
- **MongoDB** - NoSQL データベース
- **Mongoose** - MongoDB ODM
- **JWT** - 認証
- **Socket.io** - リアルタイム通信
- **LangChain** - AI 統合
- **OpenAI SDK** - OpenAI API
- **Anthropic SDK** - Anthropic API
- **Multer** - ファイルアップロード
- **Bcrypt** - パスワードハッシュ
- **Joi** - バリデーション
- **Winston** - ログ管理

### DevOps
- **Docker** - コンテナ化
- **Docker Compose** - 本番環境シミュレーション
- **ESLint** - コード品質
- **Prettier** - コードフォーマット
- **Jest** - テスティング

## 📦 プロジェクト構成

```
ai-chat-site/
├── frontend/                 # React フロントエンド
│   ├── public/
│   ├── src/
│   │   ├── components/      # React コンポーネント
│   │   ├── pages/           # ページコンポーネント
│   │   ├── hooks/           # カスタムフック
│   │   ├── store/           # Zustand ストア
│   │   ├── api/             # API クライアント
│   │   ├── types/           # TypeScript 型定義
│   │   ├── utils/           # ユーティリティ関数
│   │   ├── styles/          # グローバルスタイル
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                  # Express バックエンド
│   ├── src/
│   │   ├── models/          # Mongoose スキーマ
│   │   ├── routes/          # API ルート
│   │   ├── controllers/     # ビジネスロジック
│   │   ├── middleware/      # ミドルウェア
│   │   ├── services/        # AI 統合・ビジネス処理
│   │   ├── utils/           # ユーティリティ
│   │   ├── types/           # TypeScript 型定義
│   │   ├── config/          # 設定ファイル
│   │   ├── sockets/         # WebSocket ハンドラ
│   │   ├── app.ts           # Express アプリ設定
│   │   └── server.ts        # サーバー起動
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml        # Docker Compose 設定
├── .env.example              # 環境変数テンプレート
├── .gitignore
└── README.md
```

## 🚀 クイックスタート

### 前提条件
- Node.js 20+
- Docker & Docker Compose
- MongoDB 7+
- OpenAI API キー（または Anthropic キ��）

### インストール

#### 方法 1: Docker (推奨)

```bash
# リポジトリのクローン
git clone https://github.com/yuu-0615/ai-chat-site.git
cd ai-chat-site

# 環境変数の設定
cp .env.example .env
# .env ファイルを編集して API キーを設定

# Docker で起動
docker-compose up -d

# アクセス
# フロントエンド: http://localhost:3000
# バックエンド API: http://localhost:5000/api
# 管理パネル: http://localhost:3000/admin
```

#### 方法 2: ローカル開発

```bash
# リポジトリのクローン
git clone https://github.com/yuu-0615/ai-chat-site.git
cd ai-chat-site

# 全体インストール
npm run install-all

# 環境変数の設定
cp .env.example .env

# 開発サーバー起動（別ターミナルで実行）
# ターミナル 1: バックエンド
cd backend
npm run dev

# ターミナル 2: フロントエンド
cd frontend
npm run dev

# アクセス
# フロントエンド: http://localhost:5173
# バックエンド API: http://localhost:5000/api
```

## 🔐 環境変数設定

```bash
# Backend
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-chat-site
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# AI APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-password
```

## 📚 API ドキュメント

### 認証
```
POST /api/auth/register       # ユーザー登録
POST /api/auth/login          # ログイン
POST /api/auth/refresh        # トークンリフレッシュ
POST /api/auth/logout         # ログアウト
```

### チャット
```
GET  /api/chats               # チャット一覧
POST /api/chats               # 新規チャット作成
GET  /api/chats/:id           # チャット詳細
DELETE /api/chats/:id         # チャット削除
POST /api/chats/:id/messages  # メッセージ送信
GET  /api/chats/:id/export    # チャットエクスポート
```

### 管理 API
```
GET  /api/admin/users         # ユーザー一覧
GET  /api/admin/analytics     # 分析データ
POST /api/admin/training      # トレーニング開始
GET  /api/admin/training/:id  # トレーニング進捗
GET  /api/admin/prompts       # プロンプト一覧
POST /api/admin/prompts       # プロンプト作成
PUT  /api/admin/settings      # システム設定更新
```

### WebSocket イベント
```
connect                        # 接続
disconnect                     # 切断
chat:message                   # メッセージ送信
chat:stream                    # ストリーミング応答
notification:update            # 通知
```

詳細は [API ドキュメント](./docs/API.md) を参照

## 🧪 テスト

```bash
# ユニットテスト
npm run test

# カバレッジ
npm run test:coverage

# E2E テスト
npm run test:e2e
```

## 🎨 UI/UX 機能

### チャット画面
- ✅ リアルタイムストリーミング
- ✅ Markdown サポート
- ✅ コード強調表示
- ✅ 絵文字サポート
- ✅ レスポンシブデザイン
- ✅ 画像プレビュー
- ✅ メッセージ検索

### 管理ダッシュボード
- ✅ リアルタイム統計
- ✅ グラフ・チャート表示
- ✅ ユーザー管理インターフェース
- ✅ トレーニング管理UI
- ✅ API キー管理
- ✅ ログビューア

## 🔧 トラブルシューティング

### MongoDB 接続エラー
```bash
# MongoDB が起動しているか確認
mongosh
```

### API キーエラー
```bash
# .env ファイルに正しい API キーが設定されているか確認
cat .env | grep API_KEY
```

### ポート競合
```bash
# ポート 5000 が使用中の場合
lsof -i :5000
kill -9 <PID>
```

## 📖 ドキュメント

- [セットアップガイド](./docs/SETUP.md)
- [開発ガイド](./docs/DEVELOPMENT.md)
- [API リファレンス](./docs/API.md)
- [デプロイメント](./docs/DEPLOYMENT.md)
- [トラブルシューティング](./docs/TROUBLESHOOTING.md)

## 🚢 デプロイメント

### Vercel (フロントエンド)
```bash
vercel deploy
```

### Railway / Render / Fly.io (バックエンド)
```bash
# Docker イメージのビルド
docker build -t ai-chat-site ./backend
```

詳細は [デプロイメントガイド](./docs/DEPLOYMENT.md) を参照

## 📄 ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) を参照

## 🤝 コントリビューション

プルリクエストを歓迎します！

## 📧 サポート

問題が発生した場合は [Issues](https://github.com/yuu-0615/ai-chat-site/issues) で報告してください。
