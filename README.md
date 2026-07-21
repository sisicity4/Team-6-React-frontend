## setup

1. `cd Team-6-react-frontend/Team-6-react-frontend`
2. `npm install`
3. `npm run dev` → Viteサーバーが立ち上がります

## useful scripts

- `npm run dev`
- `npm run build`
- `npm run lint`

## Django との統合

- `Team-6-react-frontend/Team-6-react-frontend/vite.config.js` は `base: '/static/app/'` を設定しており、生成された `dist/` は Django 側 `/static/app/` で配信されます。
- React を Django の `/app` にマッピングするには、ルートで `scripts/sync-react-to-django.sh` を実行するか、手動で `dist/index.html` と `dist/assets` を Django の `backend/templates/app`/`backend/static/app` にコピーし、`python manage.py collectstatic` を走らせてください。

React 側のビルド資産を Django で配信できれば、`/api/` は Django が、`/app` 以下は React SPA が共有されたサーバーで動作します。
