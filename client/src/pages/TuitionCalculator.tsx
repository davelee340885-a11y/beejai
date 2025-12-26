import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  ArrowLeft, 
  GraduationCap,
  DollarSign,
  TrendingUp,
  Info,
  BookOpen,
  Building2,
  Globe
} from "lucide-react";

// 學費數據（示範用）
const tuitionData = {
  kindergarten: {
    government: { min: 0, max: 0, avg: 0, label: "免費幼稚園" },
    aided: { min: 0, max: 15000, avg: 5000, label: "資助幼稚園" },
    private: { min: 20000, max: 80000, avg: 45000, label: "私立幼稚園" },
    international: { min: 80000, max: 200000, avg: 130000, label: "國際幼稚園" },
  },
  primary: {
    government: { min: 0, max: 0, avg: 0, label: "官立小學" },
    aided: { min: 0, max: 0, avg: 0, label: "資助小學" },
    dss: { min: 15000, max: 80000, avg: 40000, label: "直資小學" },
    private: { min: 50000, max: 150000, avg: 80000, label: "私立小學" },
    international: { min: 100000, max: 250000, avg: 170000, label: "國際小學" },
  },
  secondary: {
    government: { min: 0, max: 0, avg: 0, label: "官立中學" },
    aided: { min: 0, max: 0, avg: 0, label: "資助中學" },
    dss: { min: 20000, max: 100000, avg: 50000, label: "直資中學" },
    private: { min: 60000, max: 180000, avg: 100000, label: "私立中學" },
    international: { min: 150000, max: 300000, avg: 220000, label: "國際中學" },
  },
};

// 額外費用估算
const extraCosts = {
  uniform: { min: 1000, max: 5000, label: "校服費" },
  books: { min: 2000, max: 8000, label: "書簿費" },
  transport: { min: 3000, max: 15000, label: "交通費（年）" },
  lunch: { min: 5000, max: 12000, label: "午餐費（年）" },
  activities: { min: 2000, max: 20000, label: "課外活動" },
  tutoring: { min: 0, max: 100000, label: "補習費" },
};

export default function TuitionCalculator() {
  const [schoolLevel, setSchoolLevel] = useState<string>("");
  const [schoolType, setSchoolType] = useState<string>("");
  const [years, setYears] = useState<number>(1);
  const [includeExtras, setIncludeExtras] = useState(true);
  const [extraLevel, setExtraLevel] = useState<number>(50); // 0-100 百分比

  // 計算學費
  const calculateTuition = () => {
    if (!schoolLevel || !schoolType) return null;

    const levelData = tuitionData[schoolLevel as keyof typeof tuitionData];
    if (!levelData) return null;

    const typeData = levelData[schoolType as keyof typeof levelData];
    if (!typeData) return null;

    const annualTuition = typeData.avg;
    const totalTuition = annualTuition * years;

    // 計算額外費用
    let annualExtras = 0;
    if (includeExtras) {
      Object.values(extraCosts).forEach((cost) => {
        const extraAmount = cost.min + ((cost.max - cost.min) * extraLevel) / 100;
        annualExtras += extraAmount;
      });
    }

    const totalExtras = annualExtras * years;
    const grandTotal = totalTuition + totalExtras;

    return {
      annualTuition,
      totalTuition,
      annualExtras,
      totalExtras,
      grandTotal,
      typeLabel: typeData.label,
      minTuition: typeData.min,
      maxTuition: typeData.max,
    };
  };

  const result = calculateTuition();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-HK", {
      style: "currency",
      currency: "HKD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSchoolTypeOptions = () => {
    if (!schoolLevel) return [];
    const levelData = tuitionData[schoolLevel as keyof typeof tuitionData];
    return Object.entries(levelData).map(([key, value]) => ({
      value: key,
      label: value.label,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 py-12">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-black hover:bg-black/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首頁
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center">
              <Calculator className="h-8 w-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">學費計算機</h1>
              <p className="text-black/70">估算子女由幼稚園到中學的教育開支</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 輸入區域 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-amber-500" />
                  選擇學校類型
                </CardTitle>
                <CardDescription>
                  選擇學校級別和類型以計算預估學費
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>學校級別</Label>
                  <Select value={schoolLevel} onValueChange={(v) => { setSchoolLevel(v); setSchoolType(""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇學校級別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kindergarten">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-pink-500" />
                          幼稚園 (K1-K3)
                        </div>
                      </SelectItem>
                      <SelectItem value="primary">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                          小學 (P1-P6)
                        </div>
                      </SelectItem>
                      <SelectItem value="secondary">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-purple-500" />
                          中學 (S1-S6)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>學校類型</Label>
                  <Select value={schoolType} onValueChange={setSchoolType} disabled={!schoolLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇學校類型" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSchoolTypeOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>就讀年數：{years} 年</Label>
                  <Slider
                    value={[years]}
                    onValueChange={(v) => setYears(v[0])}
                    min={1}
                    max={schoolLevel === "kindergarten" ? 3 : schoolLevel === "primary" ? 6 : 6}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 年</span>
                    <span>{schoolLevel === "kindergarten" ? "3" : "6"} 年</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  額外開支
                </CardTitle>
                <CardDescription>
                  包括校服、書簿、交通、午餐、課外活動、補習等
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>包括額外開支</Label>
                  <Button
                    variant={includeExtras ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIncludeExtras(!includeExtras)}
                    className={includeExtras ? "bg-amber-500 hover:bg-amber-600" : ""}
                  >
                    {includeExtras ? "已包括" : "不包括"}
                  </Button>
                </div>

                {includeExtras && (
                  <div className="space-y-2">
                    <Label>開支水平：{extraLevel < 33 ? "基本" : extraLevel < 66 ? "中等" : "豐富"}</Label>
                    <Slider
                      value={[extraLevel]}
                      onValueChange={(v) => setExtraLevel(v[0])}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>基本</span>
                      <span>中等</span>
                      <span>豐富</span>
                    </div>
                  </div>
                )}

                {includeExtras && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {Object.entries(extraCosts).map(([key, cost]) => {
                      const amount = cost.min + ((cost.max - cost.min) * extraLevel) / 100;
                      return (
                        <div key={key} className="flex justify-between text-sm p-2 bg-amber-50 rounded">
                          <span className="text-muted-foreground">{cost.label}</span>
                          <span className="font-medium">{formatCurrency(amount)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 結果區域 */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card className="border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <TrendingUp className="h-6 w-6 text-amber-500" />
                      預估總開支
                    </CardTitle>
                    <CardDescription>
                      {result.typeLabel} · {years} 年
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold text-amber-600 mb-6">
                      {formatCurrency(result.grandTotal)}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                        <div>
                          <p className="text-sm text-muted-foreground">學費總計</p>
                          <p className="text-xl font-semibold">{formatCurrency(result.totalTuition)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">每年</p>
                          <p className="font-medium">{formatCurrency(result.annualTuition)}</p>
                        </div>
                      </div>

                      {includeExtras && (
                        <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                          <div>
                            <p className="text-sm text-muted-foreground">額外開支總計</p>
                            <p className="text-xl font-semibold">{formatCurrency(result.totalExtras)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">每年</p>
                            <p className="font-medium">{formatCurrency(result.annualExtras)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium mb-1">學費範圍參考</p>
                          <p>
                            {result.typeLabel}年費通常介乎 {formatCurrency(result.minTuition)} 至 {formatCurrency(result.maxTuition)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 長期規劃 */}
                <Card>
                  <CardHeader>
                    <CardTitle>教育開支長期規劃</CardTitle>
                    <CardDescription>
                      由幼稚園到中學畢業的預估總開支
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { level: "幼稚園 (3年)", icon: BookOpen, color: "text-pink-500", years: 3, type: schoolType === "international" ? "international" : "private" },
                        { level: "小學 (6年)", icon: GraduationCap, color: "text-blue-500", years: 6, type: schoolType === "international" ? "international" : "dss" },
                        { level: "中學 (6年)", icon: Building2, color: "text-purple-500", years: 6, type: schoolType === "international" ? "international" : "dss" },
                      ].map((item) => {
                        const levelKey = item.level.includes("幼稚園") ? "kindergarten" : item.level.includes("小學") ? "primary" : "secondary";
                        const levelData = tuitionData[levelKey];
                        const typeData = levelData[item.type as keyof typeof levelData] || levelData[Object.keys(levelData)[0] as keyof typeof levelData];
                        const total = typeData.avg * item.years;
                        
                        return (
                          <div key={item.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <item.icon className={`h-5 w-5 ${item.color}`} />
                              <span className="font-medium">{item.level}</span>
                            </div>
                            <span className="font-semibold">{formatCurrency(total)}</span>
                          </div>
                        );
                      })}
                      <div className="flex items-center justify-between p-4 bg-amber-500 text-black rounded-lg mt-4">
                        <span className="font-bold">15 年教育總開支</span>
                        <span className="text-xl font-bold">
                          {formatCurrency(
                            (() => {
                              const kgType = schoolType === "international" ? "international" : "private";
                              const schoolTypeKey = schoolType === "international" ? "international" : "dss";
                              const kg = (tuitionData.kindergarten[kgType as keyof typeof tuitionData.kindergarten]?.avg || 0) * 3;
                              const pri = (tuitionData.primary[schoolTypeKey as keyof typeof tuitionData.primary]?.avg || 0) * 6;
                              const sec = (tuitionData.secondary[schoolTypeKey as keyof typeof tuitionData.secondary]?.avg || 0) * 6;
                              return kg + pri + sec;
                            })()
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <Calculator className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">開始計算</h3>
                  <p className="text-muted-foreground">
                    選擇學校級別和類型以查看預估學費
                  </p>
                </CardContent>
              </Card>
            )}

            {/* 提示 */}
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">免責聲明</p>
                    <p>
                      以上數據僅供參考，實際學費因學校而異。建議直接向心儀學校查詢最新學費資料。
                      部分學校提供學費減免或獎學金計劃。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
