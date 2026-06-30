# AI Chat Site

**制限無しの機能豊富なAIチャットプラットフォーム + 専用管理ページ**

![GitHub repo](https://img.shields.io/github/repo-size/yuu-0615/ai-chat-site?style=flat-square)
![License](https://img.shields.io/github/license/yuu-0615/ai-chat-site?style=flat-square)

## 🎯 概要

**AI Chat Site** は、OpenAI や Anthropic などの複数の AI モデルをサポートする、フル機能のチャットプラットフォームです。管理者向けの専用ページでカスタム AI の学習・管理が可能です。

## ✨ 主な特徴

### 👥 ユーザー向け機能

✅ **リアルタイムチャット**
- ストリーミング対応で即座に回答を表示
- 複数の AI モデルから選択可能

✅ **チャット履歴管理**
- 過去のチャットを保存・検索・復元
- タグ付けでカテゴライズ

✅ **カスタムコンテキスト**
- システムプロンプトをカスタマイズ
- チャットごとに背景情報を設定可能

✅ **エクスポート機能**
- JSON、Markdown、TXT 形式でダウンロード

✅ **ダークモード対応**
- 目に優しいテーマ切り替え

✅ **マルチ言語対応**
- 日本語、英語など複数言語に対応

### 🔧 管理者向け機能

✅ **カスタム AI 学習**
- データセットアップロード
- モデルのファインチューニング設定
- トレーニング履歴管理

✅ **プロンプトテンプレート**
- よく使うプロンプトを保存
- チーム間で共有可能
- バージョン管理

✅ **ユーザー管理**
- 権限設定（Admin/User）
- 使用状況の監視
- API キー発行

✅ **分析ダッシュボード**
- リアルタイム統計
- ユーザー行動分析
- トークン使用量追跡

✅ **システム設定**
- レート制限調整
- ブラックリスト/ホワイトリスト管理
- ログ管理

## 🛠️ 技術スタック

### Frontend
- **React 18** - UI フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Zustand** - 状態管理
- **React Query** - データ管理
- **Socket.io** - リアルタイム通信

### Backend
- **Node.js 20** - ランタイム
- **Express** - Web フレームワーク
- **MongoDB** - データベース
- **Mongoose** - ODM
- **JWT** - 認証
- **OpenAI SDK** - OpenAI 統合
- **Anthropic SDK** - Anthropic 統合

### DevOps
- **Docker** - コンテナ化
- **Docker Compose** - オーケストレーション

## 🚀 クイックスタート

### Docker で起動（推奨）

```bash
# リポジトリをクローン
git clone https://github.com/yuu-0615/ai-chat-site.git
cd ai-chat-site

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集して API キーを入力

# Docker で起動
docker-compose up -d
```

**アクセス:**
- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:5000/api

### ローカル開発

```bash
# 全体インストール
npm run install-all

# 環境変数設定
cp .env.example .env

# 開発サーバー起動（別ターミナル）
cd backend && npm run dev
cd frontend && npm run dev  # 別ターミナル
```

詳細は [セットアップガイド](./docs/SETUP.md) を参照

## 📚 ドキュメント

- 📖 [セットアップガイド](./docs/SETUP.md) - インストールと初期設定
- 🔌 [API リファレンス](./docs/API.md) - 全 API エンドポイント
- 💻 [開発ガイド](./docs/DEVELOPMENT.md) - 機能追加とデバッグ
- 🚀 [デプロイメント](./docs/DEPLOYMENT.md) - 本番環境へのデプロイ
- 🐛 [トラブルシューティング](./docs/TROUBLESHOOTING.md) - よくある問題と解決方法

## 🔐 デフォルトアカウント

```
メール: admin@example.com
パスワード: admin123456
```

⚠️ **本番環境では必ず変更してください**

## 📋 API エンドポイント

### 認証

```
POST   /api/auth/register    # ユーザー登録
POST   /api/auth/login       # ログイン
POST   /api/auth/refresh     # トークンリフレッシュ
```

### チャット

```
GET    /api/chats            # チャット一覧
POST   /api/chats            # 新規チャット作成
GET    /api/chats/:id        # チャット詳細
PUT    /api/chats/:id        # チャット更新
DELETE /api/chats/:id        # チャット削除
POST   /api/chats/:id/messages  # メッセージ送信
GET    /api/chats/:id/export    # チャットエクスポート
```

### 管理

```
GET    /api/admin/users      # ユーザー一覧
GET    /api/admin/analytics  # 分析データ
GET    /api/admin/training   # トレーニングデータ
GET    /api/admin/prompts    # プロンプトテンプレート
```

詳細は [API ドキュメント](./docs/API.md) を参照

## 🎨 スクリーンショット

### チャット画面

![Chat](https://placeholder.com/800x600)

### 管理ダッシュボード

![Admin Dashboard](https://placeholder.com/800x600)

## 🔄 更新履歴

### v1.0.0 (2024-01-01)

✅ 初回リリース
- チャット機能
- ユーザー認証
- 管理ダッシュボード
- AI 統合（OpenAI、Anthropic）

## 📦 フォルダ構成

```
ai-chat-site/
├── frontend/                 # React フロントエンド
│   ├── src/
│   │   ├── components/      # React コンポーネント
│   │   ├── pages/           # ページコンポーネント
│   │   ├── api/             # API クライアント
│   │   ├── store/           # Zustand ストア
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Express バックエンド
│   ├── src/
│   │   ├── models/          # Mongoose スキーマ
│   │   ├── routes/          # API ルート
│   │   ├── controllers/     # ビジネスロジック
│   │   ├── services/        # AI 統合
│   │   ├── middleware/      # ミドルウェア
│   │   └── app.ts
│   ├── package.json
│   └── Dockerfile
├── docs/                     # ドキュメント
├── docker-compose.yml        # Docker Compose 設定
├── .env.example              # 環境変数テンプレート
└── README.md
```

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まず Issue を開いて変更内容を議論してください。

```bash
# 1. リポジトリをフォーク
# 2. 機能ブランチを作成
git checkout -b feature/AmazingFeature
# 3. 変更をコミット
git commit -m 'Add AmazingFeature'
# 4. ブランチにプッシュ
git push origin feature/AmazingFeature
# 5. Pull Request を作成
```

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) ファイルを参照してください。

## 📞 サポート

問題が発生した場合:

1. [トラブルシューティング](./docs/TROUBLESHOOTING.md) を確認
2. [Issues](https://github.com/yuu-0615/ai-chat-site/issues) で報告
3. ログと再現手順を含める

## 🙏 謝辞

- [OpenAI](https://openai.com/) - GPT モデル
- [Anthropic](https://www.anthropic.com/) - Claude モデル
- [React](https://react.dev/) - UI フレームワーク
- [Express](https://expressjs.com/) - Web フレームワーク
- [MongoDB](https://www.mongodb.com/) - データベース

## 📊 プロジェクト統計

![GitHub stars](https://img.shields.io/github/stars/yuu-0615/ai-chat-site?style=social)
![GitHub forks](https://img.shields.io/github/forks/yuu-0615/ai-chat-site?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yuu-0615/ai-chat-site?style=social)

---

**制限無しの機能豊富なAIチャットプラットフォーム** - 今すぐ始めましょう！ 🚀
