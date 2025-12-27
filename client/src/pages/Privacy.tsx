import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Database, Lock, Share2, Clock, UserCheck, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Privacy() {
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
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">私隱政策</h1>
              <p className="text-gray-600">Privacy Policy</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">最後更新日期：{lastUpdated}</p>
          <p className="text-gray-700">
            BeeJAI 香港升學資訊平台（以下簡稱「本平台」或「我們」）非常重視您的個人私隱。
            本私隱政策說明我們如何收集、使用、儲存和保護您的個人資料，以及您對這些資料的權利。
            本政策符合香港《個人資料（私隱）條例》（香港法例第486章）的要求。
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl space-y-8">
          
          {/* 1. 收集的資料 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">1. 我們收集的資料</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>1.1 您主動提供的資料</strong></p>
                <p>當您註冊帳戶、使用我們的服務或與我們聯繫時，您可能會提供以下資料：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>姓名和聯繫方式（電郵地址、電話號碼）</li>
                  <li>帳戶登入資訊</li>
                  <li>小朋友的基本資料（姓名、出生日期、就讀年級）</li>
                  <li>心儀學校和申請追蹤資料</li>
                  <li>付款資訊（由第三方支付處理商處理）</li>
                  <li>您與我們的通訊記錄</li>
                </ul>
                
                <p><strong>1.2 自動收集的資料</strong></p>
                <p>當您使用本平台時，我們可能會自動收集：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>裝置資訊（裝置類型、操作系統、瀏覽器類型）</li>
                  <li>IP 地址和大概地理位置</li>
                  <li>瀏覽記錄和使用模式</li>
                  <li>Cookies 和類似追蹤技術收集的資料</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 1.3 第三方內容與學校資訊 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">1.3 第三方內容與學校資訊</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>學校資訊來源</strong></p>
                <p>
                  本平台展示的學校資訊主要來自以下公開渠道：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>香港教育局公開的學校資料庫（包括學校名稱、地址、聯絡資料等）</li>
                  <li>學校官方網站的公開資訊</li>
                  <li>政府公報、新聞報導和其他公開文獻</li>
                  <li>用戶提交的資料（經驗證後）</li>
                </ul>
                
                <p><strong>知識產權聲明</strong></p>
                <p>
                  我們尊重所有學校及第三方的知識產權。學校名稱、商標、標誌及相關內容均為各學校所有，
                  本平台僅用於資訊識別和教育參考用途。我們按照《商標條例》和《版權條例》的「誠實做法」和「合理使用」原則使用這些內容。
                </p>
                
                <p><strong>不代表官方關係</strong></p>
                <p>
                  本平台與任何學校無官方關係或合作關係，除非另有明確說明。展示學校資訊不代表獲得學校的背書或授權。
                </p>
                
                <p className="bg-amber-50 p-3 rounded-lg">
                  <strong>投訴與移除機制：</strong>如任何學校或版權持有人認為本平台的內容侵犯其權利或不準確，
                  請聯繫 <a href="mailto:school-feedback@beejai.com" className="text-amber-600 hover:underline">school-feedback@beejai.com</a>，
                  我們將在48小時內處理並移除或更正相關內容。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. 資料用途 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">2. 我們如何使用您的資料</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>我們收集的資料用於以下目的：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>提供、維護和改進我們的服務</li>
                  <li>處理您的帳戶註冊和管理</li>
                  <li>處理付款和訂閱</li>
                  <li>個人化您的使用體驗</li>
                  <li>發送服務相關通知（如申請截止日期提醒）</li>
                  <li>發送推廣資訊（如您已同意接收）</li>
                  <li>分析使用模式以改進服務</li>
                  <li>防止欺詐和維護平台安全</li>
                  <li>遵守法律義務</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 3. 資料分享 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">3. 資料分享與披露</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>我們不會出售您的個人資料。我們可能在以下情況下分享您的資料：</p>
                
                <p><strong>3.1 服務提供商</strong></p>
                <p>
                  我們可能與協助我們提供服務的第三方分享資料，包括雲端託管服務、支付處理商、
                  電郵服務提供商和分析服務。這些服務提供商只能按照我們的指示處理您的資料。
                </p>
                
                <p><strong>3.2 法律要求</strong></p>
                <p>
                  如法律要求或為回應有效的法律程序，我們可能會披露您的資料。
                </p>

                <p><strong>3.3 業務轉讓</strong></p>
                <p>
                  如本平台涉及合併、收購或資產出售，您的資料可能會作為交易的一部分轉讓。
                </p>

                <p><strong>3.4 您的同意</strong></p>
                <p>
                  在獲得您的明確同意後，我們可能會為其他目的分享您的資料。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. 資料安全 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">4. 資料安全</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  我們採取適當的技術和組織措施來保護您的個人資料，防止未經授權的訪問、使用或披露。
                  這些措施包括：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>使用 SSL/TLS 加密傳輸資料</li>
                  <li>對敏感資料進行加密儲存</li>
                  <li>限制員工訪問個人資料的權限</li>
                  <li>定期進行安全審查和更新</li>
                </ul>
                <p>
                  然而，請注意沒有任何互聯網傳輸或電子儲存方法是100%安全的。
                  我們無法保證您資料的絕對安全。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. 資料保留 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">5. 資料保留</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  我們會在實現收集目的所需的期間內保留您的個人資料，除非法律要求或允許更長的保留期。
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>帳戶資料：在您的帳戶有效期間及之後合理期間內保留</li>
                  <li>交易記錄：根據稅務和會計要求保留至少7年</li>
                  <li>瀏覽記錄：通常保留不超過2年</li>
                </ul>
                <p>
                  當您刪除帳戶時，我們會在合理時間內刪除或匿名化您的個人資料，
                  除非我們有法律義務保留該資料。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. 您的權利 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">6. 您的權利</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>根據《個人資料（私隱）條例》，您享有以下權利：</p>
                
                <p><strong>6.1 查閱權</strong></p>
                <p>您有權要求查閱我們持有的關於您的個人資料。</p>
                
                <p><strong>6.2 更正權</strong></p>
                <p>您有權要求更正任何不準確或不完整的個人資料。</p>

                <p><strong>6.3 刪除權</strong></p>
                <p>在某些情況下，您可以要求刪除您的個人資料。</p>

                <p><strong>6.4 反對權</strong></p>
                <p>您可以反對我們為直接營銷目的使用您的個人資料。</p>

                <p><strong>6.5 撤回同意</strong></p>
                <p>如果我們基於您的同意處理資料，您可以隨時撤回同意。</p>

                <p>
                  如需行使上述任何權利，請通過下方聯繫方式與我們聯繫。
                  我們可能會收取合理的費用以處理您的查閱要求。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. Cookies */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">7. Cookies 和追蹤技術</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  我們使用 Cookies 和類似技術來改善您的使用體驗、分析網站流量和了解用戶行為。
                </p>
                
                <p><strong>我們使用的 Cookies 類型：</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>必要 Cookies：</strong>網站正常運作所必需的</li>
                  <li><strong>功能 Cookies：</strong>記住您的偏好設定</li>
                  <li><strong>分析 Cookies：</strong>幫助我們了解網站使用情況</li>
                </ul>
                
                <p>
                  您可以通過瀏覽器設定管理或刪除 Cookies。但請注意，禁用某些 Cookies 
                  可能會影響網站的功能。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8. 兒童私隱 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">8. 兒童私隱</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  本平台主要面向家長和監護人。我們不會故意直接向18歲以下的兒童收集個人資料。
                  家長可以在本平台上管理其子女的升學相關資料，但這些資料由家長控制和管理。
                </p>
                <p>
                  如果我們發現在未經家長同意的情況下收集了兒童的個人資料，我們會採取措施刪除該資料。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. 政策更新 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">9. 私隱政策更新</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  我們可能會不時更新本私隱政策。更新後的政策將在本頁面發布，並更新「最後更新日期」。
                  如有重大變更，我們會通過電郵或平台通知您。
                </p>
                <p>
                  我們建議您定期查閱本私隱政策，以了解我們如何保護您的資料。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 10. 聯繫我們 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">10. 聯繫我們</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  如您對本私隱政策有任何疑問、意見或投訴，或希望行使您的資料權利，請通過以下方式聯繫我們：
                </p>
                <p>
                  <strong>私隱事務主任</strong><br />
                  電郵：<a href="mailto:privacy@beejai.com" className="text-amber-600 hover:underline">privacy@beejai.com</a>
                </p>
                <p>
                  我們會在收到您的查詢後40天內回覆。
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
