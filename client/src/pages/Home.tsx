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
  ArrowRight
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// 香港 18 區
const districts = [
  "中西區", "灣仔區", "東區", "南區",
  "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區",
  "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"
];

// 學校類型（用於卡片顯示）
const schoolTypes = [
  { id: "kindergarten", name: "幼稚園", icon: Baby, color: "bg-pink-500", description: "K1-K3" },
  { id: "primary", name: "小學", icon: BookOpen, color: "bg-blue-500", description: "P1-P6" },
  { id: "secondary", name: "中學", icon: Building2, color: "bg-purple-500", description: "F1-F6" },
  { id: "international", name: "國際學校", icon: Globe, color: "bg-green-500", description: "IB/IGCSE" },
];

// 快速篩選選項
const quickFilters = [
  { id: "band1", label: "Band 1 學校", icon: Award, href: "/schools?band=1" },
  { id: "dss", label: "直資學校", icon: School, href: "/schools?category=dss" },
  { id: "aided", label: "資助學校", icon: Users, href: "/schools?category=aided" },
  { id: "private", label: "私立學校", icon: DollarSign, href: "/schools?category=private" },
  { id: "english", label: "英文授課", icon: Languages, href: "/schools?language=english" },
  { id: "chinese", label: "中文授課", icon: Languages, href: "/schools?language=chinese" },
  { id: "boys", label: "男校", icon: Users, href: "/schools?gender=boys" },
  { id: "girls", label: "女校", icon: Users, href: "/schools?gender=girls" },
  { id: "coed", label: "男女校", icon: Users, href: "/schools?gender=coed" },
  { id: "christian", label: "基督教學校", icon: Church, href: "/schools?religion=christian" },
  { id: "catholic", label: "天主教學校", icon: Church, href: "/schools?religion=catholic" },
  { id: "free", label: "免學費", icon: DollarSign, href: "/schools?tuitionMax=0" },
];

// 升學階段
const admissionStages = [
  { id: "k1", label: "K1 入學", icon: Baby, href: "/schools?type=kindergarten&grade=k1" },
  { id: "p1", label: "小一入學", icon: BookOpen, href: "/schools?type=primary&grade=p1" },
  { id: "s1", label: "中一入學", icon: Building2, href: "/schools?type=secondary&grade=s1" },
  { id: "transfer", label: "插班申請", icon: BookOpenCheck, href: "/schools?admission=transfer" },
];

// 模擬熱門學校數據
const mockPopularSchools = [
  { id: 1, name: "聖保羅男女中學附屬小學", type: "primary", district: "南區", rating: 4.9, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
  { id: 2, name: "拔萃女小學", type: "primary", district: "油尖旺區", rating: 4.8, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  { id: 3, name: "喇沙小學", type: "primary", district: "九龍城區", rating: 4.8, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop" },
  { id: 4, name: "聖公會聖彼得小學", type: "primary", district: "中西區", rating: 4.7, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop" },
  { id: 5, name: "瑪利諾修院學校（小學部）", type: "primary", district: "九龍城區", rating: 4.7, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop" },
  { id: 6, name: "德望學校（小學部）", type: "primary", district: "黃大仙區", rating: 4.6, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
];

// 模擬即將截止申請
const mockUpcomingDeadlines = [
  { id: 1, schoolName: "德望學校（小學部）", deadline: new Date("2025-01-15"), type: "primary", daysLeft: 22 },
  { id: 2, schoolName: "聖保祿學校（小學部）", deadline: new Date("2025-01-20"), type: "primary", daysLeft: 27 },
  { id: 3, schoolName: "拔萃男書院附屬小學", deadline: new Date("2025-01-25"), type: "primary", daysLeft: 32 },
  { id: 4, schoolName: "英華小學", deadline: new Date("2025-02-01"), type: "primary", daysLeft: 39 },
  { id: 5, schoolName: "協恩中學附屬小學", deadline: new Date("2025-02-10"), type: "primary", daysLeft: 48 },
];

// 模擬最新入學消息
const mockLatestNews = [
  { id: 1, title: "2025-26 年度小一入學申請現已開始", school: "聖保羅男女中學附屬小學", date: "2024-12-20" },
  { id: 2, title: "幼稚園 K1 入學簡介會", school: "維多利亞幼稚園", date: "2024-12-19" },
  { id: 3, title: "中一自行分配學位申請須知", school: "皇仁書院", date: "2024-12-18" },
  { id: 4, title: "國際學校入學評估日期公佈", school: "漢基國際學校", date: "2024-12-17" },
  { id: 5, title: "直資小學聯合招生日", school: "多間直資小學", date: "2024-12-16" },
];

function SchoolCard({ school }: { school: typeof mockPopularSchools[0] }) {
  const typeConfig = schoolTypes.find(t => t.id === school.type);
  
  return (
    <Link href={`/school/${school.id}`}>
      <Card className="w-[280px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group flex-shrink-0 border border-gray-100 shadow-md bg-white">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={school.image} 
            alt={school.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-amber-400 hover:text-gray-900 shadow-sm" onClick={(e) => e.preventDefault()}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className={`${typeConfig?.color} text-white`}>
              {typeConfig?.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 bg-white">
          <h3 className="font-medium text-base mb-2 line-clamp-2 text-gray-900">{school.name}</h3>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1 font-light">
              <MapPin className="h-3 w-3" />
              {school.district}
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              {school.rating}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function DeadlineCard({ item }: { item: typeof mockUpcomingDeadlines[0] }) {
  const urgencyClass = item.daysLeft <= 7 ? "bg-red-500 text-white" : 
                       item.daysLeft <= 14 ? "bg-orange-500 text-white" : "bg-amber-400 text-gray-900";
  
  return (
    <Link href={`/school/${item.id}`}>
      <div className="w-[300px] p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex-shrink-0 border border-amber-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-sm line-clamp-2 text-gray-900">{item.schoolName}</h4>
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${urgencyClass}`}>
            <Clock className="h-3 w-3" />
            {item.daysLeft} 天
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
          <Calendar className="h-3 w-3" />
          截止日期：{item.deadline.toLocaleDateString('zh-HK')}
        </div>
      </div>
    </Link>
  );
}

function NewsCard({ item }: { item: typeof mockLatestNews[0] }) {
  return (
    <div className="w-[320px] p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer flex-shrink-0 border border-amber-200">
      <Badge className="mb-2 text-xs font-medium bg-amber-400 text-gray-900 hover:bg-amber-500">{item.school}</Badge>
      <h4 className="font-medium text-sm mb-2 line-clamp-2 text-gray-900">{item.title}</h4>
      <p className="text-xs text-gray-500 font-light">{item.date}</p>
    </div>
  );
}

function SectionHeader({ title, href, icon: Icon }: { title: string; href: string; icon?: any }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
        {Icon && <Icon className="h-5 w-5 text-amber-500" />}
        {title}
      </h2>
      <Link href={href}>
        <Button 
          variant="ghost" 
          size="sm" 
          className="font-light text-gray-600 hover:text-gray-900 hover:bg-amber-50"
        >
          查看更多 <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 黃色 Banner */}
      <section className="relative bg-amber-400 py-10 lg:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              香港最全面的升學資訊平台
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-gray-900">
              輕鬆掌握全港 <span className="bg-white px-3 py-1 rounded-lg shadow-sm">2000+</span> 學校入學資訊
            </h1>
            
            <p className="text-base lg:text-lg text-gray-800 mb-6 font-light">
              一站式搜尋幼稚園、小學、中學及國際學校，追蹤申請截止日期，規劃升學之路
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="搜尋學校名稱、地區或關鍵字..."
                className="pl-12 pr-4 h-12 text-base rounded-full border-2 border-white focus:border-gray-900 font-light bg-white shadow-lg"
              />
              <Link href="/search">
                <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-5 h-9 font-medium text-sm bg-gray-900 hover:bg-gray-800 text-white">
                  搜尋
                </Button>
              </Link>
            </div>

            {/* 升學階段 */}
            <div className="mb-6">
              <p className="text-xs text-gray-700 mb-3 font-medium">升學階段</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {admissionStages.map((stage) => (
                  <Link key={stage.id} href={stage.href}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white border-2 border-white text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-medium text-xs h-8 shadow-md"
                    >
                      <stage.icon className="h-3.5 w-3.5 mr-1.5" />
                      {stage.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center bg-white px-5 py-3 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-amber-500">2000+</p>
                <p className="font-light text-xs text-gray-600">學校資料</p>
              </div>
              <div className="text-center bg-white px-5 py-3 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-amber-500">18</p>
                <p className="font-light text-xs text-gray-600">香港地區</p>
              </div>
              <div className="text-center bg-white px-5 py-3 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-amber-500">實時</p>
                <p className="font-light text-xs text-gray-600">入學資訊</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 波浪分隔線 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 50 480 10 720 30C960 50 1200 10 1440 30V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* 快速篩選 - 淺黃色底 */}
      <section className="bg-amber-50 py-6 border-b border-amber-100">
        <div className="container">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-gray-900">快速篩選</span>
            <span className="text-xs text-gray-500 font-light">— 一鍵找到合適學校</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {quickFilters.map((filter) => (
              <Link key={filter.id} href={filter.href}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="font-light border-amber-300 text-gray-700 hover:bg-amber-400 hover:text-gray-900 hover:border-amber-400 text-xs h-7 px-3 bg-white"
                >
                  <filter.icon className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                  {filter.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines - 白色底 */}
      <section className="py-10 bg-white">
        <div className="container">
          <SectionHeader title="即將截止申請" href="/schools" icon={Clock} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockUpcomingDeadlines.map((item) => (
              <DeadlineCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Schools - 淺黃色底 */}
      <section className="py-10 bg-amber-50">
        <div className="container">
          <SectionHeader title="熱門學校" href="/schools?popular=true" icon={TrendingUp} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockPopularSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News - 白色底 */}
      <section className="py-10 bg-white">
        <div className="container">
          <SectionHeader title="最新入學消息" href="/schools" icon={Calendar} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockLatestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by District - 淺黃色底 */}
      <section className="py-10 bg-amber-50">
        <div className="container">
          <SectionHeader title="按地區瀏覽" href="/search" icon={MapPin} />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {districts.map((district) => (
              <Link key={district} href={`/schools?district=${district}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full justify-center border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-400 hover:text-gray-900 font-light text-xs h-8 text-gray-700"
                >
                  {district}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 黃色 Banner */}
      {!user && (
        <section className="py-12 bg-amber-400">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">開始您的升學規劃之旅</h2>
              <p className="text-gray-800 mb-5 font-light text-sm">
                註冊成為會員，收藏心儀學校、追蹤申請進度、獲取最新入學資訊提醒
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="default" className="px-6 font-medium bg-gray-900 hover:bg-gray-800 text-white">
                  免費註冊
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="default" variant="outline" className="px-6 font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent">
                  了解更多
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer - 白色底配黃色點綴 */}
      <footer className="py-8 bg-white border-t border-amber-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/beejai-logo.png" 
                alt="BeeJAI Logo" 
                className="h-10 w-auto"
              />
              <div className="flex items-baseline gap-1.5">
                <span className="font-light text-lg text-gray-900">
                  Bee<span className="text-amber-500 font-semibold">JAI</span>
                </span>
                <span className="text-sm text-gray-500 font-light">Bee仔</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light">
              © 2024 BeeJAI. 香港升學資訊平台
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
