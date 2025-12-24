import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search as SearchIcon, 
  MapPin, 
  Star, 
  Heart,
  Filter,
  X,
  SlidersHorizontal
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

// 香港 18 區
const districts = [
  "中西區", "灣仔區", "東區", "南區",
  "油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區",
  "葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"
];

const schoolTypes = [
  { id: "kindergarten", name: "幼稚園" },
  { id: "primary", name: "小學" },
  { id: "secondary", name: "中學" },
  { id: "international", name: "國際學校" },
];

const categories = [
  { id: "government", name: "官立" },
  { id: "aided", name: "資助" },
  { id: "dss", name: "直資" },
  { id: "private", name: "私立" },
  { id: "international", name: "國際" },
];

const genders = [
  { id: "coed", name: "男女校" },
  { id: "boys", name: "男校" },
  { id: "girls", name: "女校" },
];

const religions = [
  { id: "none", name: "無宗教" },
  { id: "christian", name: "基督教" },
  { id: "catholic", name: "天主教" },
  { id: "buddhist", name: "佛教" },
  { id: "other", name: "其他" },
];

const languages = [
  { id: "chinese", name: "中文" },
  { id: "english", name: "英文" },
  { id: "bilingual", name: "雙語" },
];

// 模擬學校數據
const mockSchools = [
  { id: 1, name: "聖保羅男女中學附屬小學", type: "primary", district: "南區", category: "dss", gender: "coed", religion: "christian", language: "english", rating: 4.9, tuitionFee: 63000, image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop" },
  { id: 2, name: "拔萃女小學", type: "primary", district: "油尖旺區", category: "private", gender: "girls", religion: "christian", language: "english", rating: 4.8, tuitionFee: 70000, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  { id: 3, name: "喇沙小學", type: "primary", district: "九龍城區", category: "aided", gender: "boys", religion: "catholic", language: "english", rating: 4.8, tuitionFee: 0, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop" },
  { id: 4, name: "聖公會聖彼得小學", type: "primary", district: "中西區", category: "aided", gender: "coed", religion: "christian", language: "chinese", rating: 4.7, tuitionFee: 0, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop" },
  { id: 5, name: "瑪利諾修院學校（小學部）", type: "primary", district: "九龍城區", category: "aided", gender: "girls", religion: "catholic", language: "english", rating: 4.7, tuitionFee: 0, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop" },
];

const typeColors: Record<string, string> = {
  kindergarten: "bg-pink-500",
  primary: "bg-blue-500",
  secondary: "bg-purple-500",
  international: "bg-green-500",
};

export default function Search() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [tuitionRange, setTuitionRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilter = (array: string[], setArray: (arr: string[]) => void, value: string) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedDistricts([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedReligions([]);
    setSelectedLanguages([]);
    setTuitionRange([0, 100000]);
    setSearchQuery("");
  };

  const activeFilterCount = 
    selectedTypes.length + 
    selectedDistricts.length + 
    selectedCategories.length + 
    selectedGenders.length + 
    selectedReligions.length + 
    selectedLanguages.length +
    (tuitionRange[0] > 0 || tuitionRange[1] < 100000 ? 1 : 0);

  // 篩選學校
  const filteredSchools = useMemo(() => {
    return mockSchools.filter(school => {
      if (searchQuery && !school.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(school.type)) return false;
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(school.district)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(school.category)) return false;
      if (selectedGenders.length > 0 && !selectedGenders.includes(school.gender)) return false;
      if (selectedReligions.length > 0 && !selectedReligions.includes(school.religion)) return false;
      if (selectedLanguages.length > 0 && !selectedLanguages.includes(school.language)) return false;
      if (school.tuitionFee < tuitionRange[0] || school.tuitionFee > tuitionRange[1]) return false;
      return true;
    });
  }, [searchQuery, selectedTypes, selectedDistricts, selectedCategories, selectedGenders, selectedReligions, selectedLanguages, tuitionRange]);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-muted/30 border-b py-8">
        <div className="container">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
            進階搜尋
          </h1>
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="搜尋學校名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 text-base"
            />
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`w-72 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  篩選條件
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary">{activeFilterCount}</Badge>
                  )}
                </h2>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    清除全部
                  </Button>
                )}
              </div>

              <Accordion type="multiple" defaultValue={["type", "district"]} className="space-y-2">
                {/* School Type */}
                <AccordionItem value="type" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">學校類型</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {schoolTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`type-${type.id}`}
                            checked={selectedTypes.includes(type.id)}
                            onCheckedChange={() => toggleFilter(selectedTypes, setSelectedTypes, type.id)}
                          />
                          <Label htmlFor={`type-${type.id}`} className="cursor-pointer">{type.name}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* District */}
                <AccordionItem value="district" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">地區</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {districts.map((district) => (
                        <div key={district} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`district-${district}`}
                            checked={selectedDistricts.includes(district)}
                            onCheckedChange={() => toggleFilter(selectedDistricts, setSelectedDistricts, district)}
                          />
                          <Label htmlFor={`district-${district}`} className="cursor-pointer text-sm">{district}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Category */}
                <AccordionItem value="category" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">資助類別</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`cat-${cat.id}`}
                            checked={selectedCategories.includes(cat.id)}
                            onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat.id)}
                          />
                          <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer">{cat.name}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Gender */}
                <AccordionItem value="gender" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">性別</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {genders.map((g) => (
                        <div key={g.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`gender-${g.id}`}
                            checked={selectedGenders.includes(g.id)}
                            onCheckedChange={() => toggleFilter(selectedGenders, setSelectedGenders, g.id)}
                          />
                          <Label htmlFor={`gender-${g.id}`} className="cursor-pointer">{g.name}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Religion */}
                <AccordionItem value="religion" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">宗教</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {religions.map((r) => (
                        <div key={r.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`religion-${r.id}`}
                            checked={selectedReligions.includes(r.id)}
                            onCheckedChange={() => toggleFilter(selectedReligions, setSelectedReligions, r.id)}
                          />
                          <Label htmlFor={`religion-${r.id}`} className="cursor-pointer">{r.name}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Language */}
                <AccordionItem value="language" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">教學語言</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {languages.map((l) => (
                        <div key={l.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`lang-${l.id}`}
                            checked={selectedLanguages.includes(l.id)}
                            onCheckedChange={() => toggleFilter(selectedLanguages, setSelectedLanguages, l.id)}
                          />
                          <Label htmlFor={`lang-${l.id}`} className="cursor-pointer">{l.name}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Tuition Fee */}
                <AccordionItem value="tuition" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">學費範圍</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        value={tuitionRange}
                        onValueChange={setTuitionRange}
                        max={100000}
                        step={5000}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${tuitionRange[0].toLocaleString()}</span>
                        <span>${tuitionRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                找到 {filteredSchools.length} 間學校
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                篩選
              </Button>
            </div>

            {filteredSchools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSchools.map((school) => (
                  <Link key={school.id} href={`/school/${school.id}`}>
                    <Card className="school-card h-full">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={school.image} 
                          alt={school.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2">
                          <Badge className={`${typeColors[school.type]} text-white`}>
                            {schoolTypes.find(t => t.id === school.type)?.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-base mb-2 line-clamp-2">{school.name}</h3>
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
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">找不到符合條件的學校</h3>
                <p className="text-muted-foreground mb-4">請嘗試調整篩選條件</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  清除所有篩選
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
