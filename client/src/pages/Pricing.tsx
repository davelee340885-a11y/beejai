import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Crown, Zap, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

// 定價方案數據
const plans = [
  {
    id: "little-bee",
    name: "小蜜蜂",
    nameEn: "Little Bee",
    description: "免費體驗平台核心功能",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: "/little-bee-symbol.png",
    color: "amber",
    popular: false,
    features: [
      { name: "學校列表瀏覽", included: true },
      { name: "學校詳情查看", included: true, limit: "每月10間" },
      { name: "資訊搜尋功能", included: true, limit: "每月30次" },
      { name: "基本篩選功能", included: true },
      { name: "熱門學校排名", included: true },
      { name: "心儀學校收藏", included: true, limit: "最多5間" },
      { name: "申請追蹤", included: true, limit: "最多3間" },
      { name: "小朋友檔案", included: true, limit: "最多1位" },
      { name: "升學攻略完整內容", included: false },
      { name: "攻略 PDF 下載", included: false },
      { name: "截止日期提醒", included: false },
      { name: "每週升學資訊摘要", included: false },
      { name: "升級服務優惠", included: false },
    ],
  },
  {
    id: "golden-bee",
    name: "黃蜂",
    nameEn: "Golden Bee",
    description: "解鎖大部分實用功能",
    monthlyPrice: 99,
    yearlyPrice: 799,
    icon: "/golden-bee-symbol.png",
    color: "yellow",
    popular: true,
    features: [
      { name: "學校列表瀏覽", included: true },
      { name: "學校詳情查看", included: true, limit: "無限" },
      { name: "資訊搜尋功能", included: true, limit: "無限" },
      { name: "全部12項篩選條件", included: true },
      { name: "熱門學校排名", included: true },
      { name: "心儀學校收藏", included: true, limit: "最多30間" },
      { name: "申請追蹤", included: true, limit: "無限" },
      { name: "小朋友檔案", included: true, limit: "最多3位" },
      { name: "升學攻略完整內容", included: true },
      { name: "攻略 PDF 下載", included: true },
      { name: "截止日期提醒", included: true },
      { name: "每週升學資訊摘要", included: true },
      { name: "升級服務優惠", included: true, limit: "9折" },
    ],
  },
  {
    id: "queen-bee",
    name: "蜂后",
    nameEn: "Queen Bee",
    description: "頂級 VIP 專屬體驗",
    monthlyPrice: 299,
    yearlyPrice: 2399,
    icon: "/queen-bee-symbol.png",
    color: "purple",
    popular: false,
    features: [
      { name: "學校列表瀏覽", included: true },
      { name: "學校詳情查看", included: true, limit: "無限" },
      { name: "資訊搜尋功能", included: true, limit: "無限" },
      { name: "全部12項篩選條件", included: true },
      { name: "熱門學校排名", included: true },
      { name: "心儀學校收藏", included: true, limit: "無限" },
      { name: "申請追蹤", included: true, limit: "無限" },
      { name: "小朋友檔案", included: true, limit: "無限" },
      { name: "升學攻略完整內容", included: true },
      { name: "攻略 PDF 下載", included: true },
      { name: "截止日期提醒", included: true },
      { name: "每週升學資訊摘要", included: true },
      { name: "升級服務優惠", included: true, limit: "8折" },
    ],
  },
];

// FAQ 數據
const faqs = [
  {
    question: "我可以隨時取消訂閱嗎？",
    answer: "是的，您可以隨時取消訂閱。取消後，您的會員權益將持續到當前計費週期結束。",
  },
  {
    question: "年付方案可以退款嗎？",
    answer: "為了確保服務品質和持續改進，我們的訂閱服務一經購買後不提供退款。請在購買前仔細考慮您的需求。如有任何疑問，歡迎聯繫我們的客戶服務團隊。",
  },
  {
    question: "升級或降級方案如何計算費用？",
    answer: "升級時，我們會按比例計算剩餘時間的差價。降級則在下一個計費週期生效。",
  },
  {
    question: "免費方案有使用期限嗎？",
    answer: "沒有，小蜜蜂免費方案永久有效，您可以一直使用基礎功能。",
  },
  {
    question: "付款方式有哪些？",
    answer: "我們支援信用卡、Apple Pay、Google Pay 和 PayMe 等多種付款方式。",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const { user, loading } = useAuth();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      toast.error("請先登入帳戶");
      return;
    }
    
    if (planId === "little-bee") {
      toast.info("您已是小蜜蜂會員，免費方案無需訂閱。");
      return;
    }
    
    toast.info("付費訂閱功能即將推出，敬請期待！");
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    const yearlyCost = monthly * 12;
    return Math.round(((yearlyCost - yearly) / yearlyCost) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
            🐝 會員方案
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            選擇適合您的升學夥伴
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            從免費體驗到專屬 VIP 服務，BeeJAI 陪伴您的升學之路
          </p>
          
          {/* 年付/月付切換 */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
              月付
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-amber-500"
            />
            <span className={`text-sm font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
              年付
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                節省高達 33%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.popular
                    ? "border-2 border-amber-500 shadow-xl scale-105 z-10"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      最受歡迎
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-2">
                    <img src={plan.icon} alt={plan.name} className="w-20 h-20 object-contain" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {plan.nameEn}
                  </CardDescription>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-1">
                  {/* 價格 */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg text-gray-500">HK$</span>
                      <span className="text-5xl font-bold text-gray-900">
                        {isYearly
                          ? plan.yearlyPrice === 0
                            ? "0"
                            : Math.round(plan.yearlyPrice / 12)
                          : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500">/月</span>
                    </div>
                    {isYearly && plan.yearlyPrice > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-500">
                          年付 HK${plan.yearlyPrice}
                        </p>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          節省 {calculateSavings(plan.monthlyPrice, plan.yearlyPrice)}%
                          （省 HK${plan.monthlyPrice * 12 - plan.yearlyPrice}）
                        </Badge>
                      </div>
                    )}
                    {plan.monthlyPrice === 0 && (
                      <p className="text-sm text-gray-500 mt-2">永久免費</p>
                    )}
                  </div>
                  
                  {/* 功能列表 */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                          {feature.name}
                          {feature.limit && (
                            <span className="text-amber-600 font-medium ml-1">
                              ({feature.limit})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : plan.id === "queen-bee"
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                    size="lg"
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.monthlyPrice === 0 ? (
                      <>免費開始</>
                    ) : (
                      <>
                        立即訂閱
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 功能對比表格 */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">功能詳細對比</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">功能</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    <div className="flex flex-col items-center">
                      <img src="/little-bee-symbol.png" alt="小蜜蜂" className="w-12 h-12 object-contain mb-1" />
                      <span>小蜜蜂</span>
                      <span className="text-sm font-normal text-gray-500">免費</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-amber-600 bg-amber-50">
                    <div className="flex flex-col items-center">
                      <img src="/golden-bee-symbol.png" alt="黃蜂" className="w-12 h-12 object-contain mb-1" />
                      <span>黃蜂</span>
                      <span className="text-sm font-normal text-gray-500">HK$99/月</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-600">
                    <div className="flex flex-col items-center">
                      <img src="/queen-bee-symbol.png" alt="蜂后" className="w-12 h-12 object-contain mb-1" />
                      <span>蜂后</span>
                      <span className="text-sm font-normal text-gray-500">HK$299/月</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900" colSpan={4}>
                    <Zap className="w-4 h-4 inline mr-2 text-amber-500" />
                    學校資料庫
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">學校詳情查看</td>
                  <td className="py-3 px-4 text-center text-amber-600">每月10間</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-green-600 font-medium">無限</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">無限</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">資訊搜尋功能</td>
                  <td className="py-3 px-4 text-center text-amber-600">每月30次</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-green-600 font-medium">無限</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">無限</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">篩選條件</td>
                  <td className="py-3 px-4 text-center text-gray-600">基本</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-green-600 font-medium">全部12項</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">全部12項</td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900" colSpan={4}>
                    <Star className="w-4 h-4 inline mr-2 text-amber-500" />
                    心儀學校功能
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">心儀學校收藏</td>
                  <td className="py-3 px-4 text-center text-amber-600">最多5間</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-amber-600">最多30間</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">無限</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">申請追蹤</td>
                  <td className="py-3 px-4 text-center text-amber-600">最多3間</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-green-600 font-medium">無限</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">無限</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">截止日期提醒</td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-amber-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900" colSpan={4}>
                    <Crown className="w-4 h-4 inline mr-2 text-amber-500" />
                    小朋友資料
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">小朋友檔案</td>
                  <td className="py-3 px-4 text-center text-amber-600">最多1位</td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-amber-600">最多3位</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">無限</td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900" colSpan={4}>
                    <Zap className="w-4 h-4 inline mr-2 text-amber-500" />
                    升學攻略
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">升學攻略完整內容</td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-amber-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">攻略 PDF 下載</td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-amber-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900" colSpan={4}>
                    <Star className="w-4 h-4 inline mr-2 text-amber-500" />
                    專屬優惠
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">升級服務優惠</td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-amber-50 text-amber-600 font-medium">9折</td>
                  <td className="py-3 px-4 text-center text-purple-600 font-medium">8折</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 pl-8 text-gray-600">每週升學資訊摘要</td>
                  <td className="py-3 px-4 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="py-3 px-4 text-center bg-amber-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">常見問題</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">準備好開始您的升學之旅了嗎？</h2>
          <p className="text-xl mb-8 opacity-90">
            立即免費註冊，體驗 BeeJAI 的強大功能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-gray-100"
              onClick={() => handleSubscribe("little-bee")}
            >
              免費開始
            </Button>
            <Link href="/schools">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                瀏覽學校
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
