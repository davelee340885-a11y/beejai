import { Link } from "wouter";
import { 
  Sparkles, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Baby,
  BookOpen,
  Building2,
  ChevronRight,
  Download,
  Lightbulb,
  Target,
  Users,
  Heart,
  Star,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 幼稚園申請時間線
const kindergartenTimeline = [
  {
    month: "1-3月",
    title: "資料搜集期",
    tasks: [
      "了解香港幼稚園類型（私立、非牟利、國際）",
      "研究心儀地區的幼稚園",
      "參加幼稚園開放日和簡介會",
      "了解學券計劃和學費資助"
    ],
    icon: Target,
    color: "bg-blue-500"
  },
  {
    month: "4-6月",
    title: "準備期",
    tasks: [
      "準備申請所需文件",
      "拍攝證件照",
      "撰寫家長自薦信",
      "準備小朋友 Portfolio"
    ],
    icon: FileText,
    color: "bg-green-500"
  },
  {
    month: "7-9月",
    title: "報名期",
    tasks: [
      "留意各校報名日期（通常 9 月開始）",
      "網上或親身遞交申請表",
      "繳交報名費",
      "保留報名收據"
    ],
    icon: Calendar,
    color: "bg-amber-500"
  },
  {
    month: "10-12月",
    title: "面試期",
    tasks: [
      "收到面試通知",
      "準備面試服裝",
      "練習常見面試問題",
      "帶齊所需文件出席面試"
    ],
    icon: Users,
    color: "bg-purple-500"
  },
  {
    month: "1-2月",
    title: "放榜期",
    tasks: [
      "收到取錄通知",
      "繳交留位費",
      "確認入學",
      "準備開學物品"
    ],
    icon: Star,
    color: "bg-pink-500"
  }
];

// 必備文件清單
const requiredDocuments = [
  {
    category: "小朋友文件",
    items: [
      { name: "出生證明書正副本", required: true, note: "香港出生證明書" },
      { name: "證件相片", required: true, note: "近三個月內拍攝，白底彩色" },
      { name: "身份證明文件", required: true, note: "如有香港身份證" },
      { name: "疫苗接種紀錄", required: false, note: "部分學校要求" },
      { name: "Portfolio / 學習檔案", required: false, note: "展示小朋友作品和成長" }
    ]
  },
  {
    category: "家長文件",
    items: [
      { name: "家長身份證副本", required: true, note: "父母雙方" },
      { name: "住址證明", required: true, note: "三個月內水電煤單或銀行信" },
      { name: "家長自薦信", required: false, note: "部分學校要求" },
      { name: "推薦信", required: false, note: "如有教會或社區推薦" },
      { name: "家庭照片", required: false, note: "展示家庭生活" }
    ]
  },
  {
    category: "其他文件",
    items: [
      { name: "報名表", required: true, note: "填寫完整並簽名" },
      { name: "報名費收據", required: true, note: "保留繳費證明" },
      { name: "兄姊在讀證明", required: false, note: "如有兄姊在同校就讀" },
      { name: "舊生子女證明", required: false, note: "如父母為校友" }
    ]
  }
];

// 新手常見問題
const faqItems = [
  {
    question: "幾歲可以報讀幼稚園？",
    answer: "K1（幼兒班）入學年齡為 2 歲 8 個月至 3 歲，以入學年份的 8 月 31 日計算。"
  },
  {
    question: "應該報幾間幼稚園？",
    answer: "建議報 5-8 間，包括心儀學校和保底學校，避免報太多造成面試撞期。"
  },
  {
    question: "什麼是學券計劃？",
    answer: "政府資助計劃，適用於參加計劃的非牟利幼稚園，每年資助約 $23,000 學費。"
  },
  {
    question: "面試要準備什麼？",
    answer: "小朋友穿著整齊舒適、帶齊文件、提早到達、保持輕鬆心情。"
  },
  {
    question: "如何選擇適合的幼稚園？",
    answer: "考慮地點、教學理念、師生比例、學費、升小派位等因素。"
  }
];

export default function StarterPack() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white">
        <div className="container py-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/80 hover:text-white text-sm">首頁</Link>
            <ChevronRight className="w-4 h-4 text-white/60" />
            <span className="text-sm">新手包</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">新手爸媽入門包</h1>
              <p className="text-white/80 mt-1">幼稚園申請完整指南，從零開始一步步帶你走</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-0">
              <Calendar className="w-3 h-3 mr-1" />
              完整時間線
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <FileText className="w-3 h-3 mr-1" />
              文件清單
            </Badge>
            <Badge className="bg-white/20 text-white border-0">
              <Lightbulb className="w-3 h-3 mr-1" />
              實用貼士
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* 申請時間線 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">幼稚園申請時間線</h2>
              <p className="text-sm text-gray-500">K1 入學申請全年規劃</p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
            
            <div className="space-y-6">
              {kindergartenTimeline.map((phase, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div className={`w-12 h-12 ${phase.color} rounded-xl flex items-center justify-center flex-shrink-0 z-10`}>
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <Card className="flex-1 border-gray-200 hover:border-amber-300 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                        <Badge variant="outline" className="font-medium">
                          {phase.month}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 必備文件清單 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">必備文件清單</h2>
              <p className="text-sm text-gray-500">申請幼稚園所需文件一覽</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {requiredDocuments.map((category, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    {index === 0 && <Baby className="w-4 h-4 text-pink-500" />}
                    {index === 1 && <Users className="w-4 h-4 text-blue-500" />}
                    {index === 2 && <FileText className="w-4 h-4 text-green-500" />}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          item.required ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {item.required ? (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            {item.name}
                            {item.required && (
                              <span className="text-xs text-red-500">*必須</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{item.note}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 常見問題 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">新手常見問題</h2>
              <p className="text-sm text-gray-500">解答你最關心的疑問</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-purple-600">Q</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 下一步行動 */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">下一步行動</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/schools?type=kindergarten">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <Baby className="w-8 h-8 text-pink-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">搜尋幼稚園</h3>
                  <p className="text-sm text-gray-500">瀏覽全港幼稚園資料</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/guides/kindergarten-guide">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <BookOpen className="w-8 h-8 text-orange-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">面試攻略</h3>
                  <p className="text-sm text-gray-500">幼稚園面試準備指南</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/tools/tuition-calculator">
              <Card className="border-amber-200 hover:border-amber-400 transition-colors cursor-pointer h-full">
                <CardContent className="pt-4">
                  <Target className="w-8 h-8 text-cyan-500 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">學費計算</h3>
                  <p className="text-sm text-gray-500">估算教育開支</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
