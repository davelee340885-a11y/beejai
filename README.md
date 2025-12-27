# BeeJAI 🐝 - 香港升學資訊平台

> 輕鬆掌握全港 2000+ 學校入學資訊

BeeJAI 是一個專為香港家長設計的升學資訊平台，提供全面的幼稚園、小學、中學及國際學校資訊，幫助家長為子女選擇最合適的學校。

## ✨ 主要功能

### 📚 學校資料庫
- **2,540+ 間學校**：涵蓋幼稚園（1,224間）、小學（693間）、中學（623間）
- **完整資訊**：學校名稱、地址、電話、網站、地區、資助類型、性別分類、宗教背景
- **地理位置**：整合經緯度座標，支援地圖顯示

### 🔍 智能搜尋
- 按學校名稱、地區、關鍵字搜尋
- 多維度篩選：學校類型、資助類型、Band 等級、教學語言
- 快速篩選：K1、小一、中一、插班等入學階段

### 📊 實用工具
- **學費計算機**：估算教育開支
- **升學攻略**：7個專題指南
- **進階搜尋**：12+ 維度篩選
- **收藏功能**：保存心儀學校

### 👨‍👩‍👧‍👦 家長服務
- **升學顧問**：專業諮詢服務
- **代寫信件**：申請信件撰寫
- **模擬面試**：面試準備輔導
- **Profile 建立**：學生檔案管理

## 🗂️ 數據來源

學校數據來自香港教育局公開數據（data.gov.hk），確保資訊準確可靠。

## 🛠️ 技術架構

### 前端
- **框架**：React 19 + TypeScript
- **樣式**：Tailwind CSS 4 + shadcn/ui
- **路由**：Wouter
- **狀態管理**：tRPC + React Query

### 後端
- **框架**：Express 4 + tRPC 11
- **數據庫**：MySQL (Drizzle ORM)
- **認證**：Manus OAuth
- **序列化**：Superjson

### 開發工具
- **構建工具**：Vite 7
- **包管理器**：pnpm
- **測試**：Vitest
- **代碼規範**：ESLint + TypeScript

## 🚀 快速開始

### 環境要求
- Node.js 22+
- pnpm 10+
- MySQL 8+

### 安裝依賴
```bash
pnpm install
```

### 配置環境變量
複製 `.env.example` 到 `.env` 並填入必要配置：
```env
DATABASE_URL=mysql://user:password@localhost:3306/beejai
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
# ... 其他配置
```

### 數據庫遷移
```bash
pnpm db:push
```

### 導入學校數據
```bash
npx tsx import-schools.mjs
```

### 啟動開發服務器
```bash
pnpm dev
```

訪問 http://localhost:3000 查看應用。

## 📁 項目結構

```
beejai/
├── client/                 # 前端代碼
│   ├── public/            # 靜態資源
│   └── src/
│       ├── components/    # UI 組件
│       ├── pages/         # 頁面組件
│       ├── lib/           # 工具函數
│       └── App.tsx        # 路由配置
├── server/                # 後端代碼
│   ├── _core/            # 核心功能
│   ├── db.ts             # 數據庫查詢
│   └── routers.ts        # tRPC 路由
├── drizzle/              # 數據庫 Schema
│   └── schema.ts
├── shared/               # 共享類型
└── import-schools.mjs    # 數據導入腳本
```

## 🗄️ 數據庫 Schema

### 主要表格
- `users` - 用戶資料
- `schools` - 學校資料
- `children` - 子女資料
- `favorites` - 收藏學校
- `applications` - 申請記錄
- `admission_info` - 入學資訊
- `subscriptions` - 訂閱方案
- `notification_settings` - 通知設定

## 🔐 認證系統

使用 Manus OAuth 提供安全的用戶認證：
- 自動處理登入/登出流程
- Session 管理
- 受保護的 API 端點
- 用戶資料同步

## 📱 響應式設計

- 移動優先設計
- 支援手機、平板、桌面設備
- 流暢的用戶體驗

## 🎨 設計系統

- 明亮活潑的黃色主題
- 清晰的視覺層次
- 一致的組件風格
- 無障礙設計

## 📈 未來規劃

- [ ] 學校評價系統
- [ ] 用戶評論功能
- [ ] 地圖搜尋功能
- [ ] 學校比較工具
- [ ] 入學時間線提醒
- [ ] 社群論壇
- [ ] 移動應用

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 📞 聯絡方式

如有任何問題或建議，歡迎聯繫我們。

---

Made with ❤️ for Hong Kong parents
