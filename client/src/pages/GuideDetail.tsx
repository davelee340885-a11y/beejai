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
    readTime: "25 分鐘",
    targetAudience: "內地來港專才家庭",
    lastUpdated: "2024年12月",
    heroColor: "from-blue-400 to-blue-300",
    sections: [
      {
        title: "背景",
        content: "子女教育是很多高才通申請者來港的主因。根據香港高才通人才服務協枃2024年調查，近600名受訪者中，六成有子女在香港就讀中小學。例如位於東涌的黃楚標中學，全校有200名以上內地學生，佔整體學生的三分之一。",
        type: "text"
      },
      {
        title: "各類人才計劃子女教育權益",
        content: "2023年7月教育局更新學校通告，新批准多項人才計劃的受養子女入讀香港官立、津貼、直資學校：",
        type: "table",
        tableData: {
          headers: ["計劃", "適用人群", "子女教育權益"],
          rows: [
            ["高才通", "高收入人才或名校畢業生", "可入讀官立、津貼、直資學校"],
            ["優才計劃", "具備高學歷或專業技能人才", "可入讀官立、津貼、直資學校"],
            ["專才計劃", "已獲香港公司聘用的專業人士", "可入讀官立、津貼、直資學校"],
            ["IANG簽證", "香港院校畢業的非本地學生", "可入讀官立、津貼、直資學校"]
          ]
        }
      },
      {
        title: "插班申請時間表",
        content: "香港學校插班主要分為春季和秋季兩個入學時段：",
        type: "table",
        tableData: {
          headers: ["入學時段", "申請期", "入學時間", "備註"],
          rows: [
            ["春季插班", "3-5月", "次年1月", "名額較少，競爭激烈"],
            ["秋季插班", "9-12月", "次年9月", "主要插班時段，名額較多"],
            ["小學階段", "建議五年級前", "-", "五年級下學期呈分試影響升中派位"],
            ["中學階段", "建議中三前", "-", "中三下學期是選科關鍵時期"]
          ]
        }
      },
      {
        title: "申請材料清單",
        content: "申請香港學校插班需要準備以下材料：",
        type: "checklist",
        items: [
          "學生證件：香港身份證/護照、港澳居民來往內地通行證",
          "學業證明：近2年成績單（需公證中英文版本）",
          "原校推薦信：班主任或校長推薦",
          "住址證明：水電費賬單或租約",
          "獲獎證書：學術、體育、藝術等獲獎証明",
          "課外活動証明：社團、義工、比賽等參與証明"
        ]
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
        title: "筆試準備要點",
        content: "筆試分為中英數三科，以教育局頒發的各年級大綱內容為準，試卷每年在變，難度也在不斷增加。",
        type: "text"
      },
      {
        title: "中文科筆試準備",
        content: "",
        type: "checklist",
        items: [
          "閱讀理解：文言文和白話文都會考到",
          "寫作：記敘文、議論文為主，需用繁體字",
          "語文知識：詞語、成語、修轭手法",
          "注意繁簡體字轉換，香港學校使用繁體字"
        ]
      },
      {
        title: "英文科筆試準備",
        content: "",
        type: "checklist",
        items: [
          "閱讀理解：文章長度較長，題型多樣",
          "語法和詞彙：注重實際運用能力",
          "寫作：書信、文章、故事等多種體裁",
          "DSE英文與內地中高考英語體系完全不同",
          "建議先參加雅思或託福考試，取得較好成績有助筆試機會"
        ]
      },
      {
        title: "數學科筆試準備",
        content: "",
        type: "checklist",
        items: [
          "香港數學課程與內地有差異，需提前了解",
          "熟悉香港數學術語（中英文）",
          "部分學校數學以英文出題",
          "內地學生數學基礎通常較好，但要注意語言表達"
        ]
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
        title: "面試常見問題",
        content: "提前準備以下常見面試問題：",
        type: "checklist",
        items: [
          "自我介紹（中英文）",
          "為什麼想來香港讀書？",
          "對香港有什麼了解？",
          "你的興趣愛好是什麼？",
          "遇到困難時如何解決？",
          "對未來有什麼規劃？",
          "最近關注什麼社會新聞？"
        ]
      },
      {
        title: "面試準備貼士",
        content: "",
        type: "tips",
        items: [
          "穿著整潔得體，展現良好精神面貌",
          "提前了解學校背景和特色",
          "準備具體例子支撐回答",
          "練習英文口語表達，注意發音和流利度",
          "部分學校家長也需要面試，家長也要準備"
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
      },
      {
        title: "重要提醒：大學入學新政策",
        content: "",
        type: "warning",
        items: [
          "2028/29學年起，高才通子女需在港連續居住滿兩年，方可申請八所資助大學及其他專上課程的資助學額",
          "來港受養人才子女申請聯招人數從2020/21學年的200人增到2024/25申請年的1,048人",
          "提早規劃子女在港居住時間，以符合大學入學要求"
        ]
      }
    ],
    relatedGuides: [
      { id: "ib-school", title: "IB課程選校攻略" },
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
  "playgroup-guide": {
    title: "Playgroup 推薦第一步策劃",
    subtitle: "孩子社交學習的起點",
    readTime: "12 分鐘",
    targetAudience: "0-3 歲孩子的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-green-400 to-green-300",
    sections: [
      {
        title: "什麼是 Playgroup？",
        content: "Playgroup 是一種為 0-3 歲孩子設計的遊戲小組活動，讓孩子在家長陪同下與其他小朋友互動，培養社交能力、語言發展和大小肌肉協調。這是孩子正式入讀幼穚園前的重要準備階段。",
        type: "text"
      },
      {
        title: "Playgroup 的好處",
        content: "",
        type: "checklist",
        items: [
          "社交發展：學習與同齡孩子互動、分享和輪流",
          "語言刺激：透過兒歌、故事和遊戲提升語言能力",
          "感官探索：透過不同材質和活動刺激感官發展",
          "分離焦慮減輕：漸進式適應離開家長的環境",
          "幼穚園面試準備：提前適應小組活動形式"
        ]
      },
      {
        title: "何時開始 Playgroup？",
        content: "",
        type: "table",
        tableData: {
          headers: ["年齡", "建議活動", "重點"],
          rows: [
            ["6-12 個月", "親子遊戲班", "家長全程陪同，專注感官刺激"],
            ["1-2 歲", "初階 Playgroup", "開始學習簡單指令和組別活動"],
            ["2-3 歲", "進階 Playgroup", "準備入讀 PN 或 K1，學習獨立"]
          ]
        }
      },
      {
        title: "如何選擇 Playgroup？",
        content: "",
        type: "tips",
        items: [
          "師生比例：理想比例為 1:4 至 1:6，確保每個孩子得到足夠關注",
          "環境安全：檢查場地是否有軟墊、角位保護、清潔衛生",
          "課程內容：是否包含音樂、美術、體能、語言等多元活動",
          "地點交通：選擇離家近的地點，減少孩子舒適度下降",
          "試堂體驗：大部分機構提供試堂，先觀察孩子反應"
        ]
      },
      {
        title: "Playgroup 類型比較",
        content: "",
        type: "table",
        tableData: {
          headers: ["類型", "特點", "學費參考"],
          rows: [
            ["幼穚園附屬", "可認識學校環境，有助入學申請", "$800-2,000/月"],
            ["私人機構", "課程多元化，時間彈性大", "$1,500-4,000/月"],
            ["國際 Playgroup", "英語沉浸環境，價格較高", "$3,000-8,000/月"],
            ["社區中心", "價格實惠，資源較少", "$200-800/月"]
          ]
        }
      },
      {
        title: "熱門 Playgroup 推薦",
        content: "以下是香港家長熟悉的優質 Playgroup 機構：",
        type: "checklist",
        items: [
          "Gymboree Play & Music - 國際品牌，專注音樂和運動發展",
          "My Gym - 美式體能課程，強調大肌肉發展",
          "Spring Learning - 雙語教學，課程全面",
          "Mighty Oaks - 英式教學，重視社交情緒",
          "各區幼穚園附屬 Playgroup - 可提前熟悉學校環境"
        ]
      },
      {
        title: "報讀 Playgroup 前的準備",
        content: "",
        type: "tips",
        items: [
          "建立規律作息：讓孩子適應固定時間活動",
          "練習分離：從短時間開始，漸進式延長",
          "培養自理能力：如自己嗝水、整理物品",
          "多與其他孩子接觸：參加社區活動、去公園玩耍",
          "準備必需物品：尿片、毛巾、水壺、備用衣物"
        ]
      },
      {
        title: "Playgroup 與幼穚園入學的關係",
        content: "報讀幼穚園附屬的 Playgroup 可以讓孩子提前適應學校環境，並讓老師認識孩子。部分幼穚園會優先取錄 Playgroup 學生，但這並非必然。最重要的是讓孩子在適合的環境中快樂學習。",
        type: "warning",
        items: [
          "不是所有幼穚園都會優先取錄 Playgroup 學生",
          "孩子的面試表現仍然是最重要的因素",
          "選擇適合孩子的 Playgroup，而非只看升學前景"
        ]
      }
    ],
    relatedGuides: [
      { id: "kindergarten-newbie", title: "新手媽媽幼穚園攻略" },
      { id: "dss-private-interview", title: "直資私立小學面試攻略" }
    ]
  },
  "ib-school": {
    title: "IB課程選校攻略",
    subtitle: "全面了解國際文憑課程",
    readTime: "18 分鐘",
    targetAudience: "考慮 IB 課程的家長",
    lastUpdated: "2024年12月",
    heroColor: "from-blue-400 to-indigo-300",
    sections: [
      {
        title: "什麼是 IB 課程？",
        content: "IB（International Baccalaureate）國際文憑課程是一個享譽全球的教育體系，由國際文憑組織（IBO）於1968年創立。IB 課程不僅強調學術知識的全面發展，更注重培養學生的批判性思維、研究能力和國際視野。目前香港約有70間學校提供 IB 課程，包括國際學校、直資學校及私立學校。",
        type: "text"
      },
      {
        title: "IB 課程四大階段",
        content: "",
        type: "table",
        tableData: {
          headers: ["課程", "年齡", "特色", "香港學校數"],
          rows: [
            ["PYP (小學課程)", "3-12歲", "探究式學習，培養好奇心", "約40間"],
            ["MYP (中學課程)", "11-16歲", "跨學科學習，連結現實世界", "約16間"],
            ["DP (文憑課程)", "16-19歲", "深入學術研究，準備大學", "約38間"],
            ["CP (職業課程)", "16-19歲", "結合學術與職業技能", "約7間"]
          ]
        }
      },
      {
        title: "IBDP 文憑課程結構",
        content: "IBDP 是最受認可的 IB 課程，滿分45分，包含6個學科組別和3個核心元素：",
        type: "checklist",
        items: [
          "第1組：語言與文學（母語）",
          "第2組：語言習得（第二語言）",
          "第3組：個人與社會（歷史、地理、經濟等）",
          "第4組：科學（物理、化學、生物等）",
          "第5組：數學",
          "第6組：藝術或額外選修",
          "TOK：知識論（必修）",
          "EE：延伸論文（4000字研究論文）",
          "CAS：創意、活動、服務（必修）"
        ]
      },
      {
        title: "2024 香港 IB 學校排名 TOP 10",
        content: "以下是根據 IBDP 平均成績的香港十大 IB 學校：",
        type: "table",
        tableData: {
          headers: ["排名", "學校名稱", "平均分", "40分以上", "類型"],
          rows: [
            ["1", "聖保羅男女中學", "42.1", "94%", "直資"],
            ["2", "拔萃男書院", "42.0", "85%", "直資"],
            ["3", "漢基國際學校", "39.7", "63%", "國際"],
            ["4", "保良局顏寶鈴書院", "39.2", "58%", "直資"],
            ["5", "德瑞國際學校", "39.0", "40%", "國際"],
            ["6", "聖士提反書院", "39.0", "60%", "直資"],
            ["7", "新加坡國際學校", "38.9", "54%", "國際"],
            ["8", "優才（楊殷有娣）書院", "38.7", "42%", "直資"],
            ["9", "弘立書院", "38.5", "35%", "私立"],
            ["10", "加拿大國際學校", "38.2", "38%", "國際"]
          ]
        }
      },
      {
        title: "其他提供 IB 課程的學校",
        content: "",
        type: "table",
        tableData: {
          headers: ["學校名稱", "2024 平均分", "類型", "提供課程"],
          rows: [
            ["滬江維多利亞學校", "37.7", "私立", "PYP, MYP, DP"],
            ["保良局蔡繼有學校", "37.4", "直資", "PYP, DP"],
            ["英基學校協會 ESF", "36.4", "國際", "MYP, DP"],
            ["啓新書院", "35.6", "私立", "DP"],
            ["法國國際學校", "34.1", "國際", "DP"],
            ["香港學堂", "35.0", "國際", "PYP, MYP, DP"],
            ["耀中國際學校", "37.2", "國際", "PYP, MYP, DP"],
            ["香港澳洲國際學校", "37.0", "國際", "PYP, MYP, DP"],
            ["香港李寶橁聯合世界書院", "-", "國際", "DP"],
            ["基督教國際學校", "-", "國際", "DP"]
          ]
        }
      },
      {
        title: "IB vs DSE 比較",
        content: "選擇 IB 還是 DSE？以下是兩者的主要區別：",
        type: "table",
        tableData: {
          headers: ["項目", "IB", "DSE"],
          rows: [
            ["滿分", "45分", "35分 (7科5**)"],
            ["科目數量", "6科 + 核心元素", "4核心 + 2-3選修"],
            ["評估方式", "校內評估 + 考試", "公開考試為主"],
            ["國際認可", "全球認可", "主要香港/亞洲"],
            ["學費", "較高", "官津免費"],
            ["教學語言", "多為英語", "中/英"],
            ["學習風格", "探究式、自主學習", "考試導向"]
          ]
        }
      },
      {
        title: "IB 課程學費參考",
        content: "",
        type: "table",
        tableData: {
          headers: ["學校類型", "年學費範圍", "備註"],
          rows: [
            ["直資學校", "$38,000 - $150,000", "成績優異者可獲獎學金"],
            ["私立學校", "$100,000 - $220,000", "部分學校提供助學金"],
            ["國際學校", "$150,000 - $280,000", "另有建校費、資本費等"]
          ]
        }
      },
      {
        title: "IB 課程適合哪些學生？",
        content: "",
        type: "tips",
        items: [
          "自主學習能力強：IB 強調學生主導學習，需要良好的時間管理",
          "全面發展：除學術外，CAS 要求參與創意、活動和服務",
          "有海外升學計劃：IB 文憑受全球大學認可",
          "喜歡探究式學習：而非死記硬背的考試模式",
          "英語能力良好：大部分 IB 學校以英語授課"
        ]
      },
      {
        title: "選擇 IB 學校的要點",
        content: "",
        type: "checklist",
        items: [
          "學校成績：查看學校過往 IBDP 平均分和40分以上比例",
          "課程完整性：是否提供 PYP、MYP、DP 完整連貫課程",
          "師資質素：老師是否有 IB 教學認證和經驗",
          "學校設施：實驗室、圖書館、體育設施是否完善",
          "大學升學支援：學校是否有專業的升學輔導團隊",
          "地點交通：考慮孩子每日通勤時間",
          "學費預算：除學費外，還有書本、考試費、課外活動費用"
        ]
      },
      {
        title: "IB 入學申請流程",
        content: "",
        type: "table",
        tableData: {
          headers: ["時間", "事項"],
          rows: [
            ["入學前1-2年", "研究學校、參加開放日"],
            ["入學前9-12個月", "提交申請表格和文件"],
            ["入學前6-9個月", "參加入學評估/面試"],
            ["入學前3-6個月", "獲得取錄通知"],
            ["入學前1-3個月", "確認學位、繳交訂金"]
          ]
        }
      },
      {
        title: "重要提醒",
        content: "IB 課程雖然國際認可度高，但並非適合所有學生。家長應該根據孩子的學習風格、升學計劃和家庭財務狀況作出最合適的選擇。",
        type: "warning",
        items: [
          "IB 課程工作量較大，需要良好的時間管理能力",
          "學費較高，需考慮長期財務規劃",
          "部分香港大學對 IB 的認可度正在提升，但仍需留意入學要求",
          "建議家長和孩子一起參觀學校，了解實際學習環境"
        ]
      }
    ],
    relatedGuides: [
      { id: "international-school", title: "國際學校入學指南" },
      { id: "mainland-talent", title: "內地來港專才子女攻略" }
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
