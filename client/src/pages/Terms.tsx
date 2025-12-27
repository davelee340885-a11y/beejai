import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Scale, Shield, Users, Ban, CreditCard, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Terms() {
  const lastUpdated = "2024年12月27日";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container max-w-4xl">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-amber-700 hover:text-amber-800 hover:bg-amber-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首頁
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">用戶條款</h1>
              <p className="text-gray-600">Terms of Service</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">最後更新日期：{lastUpdated}</p>
          <p className="text-gray-700">
            歡迎使用 BeeJAI 香港升學資訊平台（以下簡稱「本平台」或「我們」）。在使用本平台的服務之前，請仔細閱讀以下條款。
            當您訪問或使用本平台時，即表示您同意受本用戶條款的約束。
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 px-4 bg-red-50 border-y border-red-100">
        <div className="container max-w-4xl">
          <Card className="border-red-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-800 mb-3">重要免責聲明</h2>
                  <div className="space-y-3 text-red-700">
                    <p className="font-semibold">
                      本平台提供的所有學校資訊、升學攻略、入學要求、學費資料及其他相關內容，均僅供一般參考用途，
                      不構成任何形式的專業升學顧問意見或建議。
                    </p>
                    <p>
                      <strong>我們不保證</strong>本平台所載資訊的準確性、完整性、時效性或適用性。學校政策、入學要求、
                      學費及截止日期等資訊可能隨時變更，用戶應向相關學校直接查詢以獲取最新及準確的資訊。
                    </p>
                    <p className="font-semibold bg-red-100 p-3 rounded-lg">
                      用戶根據本平台資訊作出的任何升學決定，需自行承擔全部風險和責任。本平台對於因使用或依賴本平台資訊
                      而導致的任何直接或間接損失，概不負責。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl space-y-8">
          
          {/* 1. 服務說明 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">1. 服務說明</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  BeeJAI 是一個香港升學資訊平台，旨在為家長和學生提供學校資訊、升學攻略、入學申請追蹤等服務。
                  本平台的服務包括但不限於：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>學校資料庫瀏覽和搜尋</li>
                  <li>升學攻略和指南</li>
                  <li>心儀學校收藏和管理</li>
                  <li>入學申請進度追蹤</li>
                  <li>小朋友資料管理</li>
                  <li>會員訂閱服務</li>
                </ul>
                <p>
                  我們保留隨時修改、暫停或終止任何服務的權利，而無須事先通知。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. 資訊準確性免責 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">2. 資訊準確性免責聲明</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>2.1 資訊來源</strong></p>
                <p>
                  本平台的學校資訊來自多種渠道，包括但不限於政府公開數據、學校官方網站、公開報導及用戶提交。
                  儘管我們盡力確保資訊的準確性，但我們無法保證所有資訊均為最新或完全準確。
                </p>
                
                <p><strong>2.2 不作保證</strong></p>
                <p>本平台明確聲明，對於以下事項不作任何明示或暗示的保證：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>學校入學要求的準確性和時效性</li>
                  <li>學費及其他費用的準確性</li>
                  <li>申請截止日期的準確性</li>
                  <li>學校排名或評價的客觀性</li>
                  <li>升學攻略的適用性</li>
                  <li>AI 生成內容的準確性</li>
                </ul>

                <p><strong>2.3 用戶責任</strong></p>
                <p>
                  用戶有責任在作出任何升學決定前，向相關學校或官方機構直接核實資訊。
                  本平台的資訊不應作為唯一的決策依據。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. 用戶帳戶 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">3. 用戶帳戶</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>3.1 帳戶註冊</strong></p>
                <p>
                  部分服務需要用戶註冊帳戶。您同意提供準確、完整的註冊資訊，並及時更新以保持其準確性。
                </p>
                
                <p><strong>3.2 帳戶安全</strong></p>
                <p>
                  您有責任維護帳戶的安全性，包括保護您的登入憑證。您同意對使用您帳戶進行的所有活動負責。
                </p>

                <p><strong>3.3 帳戶終止</strong></p>
                <p>
                  我們保留在任何時候、因任何原因（包括但不限於違反本條款）暫停或終止您帳戶的權利，而無須事先通知。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. 會員訂閱 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">4. 會員訂閱與付款</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>4.1 訂閱計劃</strong></p>
                <p>
                  本平台提供不同等級的會員訂閱計劃（小蜜蜂、黃蜂、蜂后）。各計劃的功能和價格詳見定價頁面。
                </p>
                
                <p><strong>4.2 自動續訂</strong></p>
                <p>
                  付費訂閱將自動續訂，除非您在當前計費週期結束前取消。取消後，您仍可使用服務至當前計費週期結束。
                </p>

                <p><strong>4.3 退款政策</strong></p>
                <p>
                  除法律另有規定外，已支付的訂閱費用一般不予退還。如有特殊情況，請聯繫客戶服務。
                </p>

                <p><strong>4.4 價格變更</strong></p>
                <p>
                  我們保留隨時調整訂閱價格的權利。價格變更將在下一個計費週期生效，我們會提前通知您。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. 禁止行為 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Ban className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">5. 禁止行為</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>使用本平台時，您同意不會：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>違反任何適用的法律或法規</li>
                  <li>侵犯他人的知識產權或其他權利</li>
                  <li>上傳或傳播惡意軟件、病毒或其他有害代碼</li>
                  <li>嘗試未經授權訪問本平台的系統或網絡</li>
                  <li>使用自動化工具大量抓取或下載本平台內容</li>
                  <li>冒充他人或虛假陳述您與任何人或實體的關係</li>
                  <li>發布虛假、誤導或不準確的資訊</li>
                  <li>騷擾、威脅或傷害其他用戶</li>
                  <li>將本平台用於任何商業目的（除非獲得我們的書面許可）</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 6. 知識產權 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">6. 知識產權</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>6.1 平台內容</strong></p>
                <p>
                  本平台的所有內容，包括但不限於文字、圖像、標誌、設計、軟件和編排，均受知識產權法保護，
                  並歸本平台或其授權人所有。
                </p>
                
                <p><strong>6.2 第三方內容與學校商標</strong></p>
                <p>
                  本平台展示的學校名稱、商標、標誌及相關資訊均為各學校所有，僅用於資訊識別和教育參考用途。
                  我們按照《商標條例》（第559章）第21條「誠實做法」原則使用這些商標，不代表與任何學校有官方關係或獲得其背書。
                </p>
                <p>
                  本平台的學校資訊主要來自香港教育局公開數據、學校官方網站及其他公開渠道。
                  我們尊重所有學校及第三方的知識產權，並已採取合理措施確保合法使用相關內容。
                </p>
                <p className="bg-amber-50 p-3 rounded-lg">
                  <strong>投訴機制：</strong>如任何學校或版權持有人認為本平台的內容侵犯其權利，
                  請聯繫 <a href="mailto:school-feedback@beejai.com" className="text-amber-600 hover:underline">school-feedback@beejai.com</a>，
                  我們將在48小時內處理並移除相關內容。
                </p>
                
                <p><strong>6.3 有限許可</strong></p>
                <p>
                  我們授予您有限的、非獨家的、不可轉讓的許可，僅供個人、非商業用途使用本平台。
                  未經我們書面許可，您不得複製、修改、分發或以其他方式使用本平台的內容。
                </p>

                <p><strong>6.4 用戶內容</strong></p>
                <p>
                  您保留您提交到本平台的內容的所有權。但您授予我們非獨家的、全球性的、免版稅的許可，
                  以使用、複製、修改和展示該內容，以便提供和改進我們的服務。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. 責任限制 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">7. 責任限制</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>7.1 服務「按現狀」提供</strong></p>
                <p>
                  本平台及其服務按「現狀」和「可用」基礎提供，不附帶任何明示或暗示的保證，
                  包括但不限於適銷性、特定用途適用性或不侵權的保證。
                </p>
                
                <p><strong>7.2 責任排除</strong></p>
                <p>在法律允許的最大範圍內，本平台及其管理人員、董事、員工、代理人不對以下情況承擔責任：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>因使用或無法使用本平台而導致的任何直接、間接、附帶、特殊或後果性損害</li>
                  <li>因依賴本平台資訊而作出的任何決定或行動</li>
                  <li>任何未經授權訪問或使用我們服務器和/或存儲在其中的任何個人資訊</li>
                  <li>服務中斷或傳輸錯誤</li>
                  <li>第三方在本平台上發布的任何內容</li>
                </ul>

                <p><strong>7.3 賠償上限</strong></p>
                <p>
                  在任何情況下，我們對您的總責任不超過您在索賠前十二（12）個月內向我們支付的金額，
                  或港幣一千元（HK$1,000），以較低者為準。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8. 第三方連結 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">8. 第三方連結</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  本平台可能包含指向第三方網站或服務的連結。這些連結僅為方便用戶而提供。
                  我們不控制也不對這些第三方網站的內容、私隱政策或做法負責。
                  您訪問任何第三方網站的風險由您自行承擔。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. 條款修改 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">9. 條款修改</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  我們保留隨時修改本用戶條款的權利。修改後的條款將在本頁面發布時生效。
                  我們會在重大變更時通過電子郵件或平台通知您。繼續使用本平台即表示您接受修改後的條款。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 10. 管轄法律 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">10. 管轄法律與爭議解決</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  本用戶條款受香港特別行政區法律管轄，並按香港特別行政區法律解釋。
                  因本條款引起的任何爭議，雙方同意提交香港特別行政區法院的非專屬管轄權。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 11. 聯繫我們 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">11. 聯繫我們</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  如您對本用戶條款有任何疑問或意見，請通過以下方式聯繫我們：
                </p>
                <p>
                  電郵：<a href="mailto:support@beejai.com" className="text-amber-600 hover:underline">support@beejai.com</a>
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container max-w-4xl text-center">
          <p className="text-gray-400">
            © 2024 BeeJAI 香港升學資訊平台. 版權所有.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              私隱政策
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              用戶條款
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              關於我們
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
