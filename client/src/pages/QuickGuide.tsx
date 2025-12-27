import { Link } from "wouter";
import { 
  Zap, 
  ChevronRight,
  Baby,
  BookOpen,
  Building2,
  Globe,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  Target,
  Users,
  FileText,
  Award,
  TrendingUp,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 升學階段快速概覽
const stageOverview = [
  {
    stage: "幼稚園",
    icon: Baby,
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    age: "2歲8個月 - 6歲",
    keyDates: "每年 9-11 月報名",
    avgFee: "$0 - $10萬/年",
    tips: [
      "學券計劃可資助約 $23,000",
      "面試以遊戲形式為主",
      "建議報 5-8 間學校"
    ],
    link: "/schools?type=kindergarten"
  },
  {
    stage: "小學",
    icon: BookOpen,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    age: "6 - 12歲",
    keyDates: "自行分配 9月 / 統一派位 1月",
    avgFee: "官津免費 / 直私 $3-15萬",
    tips: [
      "自行分配位佔 50%",
      "世襲生優先取錄",
      "計分制最高 25 分"
    ],
    link: "/schools?type=primary"
  },
  {
    stage: "中學",
    icon: Building2,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    age: "12 - 18歲",
    keyDates: "自行收生 1月 / 統一派位 4月",
    avgFee: "官津免費 / 直私 $3-20萬",
    tips: [
      "Banding 影響派位",
      "自行收生佔 30%",
      "面試佔比重要"
    ],
    link: "/schools?type=secondary"
  },
  {
    stage: "國際學校",
    icon: Globe,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    age: "3 - 18歲",
    keyDates: "全年接受申請",
    avgFee: "$10-25萬/年",
    tips: [
      "需繳交債券或提名權",
      "英語能力要求高",
      "課程選擇多元"
    ],
    link: "/schools?type=international"
  }
];

// 重要日期快速參考
const keyDates2025 = [
  { event: "幼稚園 K1 報名", period: "2024年9月-11月", status: "已截止" },
  { event: "小一自行分配學位", period: "2024年9月", status: "已截止" },
  { event: "小一統一派位選校", period: "2025年1月", status: "進行中" },
  { event: "中一自行分配學位", period: "2025年1月", status: "進行中" },
  { event: "小一統一派位結果", period: "2025年6月", status: "即將公布" },
  { event: "中一統一派位結果", period: "2025年7月", status: "即將公布" }
];

// 學費快速比較
const feeComparison = [
  { type: "官立/資助學校", fee: "免費", note: "政府全額資助" },
  { type: "直資學校", fee: "$3-8萬/年", note: "部分政府資助" },
  { type: "私立學校", fee: "$5-15萬/年", note: "無政府資助" },
  { type: "國際學校", fee: "$10-25萬/年", note: "另需債券/提名權" }
];

// 懶人必知重點
const mustKnow = [
  {
    title: "學券計劃",
    icon: DollarSign,
    content: "適用於非牟利幼稚園，每年資助約 $23,000，需申請「幼稚園入學註冊證」"
  },
  {
    title: "世襲制度",
    icon: Users,
    content: "小一自行分配中，兄姊在讀或父母為校友可獲優先取錄"
  },
  {
    title: "Banding 制度",
    icon: TrendingUp,
    content: "中學派位按學生成績分為 Band 1-3，影響派位選擇"
  },
  {
    title: "叩門機制",
    icon: Target,
    content: "統一派位後可向心儀學校叩門，需準備 Portfolio 和面試"
  }
];

// 快速行動清單
const quickActions = [
  { label: "搜尋幼稚園", href: "/schools?type=kindergarten", icon: Baby, color: "text-pink-500" },
  { label: "搜尋小學", href: "/schools?type=primary", icon: BookOpen, color: "text-blue-500" },
  { label: "搜尋中學", href: "/schools?type=secondary", icon: Building2, color: "text-purple-500" },
  { label: "升學攻略", href: "/guides", icon: FileText, color: "text-orange-500" },
  { label: "學費計算", href: "/tools/tuition-calculator", icon: DollarSign, color: "text-cyan-500" },
  { label: "升級服務", href: "/premium-services", icon: Star, color: "text-amber-500" }
];

export default function QuickGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 text-gray-900">
        <div className="container py-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 text-sm">首頁</Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">懶人包</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">升學懶人包</h1>
              <p className="text-gray-700 mt-1">一頁睇晒所有重點，忙碌父母必備</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/30 text-gray-900 border-0">
              <Clock className="w-3 h-3 mr-1" />
              5 分鐘速讀
            </Badge>
            <Badge className="bg-white/30 text-gray-900 border-0">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              重點摘要
            </Badge>
            <Badge className="bg-white/30 text-gray-900 border-0">
              <Lightbulb className="w-3 h-3 mr-1" />
              實用貼士
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* 快速行動 */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {/* 升學階段快速概覽 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">升學階段快速概覽</h2>
              <p className="text-sm text-gray-500">一眼看清各階段重點</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {stageOverview.map((stage, index) => (
              <Link key={index} href={stage.link}>
                <Card className={`${stage.borderColor} hover:shadow-md transition-all cursor-pointer h-full`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${stage.color} rounded-xl flex items-center justify-center`}>
                        <stage.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{stage.stage}</CardTitle>
                        <p className="text-xs text-gray-500">{stage.age}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{stage.keyDates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{stage.avgFee}</span>
                      </div>
                    </div>
                    <div className={`${stage.bgColor} rounded-lg p-3`}>
                      <p className="text-xs font-medium text-gray-700 mb-2">重點提示：</p>
                      <ul className="space-y-1">
                        {stage.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-xs text-gray-600 flex items-start gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* 重要日期 + 學費比較 */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* 重要日期 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">2025 重要日期</h2>
                <p className="text-xs text-gray-500">升學關鍵時間點</p>
              </div>
            </div>

            <Card className="border-gray-200">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {keyDates2025.map((date, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{date.event}</p>
                        <p className="text-xs text-gray-500">{date.period}</p>
                      </div>
                      <Badge variant={
                        date.status === "已截止" ? "secondary" :
                        date.status === "進行中" ? "default" : "outline"
                      } className={
                        date.status === "進行中" ? "bg-green-500" : ""
                      }>
                        {date.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 學費比較 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">學費快速比較</h2>
                <p className="text-xs text-gray-500">各類學校費用參考</p>
              </div>
            </div>

            <Card className="border-gray-200">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {feeComparison.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.note}</p>
                      </div>
                      <span className="text-sm font-bold text-amber-600">{item.fee}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* 懶人必知重點 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">懶人必知重點</h2>
              <p className="text-sm text-gray-500">升學制度關鍵概念</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {mustKnow.map((item, index) => (
              <Card key={index} className="border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 下一步 */}
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">想了解更多？</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/starter-pack">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <Zap className="w-8 h-8 text-pink-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">新手包</h3>
                  <p className="text-sm text-gray-500">完整入門指南和時間線</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/guides">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <FileText className="w-8 h-8 text-orange-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">升學攻略</h3>
                  <p className="text-sm text-gray-500">7 個專題深度指南</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/premium-services">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <Award className="w-8 h-8 text-amber-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">升級服務</h3>
                  <p className="text-sm text-gray-500">專業顧問一對一協助</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
