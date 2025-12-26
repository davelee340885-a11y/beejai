import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Star,
  Crown,
  Sparkles,
  PenTool,
  FileText,
  Users,
  Video,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Award,
  Target,
  Clock,
  Shield
} from "lucide-react";
import { toast } from "sonner";

// 升級服務數據
const premiumServices = [
  {
    id: "consultant",
    title: "星級升學顧問服務",
    subtitle: "一對一專業諮詢",
    description: "由資深升學顧問為您的孩子度身訂造升學計劃，分析學校選擇、面試策略、時間規劃，全程跟進直至入學。",
    icon: Crown,
    color: "from-amber-400 to-yellow-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    borderColor: "border-amber-300",
    features: [
      "一對一諮詢（每次 60 分鐘）",
      "個人化升學計劃書",
      "學校配對分析報告",
      "面試策略指導",
      "申請進度跟進",
      "WhatsApp 即時支援"
    ],
    pricing: "HK$3,800 起",
    popular: true,
    badge: "最受歡迎"
  },
  {
    id: "letter-writing",
    title: "叩門插班寫信服務",
    subtitle: "專業代筆，提高成功率",
    description: "由專業團隊代寫叩門信、自薦信、推薦信，根據學校特色度身訂造，提高獲取面試機會的成功率。",
    icon: PenTool,
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-300",
    features: [
      "叩門信 / 自薦信代寫",
      "推薦信範本及修改",
      "中英文版本",
      "針對目標學校度身訂造",
      "無限次修改",
      "3 個工作天內交付"
    ],
    pricing: "HK$1,280 起",
    popular: false,
    badge: null
  },
  {
    id: "portfolio",
    title: "Profile 設計服務",
    subtitle: "專業設計，脫穎而出",
    description: "由專業設計師為孩子製作精美的個人檔案（Portfolio），展示孩子的特質、成就和潛能，給學校留下深刻印象。",
    icon: FileText,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-300",
    features: [
      "專業排版設計",
      "相片修圖美化",
      "內容撰寫指導",
      "中英文雙語版本",
      "印刷版 + 電子版",
      "5 個工作天內交付"
    ],
    pricing: "HK$2,480 起",
    popular: false,
    badge: null
  },
  {
    id: "mock-interview",
    title: "幼稚園小一及家長面試真人實操",
    subtitle: "模擬面試，從容應對",
    description: "由經驗豐富的導師進行真人模擬面試，針對幼稚園、小一入學面試，包括小朋友面試和家長面試，提供即時反饋和改進建議。",
    icon: Video,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-300",
    features: [
      "真人模擬面試（60 分鐘）",
      "小朋友面試訓練",
      "家長面試指導",
      "即時反饋和評分",
      "改進建議報告",
      "可選線上或面對面"
    ],
    pricing: "HK$1,680 起",
    popular: true,
    badge: "高需求"
  }
];

// 為什麼選擇我們
const whyChooseUs = [
  {
    icon: Award,
    title: "專業團隊",
    description: "由資深教育顧問、前學校老師組成"
  },
  {
    icon: Target,
    title: "成功率高",
    description: "過往客戶入讀心儀學校成功率達 85%"
  },
  {
    icon: Clock,
    title: "快速回應",
    description: "24 小時內回覆查詢，專人跟進"
  },
  {
    icon: Shield,
    title: "保密承諾",
    description: "所有資料嚴格保密，絕不外洩"
  }
];

export default function PremiumServices() {
  const handleInquiry = (serviceName: string) => {
    toast.success(`已收到您對「${serviceName}」的查詢，我們會盡快聯絡您！`, {
      description: "您也可以透過 WhatsApp 聯絡我們：+852 XXXX XXXX"
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 py-16 overflow-hidden">
        {/* 裝飾元素 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-black/10 rounded-full blur-lg" />
        </div>

        <div className="container relative">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-black hover:bg-black/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首頁
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Logo */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-black flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                <Crown className="h-16 w-16 lg:h-20 lg:w-20 text-amber-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
            </div>

            {/* 標題 */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-black text-amber-400 hover:bg-black/90 text-sm px-4 py-1">
                <Star className="h-3 w-3 mr-1 fill-amber-400" />
                升級服務
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                專業升學支援
              </h1>
              <p className="text-lg text-black/80 max-w-xl">
                由資深教育顧問團隊提供一站式升學服務，助您的孩子入讀心儀學校
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 服務列表 */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {premiumServices.map((service) => (
            <Card 
              key={service.id} 
              className={`relative overflow-hidden border-2 ${service.borderColor} hover:shadow-xl transition-all duration-300 group`}
            >
              {/* 背景漸變 */}
              <div className={`absolute inset-0 ${service.bgColor} opacity-50`} />
              
              {/* 熱門標籤 */}
              {service.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`bg-gradient-to-r ${service.color} text-white border-0 shadow-lg`}>
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    {service.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="relative">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <p className="text-gray-600">{service.description}</p>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">服務包括：</p>
                  <ul className="grid grid-cols-1 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">收費</p>
                    <p className="text-2xl font-bold text-gray-900">{service.pricing}</p>
                  </div>
                  <Button 
                    className={`bg-gradient-to-r ${service.color} text-white hover:opacity-90 shadow-lg`}
                    onClick={() => handleInquiry(service.title)}
                  >
                    立即查詢
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 為什麼選擇我們 */}
      <div className="bg-gray-50 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">為什麼選擇 Bee仔 升級服務？</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 聯絡我們 */}
      <div className="container py-12">
        <Card className="bg-gradient-to-br from-amber-400 to-yellow-500 border-0 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                  有任何問題？歡迎聯絡我們
                </h2>
                <p className="text-black/80 mb-6">
                  我們的專業團隊隨時為您解答升學疑問，提供免費初步諮詢
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button 
                    size="lg" 
                    className="bg-black text-amber-400 hover:bg-black/90"
                    onClick={() => toast.info("WhatsApp 功能即將推出！")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp 查詢
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-black text-black hover:bg-black/10"
                    onClick={() => toast.info("電話功能即將推出！")}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    電話預約
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 rounded-full bg-black/10 flex items-center justify-center">
                  <Users className="h-16 w-16 text-black/60" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 顧問招募橫幅 */}
      <div className="bg-black py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-amber-400 mb-1">
                成為 Bee仔 合作顧問
              </h3>
              <p className="text-gray-400">
                您是升學專家？歡迎加入我們的顧問團隊，共同幫助更多家庭
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
              onClick={() => toast.info("顧問招募功能即將推出！")}
            >
              了解更多
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
