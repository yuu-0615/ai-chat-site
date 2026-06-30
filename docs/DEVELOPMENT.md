# 開発ガイド

## 📝 コーディング規約

### TypeScript

- 常に型定義を使用
- `any` 型は避ける
- インターフェース名は `I` プレフィックスで開始

### ファイル構造

```
Backend:
- models/        # Mongoose スキーマ
- routes/        # ルート定義
- controllers/   # ビジネスロジック
- services/      # 外部 API 統合等
- middleware/    # ミドルウェア
- utils/         # ユーティリティ関数
- config/        # 設定ファイル

Frontend:
- components/    # React コンポーネント
- pages/         # ページコンポーネント
- api/           # API クライアント
- store/         # Zustand ストア
- hooks/         # カスタムフック
- types/         # 型定義
```

## 🔄 開発ワークフロー

### 新機能を追加する場合

1. **ブランチを作成**

```bash
git checkout -b feature/機能名
```

2. **Backend に実装**

```bash
cd backend
npm run dev
```

3. **Frontend に実装**

```bash
cd frontend
npm run dev
```

4. **テストを実行**

```bash
cd backend
npm test
```

5. **コミットとプッシュ**

```bash
git add .
git commit -m "feat: 新機能の説明"
git push origin feature/機能名
```

6. **Pull Request を作成**

## 🐛 デバッグ

### Backend

```bash
# VSCode Debug
# .vscode/launch.json に以下を追加
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend Debug",
      "program": "${workspaceFolder}/backend/src/server.ts",
      "restart": true,
      "preLaunchTask": "tsc: build"
    }
  ]
}
```

### Frontend

Chrome DevTools で React Developer Tools を使用

## 📚 新しい API エンドポイントを追加

### 1. Backend でモデルを定義

```typescript
// backend/src/models/Example.ts
import { Schema, model } from 'mongoose';

interface IExample {
  name: string;
  description: string;
  createdAt?: Date;
}

const exampleSchema = new Schema<IExample>({
  name: { type: String, required: true },
  description: String,
}, { timestamps: true });

export const Example = model<IExample>('Example', exampleSchema);
```

### 2. Controller を作成

```typescript
// backend/src/controllers/example.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Example } from '../models/Example';

export const getExamples = async (req: AuthRequest, res: Response) => {
  try {
    const examples = await Example.find();
    res.json({ data: examples });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch examples' });
  }
};

export const createExample = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const example = new Example({ name, description });
    await example.save();
    res.status(201).json({ data: example });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create example' });
  }
};
```

### 3. ルートを定義

```typescript
// backend/src/routes/example.routes.ts
import express from 'express';
import * as exampleController from '../controllers/example.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, exampleController.getExamples);
router.post('/', authenticate, exampleController.createExample);

export default router;
```

### 4. app.ts にルートを追加

```typescript
import exampleRoutes from './routes/example.routes';

app.use('/api/examples', exampleRoutes);
```

### 5. Frontend でAPIクライアントを作成

```typescript
// frontend/src/api/example.ts
import { apiClient } from './client';

export const exampleAPI = {
  getExamples: () =>
    apiClient.get<{ data: any[] }>('/examples'),
  
  createExample: (data: any) =>
    apiClient.post<{ data: any }>('/examples', data),
};
```

### 6. Frontend でコンポーネントを作成

```typescript
// frontend/src/components/ExampleList.tsx
import { useQuery } from '@tanstack/react-query';
import { exampleAPI } from '../api/example';

function ExampleList() {
  const { data: examples, isLoading } = useQuery({
    queryKey: ['examples'],
    queryFn: () => exampleAPI.getExamples().then((res) => res.data.data),
  });

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <ul>
      {examples?.map((example) => (
        <li key={example._id}>{example.name}</li>
      ))}
    </ul>
  );
}

export default ExampleList;
```

## 🧹 コード品質

### Lint

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

### Format

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

## 📦 新しい依存関係を追加

```bash
# Backend
cd backend
npm install package-name
npm install --save-dev @types/package-name

# Frontend
cd frontend
npm install package-name
```

## 🚀 本番環境への準備

1. **環境変数を確認**

```bash
# .env ファイルをレビュー
cat .env
```

2. **ビルド**

```bash
npm run build
```

3. **テスト**

```bash
npm test
```

4. **本番環境でテスト**

```bash
docker-compose -f docker-compose.prod.yml up
```

## 📖 参考資料

- [Express.js ドキュメント](https://expressjs.com/)
- [React ドキュメント](https://react.dev/)
- [MongoDB ドキュメント](https://docs.mongodb.com/)
- [Mongoose ドキュメント](https://mongoosejs.com/)
- [TypeScript ドキュメント](https://www.typescriptlang.org/)
