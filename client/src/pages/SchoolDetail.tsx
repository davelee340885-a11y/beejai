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
  Users,
  Building,
  ChevronLeft,
  Share2,
  BookOpen,
  GraduationCap,
  Building2,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

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
  
  const schoolId = params.id ? parseInt(params.id) : 1;
  const { data: schoolData, isLoading } = trpc.school.getById.useQuery({ id: schoolId });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!schoolData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">找不到學校</h2>
          <p className="text-muted-foreground mb-4">該學校不存在或已被移除</p>
          <Link href="/schools">
            <Button>返回列表</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const typeConfig = schoolTypes[schoolData.type];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar - 簡潔的標題欄設計 */}
      <div className="bg-muted/30 border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/schools">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                返回列表
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={isFavorite ? "default" : "ghost"} 
                size="sm"
                onClick={handleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            {/* School Logo */}
            {schoolData.imageUrl ? (
              <div className="w-16 h-16 rounded-lg bg-white border flex items-center justify-center flex-shrink-0">
                <img 
                  src={schoolData.imageUrl} 
                  alt={schoolData.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

            {/* School Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={typeConfig.color}>{typeConfig.name}</Badge>
                <Badge variant="outline">{schoolData.category}</Badge>
              </div>
              <h1 className="text-2xl font-bold mb-1">{schoolData.name}</h1>
              <p className="text-muted-foreground text-sm mb-2">{schoolData.nameEn}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{schoolData.district}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{schoolData.rating || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">學校概覽</TabsTrigger>
            <TabsTrigger value="admission">入學資訊</TabsTrigger>
            <TabsTrigger value="curriculum">課程特色</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* School Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>學校簡介</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {schoolData.description || "學校簡介暫未提供"}
                    </p>
                  </CardContent>
                </Card>

                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>基本資料</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {schoolData.foundedYear && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">創校年份</p>
                          <p className="font-medium">{schoolData.foundedYear}</p>
                        </div>
                      )}
                      {schoolData.studentCount && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">學生人數</p>
                          <p className="font-medium">{schoolData.studentCount}</p>
                        </div>
                      )}
                      {schoolData.teacherCount && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">教師人數</p>
                          <p className="font-medium">{schoolData.teacherCount}</p>
                        </div>
                      )}
                      {schoolData.classCount && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">班級數目</p>
                          <p className="font-medium">{schoolData.classCount}</p>
                        </div>
                      )}
                      {schoolData.language && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">教學語言</p>
                          <p className="font-medium">{schoolData.language}</p>
                        </div>
                      )}
                      {schoolData.religion && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">宗教</p>
                          <p className="font-medium">{schoolData.religion}</p>
                        </div>
                      )}
                      {schoolData.gender && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">性別</p>
                          <p className="font-medium">{schoolData.gender}</p>
                        </div>
                      )}
                      {schoolData.band && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Banding</p>
                          <p className="font-medium">Band {schoolData.band}</p>
                        </div>
                      )}
                      {schoolData.linkedSchool && (
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">聯繫中學</p>
                          <p className="font-medium">{schoolData.linkedSchool}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Info */}
              <div className="space-y-6">
                {/* Tuition Fee */}
                {(schoolData.tuitionFeeMin || schoolData.tuitionFeeMax) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>學費</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        {schoolData.tuitionFeeMin && schoolData.tuitionFeeMax ? (
                          schoolData.tuitionFeeMin === schoolData.tuitionFeeMax ? (
                            `$${schoolData.tuitionFeeMin.toLocaleString()}`
                          ) : (
                            `$${schoolData.tuitionFeeMin.toLocaleString()} - $${schoolData.tuitionFeeMax.toLocaleString()}`
                          )
                        ) : schoolData.tuitionFeeMin ? (
                          `$${schoolData.tuitionFeeMin.toLocaleString()}`
                        ) : schoolData.tuitionFeeMax ? (
                          `$${schoolData.tuitionFeeMax.toLocaleString()}`
                        ) : (
                          "免費"
                        )}
                        <span className="text-base font-normal text-muted-foreground">/年</span>
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>聯絡資料</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {schoolData.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{schoolData.address}</p>
                      </div>
                    )}
                    {schoolData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{schoolData.phone}</p>
                      </div>
                    )}
                    {schoolData.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{schoolData.email}</p>
                      </div>
                    )}
                    {schoolData.website && (
                      <Button variant="outline" className="w-full gap-2" asChild>
                        <a href={schoolData.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          學校網站
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admission" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>入學資訊</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  入學資訊暫未提供，請直接聯絡學校查詢
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>課程特色</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  課程特色資訊暫未提供，請直接聯絡學校查詢
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
