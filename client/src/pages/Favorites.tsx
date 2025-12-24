import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart,
  Clock,
  MapPin,
  Star,
  Trash2,
  ChevronRight,
  ArrowUpDown,
  Calendar
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";
import { toast } from "sonner";

// 模擬收藏數據
const mockFavorites = [
  { 
    id: 1, 
    schoolId: 1,
    schoolName: "聖保羅男女中學附屬小學", 
    type: "primary", 
    district: "南區",
    rating: 4.9,
    deadline: "2025-01-15", 
    daysLeft: 22,
    tuitionFee: 63000,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    priority: 1,
    notes: "首選學校"
  },
  { 
    id: 2, 
    schoolId: 2,
    schoolName: "拔萃女小學", 
    type: "primary", 
    district: "油尖旺區",
    rating: 4.8,
    deadline: "2025-01-20", 
    daysLeft: 27,
    tuitionFee: 70000,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    priority: 2,
    notes: ""
  },
  { 
    id: 3, 
    schoolId: 3,
    schoolName: "喇沙小學", 
    type: "primary", 
    district: "九龍城區",
    rating: 4.8,
    deadline: "2025-02-01", 
    daysLeft: 39,
    tuitionFee: 0,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    priority: 3,
    notes: "備選"
  },
];

const typeColors: Record<string, string> = {
  kindergarten: "bg-pink-500",
  primary: "bg-blue-500",
  secondary: "bg-purple-500",
  international: "bg-green-500",
};

const typeNames: Record<string, string> = {
  kindergarten: "幼稚園",
  primary: "小學",
  secondary: "中學",
  international: "國際學校",
};

export default function Favorites() {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState(mockFavorites);
  const [sortBy, setSortBy] = useState<"priority" | "deadline">("priority");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [user, loading]);

  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id));
    toast.success("已從心儀學校移除");
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority - b.priority;
    } else {
      return a.daysLeft - b.daysLeft;
    }
  });

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              心儀學校
            </h1>
            <p className="text-muted-foreground">
              共 {favorites.length} 間心儀學校
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={sortBy === "priority" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("priority")}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              按優先順序
            </Button>
            <Button 
              variant={sortBy === "deadline" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("deadline")}
            >
              <Clock className="h-4 w-4 mr-2" />
              按截止日期
            </Button>
          </div>
        </div>

        {/* Favorites List */}
        {sortedFavorites.length > 0 ? (
          <div className="space-y-4">
            {sortedFavorites.map((favorite, index) => (
              <Card key={favorite.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                    <img 
                      src={favorite.image} 
                      alt={favorite.schoolName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${typeColors[favorite.type]} text-white`}>
                        {typeNames[favorite.type]}
                      </Badge>
                    </div>
                    {sortBy === "priority" && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/school/${favorite.schoolId}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {favorite.schoolName}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {favorite.district}
                          </span>
                          <span className="flex items-center gap-1 text-primary">
                            <Star className="h-4 w-4 fill-current" />
                            {favorite.rating}
                          </span>
                          <span>
                            {favorite.tuitionFee === 0 ? "免費" : `$${favorite.tuitionFee.toLocaleString()}/年`}
                          </span>
                        </div>
                        {favorite.notes && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            備註：{favorite.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        {/* Deadline Badge */}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            截止：{favorite.deadline}
                          </span>
                          <Badge className={
                            favorite.daysLeft <= 7 ? "bg-red-500" : 
                            favorite.daysLeft <= 14 ? "bg-orange-500" : "bg-green-500"
                          }>
                            {favorite.daysLeft} 天
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemove(favorite.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            移除
                          </Button>
                          <Link href={`/school/${favorite.schoolId}`}>
                            <Button size="sm">
                              查看詳情
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">尚未收藏任何學校</h3>
              <p className="text-muted-foreground mb-6">
                瀏覽學校並點擊愛心圖標將學校加入心儀清單
              </p>
              <Link href="/schools">
                <Button>
                  瀏覽學校
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
