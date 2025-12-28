# 香港教育局開放數據分析報告

## 數據來源

**主要來源：** DATA.GOV.HK - 學校位置及資料
- 官方網址：https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information
- 數據提供者：香港教育局
- 數據格式：CSV, XLSX, JSON, API
- 涵蓋範圍：官立、私立、津貼、直資、英基學校協會、國際學校、幼稚園及幼稚園暨幼兒中心

## 官方提供的學校資料欄位

根據教育局官方數據字典（DataSpec_School_Location_and_Information_tc.pdf），以下是完整的學校資料欄位：

### 基本資訊
| 欄位名稱 | 英文名稱 | 說明 | 備註 |
|---------|---------|------|------|
| 學校編號 | SCHOOL NO. | 唯一識別碼 | 必填 |
| 英文名稱 | ENGLISH NAME | 學校英文名稱 | 必填 |
| 中文名稱 | CHINESE NAME | 學校中文名稱 | 必填 |
| 英文地址 | ENGLISH ADDRESS | 學校英文地址 | 必填 |
| 中文地址 | CHINESE ADDRESS | 學校中文地址 | 必填 |

### 地理資訊
| 欄位名稱 | 英文名稱 | 說明 |
|---------|---------|------|
| 經度 | LONGITUDE | GPS 經度坐標 |
| 緯度 | LATITUDE | GPS 緯度坐標 |
| 東方坐標 | EASTING | 香港地圖網格東方坐標 |
| 北方坐標 | NORTHING | 香港地圖網格北方坐標 |

### 學校分類
| 欄位名稱 | 英文名稱 | 說明 | 可能值 |
|---------|---------|------|--------|
| 英文類別 | ENGLISH CATEGORY | 學校類型（英文） | 見下表 |
| 中文類別 | CHINESE CATEGORY | 學校類型（中文） | 見下表 |
| 學生性別 | STUDENTS GENDER | 學生性別 | BOYS, GIRLS, CO-ED |
| 就讀學生性別 | 就讀學生性別 | 中文表示 | 男、女、男女 |
| 授課時間 | SESSION | 授課時間 | A.M., P.M., EVENING, WHOLE DAY |
| 學校授課時間 | 學校授課時間 | 中文表示 | 上午、下午、夜校、全日 |
| 地區 | DISTRICT | 所屬地區 | 18 個香港地區 |

### 學校類型（ENGLISH CATEGORY）
- Aided Primary Schools（資助小學）
- Aided Secondary Schools（資助中學）
- Aided Special Schools（資助特殊學校）
- Caput Secondary Schools（按位津貼中學）
- Direct Subsidy Scheme Primary Schools（直資小學）
- Direct Subsidy Scheme Secondary Schools（直資中學）
- English Schools Foundation (Primary)（英基小學）
- English Schools Foundation (Secondary)（英基中學）
- Government Primary Schools（官立小學）
- Government Secondary Schools（官立中學）
- International Schools (Primary)（國際學校小學）
- International Schools (Secondary)（國際學校中學）
- Kindergarten-cum-Child Care Centres（幼稚園暨幼兒中心）
- Kindergartens（幼稚園）
- Private Primary Schools（私立小學）
- Private Secondary Schools (Day/Evening)（私立中學）

### 18 個香港地區
- 九龍城區（KOWLOON CITY）
- 沙田區（SHA TIN）
- 灣仔區（WAN CHAI）
- 屯門區（TUEN MUN）
- 元朗區（YUEN LONG）
- 離島區（ISLANDS）
- 葵青區（KWAI TSING）
- 北區（NORTH）
- 中西區（CENTRAL AND WESTERN）
- 大埔區（TAI PO）
- 西貢區（SAI KUNG）
- 荃灣區（TSUEN WAN）
- 觀塘區（KWUN TONG）
- 深水埗區（SHAM SHUI PO）
- 東區（EASTERN）
- 黃大仙區（WONG TAI SIN）
- 油尖旺區（YAU TSIM MONG）
- 南區（SOUTHERN）
- 屯門區（SHUM SHUI PO）

## 現有數據庫中已有的欄位

根據 BeeJAI 數據庫 schema（drizzle/schema.ts），目前已導入的欄位：
- ✅ 學校編號（schoolNo）
- ✅ 中文名稱（name）
- ✅ 英文名稱（nameEn）
- ✅ 類型（type）
- ✅ 地址（address）
- ✅ 電話（phone）
- ✅ 網站（website）
- ✅ 經度（longitude）
- ✅ 緯度（latitude）
- ✅ 地區（district）
- ✅ 資助類型（category）
- ✅ 性別（gender）
- ✅ 宗教（religion）
- ✅ 國際學校標記（isInternational）

## 現有數據庫中缺失的欄位

根據 schema，以下欄位尚未填充（NULL）：
- ❌ 學費（fees）
- ❌ 課程類型（curriculum）
- ❌ 學校描述（description）
- ❌ 特色功能（features）
- ❌ 電子郵件（email）
- ❌ 學生人數（studentCount）
- ❌ 教師人數（teacherCount）
- ❌ 設施（facilities）
- ❌ 入學資訊（admissionInfo）

## 教育局官方數據的局限性

根據官方數據字典，教育局開放數據**不包含**以下資訊：
- ❌ 學費資訊
- ❌ 課程類型（IB、DSE、本地課程等）
- ❌ 學校描述和特色
- ❌ 教師資訊（人數、資格）
- ❌ 設施資訊（圖書館、操場、實驗室等）
- ❌ 入學要求和時間表
- ❌ 學生人數
- ❌ 學校排名或評級

## 補充數據源建議

為了完善 BeeJAI 的學校資訊，需要從以下來源補充數據：

### 1. 官方來源
- **教育局官方學校搜尋系統**：https://applications.edb.gov.hk/schoolsearch/schoolsearch.aspx
  - 可搜尋的欄位：學校名稱、編號、授課時間、性別、地區、級別、資助類型、地址
  - 不提供 API，需要網頁爬蟲

- **教育署學校發展與問責平台**：https://www.edb.gov.hk/tc/sch-admin/sch-quality-assurance/performance-indicators/esda/index.html
  - 包含學校自評數據、學校表現評量
  - 需要逐校查詢

### 2. 學校官方網站
- 學校 Logo 和外牆照片
- 學費資訊
- 課程類型和特色
- 入學要求和時間表
- 聯絡電郵

### 3. 第三方數據源
- **香港學校排名網站**（如 Schooland、Uniform Post 等）
  - 學校評級和排名
  - 用戶評論和評分

- **升學資訊網站**（如 TopSchool、Beacon House 等）
  - 學費比較
  - 課程資訊
  - 入學資訊

### 4. 公開統計數據
- **香港政府統計處**：https://www.censtatd.gov.hk/
  - 學校數量統計
  - 學生人數統計

## 實施建議

### 第一階段：完善核心資訊
1. 為前 100 間熱門學校手動收集：
   - 學校 Logo（從官方網站或 Google）
   - 外牆照片（Google Street View 或官方網站）
   - 學費資訊（從官方網站或招生簡章）
   - 課程類型（IB、DSE、本地課程等）
   - 入學時間表

2. 建立自動化爬蟲：
   - 爬取學校官方網站的基本資訊
   - 從 Google 搜尋結果獲取 Logo 和照片
   - 定期更新學費資訊

### 第二階段：擴展到全部學校
1. 批量爬取學校官方網站
2. 整合第三方評分和排名
3. 建立用戶評論系統

### 第三階段：高級功能
1. AI 驅動的學校推薦
2. 學費對比工具
3. 升學時間表提醒
4. 申請追蹤系統

## 技術實施方案

### 數據收集工具
- **Puppeteer/Playwright**：自動化網頁爬蟲
- **Google Custom Search API**：搜尋學校 Logo 和照片
- **Tesseract OCR**：從招生簡章提取文字資訊

### 數據存儲
- 在 TiDB 中添加新欄位存儲補充資訊
- 使用 S3 存儲學校 Logo 和照片
- 建立版本控制系統追蹤數據更新

### 數據驗證
- 建立數據質量檢查流程
- 人工審核關鍵資訊（學費、課程類型）
- 定期更新數據（每季度一次）

## 結論

香港教育局提供的開放數據提供了完整的**基本學校資訊**（名稱、地址、分類、地理位置），但**缺乏詳細的教育資訊**（學費、課程、設施、入學要求）。

為了建立一個真正有價值的升學資訊平台，BeeJAI 需要：
1. 整合教育局官方數據作為基礎
2. 從學校官方網站補充詳細資訊
3. 整合第三方評分和排名
4. 建立用戶生成的內容（評論、評分）

**預計工作量：** 為前 100 間熱門學校完善資訊需要 2-3 週時間（包括自動化爬蟲開發和人工審核）。
