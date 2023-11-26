# Irukara.net フロントエンド

```
npm isntall
npm run dev
```

### ユーザーテーブル

{stage}-AuthUserTable
| 保存カラム | 型 | index | コメント |
| :--- | :--- | :--- | :--- |
| id | string | PK | uuid |
| user_id | string | GSI | signIn 時の id |
| name | string | GSI | signIn 時の name |
| email | string | GSI | signIn 時の name |
| user_image | string | GSI | signIn 時の name |
| provider | string | GSI | signIn 時の provider |
| plan | string | GSI | 有料、無料などのプラン |
| access_count | string | GSI | signIn 時の refresh_token |
| created_at | | | |
| updated_at | | | |
| deleted_at | | | |

signIn
ユーザーがいるか確認。
いない場合は登録処理
いる場合は、アクセストークンと有効期限のみ更新

session
ユーザーを取得
期限切れなら、リフレッシュトークンを元に新しいアクセストークンを発行。
