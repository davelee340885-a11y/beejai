import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard,
  Users,
  School,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Bell,
  Shield,
  Database,
  Globe,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

// 模擬統計數據
const mockStats = {
  totalUsers: 2847,
  userGrowth: 12.5,
  totalSchools: 2156,
  schoolGrowth: 3.2,
  totalPageViews: 156789,
  pageViewGrowth: 28.4,
  totalApplications: 4521,
  applicationGrowth: 15.8,
};

// 模擬用戶數據
const mockUsers = [
  { id: 1, name: "張小明", email: "zhang@example.com", role: "user", status: "active", createdAt: "2024-12-20", lastLogin: "2024-12-26" },
  { id: 2, name: "李美麗", email: "li@example.com", role: "user", status: "active", createdAt: "2024-12-18", lastLogin: "2024-12-25" },
  { id: 3, name: "王大偉", email: "wang@example.com", role: "user", status: "inactive", createdAt: "2024-12-15", lastLogin: "2024-12-20" },
  { id: 4, name: "陳小華", email: "chen@example.com", role: "admin", status: "active", createdAt: "2024-12-10", lastLogin: "2024-12-26" },
  { id: 5, name: "林志強", email: "lin@example.com", role: "user", status: "active", createdAt: "2024-12-08", lastLogin: "2024-12-24" },
];

// 模擬學校數據
const mockSchools = [
  { id: 1, name: "聖保羅男女中學附屬小學", type: "primary", district: "南區", status: "published", views: 15234 },
  { id: 2, name: "拔萃女小學", type: "primary", district: "油尖旺區", status: "published", views: 12456 },
  { id: 3, name: "喇沙小學", type: "primary", district: "九龍城區", status: "published", views: 11234 },
  { id: 4, name: "聖公會幼稚園", type: "kindergarten", district: "中西區", status: "draft", views: 0 },
  { id: 5, name: "維多利亞幼稚園", type: "kindergarten", district: "灣仔區", status: "published", views: 8765 },
];

// 模擬內容數據
const mockContent = [
  { id: 1, title: "新手媽媽幼稚園攻略", type: "guide", status: "published", views: 5678, updatedAt: "2024-12-25" },
  { id: 2, title: "N無人士入名校攻略", type: "guide", status: "published", views: 4532, updatedAt: "2024-12-24" },
  { id: 3, title: "2025小一入學重要日期", type: "announcement", status: "published", views: 8901, updatedAt: "2024-12-23" },
  { id: 4, title: "內地來港專才子女攻略", type: "guide", status: "draft", views: 0, updatedAt: "2024-12-22" },
];

// 模擬活動日誌
const mockActivityLogs = [
  { id: 1, action: "用戶註冊", user: "張小明", time: "5 分鐘前" },
  { id: 2, action: "更新學校資料", user: "Admin", time: "15 分鐘前" },
  { id: 3, action: "發布新攻略", user: "Admin", time: "1 小時前" },
  { id: 4, action: "用戶登入", user: "李美麗", time: "2 小時前" },
  { id: 5, action: "新增學校", user: "Admin", time: "3 小時前" },
];

// 側邊欄選項
const adminSidebarItems = [
  { icon: LayoutDashboard, label: "總覽", id: "overview" },
  { icon: Users, label: "用戶管理", id: "users" },
  { icon: School, label: "學校管理", id: "schools" },
  { icon: FileText, label: "內容管理", id: "content" },
  { icon: BarChart3, label: "數據分析", id: "analytics" },
  { icon: Bell, label: "通知管理", id: "notifications" },
  { icon: Settings, label: "系統設定", id: "settings" },
];

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [location] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  useEffect(() => {
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
    // 檢查是否為管理員
    if (!loading && user && user.role !== "admin") {
      window.location.href = "/dashboard";
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* 側邊欄 */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 fixed h-full z-10">
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/beejai_main_logo.png" alt="BeeJAI" className="h-10 w-10" />
              <div>
                <span className="font-bold text-lg text-white">BeeJAI</span>
                <span className="text-amber-500 text-xs ml-1 block">Admin Panel</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 管理員資訊 */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-amber-500 text-white">
                {user.name?.[0] || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user.name || "Admin"}</p>
              <div className="flex items-center gap-1">
                <Badge className="text-xs bg-amber-500/20 text-amber-400 border-0">
                  <Shield className="h-3 w-3 mr-1" />
                  管理員
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 導航選單 */}
        <nav className="p-2 flex-1">
          {adminSidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 快速操作 */}
        <div className="p-4 border-t border-gray-700">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full mb-2 border-gray-600 text-gray-300 hover:bg-gray-700">
              <Eye className="h-4 w-4 mr-2" />
              查看用戶版
            </Button>
          </Link>
        </div>

        {/* 登出 */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
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
            {/* 頂部標題 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">管理員總覽</h1>
                <p className="text-gray-400">歡迎回來，{user.name}！這是您的管理面板概覽。</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  刷新數據
                </Button>
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                  <Download className="h-4 w-4 mr-2" />
                  匯出報告
                </Button>
              </div>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">總用戶數</p>
                      <p className="text-3xl font-bold text-white">{mockStats.totalUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.userGrowth}%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">學校數量</p>
                      <p className="text-3xl font-bold text-white">{mockStats.totalSchools.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.schoolGrowth}%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <School className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">頁面瀏覽</p>
                      <p className="text-3xl font-bold text-white">{mockStats.totalPageViews.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.pageViewGrowth}%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Eye className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">申請追蹤</p>
                      <p className="text-3xl font-bold text-white">{mockStats.totalApplications.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400">+{mockStats.applicationGrowth}%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 主要內容區 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 最近用戶 */}
              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-400" />
                    最近註冊用戶
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300" onClick={() => setActiveTab("users")}>
                    查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.slice(0, 4).map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-600 text-white">
                              {u.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{u.name}</p>
                            <p className="text-sm text-gray-400">{u.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                            {u.status === "active" ? "活躍" : "不活躍"}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{u.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 活動日誌 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-amber-400" />
                    活動日誌
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockActivityLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-white">{log.action}</p>
                          <p className="text-xs text-gray-400">{log.user} · {log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 熱門學校 */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                  熱門學校
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300" onClick={() => setActiveTab("schools")}>
                  管理學校 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {mockSchools.filter(s => s.status === "published").map((school, index) => (
                    <div key={school.id} className="p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-amber-400">#{index + 1}</span>
                      </div>
                      <p className="font-medium text-white text-sm mb-1 line-clamp-2">{school.name}</p>
                      <p className="text-xs text-gray-400">{school.district}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Eye className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{school.views.toLocaleString()} 瀏覽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 用戶管理 Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">用戶管理</h1>
                <p className="text-gray-400">管理所有註冊用戶</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="搜尋用戶..." className="pl-10 bg-gray-800 border-gray-700 text-white w-64" />
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  篩選
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Download className="h-4 w-4 mr-2" />
                  匯出
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">用戶</th>
                      <th className="text-left p-4 text-gray-400 font-medium">角色</th>
                      <th className="text-left p-4 text-gray-400 font-medium">狀態</th>
                      <th className="text-left p-4 text-gray-400 font-medium">註冊日期</th>
                      <th className="text-left p-4 text-gray-400 font-medium">最後登入</th>
                      <th className="text-right p-4 text-gray-400 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((u) => (
                      <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gray-600 text-white">
                                {u.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">{u.name}</p>
                              <p className="text-sm text-gray-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={u.role === "admin" ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-400"}>
                            {u.role === "admin" ? "管理員" : "用戶"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                            {u.status === "active" ? "活躍" : "不活躍"}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">{u.createdAt}</td>
                        <td className="p-4 text-gray-300">{u.lastLogin}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 學校管理 Tab */}
        {activeTab === "schools" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">學校管理</h1>
                <p className="text-gray-400">管理所有學校資料</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="搜尋學校..." className="pl-10 bg-gray-800 border-gray-700 text-white w-64" />
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Upload className="h-4 w-4 mr-2" />
                  批量匯入
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="h-4 w-4 mr-2" />
                  新增學校
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">學校名稱</th>
                      <th className="text-left p-4 text-gray-400 font-medium">類型</th>
                      <th className="text-left p-4 text-gray-400 font-medium">地區</th>
                      <th className="text-left p-4 text-gray-400 font-medium">狀態</th>
                      <th className="text-left p-4 text-gray-400 font-medium">瀏覽量</th>
                      <th className="text-right p-4 text-gray-400 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSchools.map((school) => (
                      <tr key={school.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                              <School className="h-5 w-5 text-amber-400" />
                            </div>
                            <p className="font-medium text-white">{school.name}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {school.type === "primary" ? "小學" : "幼稚園"}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">{school.district}</td>
                        <td className="p-4">
                          <Badge className={school.status === "published" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                            {school.status === "published" ? "已發布" : "草稿"}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">{school.views.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 內容管理 Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">內容管理</h1>
                <p className="text-gray-400">管理攻略、公告等內容</p>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="h-4 w-4 mr-2" />
                新增內容
              </Button>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">標題</th>
                      <th className="text-left p-4 text-gray-400 font-medium">類型</th>
                      <th className="text-left p-4 text-gray-400 font-medium">狀態</th>
                      <th className="text-left p-4 text-gray-400 font-medium">瀏覽量</th>
                      <th className="text-left p-4 text-gray-400 font-medium">更新日期</th>
                      <th className="text-right p-4 text-gray-400 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContent.map((content) => (
                      <tr key={content.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="p-4">
                          <p className="font-medium text-white">{content.title}</p>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {content.type === "guide" ? "攻略" : "公告"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={content.status === "published" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                            {content.status === "published" ? "已發布" : "草稿"}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">{content.views.toLocaleString()}</td>
                        <td className="p-4 text-gray-300">{content.updatedAt}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 數據分析 Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">數據分析</h1>
              <p className="text-gray-400">查看網站流量和用戶行為分析</p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">數據分析功能即將推出</h3>
                  <p className="text-gray-400 mb-4">我們正在開發完整的數據分析功能，敬請期待！</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 通知管理 Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">通知管理</h1>
                <p className="text-gray-400">管理系統通知和推送</p>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="h-4 w-4 mr-2" />
                發送通知
              </Button>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">通知管理功能即將推出</h3>
                  <p className="text-gray-400 mb-4">我們正在開發完整的通知管理功能，敬請期待！</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 系統設定 Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">系統設定</h1>
              <p className="text-gray-400">管理網站設定和配置</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-400" />
                    網站設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">網站名稱</label>
                    <Input defaultValue="Bee仔升學" className="mt-1 bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">網站描述</label>
                    <Input defaultValue="香港最全面的升學資訊平台" className="mt-1 bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600">儲存變更</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="h-5 w-5 text-amber-400" />
                    數據庫狀態
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">連接狀態</span>
                    <Badge className="bg-green-500/20 text-green-400">正常</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">學校記錄</span>
                    <span className="text-white">{mockStats.totalSchools.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">用戶記錄</span>
                    <span className="text-white">{mockStats.totalUsers.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
