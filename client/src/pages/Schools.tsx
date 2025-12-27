import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Star, 
  Heart,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Building2,
  Globe,
  School
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// 香港 18 區
const districts = [
  "全部地區",
  "中西區", "灣仔區", "東區", "南區",
  "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區",
  "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"
];

const schoolTypes = [
  { id: "all", name: "全部類型", icon: null },
  { id: "kindergarten", name: "幼稚園", icon: BookOpen, color: "bg-pink-500" },
  { id: "primary", name: "小學", icon: GraduationCap, color: "bg-blue-500" },
  { id: "secondary", name: "中學", icon: Building2, color: "bg-purple-500" },
  { id: "international", name: "國際學校", icon: Globe, color: "bg-green-500" },
];

const categories = [
  { id: "all", name: "全部資助類別" },
  { id: "government", name: "官立" },
  { id: "aided", name: "資助" },
  { id: "dss", name: "直資" },
  { id: "private", name: "私立" },
  { id: "international", name: "國際" },
];

const genders = [
  { id: "all", name: "全部性別" },
  { id: "coed", name: "男女校" },
  { id: "boys", name: "男校" },
  { id: "girls", name: "女校" },
];

// 模擬學校數據
const mockSchools = [
  { id: 1, name: "聖保羅男女中學附屬小學", nameEn: "St. Paul's Co-educational College Primary School", type: "primary", district: "南區", category: "dss", gender: "coed", rating: 4.9, tuitionFeeMin: 63000, tuitionFeeMax: 63000, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
  { id: 2, name: "拔萃女小學", nameEn: "Diocesan Girls' Junior School", type: "primary", district: "油尖旺區", category: "private", gender: "girls", rating: 4.8, tuitionFeeMin: 70000, tuitionFeeMax: 70000, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  { id: 3, name: "喇沙小學", nameEn: "La Salle Primary School", type: "primary", district: "九龍城區", category: "aided", gender: "boys", rating: 4.8, tuitionFeeMin: 0, tuitionFeeMax: 0, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop" },
  { id: 4, name: "聖公會聖彼得小學", nameEn: "S.K.H. St. Peter's Primary School", type: "primary", district: "中西區", category: "aided", gender: "coed", rating: 4.7, tuitionFeeMin: 0, tuitionFeeMax: 0, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop" },
  { id: 5, name: "瑪利諾修院學校（小學部）", nameEn: "Maryknoll Convent School (Primary Section)", type: "primary", district: "九龍城區", category: "aided", gender: "girls", rating: 4.7, tuitionFeeMin: 0, tuitionFeeMax: 0, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop" },
  { id: 6, name: "德望學校（小學部）", nameEn: "Good Hope School (Primary Section)", type: "primary", district: "黃大仙區", category: "private", gender: "girls", rating: 4.6, tuitionFeeMin: 42000, tuitionFeeMax: 42000, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
  { id: 7, name: "英華小學", nameEn: "Ying Wa Primary School", type: "primary", district: "深水埗區", category: "dss", gender: "boys", rating: 4.6, tuitionFeeMin: 18000, tuitionFeeMax: 18000, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  { id: 8, name: "協恩中學附屬小學", nameEn: "Heep Yunn Primary School", type: "primary", district: "九龍城區", category: "aided", gender: "girls", rating: 4.5, tuitionFeeMin: 0, tuitionFeeMax: 0, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop" },
];

function SchoolCard({ school }: { school: typeof mockSchools[0] }) {
  const typeConfig = schoolTypes.find(t => t.id === school.type);
  const { user } = useAuth();
  
  return (
    <Link href={`/school/${school.id}`}>
      <Card className="school-card h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* 學校 Logo */}
            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border flex items-center justify-center overflow-hidden">
              {school.image ? (
                <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
              ) : (
                <School className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            
            {/* 學校資訊 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-base line-clamp-2">{school.name}</h3>
                {user && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // TODO: Add to favorites
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{school.nameEn}</p>
              
              <div className="flex items-center gap-2 mb-2">
                {typeConfig && (
                  <Badge className={`${typeConfig.color} text-white text-xs`}>
                    {typeConfig.name}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {categories.find(c => c.id === school.category)?.name}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {school.district}
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <Star className="h-3 w-3 fill-current" />
                  {school.rating}
                </span>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                {school.tuitionFeeMin === 0 ? "免費" : `$${school.tuitionFeeMin.toLocaleString()}/年`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Schools() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const [selectedType, setSelectedType] = useState(params.get("type") || "all");
  const [selectedDistrict, setSelectedDistrict] = useState(params.get("district") || "全部地區");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 12;

  // 構建 tRPC 查詢參數
  const queryFilters = useMemo(() => {
    const filters: any = {
      page: currentPage,
      limit: 1000, // 獲取更多學校以支持前端篩選
    };
    
    // 從 URL 參數讀取篩選條件
    if (selectedType && selectedType !== "all") {
      filters.type = selectedType as "kindergarten" | "primary" | "secondary" | "international";
    }
    if (selectedDistrict && selectedDistrict !== "全部地區") {
      filters.district = selectedDistrict;
    }
    if (selectedCategory && selectedCategory !== "all") {
      filters.category = selectedCategory as "government" | "aided" | "dss" | "private" | "international";
    }
    if (selectedGender && selectedGender !== "all") {
      filters.gender = selectedGender as "coed" | "boys" | "girls";
    }
    if (searchQuery) {
      filters.search = searchQuery;
    }
    
    return filters;
  }, [selectedType, selectedDistrict, selectedCategory, selectedGender, searchQuery, currentPage]);

  // 從數據庫讀取學校數據
  const { data: dbData, isLoading } = trpc.school.list.useQuery(queryFilters);

  // 將數據庫學校轉換為前端格式
  const schools = useMemo(() => {
    const dbSchools = dbData?.schools || [];
    return dbSchools.map((school: any) => ({
      id: school.id,
      name: school.name,
      nameEn: school.nameEn || school.name,
      type: school.type,
      district: school.district || "",
      category: school.category || "aided",
      gender: school.gender || "coed",
      rating: school.rating || 0,
      tuitionFeeMin: 0,
      tuitionFeeMax: 0,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    }));
  }, [dbData]);

  // 所有篩選已在 tRPC query 中完成，這裡直接使用結果
  const filteredSchools = schools;

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentTypeConfig = schoolTypes.find(t => t.id === selectedType);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/30 border-b">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-4">
            {currentTypeConfig?.icon && (
              <div className={`w-12 h-12 rounded-xl ${currentTypeConfig.color} flex items-center justify-center`}>
                <currentTypeConfig.icon className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {selectedType === "all" ? "全部學校" : currentTypeConfig?.name}
              </h1>
              <p className="text-muted-foreground">
                共 {filteredSchools.length} 間學校
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜尋學校名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="學校類型" />
            </SelectTrigger>
            <SelectContent>
              {schoolTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* District Filter */}
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="地區" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="資助類別" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Gender Filter */}
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="性別" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* School Grid */}
        {paginatedSchools.length > 0 ? (
          <>
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "flex flex-col gap-4"
            }>
              {paginatedSchools.map((school: any) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">找不到符合條件的學校</h3>
            <p className="text-muted-foreground">請嘗試調整篩選條件</p>
          </div>
        )}
      </div>
    </div>
  );
}
