import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Share2, 
  Bookmark,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 攻略內容數據
const guideContents: Record<string, {
  title: string;
  subtitle: string;
  readTime: string;
  targetAudience: string;
  lastUpdated: string;
  heroColor: string;
  sections: Array<{
    title: string;
    content: string;
    type?: "text" | "table" | "tips" | "checklist" | "warning";
    items?: string[];
    tableData?: { headers: string[]; rows: string[][] };
  }>;
  relatedGuides: Array<{ id: string; title: string }>;
}> = {
  "kindergarten-newbie": {
    title: "新手媽媽幼稚園攻略",
    subtitle: "從零開始的選校指南",
    readTime: "15 分鐘",
    targetAudience: "準備升 K1 的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-pink-400 to-pink-300",
    sections: [
      {
        title: "選校五大要點",
        content: "對於首次為子女選擇幼稚園的新手家長而言，選校是一個需要深思熟慮的決定。根據教育專家的建議，家長在選校時應考慮以下五個關鍵因素：",
        type: "text"
      },
      {
        title: "1. 按孩子能力選合適學校",
        content: "幼稚園有分大校、細校，課程分為本地課程和國際課程。家長需要考慮小朋友往後升讀本地小學還是國際學校，以及語言選擇（粵語、英語、雙語或三語）。若孩子語文能力發展較慢，選擇多語學校會較為吃力。",
        type: "text"
      },
      {
        title: "2. 讓孩子一起參觀學校",
        content: "孩子能愉快學習及喜歡自己的學校非常關鍵，參觀前帶孩子預先看看學校四周，多問孩子的感受，最佳決定是家長和孩子一起揀選。",
        type: "text"
      },
      {
        title: "3. 觀察師生互動",
        content: "參觀時間短，要觀察老師與學生互動是最真實的一面，包括老師對學生的關愛程度，以及正就讀孩子是否熱愛上課及常規表現。",
        type: "text"
      },
      {
        title: "4. 作息時間",
        content: "家長應留意自己工作需要或照顧者需要，有些小朋友需要午睡可考慮半日班，放工時間較夜的家長孩子或較適合下午班，工作時間較長可考慮長全日制幼稚園。",
        type: "text"
      },
      {
        title: "5. 留意運動課",
        content: "運動有助促進腦部發展，環境寬敞能讓孩子多做運動、接觸陽光，若學校只著重學術而缺少體育時間，對身心發展不太理想。",
        type: "text"
      },
      {
        title: "K1 入學申請時間表",
        content: "以下是 2026/27 學年 K1 入學的重要日期：",
        type: "table",
        tableData: {
          headers: ["時間", "事項"],
          rows: [
            ["9月至11月", "申請幼稚園入學註冊證"],
            ["9月至12月", "幼稚園派發K1入學報名表格並接受申請"],
            ["文件處理", "約6至8星期"],
            ["統一註冊日", "到取錄幼稚園辦理註冊"]
          ]
        }
      },
      {
        title: "幼稚園面試形式",
        content: "幼稚園面試通常分為三種形式：",
        type: "checklist",
        items: [
          "個別面試：老師單獨會見小朋友進行一對一互動，包括簡單對話、唱歌、閱讀、數字、顏色或形狀辨識測試",
          "小組面試：通常4至8位小朋友為一組，類似 playgroup 形式，讓小朋友自由玩耍及閱讀",
          "幼兒遊戲：以遊戲方式進行面試，常見遊戲包括穿珠仔、疊積木、簡單拼圖、圖卡配對等"
        ]
      },
      {
        title: "小朋友常見面試問題",
        content: "",
        type: "checklist",
        items: [
          "自我介紹（名字、年齡、性別、家人資料）",
          "家庭生活（誰陪他來、與誰住、平日由誰照顧）",
          "日常生活（興趣愛好、辨識日常物件及示範功用）",
          "解難題（提出問題或情境，要求提出解決方法）",
          "學術（辨認英文字母及數字、數數）",
          "日常生活技能（穿鞋、繫鞋帶、使用筷子、刷牙）"
        ]
      },
      {
        title: "家長常見面試問題",
        content: "",
        type: "checklist",
        items: [
          "為甚麼會選擇本校？",
          "認為本校有什麼優點？",
          "對小朋友的將來有什麼期望？",
          "小朋友有甚麼優點和缺點？",
          "平日和假期會和小朋友去什麼地方玩？",
          "平日由誰來照顧孩子？",
          "照顧小朋友時曾遇到哪些困難？如何處理？"
        ]
      },
      {
        title: "面試準備貼士",
        content: "",
        type: "tips",
        items: [
          "提前讓孩子熟悉面試環境，減少緊張感",
          "練習基本的自我介紹和簡單對答",
          "培養孩子的禮貌和自信心",
          "不要過度訓練，保持孩子的自然表現",
          "家長也要準備好回答問題，展現正向教育理念"
        ]
      }
    ],
    relatedGuides: [
      { id: "n-wu-strategy", title: "N無人士入名校攻略" },
      { id: "dss-private-interview", title: "直資私立小學面試攻略" }
    ]
  },
  "n-wu-strategy": {
    title: "N無人士入名校攻略",
    subtitle: "沒有關係也能成功",
    readTime: "12 分鐘",
    targetAudience: "無學校關係的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-purple-400 to-purple-300",
    sections: [
      {
        title: "什麼是 N 無人士？",
        content: "在香港升學圈中，「N無」或「Team B」是指沒有任何學校關係的申請者。相對而言，「Team A」是指有關係的申請者，包括：現在有兄姊在該小學或聯繫中學就讀、兄姊畢業於該小學或聯繫中學、父母畢業於該小學或聯繫中學、父母在該小學或聯繫中學是現任教職員或校內員工、有直系親屬在該學校為校董會或舊生會成員。",
        type: "text"
      },
      {
        title: "Team A 與 Team B 的取錄比例",
        content: "大部份情況下，有關係和沒有關係的學生面試內容及流程完全相同，只是甄選過程可能有些不一樣。唯一公開數據的學校是聖保羅男女中學附屬小學：有關係的學生上限為70%，沒有關係的學生最少佔30%。",
        type: "text"
      },
      {
        title: "N無人士成功關鍵",
        content: "根據升學專家分析，有關係和沒有關係對於取錄結果並沒有直接關係。過往很多「N無」學生家長從小培養小朋友的良好學習動機和言談舉止，加上父母能夠給校方一個正向教育家庭的良好印象，這些因素比起有沒有關係更為重要。",
        type: "tips",
        items: [
          "從小培養小朋友的良好學習動機",
          "培養良好的言談舉止",
          "父母展現正向教育家庭的良好印象",
          "做好充分的面試準備"
        ]
      },
      {
        title: "小一入學計分制",
        content: "對於官津小學的自行分配學位階段，了解計分制是關鍵：",
        type: "table",
        tableData: {
          headers: ["分數", "條件"],
          rows: [
            ["20分", "有兄/姊在該小學就讀，或父/母在該小學任職"],
            ["10分", "父/母為該小學的校董"],
            ["10分", "兄/姊為該小學的畢業生"],
            ["10分", "父/母為該小學的畢業生"],
            ["10分", "首名出生子女"],
            ["5分", "與該校有相同宗教信仰"],
            ["5分", "父/母為該小學主辦社團的成員"]
          ]
        }
      },
      {
        title: "N無人士策略建議",
        content: "",
        type: "checklist",
        items: [
          "策略一：選擇無宗教小學 - 15分或以下的學童一般無法取得宗教分，選擇無宗教背景的小學可減低競爭，首選官立小學",
          "策略二：報讀直資/私立小學 - 不受校網限制，不受計分制影響，純粹以面試表現決定",
          "策略三：叩門準備 - 統一派位結果公布後，以「後補生」方式爭取心儀學校取錄"
        ]
      },
      {
        title: "重要提醒",
        content: "有關係和沒有關係對於取錄結果並沒有直接關係。最重要的是做好充分準備，展現孩子的真實能力和家庭的正向教育理念。",
        type: "warning",
        items: [
          "不要因為沒有關係而放棄心儀學校",
          "專注於提升孩子的能力和表現",
          "準備好面試，展現家庭教育理念"
        ]
      }
    ],
    relatedGuides: [
      { id: "kindergarten-newbie", title: "新手媽媽幼稚園攻略" },
      { id: "p1-knocking", title: "小一叩門攻略" }
    ]
  },
  "mainland-talent": {
    title: "內地來港專才子女攻略",
    subtitle: "高才通家庭必讀",
    readTime: "18 分鐘",
    targetAudience: "內地來港專才家庭",
    lastUpdated: "2024年12月",
    heroColor: "from-blue-400 to-blue-300",
    sections: [
      {
        title: "背景",
        content: "子女教育是很多高才通申請者來港的主因。高才通子女插班入讀本地學校情況普遍，例如位於東涌的黃楚標中學，全校有200名以上內地學生，佔整體學生的三分之一。",
        type: "text"
      },
      {
        title: "學校收生流程",
        content: "以黃楚標中學為例，該校今年共收到超過300份內地生插班申請：",
        type: "table",
        tableData: {
          headers: ["階段", "人數", "說明"],
          rows: [
            ["初步材料篩選", "300+", "看資料是否齊全，填表是否準確"],
            ["第一輪筆試", "250人", "分為中英數三科"],
            ["第二輪面試", "50人", "英文和中文進行"],
            ["最終錄取", "10人", "中二2人、中三5人、中四1人、中五2人"]
          ]
        }
      },
      {
        title: "筆試內容",
        content: "筆試分為中英數三科，以教育局頒發的各年級大綱內容為準，試卷每年在變，難度也在不斷增加。",
        type: "text"
      },
      {
        title: "面試評估重點",
        content: "面試分為英文和中文進行，主要評估：",
        type: "checklist",
        items: [
          "學生的整體狀態、自信、品德、精神面貌、禮貌",
          "學習習慣、興趣愛好、時間管理",
          "對社會新聞的看法",
          "處於困境如何解決問題的能力",
          "溝通和表達能力"
        ]
      },
      {
        title: "家長實戰經驗：雷先生（北京來港）",
        content: "雷先生的兒子原在北京排名前三的公立學校「北京市十一學校」就讀，今年參加了17次筆試，從北京飛香港達7次，最終收到四所學校的錄取通知。他分享三點建議：插班要儘早；適合自己的學校就好，第一次可以過渡；不用太擔心英文，香港本地生英文水準與內地生差距沒有想像的大。",
        type: "text"
      },
      {
        title: "按能力選校建議",
        content: "",
        type: "table",
        tableData: {
          headers: ["學生情況", "建議選校"],
          rows: [
            ["英文強", "Band 1 學校"],
            ["英文弱、數學好", "Band 2 中文學校（用中文考DSE較容易）"],
            ["英文或數學稍遜", "校風好、紀律嚴格的學校"]
          ]
        }
      },
      {
        title: "插班準備建議",
        content: "",
        type: "tips",
        items: [
          "DSE英文考試與內地中高考的英語教學體系完全不同，更注重英語的實際運用能力",
          "建議先參加雅思或託福考試，取得較好成績有助筆試機會",
          "擇校插班不必一步到位，每學期都會有機會",
          "關注心儀學校網站的招生欄插班通告，及時遞交申請",
          "粵語適應：往往一個月會聽，三個月就開始講"
        ]
      }
    ],
    relatedGuides: [
      { id: "p1-knocking", title: "小一叩門攻略" },
      { id: "international-school", title: "國際學校入學指南" }
    ]
  },
  "p1-knocking": {
    title: "小一叩門攻略",
    subtitle: "派位後的最後機會",
    readTime: "10 分鐘",
    targetAudience: "派位結果不理想的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-orange-400 to-orange-300",
    sections: [
      {
        title: "什麼是叩門？",
        content: "叩門是指在小一統一派位結果公布後，家長向心儀學校申請入學的機會。這是派位結果不理想時的「最後機會」。",
        type: "text"
      },
      {
        title: "叩門時間表",
        content: "",
        type: "table",
        tableData: {
          headers: ["階段", "時間", "事項"],
          rows: [
            ["派位結果公布", "6月初", "收到統一派位結果"],
            ["學位註冊", "6月10-11日", "必須完成，即使打算叩門"],
            ["黃金遞表期", "派位結果公布當天及第二天", "把握最佳時機"],
            ["叩門面試", "6月中旬", "各校自行安排"]
          ]
        }
      },
      {
        title: "叩門三寶",
        content: "準備叩門時，必須備齊以下三樣文件：",
        type: "checklist",
        items: [
          "自薦信 - 說明選校原因和孩子特質",
          "推薦信 - 幼稚園老師或校長推薦",
          "個人檔案 (Portfolio) - 學業成績、課外活動、獎項證書"
        ]
      },
      {
        title: "面試三寶",
        content: "根據前名校副校長分享的「面試三寶」：",
        type: "tips",
        items: [
          "個人興趣 - 從興趣了解孩子性格，回答時要加例子和理由",
          "品德表現 - 禮貌、誠實、自信",
          "解難能力 - 面對問題的思考方式"
        ]
      },
      {
        title: "重要提醒",
        content: "",
        type: "warning",
        items: [
          "即使派位結果不理想，也必須先到所派學校完成註冊",
          "若之後成功叩門，只需去已註冊的學校取回註冊證，再去新學校註冊",
          "叩門名額有限，競爭激烈，要有心理準備"
        ]
      }
    ],
    relatedGuides: [
      { id: "n-wu-strategy", title: "N無人士入名校攻略" },
      { id: "dss-private-interview", title: "直資私立小學面試攻略" }
    ]
  },
  "dss-private-interview": {
    title: "直資私立小學面試攻略",
    subtitle: "面試必勝秘笈",
    readTime: "14 分鐘",
    targetAudience: "報讀直資私立的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-green-400 to-green-300",
    sections: [
      {
        title: "面試流程",
        content: "直資私立小學面試通常包括以下步驟：",
        type: "checklist",
        items: [
          "填寫申請表、整理學業成績、課外活動表現",
          "製作 Portfolio",
          "個人面試 - 老師通過提問和活動評估學生",
          "小組面試 - 觀察與其他孩子的互動",
          "家長面試 - 了解家庭教育理念"
        ]
      },
      {
        title: "小朋友常見面試題目",
        content: "",
        type: "checklist",
        items: [
          "自我介紹（中英文）：姓名、年齡、興趣",
          "學術問題：簡單數學（加減法）、認字、看圖講故事",
          "生活常識：「過馬路要注意什麼？」「如何與朋友相處？」"
        ]
      },
      {
        title: "家長常見面試題目",
        content: "",
        type: "checklist",
        items: [
          "為什麼選擇本校？",
          "對孩子的教育期望",
          "家庭教育理念"
        ]
      },
      {
        title: "五大面試攻略",
        content: "",
        type: "tips",
        items: [
          "了解學校特色 - 例如拔萃女小學重視品格、聖保羅男女注重邏輯表達",
          "熟習面試內容 - 練好中英文自我介紹、簡單對答",
          "注意「陷阱位」 - 小組遊戲觀察個人修養及能否聽指令",
          "不懂回答不要緊 - 誠實說「我不知道」比亂答好",
          "展現真實自我 - 不要過度訓練，保持自然"
        ]
      },
      {
        title: "面試失敗後的調整策略",
        content: "",
        type: "checklist",
        items: [
          "回歸初心 - 重新評估學校特質是否適合孩子",
          "善用「音樂椅」效應 - 有些學校會因其他學生放棄學位而有空缺",
          "調整期望 - 考慮其他合適的學校"
        ]
      }
    ],
    relatedGuides: [
      { id: "kindergarten-newbie", title: "新手媽媽幼稚園攻略" },
      { id: "p1-knocking", title: "小一叩門攻略" }
    ]
  },
  "international-school": {
    title: "國際學校入學指南",
    subtitle: "開啟國際教育之路",
    readTime: "16 分鐘",
    targetAudience: "考慮國際教育的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-teal-400 to-teal-300",
    sections: [
      {
        title: "香港國際學校類型",
        content: "",
        type: "table",
        tableData: {
          headers: ["類型", "學制", "公開試", "特點"],
          rows: [
            ["英式", "Year 1-13", "IGCSE, A-Level", "小一入學年齡5歲"],
            ["美式", "Grade 1-12", "SAT, AP", "小一入學年齡6歲"],
            ["IB制", "PYP, MYP, DP", "IB Diploma", "國際認可度高"],
            ["加拿大式", "Grade 1-12", "Ontario Diploma", "較少學校"]
          ]
        }
      },
      {
        title: "入學條件",
        content: "",
        type: "checklist",
        items: [
          "年齡要求 - 各年級對學生年齡有明確限制",
          "語言能力 - 通常需要英語能力測試",
          "學業成績 - 過往成績單",
          "面試 - 學生和家長面試",
          "入學試 - 部分學校要求筆試"
        ]
      },
      {
        title: "申請時間",
        content: "大部分學校在學年開始前一年左右開始接受申請，有些學校全年接受申請，有些學校有固定的申請截止日期。熱門學校建議提前1至2年申請。",
        type: "text"
      },
      {
        title: "學費參考",
        content: "國際學校學費較高，一般每年 HK$100,000 至 HK$250,000 不等，視乎學校和年級。部分學校還有建校費、提名權費等額外費用。",
        type: "warning",
        items: [
          "學費每年 HK$100,000 - HK$250,000",
          "部分學校有建校費（一次性）",
          "部分學校有提名權費",
          "校巴、午餐、課外活動等額外費用"
        ]
      },
      {
        title: "選校建議",
        content: "",
        type: "tips",
        items: [
          "考慮孩子未來升學路徑（英國、美國、其他國家）",
          "了解學校的教學語言和課程設置",
          "參觀學校，了解校園環境和設施",
          "與在讀學生家長交流，了解真實情況",
          "考慮學校地點和交通便利性"
        ]
      }
    ],
    relatedGuides: [
      { id: "mainland-talent", title: "內地來港專才子女攻略" },
      { id: "dss-private-interview", title: "直資私立小學面試攻略" }
    ]
  }
};

export default function GuideDetail() {
  const { id } = useParams<{ id: string }>();
  const guide = id ? guideContents[id] : null;

  if (!guide) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">找不到此攻略</h1>
          <Link href="/guides" className="text-amber-600 hover:text-amber-700">
            返回攻略列表
          </Link>
        </div>
      </div>
    );
  }

  const renderSection = (section: typeof guide.sections[0], index: number) => {
    switch (section.type) {
      case "table":
        return (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
            {section.tableData && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      {section.tableData.headers.map((header, i) => (
                        <th key={i} className="border border-amber-200 px-4 py-3 text-left font-semibold text-gray-900">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tableData.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-200 px-4 py-3 text-gray-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "checklist":
        return (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
            <ul className="space-y-3">
              {section.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case "tips":
        return (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-800">實用貼士</span>
              </div>
              <ul className="space-y-2">
                {section.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-900">
                    <span className="text-amber-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "warning":
        return (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">重要提醒</span>
              </div>
              <ul className="space-y-2">
                {section.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-900">
                    <span className="text-red-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`bg-gradient-to-b ${guide.heroColor} py-12`}>
        <div className="container">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回攻略列表
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{guide.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {guide.targetAudience}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                更新於 {guide.lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {guide.sections.map((section, index) => renderSection(section, index))}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="w-4 h-4 mr-2" />
                    收藏
                  </Button>
                </div>

                {/* Related Guides */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    相關攻略
                  </h3>
                  <div className="space-y-3">
                    {guide.relatedGuides.map((related) => (
                      <Link
                        key={related.id}
                        href={`/guides/${related.id}`}
                        className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-sm transition-all"
                      >
                        <span className="text-gray-900 hover:text-amber-600 font-medium text-sm flex items-center justify-between">
                          {related.title}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">需要更多幫助？</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    加入 BeeJAI 會員，獲取個人化升學建議
                  </p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    免費註冊
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
