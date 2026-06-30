# トラブルシューティング

## 🔴 よくある問題と解決方法

### MongoDB 接続エラー

**症状:**
```
MongoError: connect ECONNREFUSED 127.0.0.1:27017
```

**解決方法:**

1. MongoDB が起動しているか確認
```bash
docker ps | grep mongo
```

2. 起動していない場合は起動
```bash
docker-compose up -d mongo
```

3. 接続文字列を確認
```bash
echo $MONGODB_URI
```

### API キーが無効

**症状:**
```
Error: Invalid API key provided
```

**解決方法:**

1. .env ファイルで API キーを確認
```bash
grep API_KEY .env
```

2. API キーが正しく設定されているか確認
```bash
# OpenAI
echo $OPENAI_API_KEY

# Anthropic
echo $ANTHROPIC_API_KEY
```

3. Docker コンテナを再起動
```bash
docker-compose restart backend
```

### CORS エラー

**症状:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**解決方法:**

1. .env で CORS_ORIGIN を確認
```bash
grep CORS_ORIGIN .env
```

2. フロントエンドの URL が含まれているか確認
```bash
# 例
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

3. バックエンドを再起動
```bash
docker-compose restart backend
```

### ポート競合

**症状:**
```
Error: listen EADDRINUSE :::5000
```

**解決方法:**

1. 使用中のプロセスを確認
```bash
lsof -i :5000
```

2. プロセスを終了
```bash
kill -9 <PID>
```

3. 別のポートを使用
```bash
# .env で PORT を変更
PORT=5001
```

### JWT トークンが無効

**症状:**
```
Error: Invalid token
```

**解決方法:**

1. JWT_SECRET が設定されているか確認
```bash
echo $JWT_SECRET
```

2. トークンが有効期限内か確認
```bash
# フロントエンドで確認
const token = localStorage.getItem('token');
console.log(token);
```

3. ログイン し直す

### フロントエンドが API に接続できない

**症状:**
```
NetworkError when attempting to fetch resource
```

**解決方法:**

1. API URL を確認
```bash
echo $VITE_API_URL
```

2. バックエンドが起動しているか確認
```bash
curl http://localhost:5000/api/health
```

3. ファイアウォール設定を確認

4. Docker ネットワークを確認
```bash
docker network ls
docker network inspect ai-chat-network
```

### データベースがロックされている

**症状:**
```
MongoError: E11000 duplicate key error
```

**解決方法:**

1. データベースをリセット
```bash
docker-compose down -v
docker-compose up -d
```

2. または MongoDB にアクセスして手動削除
```bash
mongosh
use ai-chat-site
db.users.deleteMany({})
```

### メモリ不足

**症状:**
```
ERROR: failed to build: dockerfile build context must be smaller than
```

**解決方法:**

1. node_modules をクリア
```bash
cd backend && rm -rf node_modules && npm ci
cd ../frontend && rm -rf node_modules && npm ci
```

2. Docker イメージを再ビルド
```bash
docker-compose build --no-cache
```

### ファイルアップロード失敗

**症状:**
```
Error: File size exceeds maximum limit
```

**解決方法:**

1. MAX_FILE_SIZE を確認
```bash
echo $MAX_FILE_SIZE
```

2. 制限を増やす
```bash
# .env
MAX_FILE_SIZE=104857600  # 100MB
```

3. バックエンドを再起動
```bash
docker-compose restart backend
```

### ホットリロードが機能しない

**症状:**
```
コードを変更しても画面が更新されない
```

**解決方法:**

1. Vite サーバーを再起動
```bash
cd frontend
npm run dev
```

2. ブラウザをハードリロード
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

3. キャッシュをクリア
```bash
rm -rf frontend/.vite
```

## 📋 デバッグのチェックリスト

- [ ] .env ファイルが正しく設定されているか
- [ ] すべてのコンテナが起動しているか
- [ ] MongoDB が接続可能か
- [ ] API キーが有効か
- [ ] ファイアウォール設定を確認したか
- [ ] ポート競合がないか
- [ ] ブラウザキャッシュをクリアしたか
- [ ] ログを確認したか

## 📝 ログの確認

### Backend ログ

```bash
docker-compose logs backend

# リアルタイム監視
docker-compose logs -f backend

# 最後の 100 行
docker-compose logs --tail 100 backend
```

### Frontend ログ

```bash
# ブラウザの Console を使用
F12 キーを押す
Console タブを選択
```

### MongoDB ログ

```bash
docker-compose logs -f mongo
```

## 🆘 さらに help が必要な場合

1. [Issues](https://github.com/yuu-0615/ai-chat-site/issues) で報告
2. ログ出力を含める
3. エラーメッセージをコピー
4. 再現手順を詳しく説明
