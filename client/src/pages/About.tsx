import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

import { 
  Heart, 
  Target, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Globe, 
  Shield, 
  Sparkles,
  BookOpen,
  Award,
  Brain,
  HandHeart
} from "lucide-react";

export default function About() {
  const coreValues = [
    {
      icon: Heart,
      title: "以家長為本",
      description: "我們深明家長為子女升學所承受的壓力與焦慮，每一項功能都以減輕家長負擔為出發點。"
    },
    {
      icon: Shield,
      title: "專業可靠",
      description: "結合教育界專業人士的實戰經驗，確保每一條資訊都經過嚴謹審核，值得信賴。"
    },
    {
      icon: Lightbulb,
      title: "創新科技",
      description: "運用人工智能技術，為家長提供個人化的升學建議，讓選校決策更加精準高效。"
    },
    {
      icon: Globe,
      title: "共融包容",
      description: "無論本地家庭或新來港人士，我們致力為每一位家長提供平等的升學資訊支援。"
    }
  ];

  const teamMembers = [
    {
      icon: GraduationCap,
      role: "名校校長",
      description: "多位曾任職傳統名校的退休校長，擁有數十年教育行政經驗，深諳學校收生準則與教育理念。"
    },
    {
      icon: BookOpen,
      role: "資深教師",
      description: "來自不同學校類型的現職及退休教師，了解各校的教學特色、校風文化及學生發展路向。"
    },
    {
      icon: Award,
      role: "過來人家長",
      description: "成功協助子女入讀心儀名校的家長顧問，分享第一手的申請經驗、面試技巧與實戰心得。"
    },
    {
      icon: Brain,
      role: "AI 工程師",
      description: "專業的人工智能團隊，運用先進技術分析海量數據，為家長提供智能化的選校配對服務。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-300/10 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              關於 BeeJAI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              讓每個孩子都能找到
              <span className="text-amber-500">最適合</span>的學校
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              BeeJAI 由一群熱心教育的專業人士創立，我們深信每個孩子都是獨特的，
              值得在最適合的環境中成長。透過科技與專業經驗的結合，
              我們致力成為香港家長最信賴的升學夥伴。
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
                  <Target className="h-5 w-5" />
                  我們的使命
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  緩解升學壓力，陪伴成長每一步
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    在香港，為子女選擇合適的學校是每位家長的重要課題。面對繁複的升學制度、
                    眾多的學校選擇、以及激烈的競爭環境，不少家長感到無所適從，壓力重重。
                  </p>
                  <p>
                    BeeJAI 的誕生，正是為了回應這份需要。我們匯集了教育界的專業智慧，
                    結合人工智能的分析能力，為香港本地及海外來港的家長提供全面、
                    準確、易用的升學資訊平台。
                  </p>
                  <p>
                    我們相信，當家長能夠獲得充足的資訊和專業的指導，
                    便能更從容地為孩子作出最佳的教育決定，
                    讓每個孩子都能在適合的環境中發揮潛能、茁壯成長。
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-amber-500 mb-2">2000+</div>
                      <div className="text-gray-600 text-sm">學校資料</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-amber-500 mb-2">18</div>
                      <div className="text-gray-600 text-sm">香港地區</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-amber-500 mb-2">12+</div>
                      <div className="text-gray-600 text-sm">篩選維度</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="text-3xl font-bold text-amber-500 mb-2">實時</div>
                      <div className="text-gray-600 text-sm">入學資訊</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Overseas Parents */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
              <Globe className="h-5 w-5" />
              服務對象
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              本地家庭與新來港人士的升學橋樑
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              無論您是土生土長的香港家長，還是透過高才通、優才計劃、專才計劃來港的新移民家庭，
              BeeJAI 都能為您提供度身訂造的升學支援。我們特別理解新來港家長面對的挑戰——
              對本地教育制度的陌生、語言文化的差異、以及子女適應新環境的擔憂。
              我們的專業團隊將全程陪伴，助您順利融入香港的教育體系。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-amber-600 font-medium">🇭🇰 本地家庭</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-amber-600 font-medium">🌏 高才通子女</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-amber-600 font-medium">✨ 優才計劃</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-amber-600 font-medium">💼 專才計劃</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm">
                <span className="text-amber-600 font-medium">🎓 海外回流</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
                <Users className="h-5 w-5" />
                專業團隊
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                匯聚教育界精英，只為您的孩子
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                BeeJAI 團隊由一群對教育充滿熱誠的專業人士組成，
                我們深明家長的苦況，希望透過這個平台緩解您的升學煩惱。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <member.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{member.role}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-amber-600 font-medium mb-4">
                <HandHeart className="h-5 w-5" />
                核心價值
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                我們堅守的信念
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-br from-amber-400 to-orange-400 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              我們的願景
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              成為香港最值得信賴的升學資訊平台
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              我們的願景是建立一個公開、透明、專業的升學資訊生態圈，
              讓每一位家長都能輕鬆獲取所需資訊，讓每一個孩子都能在最適合的學校中綻放光芒。
              我們期望透過科技的力量，打破資訊不對稱的壁壘，
              讓優質教育資源不再是少數人的專利。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-medium">📚 資訊透明化</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-medium">🤝 服務普及化</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-medium">🚀 決策智能化</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              準備好開始您的升學之旅了嗎？
            </h2>
            <p className="text-gray-600 mb-8">
              立即免費註冊，體驗 BeeJAI 的專業服務，讓我們陪伴您和孩子走過升學的每一步。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/schools">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  瀏覽學校
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                  查看會員方案
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white border-t border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/beejai-logo.png" alt="BeeJAI" className="h-8 w-8" />
              <span className="font-bold text-gray-900">BeeJAI</span>
              <span className="text-gray-500 text-sm">Bee仔升學</span>
            </div>
            <p className="text-sm text-gray-500">© 2024 BeeJAI. 香港升學資訊平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
