import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Star, 
  Heart,
  GraduationCap,
  Building2,
  Globe,
  BookOpen,
  TrendingUp,
  Calendar,
  Sparkles,
  Users,
  DollarSign,
  Languages,
  Church,
  School,
  Award,
  Filter,
  Baby,
  BookOpenCheck,
  ArrowRight,
  Crown,
  Calculator,
  PenTool,
  FileText,
  Video,
  Gamepad2,
  Home as HomeIcon,
  Compass,
  Bell,
  User,
  Settings,
  HelpCircle,
  Bookmark,
  BarChart3,
  Zap
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// 香港 18 區
const districts = [
  "中西區", "灣仔區", "東區", "南區",
  "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區",
  "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"
];

// 左側垂直選項 - 工具、攻略、懶人包、新手包
const sidebarItems = [
  { icon: Sparkles, label: "新手包", href: "/starter-pack", color: "text-pink-500" },
  { icon: Zap, label: "懶人包", href: "/quick-guide", color: "text-amber-500" },
  { icon: BookOpenCheck, label: "升學攻略", href: "/guides", color: "text-orange-500" },
  { icon: Gamepad2, label: "Playgroup", href: "/guides/playgroup-guide", color: "text-lime-500" },
  { icon: Crown, label: "升級顧問", href: "/premium-services", color: "text-yellow-500" },
  { icon: PenTool, label: "代寫信件", href: "/premium-services", color: "text-blue-500" },
  { icon: FileText, label: "Profile", href: "/premium-services", color: "text-purple-500" },
  { icon: Calculator, label: "學費計算", href: "/tools/tuition-calculator", color: "text-cyan-500" },
];

// 快速篩選選項（使用圖標）
const quickFilters = [
  { id: "band1", label: "Band 1", icon: Award, href: "/schools?band=1" },
  { id: "dss", label: "直資", icon: School, href: "/schools?category=dss" },
  { id: "aided", label: "資助", icon: Users, href: "/schools?category=aided" },
  { id: "private", label: "私立", icon: DollarSign, href: "/schools?category=private" },
  { id: "english", label: "英文", icon: Languages, href: "/schools?language=english" },
  { id: "chinese", label: "中文", icon: Languages, href: "/schools?language=chinese" },
  { id: "christian", label: "基督教", icon: Church, href: "/schools?religion=christian" },
  { id: "catholic", label: "天主教", icon: Church, href: "/schools?religion=catholic" },
  { id: "free", label: "免學費", icon: DollarSign, href: "/schools?tuitionMax=0" },
];

// 升學階段
const admissionStages = [
  { id: "k1", label: "K1", icon: Baby, href: "/schools?type=kindergarten&grade=k1" },
  { id: "p1", label: "小一", icon: BookOpen, href: "/schools?type=primary&grade=p1" },
  { id: "s1", label: "中一", icon: Building2, href: "/schools?type=secondary&grade=s1" },
  { id: "transfer", label: "插班", icon: BookOpenCheck, href: "/schools?admission=transfer" },
];

// 升級服務
const premiumServices = [
  { icon: Crown, title: "升學顧問", color: "from-amber-400 to-yellow-500", badge: "熱門" },
  { icon: PenTool, title: "代寫信件", color: "from-blue-400 to-indigo-500", badge: null },
  { icon: FileText, title: "Profile", color: "from-purple-400 to-pink-500", badge: null },
  { icon: Video, title: "模擬面試", color: "from-green-400 to-emerald-500", badge: "高需求" },
];

// 模擬熱門學校數據
const mockPopularSchools = [
  { id: 1, name: "聖保羅男女中學附屬小學", type: "primary", district: "南區", rating: 4.9, logo: "/school-logos/spcc-ps.jpg" },
  { id: 2, name: "拔萃女小學", type: "primary", district: "油尖旺區", rating: 4.8, logo: "/school-logos/dgjs.jpg" },
  { id: 3, name: "喇沙小學", type: "primary", district: "九龍城區", rating: 4.8, logo: "/school-logos/lasalle.jpg" },
  { id: 4, name: "聖公會聖彼得小學", type: "primary", district: "中西區", rating: 4.7, logo: "/school-logos/spps.jpg" },
];

// 模擬即將截止申請
const mockUpcomingDeadlines = [
  { id: 1, schoolName: "德望學校（小學部）", daysLeft: 22 },
  { id: 2, schoolName: "聖保祿學校（小學部）", daysLeft: 27 },
  { id: 3, schoolName: "拔萃男書院附屬小學", daysLeft: 32 },
];

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-white flex">
      {/* 左側垂直選項欄 - Hover 時展開顯示文字標籤 */}
      <aside className="hidden lg:flex flex-col w-16 hover:w-40 bg-gray-50 border-r border-gray-100 py-4 sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out group/sidebar overflow-hidden">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="flex items-center mx-2 mb-1 px-2 py-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer group">
              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className={`ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 ${item.color}`}>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
        
        <div className="flex-1" />
        
        {/* 底部圖標 */}
        <Link href="/search">
          <div className="flex items-center mx-2 mb-1 px-2 py-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer group">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-amber-500">
              <Search className="h-5 w-5" />
            </div>
            <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 text-gray-600">
              進階搜尋
            </span>
          </div>
        </Link>
        
        {user && (
          <Link href="/favorites">
            <div className="flex items-center mx-2 mb-1 px-2 py-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer group">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-amber-500">
                <Bookmark className="h-5 w-5" />
              </div>
              <span className="ml-3 text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 text-gray-600">
                收藏學校
              </span>
            </div>
          </Link>
        )}
      </aside>

      {/* 主內容區 */}
      <main className="flex-1">
        {/* Hero Section - 更緊湊 */}
        <section className="bg-amber-400 py-6 lg:py-8">
          <div className="container max-w-5xl">
            {/* 標題和統計 */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-white/90 text-amber-700 hover:bg-white text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  香港最全面的升學資訊平台
                </Badge>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  輕鬆掌握全港 <span className="bg-white px-2 py-0.5 rounded">2000+</span> 學校入學資訊
                </h1>
              </div>
              <div className="hidden md:flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">2000+</p>
                  <p className="text-xs text-gray-700">學校資料</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-xs text-gray-700">香港地區</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">實時</p>
                  <p className="text-xs text-gray-700">入學資訊</p>
                </div>
              </div>
            </div>

            {/* 搜尋欄 */}
            <div className="relative mb-4">
              <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
                <div className="flex-1 flex items-center px-4">
                  <Search className="h-4 w-4 text-gray-400 mr-2" />
                  <Input 
                    type="text" 
                    placeholder="搜尋學校名稱、地區或關鍵字..." 
                    className="border-0 focus-visible:ring-0 text-sm h-10"
                  />
                </div>
                <Button className="rounded-none rounded-r-full px-6 h-10 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                  搜尋
                </Button>
              </div>
            </div>

            {/* 升學階段 + 快速篩選 - 合併為一行 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-700 font-medium">升學階段:</span>
              {admissionStages.map((stage) => (
                <Link key={stage.id} href={stage.href}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-3 bg-white/90 border-gray-200 hover:bg-white hover:border-amber-400 text-xs"
                  >
                    <stage.icon className="h-3 w-3 mr-1" />
                    {stage.label}
                  </Button>
                </Link>
              ))}
              
              <span className="text-gray-300 mx-1">|</span>
              
              <span className="text-xs text-gray-700 font-medium">快速篩選:</span>
              {quickFilters.slice(0, 6).map((filter) => (
                <Link key={filter.id} href={filter.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-7 px-2 bg-white/90 border-gray-200 hover:bg-white hover:border-amber-400 text-xs"
                      >
                        <filter.icon className="h-3 w-3 mr-1" />
                        {filter.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{filter.label}學校</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              ))}
              <Link href="/search">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-700 hover:text-gray-900 text-xs">
                  更多 <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 升級服務區塊 - 緊湊版 */}
        <section className="py-4 bg-gray-900">
          <div className="container max-w-5xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <span className="text-white font-medium text-sm">升級服務</span>
                  <span className="text-gray-400 text-xs">專業團隊助您入讀心儀學校</span>
                </div>
                {/* 內地來港專才子女攻略 - 突顯重要 */}
                <Link href="/guides/mainland-talent">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-full px-3 py-1 hover:from-amber-500/30 hover:to-orange-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-amber-300 text-xs font-medium">內地來港專才子女攻略</span>
                    <ChevronRight className="h-3 w-3 text-amber-400" />
                  </div>
                </Link>
                {/* IB課程選校攻略 - 突顯重要 */}
                <Link href="/guides/ib-school">
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/50 rounded-full px-3 py-1 hover:from-blue-500/30 hover:to-indigo-500/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-blue-400 fill-blue-400" />
                      <Star className="h-3 w-3 text-blue-400 fill-blue-400" />
                      <Star className="h-3 w-3 text-blue-400 fill-blue-400" />
                    </div>
                    <span className="text-blue-300 text-xs font-medium">IB課程選校攻略</span>
                    <ChevronRight className="h-3 w-3 text-blue-400" />
                  </div>
                </Link>
              </div>
              <div className="flex gap-2">
                {premiumServices.map((service, index) => (
                  <Link key={index} href="/premium-services">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <Button 
                            size="sm"
                            className={`h-8 px-3 bg-gradient-to-r ${service.color} text-white hover:opacity-90 text-xs`}
                          >
                            <service.icon className="h-3 w-3 mr-1" />
                            {service.title}
                          </Button>
                          {service.badge && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">
                              {service.badge}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{service.title}服務</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 主要內容區 - 三欄佈局 */}
        <section className="py-6 bg-white">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* 左欄：熱門學校 */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900">
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                    熱門學校
                  </h2>
                  <Link href="/schools">
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-900 h-7">
                      查看更多 <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {mockPopularSchools.map((school) => (
                    <Link key={school.id} href={`/school/${school.id}`}>
                      <Card className="p-2.5 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group">
                        <div className="flex items-center gap-2.5">
                          {/* School Logo */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                            {school.logo ? (
                              <img 
                                src={school.logo} 
                                alt={school.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                                <span className="text-xs font-bold text-amber-600">{school.name.substring(0, 2)}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* School Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-xs text-gray-900 line-clamp-2 leading-tight group-hover:text-amber-600">
                              {school.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-0.5" />
                                {school.district}
                              </span>
                              <span className="text-xs text-amber-500 flex items-center">
                                <Star className="h-3 w-3 mr-0.5 fill-current" />
                                {school.rating}
                              </span>
                            </div>
                          </div>
                          
                          {/* Favorite Button */}
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-300 hover:text-red-500 flex-shrink-0">
                            <Heart className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* 有用工具 - 橫向排列 */}
                <div className="mt-4">
                  <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900 mb-3">
                    <Zap className="h-4 w-4 text-amber-500" />
                    有用工具
                  </h2>
                  <div className="flex gap-3">
                    <Link href="/tools/tuition-calculator" className="flex-1">
                      <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 border-amber-200 bg-amber-50 group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Calculator className="h-5 w-5 text-gray-900" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-900">學費計算機</h3>
                            <p className="text-xs text-gray-500">估算教育開支</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                    <Link href="/guides" className="flex-1">
                      <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200 bg-blue-50 group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-900">升學攻略</h3>
                            <p className="text-xs text-gray-500">7 個專題指南</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                    <Link href="/search" className="flex-1">
                      <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 border-purple-200 bg-purple-50 group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Filter className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-900">進階搜尋</h3>
                            <p className="text-xs text-gray-500">12+ 維度篩選</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 右欄：即將截止 + 最新消息 */}
              <div className="space-y-4">
                {/* 即將截止申請 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900">
                      <Clock className="h-4 w-4 text-red-500" />
                      即將截止
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {mockUpcomingDeadlines.map((item) => (
                      <Link key={item.id} href={`/school/${item.id}`}>
                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900 truncate flex-1">{item.schoolName}</span>
                            <Badge className={`ml-2 text-xs ${item.daysLeft <= 7 ? 'bg-red-500' : item.daysLeft <= 14 ? 'bg-orange-500' : 'bg-amber-400 text-gray-900'}`}>
                              {item.daysLeft}天
                            </Badge>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 攻略推薦 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900">
                      <BookOpenCheck className="h-4 w-4 text-orange-500" />
                      攻略推薦
                    </h2>
                    <Link href="/guides">
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-900 h-7">
                        全部 <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: "playgroup-guide", title: "Playgroup 推薦", icon: Gamepad2, color: "bg-lime-500" },
                      { id: "kindergarten-newbie", title: "新手媽媽幼稚園攻略", icon: Baby, color: "bg-pink-500" },
                      { id: "n-wu-strategy", title: "N無人士入名校", icon: Award, color: "bg-purple-500" },
                    ].map((guide) => (
                      <Link key={guide.id} href={`/guides/${guide.id}`}>
                        <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${guide.color} flex items-center justify-center`}>
                              <guide.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-900 group-hover:text-amber-600">{guide.title}</span>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 按地區瀏覽 - 移到最下方 */}
        <section className="py-6 bg-gray-50 border-t border-gray-100">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900">
                <MapPin className="h-4 w-4 text-amber-500" />
                按地區瀏覽
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <Link key={district} href={`/schools?district=${district}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-3 bg-white border-gray-200 hover:bg-amber-50 hover:border-amber-400 text-xs"
                  >
                    {district}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - 僅未登入用戶顯示 */}
        {!user && (
          <section className="py-6 bg-amber-400">
            <div className="container max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">開始您的升學規劃之旅</h2>
                  <p className="text-sm text-gray-800">註冊成為會員，收藏心儀學校、追蹤申請進度</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                    免費註冊 <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer - 簡潔版 */}
        <footer className="py-4 bg-white border-t border-gray-100">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src="/beejai-logo.png" alt="BeeJAI Logo" className="h-8 w-auto" />
                  <span className="font-light text-sm text-gray-900">
                    Bee<span className="text-amber-500 font-semibold">JAI</span>
                  </span>
                  <span className="text-xs text-gray-500">Bee仔升學</span>
                </div>
                <Link href="/about" className="text-xs text-gray-500 hover:text-amber-500 transition-colors">
                  關於我們
                </Link>
                <Link href="/pricing" className="text-xs text-gray-500 hover:text-amber-500 transition-colors">
                  會員方案
                </Link>
                <Link href="/terms" className="text-xs text-gray-500 hover:text-amber-500 transition-colors">
                  用戶條款
                </Link>
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-amber-500 transition-colors">
                  私隱政策
                </Link>
              </div>
              <p className="text-xs text-gray-500">© 2024 BeeJAI. 香港升學資訊平台</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
