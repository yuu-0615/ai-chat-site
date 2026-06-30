# API リファレンス

## ベース URL

```
http://localhost:5000/api
```

## 認証

すべてのリクエスト（認証エンドポイント除く）には `Authorization` ヘッダーが必要：

```
Authorization: Bearer <token>
```

## 🔐 認証エンドポイント

### ユーザー登録

```
POST /auth/register
```

**リクエスト:**

```json
{
  "name": "山田太郎",
  "email": "user@example.com",
  "password": "secure-password"
}
```

**レスポンス:**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "山田太郎",
    "role": "user"
  }
}
```

### ログイン

```
POST /auth/login
```

**リクエスト:**

```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**レスポンス:** （登録時と同じ）

### トークンリフレッシュ

```
POST /auth/refresh
```

**リクエスト:**

```json
{
  "refreshToken": "eyJhbGc..."
}
```

**レスポンス:**

```json
{
  "message": "Token refreshed",
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

## 💬 チャットエンドポイント

### チャット一覧取得

```
GET /chats
```

**レスポンス:**

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "新しいチャット",
      "model": "gpt-4-turbo",
      "messageCount": 5,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 新規チャット作成

```
POST /chats
```

**リクエスト:**

```json
{
  "title": "新しいチャット",
  "model": "gpt-4-turbo",
  "systemPrompt": "あなたは優秀なアシスタントです"
}
```

**レスポンス:**

```json
{
  "message": "Chat created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "新しいチャット",
    "model": "gpt-4-turbo"
  }
}
```

### チャット詳細取得

```
GET /chats/:id
```

**レスポンス:**

```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "title": "新しいチャット",
    "messages": [
      {
        "role": "user",
        "content": "こんにちは",
        "model": "gpt-4-turbo",
        "tokens": { "input": 10, "output": 0 },
        "createdAt": "2024-01-01T00:00:00Z"
      },
      {
        "role": "assistant",
        "content": "こんにちは。お手伝いできることはありますか？",
        "model": "gpt-4-turbo",
        "tokens": { "input": 10, "output": 20 },
        "createdAt": "2024-01-01T00:00:01Z"
      }
    ],
    "model": "gpt-4-turbo",
    "systemPrompt": "あなたは優秀なアシスタントです",
    "context": {},
    "isPublic": false,
    "tags": [],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:01Z"
  }
}
```

### チャット更新

```
PUT /chats/:id
```

**リクエスト:**

```json
{
  "title": "更新されたタイトル",
  "systemPrompt": "新しいシステムプロンプト"
}
```

### チャット削除

```
DELETE /chats/:id
```

### メッセージ送信

```
POST /chats/:id/messages
```

**リクエスト:**

```json
{
  "content": "これはテストです",
  "model": "gpt-4-turbo"
}
```

**レスポンス:**

```json
{
  "message": "Message sent successfully",
  "data": {
    "userMessage": "これはテストです",
    "assistantMessage": "AIからの返答",
    "tokens": { "input": 20, "output": 50 }
  }
}
```

### チャットエクスポート

```
GET /chats/:id/export?format=json
```

**パラメータ:**

- `format`: `json`, `md`, `txt` (デフォルト: json)

**レスポンス:** チャットデータをファイルとしてダウンロード

## 👥 管理エンドポイント

*管理者のみアクセス可能*

### ユーザー一覧

```
GET /admin/users
```

### ユーザーロール更新

```
PUT /admin/users/:id/role
```

**リクエスト:**

```json
{
  "role": "admin"
}
```

### ユーザー削除

```
DELETE /admin/users/:id
```

### 分析データ取得

```
GET /admin/analytics
```

**レスポンス:**

```json
{
  "data": {
    "totalUsers": 100,
    "totalChats": 500,
    "totalMessages": 5000,
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### 日別分析データ

```
GET /admin/analytics/daily
```

### プロンプトテンプレート一覧

```
GET /admin/prompts
```

### プロンプトテンプレート作成

```
POST /admin/prompts
```

**リクエスト:**

```json
{
  "name": "技術ライティング",
  "description": "技術ドキュメント作成用",
  "content": "あなたはテクニカルライターです。わかりやすく説明してください。",
  "category": "writing",
  "variables": ["topic", "audience"],
  "tags": ["tech", "documentation"]
}
```

### トレーニングデータアップロード

```
POST /admin/training
```

**リクエスト:** (multipart/form-data)

```
name: "トレーニングデータ"
file: <file>
dataType: "dataset"
```

## ❌ エラーレスポンス

### 401 Unauthorized

```json
{
  "message": "Invalid token",
  "status": 401
}
```

### 403 Forbidden

```json
{
  "message": "Admin access required",
  "status": 403
}
```

### 404 Not Found

```json
{
  "message": "Chat not found",
  "status": 404
}
```

### 429 Too Many Requests

```json
{
  "message": "Too many requests from this IP, please try again later.",
  "status": 429
}
```

### 500 Internal Server Error

```json
{
  "message": "Internal Server Error",
  "status": 500
}
```

## 📡 WebSocket イベント

### 接続

```javascript
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('接続しました');
});
```

### チャットに参加

```javascript
socket.emit('join-chat', chatId);
```

### メッセージ受信

```javascript
socket.on('message-received', (data) => {
  console.log('新しいメッセージ:', data);
});
```

### 入力中

```javascript
socket.emit('typing', { chatId });

socket.on('typing', (data) => {
  console.log('ユーザーが入力中:', data);
});
```
