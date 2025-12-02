# コーディングルール

このプロジェクトでコードを書く際のルール・ベストプラクティス。

---

## TypeScript

### 型安全性

- **`as` アサーション禁止**: 型キャストが必要な場合は型ガードを使う
- **`any` 禁止**: 代わりに `unknown` を使い、型ガードで絞り込む
- **`!` (non-null assertion) 禁止**: 適切な null チェックを行う

### 型定義

- **`type` を優先**: `interface` より `type` を使う
- `interface` は外部ライブラリの拡張が必要な場合のみ使用

### 型ガードの例

```ts
// NG
const data = response as User

// OK
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}

if (isUser(response)) {
  // response は User 型として扱える
}
```

---

## コードスタイル

### 可読性

- ネストは深くしない（可能な限り早期リターン）
- マジックナンバーではなく定数を使用
- 他の人が見てもわかりやすいコード

### DRY 原則

- 重複が出る場合はモジュール化・コンポーネント化
- ただし過度な抽象化は避ける（必要になってから共通化）

---

## API レスポンス

### レスポンス構造

```ts
// 成功 (200)
{ success: true, data: T }

// エラー (4xx, 5xx)
{ success: false, message: string }
```

### ステータスコードの使い分け

| ステータス | 用途 |
|-----------|------|
| 200 | 成功 |
| 400 | バリデーションエラー（入力が不正） |
| 401 | 未認証 |
| 403 | 権限なし（チームに所属してない等） |
| 404 | リソースが見つからない |
| 500 | サーバーエラー（予期しないエラー） |

### エラーハンドリングパターン

- try-catch で catch したものは 500 を返す
- それ以外のエラー（認証、バリデーション等）は try の途中で早期リターン
- エラーメッセージは簡易的なもののみ返す（詳細は返さない）
- 500 エラー時は `console.error` で詳細を出力

```ts
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, message: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: '入力内容に誤りがあります' },
        { status: 400 }
      )
    }

    const result = await someService.create(parsed.data)
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('POST /api/xxx error:', error)
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
```

---

## 今後追記予定

- コンポーネント設計のルール
