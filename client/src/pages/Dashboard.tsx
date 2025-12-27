import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart,
  Clock,
  FileText,
  Bell,
  Users,
  Plus,
  ChevronRight,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Home,
  Settings,
  LogOut,
  GraduationCap,
  School,
  BookOpen,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Share2,
  MessageSquare,
  HelpCircle,
  Crown,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

// 模擬數據
const mockChildren = [
  { id: 1, name: "小明", birthDate: "2020-03-15", targetLevel: "primary", gender: "male" },
  { id: 2, name: "小美", birthDate: "2022-08-20", targetLevel: "kindergarten", gender: "female" },
];

const mockFavorites = [
  { id: 1, schoolName: "聖保羅男女中學附屬小學", type: "primary", district: "南區", deadline: "2025-01-15", daysLeft: 22, rating: 4.9 },
  { id: 2, schoolName: "拔萃女小學", type: "primary", district: "油尖旺區", deadline: "2025-01-20", daysLeft: 27, rating: 4.8 },
  { id: 3, schoolName: "喇沙小學", type: "primary", district: "九龍城區", deadline: "2025-02-01", daysLeft: 39, rating: 4.8 },
  { id: 4, schoolName: "德望學校（小學部）", type: "primary", district: "黃大仙區", deadline: "2025-01-25", daysLeft: 32, rating: 4.7 },
];

const mockApplications = [
  { id: 1, schoolName: "聖保羅男女中學附屬小學", status: "interview", date: "2024-12-01", interviewDate: "2025-01-10" },
  { id: 2, schoolName: "拔萃女小學", status: "applied", date: "2024-12-15", interviewDate: null },
  { id: 3, schoolName: "喇沙小學", status: "planning", date: null, interviewDate: null },
];

const mockNotifications = [
  { id: 1, title: "面試提醒", message: "聖保羅男女中學附屬小學面試將於 3 天後進行", time: "2小時前", read: false },
  { id: 2, title: "申請截止提醒", message: "拔萃女小學申請將於 27 天後截止", time: "1天前", read: false },
  { id: 3, title: "新攻略發布", message: "「2025小一面試必考題目」已發布", time: "2天前", read: true },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  planning: { label: "計劃中", color: "text-gray-600", bgColor: "bg-gray-100", icon: Clock },
  applied: { label: "已申請", color: "text-blue-600", bgColor: "bg-blue-100", icon: FileText },
  interview: { label: "待面試", color: "text-purple-600", bgColor: "bg-purple-100", icon: Users },
  waitlist: { label: "候補中", color: "text-orange-600", bgColor: "bg-orange-100", icon: Clock },
  accepted: { label: "已錄取", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle },
  rejected: { label: "未錄取", color: "text-red-600", bgColor: "bg-red-100", icon: AlertCircle },
  enrolled: { label: "已入學", color: "text-amber-600", bgColor: "bg-amber-100", icon: GraduationCap },
};

// 側邊欄選項
const sidebarMenuItems = [
  { icon: Home, label: "總覽", href: "/dashboard", id: "overview" },
  { icon: Heart, label: "心儀學校", href: "/dashboard?tab=favorites", id: "favorites" },
  { icon: FileText, label: "申請追蹤", href: "/dashboard?tab=applications", id: "applications" },
  { icon: Users, label: "小朋友資料", href: "/dashboard?tab=children", id: "children" },
  { icon: Calendar, label: "申請日曆", href: "/dashboard?tab=calendar", id: "calendar" },
  { icon: Bell, label: "通知中心", href: "/dashboard?tab=notifications", id: "notifications" },
  { icon: Settings, label: "帳戶設定", href: "/dashboard?tab=settings", id: "settings" },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [location] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  useEffect(() => {
    // 從 URL 參數獲取當前 tab
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("overview");
    }
  }, [location]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 側邊欄 */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/beejai_main_logo.png" alt="BeeJAI" className="h-10 w-10" />
              <div>
                <span className="font-bold text-lg">BeeJAI</span>
                <span className="text-amber-500 text-sm ml-1">Bee仔升學</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 用戶資訊 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/little-bee-symbol.png" alt="小蜜蜂" />
              <AvatarFallback className="bg-amber-100 text-amber-700">
                {user.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name || "用戶"}</p>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  小蜜蜂會員
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 導航選單 */}
        <nav className="p-2 flex-1">
          {sidebarMenuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-amber-50 text-amber-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-amber-500" : ""}`} />
                <span>{item.label}</span>
                {item.id === "notifications" && unreadNotifications > 0 && (
                  <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5">
                    {unreadNotifications}
                  </Badge>
                )}
              </button>
            </Link>
          ))}
        </nav>

        {/* 升級提示 */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">升級專業版</span>
            </div>
            <p className="text-xs text-amber-600 mb-2">解鎖完整入學資訊和個性化推薦</p>
            <Link href="/premium-services">
              <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                了解更多
              </Button>
            </Link>
          </div>
        </div>

        {/* 登出 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>登出</span>
          </button>
        </div>
      </aside>

      {/* 主內容區 */}
      <main className="flex-1 ml-64 p-6">
        {/* 總覽 Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* 歡迎區 */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20">
                <img src="/little-bee-symbol.png" alt="" className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/little-bee-symbol.png" alt="小蜜蜂" className="w-12 h-12" />
                  <div>
                    <h1 className="text-2xl font-bold">歡迎回來，{user.name || "用戶"}！</h1>
                    <p className="text-sm opacity-90">小蜜蜂會員</p>
                  </div>
                </div>
                <p className="opacity-90">管理您的升學規劃和申請進度，讓 BeeJAI 助您一臂之力。</p>
              </div>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">心儀學校</p>
                      <p className="text-3xl font-bold text-gray-900">{mockFavorites.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-pink-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">進行中申請</p>
                      <p className="text-3xl font-bold text-gray-900">{mockApplications.filter(a => a.status !== "planning").length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">即將截止</p>
                      <p className="text-3xl font-bold text-gray-900">{mockFavorites.filter(f => f.daysLeft <= 30).length}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">小朋友</p>
                      <p className="text-3xl font-bold text-gray-900">{mockChildren.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 主要內容區 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 即將截止 */}
              <Card className="lg:col-span-2 border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    即將截止申請
                  </CardTitle>
                  <Link href="/dashboard?tab=favorites">
                    <Button variant="ghost" size="sm" className="text-amber-600">
                      查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockFavorites.slice(0, 3).map((school) => (
                      <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <School className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{school.schoolName}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {school.district}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${
                          school.daysLeft <= 7 ? "bg-red-100 text-red-700" : 
                          school.daysLeft <= 14 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                        }`}>
                          {school.daysLeft} 天
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 通知 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-500" />
                    最新通知
                  </CardTitle>
                  {unreadNotifications > 0 && (
                    <Badge className="bg-red-500">{unreadNotifications}</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-xl ${notification.read ? "bg-gray-50" : "bg-amber-50 border border-amber-200"}`}>
                        <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 申請進度 */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                  申請進度追蹤
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2 border-amber-200 text-amber-600 hover:bg-amber-50">
                  <Plus className="h-4 w-4" />
                  新增申請
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockApplications.map((app) => {
                    const status = statusConfig[app.status];
                    return (
                      <div key={app.id} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`px-2 py-1 rounded-full ${status.bgColor} ${status.color} text-xs font-medium flex items-center gap-1`}>
                            <status.icon className="h-3 w-3" />
                            {status.label}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                        <p className="font-medium text-gray-900 mb-1">{app.schoolName}</p>
                        {app.date && (
                          <p className="text-xs text-gray-500">申請日期：{app.date}</p>
                        )}
                        {app.interviewDate && (
                          <p className="text-xs text-purple-600 mt-1">面試日期：{app.interviewDate}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 心儀學校 Tab */}
        {activeTab === "favorites" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">心儀學校</h1>
                <p className="text-gray-500">管理您收藏的學校，追蹤申請截止日期</p>
              </div>
              <Link href="/schools">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="h-4 w-4 mr-2" />
                  添加學校
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFavorites.map((school) => (
                <Card key={school.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <School className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{school.schoolName}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" /> {school.district}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm font-medium">{school.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {school.type === "primary" ? "小學" : "幼稚園"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-pink-500 hover:text-pink-600 hover:bg-pink-50">
                        <Heart className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">申請截止</p>
                        <p className="text-sm font-medium text-gray-900">{school.deadline}</p>
                      </div>
                      <Badge className={`${
                        school.daysLeft <= 7 ? "bg-red-100 text-red-700" : 
                        school.daysLeft <= 14 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                      }`}>
                        剩餘 {school.daysLeft} 天
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 申請追蹤 Tab */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">申請追蹤</h1>
                <p className="text-gray-500">追蹤所有學校的申請進度</p>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="h-4 w-4 mr-2" />
                新增申請
              </Button>
            </div>

            {/* 進度統計 */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = mockApplications.filter(a => a.status === key).length;
                return (
                  <Card key={key} className={`border-0 shadow-sm ${count > 0 ? config.bgColor : "bg-gray-50"}`}>
                    <CardContent className="p-3 text-center">
                      <config.icon className={`h-5 w-5 mx-auto mb-1 ${count > 0 ? config.color : "text-gray-400"}`} />
                      <p className={`text-lg font-bold ${count > 0 ? config.color : "text-gray-400"}`}>{count}</p>
                      <p className="text-xs text-gray-500">{config.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 申請列表 */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {mockApplications.map((app) => {
                    const status = statusConfig[app.status];
                    return (
                      <div key={app.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${status.bgColor} flex items-center justify-center`}>
                              <status.icon className={`h-6 w-6 ${status.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{app.schoolName}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                {app.date && (
                                  <p className="text-sm text-gray-500">申請：{app.date}</p>
                                )}
                                {app.interviewDate && (
                                  <p className="text-sm text-purple-600">面試：{app.interviewDate}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${status.bgColor} ${status.color}`}>
                              {status.label}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 小朋友資料 Tab */}
        {activeTab === "children" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">小朋友資料</h1>
                <p className="text-gray-500">管理小朋友的個人資料，獲得個性化推薦</p>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="h-4 w-4 mr-2" />
                添加小朋友
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockChildren.map((child) => (
                <Card key={child.id} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                          child.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                        }`}>
                          {child.name[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                          <p className="text-gray-500">
                            {new Date().getFullYear() - new Date(child.birthDate).getFullYear()} 歲
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">出生日期</span>
                        <span className="font-medium">{child.birthDate}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">性別</span>
                        <span className="font-medium">{child.gender === "male" ? "男" : "女"}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-500">目標階段</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {child.targetLevel === "primary" ? "小學" : "幼稚園"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 通知中心 Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">通知中心</h1>
                <p className="text-gray-500">查看所有通知和提醒</p>
              </div>
              <Button variant="outline">全部標為已讀</Button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-amber-50" : ""}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          !notification.read ? "bg-amber-100" : "bg-gray-100"
                        }`}>
                          <Bell className={`h-5 w-5 ${!notification.read ? "text-amber-600" : "text-gray-400"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 帳戶設定 Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">帳戶設定</h1>
              <p className="text-gray-500">管理您的帳戶資料和偏好設定</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* 個人資料 */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>個人資料</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-amber-100 text-amber-700 text-2xl">
                          {user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline">更換頭像</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">姓名</label>
                        <Input defaultValue={user.name || ""} className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">電郵</label>
                        <Input defaultValue={user.email || ""} className="mt-1" disabled />
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600">儲存變更</Button>
                  </CardContent>
                </Card>

                {/* 通知設定 */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>通知設定</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">申請截止提醒</p>
                        <p className="text-sm text-gray-500">在截止日期前 7 天收到提醒</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-amber-500" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">面試提醒</p>
                        <p className="text-sm text-gray-500">在面試日期前 3 天收到提醒</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-amber-500" />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">新攻略通知</p>
                        <p className="text-sm text-gray-500">收到最新升學攻略更新</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 側邊資訊 */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>訂閱狀態</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <Badge className="bg-gray-100 text-gray-700 mb-3">免費版</Badge>
                      <p className="text-sm text-gray-500 mb-4">
                        升級至專業版，解鎖更多功能
                      </p>
                      <Link href="/premium-services">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600">
                          <Crown className="h-4 w-4 mr-2" />
                          升級專業版
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>需要幫助？</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      常見問題
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      聯絡客服
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* 申請日曆 Tab */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">申請日曆</h1>
              <p className="text-gray-500">查看所有重要日期和截止時間</p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">日曆功能即將推出</h3>
                  <p className="text-gray-500 mb-4">我們正在開發完整的申請日曆功能，敬請期待！</p>
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    功能上線時通知我
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
