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

## 單頁切版 SOP

每頁照此跑（完整設計：`docs/superpowers/specs/2026-06-12-slicing-workflow-design.md`）。

**Step 0 — build-vs-reuse 檢查**：開 Figma 該畫面，對照 `src/js/data/components-registry.js`，列出需要的元件並標 ✅已有/🆕需新建/⚠️需擴充；🆕 先協商來源稿。

**Step 1 — 從 Figma 抽精確數值**：用 Figma MCP 抽出間距/尺寸/字級/顏色，**每個值落到 `abstracts/_semantic.scss` 的語意 token**；缺的先補（design-token 集合 → `npm run tokens`），**絕不在 SCSS 寫死 raw px/hex**。存一張設計稿截圖作 review 基準。

**Step 2 — 組裝實作**：建 `pages/<area>/<page>.html`、`src/js/data/<page>.js`（五種狀態變體）、`src/js/pages/<page>.js`、`src/scss/pages/_<page>.scss`。頁面 SCSS 只引用 `abstracts/_semantic.scss`。共用熱點（`main.scss`、`progress-config.js`、`nav-config.js`、`components/**`、`components-registry.js`）不直接改，走 integrator。

**Step 3 — 自檢**：`npm run dev` 逐一開五種 `?state=`，console 無錯；桌機 ≥1280 / 平板 768–1279 各看一次。

**Step 4 — 乾淨 session review（新對話）**：帶 Step 1 截圖 + 抽出值清單 + diff，逐項比對「程式碼實際值 vs Figma 抽出值」是否漂移，外加 token 沒寫死、五狀態/RWD/a11y/console。有漂移回 Step 2。

**Step 5 — 收尾**：更新 `progress-config.js`、`nav-config.js`（走 integrator）；把新生可複用元件登記進 `components-registry.js`；commit（`aja-ruei`，不加 Co-Authored-By）。

**模型分工**：Step 1/4 與預設實作用 Opus 4.8（還原度不降級，review 永遠新 session）；純組裝頁（全 `stable` 元件、已知 archetype、無 token gap）的 Step 2 可降 Sonnet 4.6。

**何時 fan-out**：≥2 張獨立稿同時到位、要的元件都 `stable`、屬已知 archetype 才平行（沿用下方 fan-out 協定）；否則循序一頁一頁切。

## 平行 fan-out 協定（多頁同時切版）

地基與第一頁（Device Groups pilot）就緒後，第 2..N 頁可平行切版，但須遵守協定避免共用檔衝突與元件分歧：

- **隔離**：每個平行 agent 用獨立 git worktree，只動自己那頁的獨立檔（`pages/<area>/<page>.html`、`src/js/data/<page>.js`、`src/js/pages/<page>.js`、`src/scss/pages/_<page>.scss`）。
- **共用熱點走 integrator**：以下四個檔不由平行 agent 直接改，改為回報、由單一整合者序列化套用——
  - `src/scss/main.scss`（每頁 append `@use`）
  - `src/js/data/progress-config.js`（每頁改 status/path）
  - `src/js/data/nav-config.js`（區塊入口頁設 path）
  - `src/scss/components/**`、`src/js/components/**`（共用元件）
  - `src/js/data/components-registry.js`（每頁切完登記新元件）
- **元件先協商**：fan-out 前盤點該批頁需要的共用元件；缺的先建好。批次內**禁止**新建共用元件——發現缺口就回報，不自建（避免兩個 agent 各自發明不同的 button/pagination）。
- **批次化**：依 sitemap 區塊分批，每批 fan-out → 整合 → 驗證後再進下一批。

## 結構

- `src/scss/` — 7-1 pattern；元件樣式只引用 `abstracts/_semantic.scss` 的語意變數
- `src/js/components/` — 跨頁 UI 元件；`pages/` 單頁邏輯；`data/` 設定與假資料；`utils/` 輔助
- RWD：桌機（≥1280）基準、平板（768–1279）側欄收合，斷點 mixin 見 `abstracts/_breakpoints.scss`
