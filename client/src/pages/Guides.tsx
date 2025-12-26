import { Link } from "wouter";
import { 
  Baby, 
  GraduationCap, 
  Plane, 
  DoorOpen, 
  FileCheck, 
  Globe,
  ChevronRight,
  Sparkles,
  BookOpen,
  Users,
  Clock,
  Target,
  Gamepad2
} from "lucide-react";

// 攻略分類數據
const guideCategories = [
  {
    id: "playgroup-guide",
    title: "Playgroup 推薦第一步策劃",
    subtitle: "孩子社交學習的起點",
    description: "0-3 歲孩子的 Playgroup 如何選擇？了解不同類型的 Playgroup、最佳開始時間、熱門機構推薦，為孩子的幼穚園入學做好準備。",
    icon: Gamepad2,
    color: "bg-lime-500",
    lightColor: "bg-lime-50",
    borderColor: "border-lime-200",
    tags: ["機構推薦", "年齡指南", "學費參考"],
    readTime: "12 分鐘",
    targetAudience: "0-3 歲孩子的家長"
  },
  {
    id: "kindergarten-newbie",
    title: "新手媽媽幼穚園攻略",
    subtitle: "從零開始的選校指南",
    description: "首次為子女選擇幼稚園？這份攻略涵蓋選校五大要點、K1 入學時間表、面試形式及常見問題，助你輕鬆應對。",
    icon: Baby,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    borderColor: "border-pink-200",
    tags: ["選校指南", "面試攻略", "時間表"],
    readTime: "15 分鐘",
    targetAudience: "準備升 K1 的家長"
  },
  {
    id: "n-wu-strategy",
    title: "N無人士入名校攻略",
    subtitle: "沒有關係也能成功",
    description: "沒有兄姊就讀、沒有校友關係？了解 Team A 與 Team B 的分別，掌握計分制策略，N無人士一樣可以入讀心儀學校。",
    icon: Target,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200",
    tags: ["計分制", "策略分析", "成功案例"],
    readTime: "12 分鐘",
    targetAudience: "無學校關係的家長"
  },
  {
    id: "mainland-talent",
    title: "內地來港專才子女攻略",
    subtitle: "高才通家庭必讀",
    description: "透過高才通、優才計劃來港？了解學校收生流程、筆試面試內容、真實家長經驗分享，助子女順利插班入學。",
    icon: Plane,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    tags: ["插班申請", "筆試準備", "經驗分享"],
    readTime: "18 分鐘",
    targetAudience: "內地來港專才家庭"
  },
  {
    id: "p1-knocking",
    title: "小一叩門攻略",
    subtitle: "派位後的最後機會",
    description: "統一派位結果不理想？把握叩門黃金期，準備叩門三寶，掌握面試三寶，爭取入讀心儀小學的最後機會。",
    icon: DoorOpen,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200",
    tags: ["叩門三寶", "面試技巧", "時間表"],
    readTime: "10 分鐘",
    targetAudience: "派位結果不理想的家長"
  },
  {
    id: "dss-private-interview",
    title: "直資私立小學面試攻略",
    subtitle: "面試必勝秘笈",
    description: "直資私立小學面試流程是怎樣？常見題目有哪些？五大面試攻略助你和孩子做好充分準備，從容應對面試。",
    icon: FileCheck,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    borderColor: "border-green-200",
    tags: ["面試流程", "常見題目", "準備貼士"],
    readTime: "14 分鐘",
    targetAudience: "報讀直資私立的家長"
  },
  {
    id: "international-school",
    title: "國際學校入學指南",
    subtitle: "開啟國際教育之路",
    description: "英式、美式、IB 制有何分別？入學條件是什麼？學費多少？一文了解香港國際學校的各種資訊。",
    icon: Globe,
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    borderColor: "border-teal-200",
    tags: ["學制比較", "入學條件", "學費參考"],
    readTime: "16 分鐘",
    targetAudience: "考慮國際教育的家長"
  }
];

// 熱門攻略
const popularGuides = [
  { title: "2025/26 K1 入學申請時間表", category: "幼稚園", views: "12.5K" },
  { title: "小一自行分配學位計分制詳解", category: "小學", views: "9.8K" },
  { title: "高才通子女插班 17 次筆試成功經驗", category: "插班", views: "8.2K" },
  { title: "直資小學面試常見題目大全", category: "面試", views: "7.5K" },
];

export default function Guides() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-400 to-amber-300 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-amber-800 mb-6">
              <Sparkles className="w-4 h-4" />
              專業升學資訊
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              升學攻略
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              由專家整理的升學指南，涵蓋幼稚園、小學、中學及國際學校，<br className="hidden md:block" />
              助你為子女規劃最佳升學路徑
            </p>
            
            {/* 統計數據 */}
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">6+</div>
                <div className="text-sm text-gray-600">攻略分類</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">實用文章</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">家長閱讀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 攻略分類 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              按情境選擇攻略
            </h2>
            <p className="text-gray-600">
              根據你的情況，選擇最適合的升學攻略
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCategories.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.id}`}
                  className={`group block p-6 rounded-2xl border-2 ${guide.borderColor} ${guide.lightColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${guide.color} text-white shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{guide.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-4 line-clamp-2">
                    {guide.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {guide.targetAudience}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 熱門攻略 */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                熱門攻略
              </h2>
              <p className="text-gray-600">最多家長閱讀的升學文章</p>
            </div>
            <Link
              href="/guides/all"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularGuides.map((guide, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray-400">{guide.views} 閱讀</span>
                </div>
                <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-amber-600 transition-colors">
                  {guide.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 按升學階段瀏覽 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              按升學階段瀏覽
            </h2>
            <p className="text-gray-600">
              選擇你關注的升學階段，獲取相關攻略
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "幼稚園升學", icon: "🎒", count: 15, color: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
              { name: "小學升學", icon: "📚", count: 22, color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
              { name: "中學升學", icon: "🎓", count: 18, color: "bg-green-50 border-green-200 hover:bg-green-100" },
              { name: "國際學校", icon: "🌍", count: 12, color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
            ].map((stage) => (
              <Link
                key={stage.name}
                href={`/guides?stage=${encodeURIComponent(stage.name)}`}
                className={`p-6 rounded-xl border-2 ${stage.color} text-center transition-all hover:shadow-md`}
              >
                <div className="text-4xl mb-3">{stage.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{stage.name}</h3>
                <p className="text-sm text-gray-500">{stage.count} 篇攻略</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              需要更多升學建議？
            </h2>
            <p className="text-gray-400 mb-8">
              加入 BeeJAI 會員，獲取個人化升學建議、申請時間提醒，以及專家一對一諮詢服務
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                免費註冊
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                了解會員計劃
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
