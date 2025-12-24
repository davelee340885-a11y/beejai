import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";

// 模擬數據
const mockChildren = [
  { id: 1, name: "小明", targetLevel: "primary", age: 5 },
];

const mockFavorites = [
  { id: 1, schoolName: "聖保羅男女中學附屬小學", type: "primary", deadline: "2025-01-15", daysLeft: 22 },
  { id: 2, schoolName: "拔萃女小學", type: "primary", deadline: "2025-01-20", daysLeft: 27 },
  { id: 3, schoolName: "喇沙小學", type: "primary", deadline: "2025-02-01", daysLeft: 39 },
];

const mockApplications = [
  { id: 1, schoolName: "聖保羅男女中學附屬小學", status: "applied", date: "2024-12-01" },
  { id: 2, schoolName: "拔萃女小學", status: "interview", date: "2024-12-15" },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  planning: { label: "計劃中", color: "bg-gray-500", icon: Clock },
  applied: { label: "已申請", color: "bg-blue-500", icon: FileText },
  interview: { label: "面試", color: "bg-purple-500", icon: Users },
  waitlist: { label: "候補", color: "bg-orange-500", icon: Clock },
  accepted: { label: "已錄取", color: "bg-green-500", icon: CheckCircle },
  rejected: { label: "未錄取", color: "bg-red-500", icon: AlertCircle },
  enrolled: { label: "已入學", color: "bg-primary", icon: CheckCircle },
};

export default function Dashboard() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">歡迎回來，{user.name || "用戶"}</h1>
          <p className="text-muted-foreground">管理您的升學規劃和申請進度</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">心儀學校</p>
                  <p className="text-2xl font-bold">{mockFavorites.length}</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">進行中申請</p>
                  <p className="text-2xl font-bold">{mockApplications.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">即將截止</p>
                  <p className="text-2xl font-bold">{mockFavorites.filter(f => f.daysLeft <= 30).length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">小朋友</p>
                  <p className="text-2xl font-bold">{mockChildren.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  即將截止申請
                </CardTitle>
                <Link href="/favorites">
                  <Button variant="ghost" size="sm">
                    查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFavorites.map((school) => (
                    <div key={school.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{school.schoolName}</p>
                        <p className="text-sm text-muted-foreground">
                          截止日期：{school.deadline}
                        </p>
                      </div>
                      <Badge className={
                        school.daysLeft <= 7 ? "bg-red-500" : 
                        school.daysLeft <= 14 ? "bg-orange-500" : "bg-green-500"
                      }>
                        {school.daysLeft} 天
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Progress */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  申請進度
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  新增申請
                </Button>
              </CardHeader>
              <CardContent>
                {mockApplications.length > 0 ? (
                  <div className="space-y-4">
                    {mockApplications.map((app) => {
                      const status = statusConfig[app.status];
                      return (
                        <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${status.color} flex items-center justify-center`}>
                              <status.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{app.schoolName}</p>
                              <p className="text-sm text-muted-foreground">
                                申請日期：{app.date}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">{status.label}</Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground mb-4">尚未有申請記錄</p>
                    <Button>開始追蹤申請</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Children */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">小朋友資料</CardTitle>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {mockChildren.length > 0 ? (
                  <div className="space-y-3">
                    {mockChildren.map((child) => (
                      <div key={child.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium">{child.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {child.age} 歲 · 目標：{child.targetLevel === "primary" ? "小學" : "幼稚園"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-3">添加小朋友資料以獲得個性化推薦</p>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      添加小朋友
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/schools">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    瀏覽學校
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    心儀學校
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  通知設定
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  申請日曆
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge>免費版</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  升級至專業版，解鎖完整入學資訊和個性化推薦
                </p>
                <Button className="w-full">升級專業版</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
