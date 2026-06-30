# デプロイメントガイド

## 🚀 本番環境へのデプロイ

### Vercel にデプロイ（フロントエンド）

#### 1. プロジェクトを接続

```bash
cd frontend
npm install -g vercel
vercel
```

#### 2. 環境変数を設定

Vercel ダッシュボード → Settings → Environment Variables

```
VITE_API_URL=https://your-backend-url/api
VITE_SOCKET_URL=https://your-backend-url
```

#### 3. デプロイ

```bash
vercel --prod
```

### Railway にデプロイ（バックエンド）

#### 1. プロジェクトを作成

https://railway.app にアクセスして新規プロジェクトを作成

#### 2. GitHub を接続

GitHub リポジトリを Railway に接続

#### 3. 環境変数を設定

Railway ダッシュボード → Variables

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai-chat-site
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

#### 4. MongoDB Atlas を使用

https://www.mongodb.com/cloud/atlas にアクセス

- アカウントを作成
- クラスターを作成
- 接続文字列をコピー
- Railway の MONGODB_URI に設定

### Render にデプロイ（バックエンド）

#### 1. Render にサインアップ

https://render.com にアクセス

#### 2. 新規 Web Service を作成

- GitHub リポジトリを接続
- Root Directory を `backend` に設定
- Runtime を Node に設定

#### 3. 環境変数を設定

Environment Variables で以下を追加：

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
```

#### 4. Start Command を設定

```
npm run build && npm start
```

### Fly.io にデプロイ（バックエンド）

#### 1. Fly CLI をインストール

```bash
curl -L https://fly.io/install.sh | sh
flyctl auth signup
```

#### 2. アプリケーションを起動

```bash
cd backend
flyctl launch
```

#### 3. 環境変数を設定

```bash
flyctl secrets set MONGODB_URI="mongodb+srv://..."
flyctl secrets set OPENAI_API_KEY="sk-..."
flyctl secrets set JWT_SECRET="your-secret"
```

#### 4. デプロイ

```bash
flyctl deploy
```

## 🐳 Docker イメージをビルド

### Backend Docker イメージ

```bash
cd backend
docker build -t ai-chat-backend:1.0.0 .
```

### Frontend Docker イメージ

```bash
cd frontend
docker build -t ai-chat-frontend:1.0.0 .
```

## 📋 本番前チェックリスト

- [ ] すべてのシークレット/API キーが設定されているか
- [ ] データベースのバックアップを取得したか
- [ ] HTTPS が有効になっているか
- [ ] CORS 設定が正しいか
- [ ] ログレベルが production に設定されているか
- [ ] エラー処理が適切か
- [ ] パフォーマンステストを実行したか
- [ ] セキュリティテストを実行したか
- [ ] CDN を設定したか（フロントエンド）
- [ ] モニタリングを設定したか

## 📊 モニタリングとロギング

### Sentry でエラー監視

1. https://sentry.io にサインアップ
2. プロジェクトを作成
3. Backend と Frontend にそれぞれ統合

### DataDog でパフォーマンス監視

1. https://www.datadoghq.com にサインアップ
2. エージェントをインストール
3. ダッシュボードを設定

## 🔒 セキュリティ対策

### SSL/TLS

```bash
# Let's Encrypt で無料の SSL 証明書を取得
# Vercel/Railway/Render は自動で HTTPS を提供
```

### CORS

```typescript
// backend/src/app.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(','),
  credentials: true,
}));
```

### Rate Limiting

```typescript
// 既に実装済み
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
```

### パスワードハッシング

```typescript
// 既に bcryptjs で実装済み
const hashedPassword = await bcrypt.hash(password, 10);
```

## 📈 スケーリング

### キャッシング

Redis を使用してセッション/キャッシュを管理

```typescript
import redis from 'redis';
const client = redis.createClient();
```

### ロードバランシング

Nginx で複数のバックエンドインスタンスを分散

### CDN

Cloudflare または AWS CloudFront を使用

## 🔄 CI/CD パイプライン

### GitHub Actions

`.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          npm run build
          npm run test
          # Deploy commands
```

## 📞 本番環境トラブルシューティング

### ダウンタイム最小化

1. 青緑デプロイメントを使用
2. ローリングアップデートを実行
3. 段階的ロールアウトを使用

### ロールバック

```bash
# 前のバージョンにロールバック
git revert <commit-hash>
git push origin main
```

## 📚 参考資料

- [Vercel ドキュメント](https://vercel.com/docs)
- [Railway ドキュメント](https://docs.railway.app/)
- [Render ドキュメント](https://render.com/docs/)
- [Fly.io ドキュメント](https://fly.io/docs/)
- [MongoDB Atlas ドキュメント](https://docs.atlas.mongodb.com/)
