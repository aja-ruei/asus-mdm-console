# ASUS MDM Console — 前端切版原型

依 Figma 設計稿切版的可操作原型。無真實資料，全部以假資料模擬。

## 指令

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 開發伺服器（首頁即切版進度看板） |
| `npm run build` | 產出靜態檔到 `dist/` |
| `npm run preview` | 預覽 build 產物 |
| `npm run tokens` | design tokens 更新後，重新產生 SCSS primitive 層 |

## Design tokens 更新流程

1. 從 Figma 重新匯出變數 JSON，覆蓋 `design-tokens/` 內對應檔案
2. `npm run tokens`
3. `_tokens.generated.scss` 會被覆寫（勿手改）；元件只引用 `_semantic.scss`，通常不需改元件

## 頁面狀態

每頁支援網址參數強制指定狀態：`?state=default|loading|empty|error|max`。
進度看板（`/`）上每個已完成項目都有五種狀態的直達連結。

## 新增一頁的標準流程

1. 參考 `pages/sample.html` + `src/js/pages/sample.js` + `src/js/data/sample.js` 的形狀
2. HTML 放 `pages/`（Vite 自動納入 build 入口）
3. 假資料模組放 `src/js/data/`，輸出五種狀態變體
4. 頁面樣式放 `src/scss/pages/`，可複用元件抽到 `src/scss/components/`
5. 更新 `src/js/data/progress-config.js`（status、path）與 `nav-config.js`（若是區塊入口頁）

## 平行 fan-out 協定（多頁同時切版）

地基與第一頁（Device Groups pilot）就緒後，第 2..N 頁可平行切版，但須遵守協定避免共用檔衝突與元件分歧：

- **隔離**：每個平行 agent 用獨立 git worktree，只動自己那頁的獨立檔（`pages/<area>/<page>.html`、`src/js/data/<page>.js`、`src/js/pages/<page>.js`、`src/scss/pages/_<page>.scss`）。
- **共用熱點走 integrator**：以下四個檔不由平行 agent 直接改，改為回報、由單一整合者序列化套用——
  - `src/scss/main.scss`（每頁 append `@use`）
  - `src/js/data/progress-config.js`（每頁改 status/path）
  - `src/js/data/nav-config.js`（區塊入口頁設 path）
  - `src/scss/components/**`、`src/js/components/**`（共用元件）
- **元件先協商**：fan-out 前盤點該批頁需要的共用元件；缺的先建好。批次內**禁止**新建共用元件——發現缺口就回報，不自建（避免兩個 agent 各自發明不同的 button/pagination）。
- **批次化**：依 sitemap 區塊分批，每批 fan-out → 整合 → 驗證後再進下一批。

## 結構

- `src/scss/` — 7-1 pattern；元件樣式只引用 `abstracts/_semantic.scss` 的語意變數
- `src/js/components/` — 跨頁 UI 元件；`pages/` 單頁邏輯；`data/` 設定與假資料；`utils/` 輔助
- RWD：桌機（≥1280）基準、平板（768–1279）側欄收合，斷點 mixin 見 `abstracts/_breakpoints.scss`
