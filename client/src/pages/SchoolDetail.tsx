import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Heart,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Building,
  Clock,
  ChevronLeft,
  Share2,
  BookOpen,
  GraduationCap,
  Building2,
  ExternalLink,
  Lock
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

// 模擬學校詳細數據
const mockSchoolDetail = {
  id: 1,
  name: "聖保羅男女中學附屬小學",
  nameEn: "St. Paul's Co-educational College Primary School",
  type: "primary",
  district: "南區",
  address: "香港薄扶林域多利道777號",
  phone: "2550 1115",
  fax: "2875 0173",
  email: "info@spccps.edu.hk",
  website: "https://www.spccps.edu.hk",
  category: "直資",
  gender: "男女校",
  religion: "基督教",
  language: "英文",
  curriculum: "本地課程",
  foundedYear: 1915,
  studentCount: 1200,
  teacherCount: 80,
  classCount: 30,
  rating: 4.9,
  band: "1",
  linkedSchool: "聖保羅男女中學",
  tuitionFee: 63000,
  buildingPhoto: "/school-photos/spcc-ps-building3.jpg",
  logo: "/school-logos/spcc-ps.jpg",
  description: "聖保羅男女中學附屬小學是香港一所著名的直資小學，以優質教育和全人發展著稱。學校提供中英文並重的教學環境，培養學生的學術能力和品德修養。",
  features: ["STEM教育", "音樂培訓", "體育發展", "語言培訓", "領袖訓練"],
  admissionInfo: {
    academicYear: "2025-26",
    applicationOpenDate: "2024-09-01",
    applicationDeadline: "2024-10-31",
    interviewDate: "2024-11-15",
    resultDate: "2024-12-15",
    intake: 150,
    applicants: 3000,
    requirements: [
      "年齡：2019年1月1日至12月31日出生",
      "遞交申請表及所需文件",
      "繳交報名費",
    ],
    documents: [
      "出生證明書副本",
      "最近證件相片兩張",
      "幼稚園成績表副本",
      "課外活動證書副本（如有）",
    ],
    interviewInfo: "面試將以小組形式進行，評估學生的語言能力、社交技巧和學習態度。",
  }
};

const schoolTypes: Record<string, { name: string; icon: any; color: string }> = {
  kindergarten: { name: "幼稚園", icon: BookOpen, color: "bg-pink-500" },
  primary: { name: "小學", icon: GraduationCap, color: "bg-blue-500" },
  secondary: { name: "中學", icon: Building2, color: "bg-purple-500" },
  international: { name: "國際學校", icon: Globe, color: "bg-green-500" },
};

export default function SchoolDetail() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const school = mockSchoolDetail;
  const typeConfig = schoolTypes[school.type];

  const handleFavorite = () => {
    if (!user) {
      toast.error("請先登入以收藏學校");
      return;
    }
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "已從心儀學校移除" : "已加入心儀學校");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("連結已複製到剪貼板");
  };

  // 計算申請截止倒數
  const deadline = new Date(school.admissionInfo.applicationDeadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        {school.buildingPhoto ? (
          <img 
            src={school.buildingPhoto} 
            alt={`${school.name}外牆`}
            className="w-full h-full object-cover"
          />
        ) : school.logo ? (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
            <img 
              src={school.logo} 
              alt={school.name}
              className="h-32 md:h-40 object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Building2 className="h-32 md:h-40 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link href="/schools">
            <Button variant="secondary" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              返回列表
            </Button>
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="icon"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant={isFavorite ? "default" : "secondary"}
            size="icon"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* School Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <div className="flex items-start gap-4">
              <Badge className={`${typeConfig.color} text-white`}>
                {typeConfig.name}
              </Badge>
              <Badge variant="outline" className="border-white/50 text-white">
                {school.category}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-3">{school.name}</h1>
            <p className="text-white/80 mt-1">{school.nameEn}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {school.district}
              </span>
              <span className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                {school.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">學校概覽</TabsTrigger>
                <TabsTrigger value="admission">入學資訊</TabsTrigger>
                <TabsTrigger value="curriculum">課程特色</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>學校簡介</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{school.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {school.features.map((feature) => (
                        <Badge key={feature} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>基本資料</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">創校年份</p>
                        <p className="font-medium">{school.foundedYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">學生人數</p>
                        <p className="font-medium">{school.studentCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">教師人數</p>
                        <p className="font-medium">{school.teacherCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">班級數目</p>
                        <p className="font-medium">{school.classCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">教學語言</p>
                        <p className="font-medium">{school.language}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">宗教</p>
                        <p className="font-medium">{school.religion}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">性別</p>
                        <p className="font-medium">{school.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Banding</p>
                        <p className="font-medium">Band {school.band}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">聯繫中學</p>
                        <p className="font-medium">{school.linkedSchool}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admission" className="mt-6 space-y-6">
                {/* Admission Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {school.admissionInfo.academicYear} 入學時間表
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">申請開始</p>
                          <p className="text-sm text-muted-foreground">{school.admissionInfo.applicationOpenDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div>
                          <p className="font-medium">申請截止</p>
                          <p className="text-sm text-muted-foreground">{school.admissionInfo.applicationDeadline}</p>
                        </div>
                        <Badge className={daysLeft <= 7 ? "bg-red-500" : daysLeft <= 30 ? "bg-orange-500" : "bg-green-500"}>
                          <Clock className="h-3 w-3 mr-1" />
                          {daysLeft > 0 ? `${daysLeft} 天` : "已截止"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">面試日期</p>
                          <p className="text-sm text-muted-foreground">{school.admissionInfo.interviewDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">放榜日期</p>
                          <p className="text-sm text-muted-foreground">{school.admissionInfo.resultDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements - Premium Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>申請要求</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user ? (
                      <ul className="space-y-2">
                        {school.admissionInfo.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0">
                              {i + 1}
                            </span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8 bg-muted/50 rounded-lg">
                        <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                        <p className="font-medium mb-2">登入查看詳細申請要求</p>
                        <p className="text-sm text-muted-foreground mb-4">免費註冊即可查看完整入學資訊</p>
                        <Button>立即登入</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>所需文件</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user ? (
                      <ul className="space-y-2">
                        {school.admissionInfo.documents.map((doc, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6 bg-muted/50 rounded-lg">
                        <Lock className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">登入查看所需文件清單</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>課程特色</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      學校提供全面的課程，涵蓋學術、藝術、體育和品德教育。特色課程包括：
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {school.features.map((feature) => (
                        <div key={feature} className="p-4 bg-muted rounded-lg">
                          <p className="font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>學費</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  ${school.tuitionFee.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground">/年</span>
                </p>
              </CardContent>
            </Card>

            {/* Competition Ratio */}
            <Card>
              <CardHeader>
                <CardTitle>競爭比率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">招生人數</span>
                  <span className="font-medium">{school.admissionInfo.intake}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">申請人數</span>
                  <span className="font-medium">{school.admissionInfo.applicants}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-muted-foreground">競爭比率</span>
                  <span className="font-bold text-primary">
                    1:{Math.round(school.admissionInfo.applicants / school.admissionInfo.intake)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>聯絡資料</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{school.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{school.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{school.email}</p>
                </div>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={school.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    學校網站
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">追蹤此學校申請</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  將此學校加入申請追蹤，獲取截止日期提醒
                </p>
                <Button className="w-full" onClick={handleFavorite}>
                  <Heart className="h-4 w-4 mr-2" />
                  {isFavorite ? "已加入心儀學校" : "加入心儀學校"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
