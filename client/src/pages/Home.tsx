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
  Briefcase,
  Baby,
  BookOpenCheck
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// 香港 18 區
const districts = [
  "中西區", "灣仔區", "東區", "南區",
  "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區",
  "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"
];

// 學校類型
const schoolTypes = [
  { id: "kindergarten", name: "幼稚園", icon: Baby, color: "bg-pink-500", description: "K1-K3" },
  { id: "primary", name: "小學", icon: BookOpen, color: "bg-blue-500", description: "P1-P6" },
  { id: "secondary", name: "中學", icon: Building2, color: "bg-purple-500", description: "F1-F6" },
  { id: "international", name: "國際學校", icon: Globe, color: "bg-green-500", description: "IB/IGCSE" },
];

// 快速篩選選項
const quickFilters = [
  { id: "band1", label: "Band 1 學校", icon: Award, href: "/schools?band=1", color: "text-yellow-600" },
  { id: "dss", label: "直資學校", icon: School, href: "/schools?category=dss", color: "text-blue-600" },
  { id: "aided", label: "資助學校", icon: Users, href: "/schools?category=aided", color: "text-green-600" },
  { id: "private", label: "私立學校", icon: DollarSign, href: "/schools?category=private", color: "text-purple-600" },
  { id: "english", label: "英文授課", icon: Languages, href: "/schools?language=english", color: "text-red-600" },
  { id: "chinese", label: "中文授課", icon: Languages, href: "/schools?language=chinese", color: "text-orange-600" },
  { id: "boys", label: "男校", icon: Users, href: "/schools?gender=boys", color: "text-blue-500" },
  { id: "girls", label: "女校", icon: Users, href: "/schools?gender=girls", color: "text-pink-500" },
  { id: "coed", label: "男女校", icon: Users, href: "/schools?gender=coed", color: "text-teal-600" },
  { id: "christian", label: "基督教學校", icon: Church, href: "/schools?religion=christian", color: "text-indigo-600" },
  { id: "catholic", label: "天主教學校", icon: Church, href: "/schools?religion=catholic", color: "text-violet-600" },
  { id: "free", label: "免學費", icon: DollarSign, href: "/schools?tuitionMax=0", color: "text-emerald-600" },
];

// 升學階段
const admissionStages = [
  { id: "k1", label: "K1 入學", icon: Baby, href: "/schools?type=kindergarten&grade=k1", color: "bg-pink-100 text-pink-700" },
  { id: "p1", label: "小一入學", icon: BookOpen, href: "/schools?type=primary&grade=p1", color: "bg-blue-100 text-blue-700" },
  { id: "s1", label: "中一入學", icon: Building2, href: "/schools?type=secondary&grade=s1", color: "bg-purple-100 text-purple-700" },
  { id: "transfer", label: "插班申請", icon: BookOpenCheck, href: "/schools?admission=transfer", color: "bg-orange-100 text-orange-700" },
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
      <Card className="w-[280px] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group flex-shrink-0">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={school.image} 
            alt={school.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" onClick={(e) => e.preventDefault()}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className={`${typeConfig?.color} text-white`}>
              {typeConfig?.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-base mb-2 line-clamp-2">{school.name}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-light">
              <MapPin className="h-3 w-3" />
              {school.district}
            </span>
            <span className="flex items-center gap-1 text-primary">
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
  const urgencyClass = item.daysLeft <= 7 ? "bg-red-100 text-red-700" : 
                       item.daysLeft <= 14 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700";
  
  return (
    <Link href={`/school/${item.id}`}>
      <Card className="w-[300px] p-4 hover:shadow-md transition-shadow cursor-pointer flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-sm line-clamp-2">{item.schoolName}</h4>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${urgencyClass}`}>
            <Clock className="h-3 w-3" />
            {item.daysLeft} 天
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
          <Calendar className="h-3 w-3" />
          截止日期：{item.deadline.toLocaleDateString('zh-HK')}
        </div>
      </Card>
    </Link>
  );
}

function NewsCard({ item }: { item: typeof mockLatestNews[0] }) {
  return (
    <Card className="w-[320px] p-4 hover:shadow-md transition-shadow cursor-pointer flex-shrink-0">
      <Badge variant="outline" className="mb-2 text-xs font-light">{item.school}</Badge>
      <h4 className="font-medium text-sm mb-2 line-clamp-2">{item.title}</h4>
      <p className="text-xs text-muted-foreground font-light">{item.date}</p>
    </Card>
  );
}

function SectionHeader({ title, href, icon: Icon }: { title: string; href: string; icon?: any }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-medium flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        {title}
      </h2>
      <Link href={href}>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-light">
          查看更多 <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-10 lg:py-14">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-light mb-6">
              <Sparkles className="h-4 w-4" />
              香港最全面的升學資訊平台
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-medium mb-4">
              輕鬆掌握全港 <span className="text-primary">2000+</span> 學校入學資訊
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 font-light">
              一站式搜尋幼稚園、小學、中學及國際學校，追蹤申請截止日期，規劃升學之路
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="搜尋學校名稱、地區或關鍵字..."
                className="pl-12 pr-4 h-14 text-base rounded-full border-2 focus:border-primary font-light"
              />
              <Link href="/search">
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 font-light">
                  搜尋
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-8 text-sm">
              <div className="text-center">
                <p className="text-2xl font-medium text-primary">2000+</p>
                <p className="text-muted-foreground font-light">學校資料</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium text-primary">18</p>
                <p className="text-muted-foreground font-light">香港地區</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium text-primary">實時</p>
                <p className="text-muted-foreground font-light">入學資訊</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Types - Main Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex justify-center gap-4 flex-wrap">
            {schoolTypes.map((type) => (
              <Link key={type.id} href={`/schools?type=${type.id}`}>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-6 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 font-light"
                >
                  <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">{type.name}</span>
                  <span className="text-xs text-muted-foreground">{type.description}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Stages */}
      <section className="py-6 bg-muted/30">
        <div className="container">
          <h3 className="text-center text-sm font-medium text-muted-foreground mb-4">升學階段</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {admissionStages.map((stage) => (
              <Link key={stage.id} href={stage.href}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`${stage.color} hover:opacity-80 font-light`}
                >
                  <stage.icon className="h-4 w-4 mr-2" />
                  {stage.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Filters - Extended Options */}
      <section className="py-8">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">快速篩選</h3>
            <span className="text-sm text-muted-foreground font-light">— 一鍵找到合適學校</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Link key={filter.id} href={filter.href}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="font-light hover:border-primary hover:bg-primary/5"
                >
                  <filter.icon className={`h-4 w-4 mr-2 ${filter.color}`} />
                  {filter.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <SectionHeader title="即將截止申請" href="/schools" icon={Clock} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockUpcomingDeadlines.map((item) => (
              <DeadlineCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Schools */}
      <section className="py-10">
        <div className="container">
          <SectionHeader title="熱門學校" href="/schools?popular=true" icon={TrendingUp} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockPopularSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <SectionHeader title="最新入學消息" href="/schools" icon={Calendar} />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockLatestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by District */}
      <section className="py-10">
        <div className="container">
          <SectionHeader title="按地區瀏覽" href="/search" icon={MapPin} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {districts.map((district) => (
              <Link key={district} href={`/schools?district=${district}`}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:border-primary hover:bg-primary/5 font-light"
                >
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {district}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-medium mb-4">開始您的升學規劃之旅</h2>
              <p className="text-muted-foreground mb-6 font-light">
                註冊成為會員，收藏心儀學校、追蹤申請進度、獲取最新入學資訊提醒
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="px-8 font-light">
                  免費註冊
                </Button>
                <Button size="lg" variant="outline" className="px-8 font-light">
                  了解更多
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/beejai-logo.png" 
                alt="BeeJAI Logo" 
                className="h-10 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-light text-lg">
                  Bee<span className="text-primary font-medium">JAI</span>
                </span>
                <span className="text-xs text-muted-foreground font-light">Bee 仔</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-light">
              © 2024 BeeJAI. 香港升學資訊平台
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
