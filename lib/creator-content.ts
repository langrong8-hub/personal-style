import type { CaseStudy, Lesson } from './data';
import type { PhotoAsset } from './photos';

// Publicly playable source videos; retain the complete source frame and its original text.
// Attribution is not a stock license or an endorsement. Reuse rights have not been granted.
export const creatorPhotos: Record<string, PhotoAsset> = {
  "chammyNavyWhite": {
    "src": "/images/creators/chammy-navy-white-0025.jpg",
    "alt": "痴五安chammy作品的00:25画面：藏青长袖、米白宽直长裤与深色鞋，保留原视频标题和字幕",
    "author": "痴五安chammy",
    "sourceUrl": "https://www.douyin.com/video/7536136434638441737",
    "originalUrl": "https://www.douyin.com/video/7536136434638441737",
    "license": "原作者保留权利",
    "licenseUrl": "https://www.douyin.com/video/7536136434638441737",
    "video": {
      "creatorId": "chammy",
      "authorUrl": "https://www.douyin.com/user/MS4wLjABAAAAAfdI9pa_VAg9vf1l3PeM1qgbzDvlx48nn-Eb88lTtsvVCQ6J5HMqUITcerTQFl-h",
      "title": "裤装单品上身展示（节选）",
      "publishedAt": "2025-08-08",
      "frameSeconds": 25,
      "capturedAt": "2026-10-19",
      "context": "原作包含品牌与单品展示。保留原画面文字；以下分析由衣序独立整理，不将推广用语当作教学结论。"
    }
  },
  "ayuanDarkLayers": {
    "src": "/images/creators/ayuan-dark-layers-0035.jpg",
    "alt": "AYUANPL阿源匹林作品的00:35画面：深色敞开外套、白色内搭、深色长裤与黑白鞋，站在户外墙前",
    "author": "AYUANPL阿源匹林",
    "sourceUrl": "https://www.douyin.com/video/7324693195558849842",
    "originalUrl": "https://www.douyin.com/video/7324693195558849842",
    "license": "原作者保留权利",
    "licenseUrl": "https://www.douyin.com/video/7324693195558849842",
    "video": {
      "creatorId": "ayuan",
      "authorUrl": "https://www.douyin.com/user/MS4wLjABAAAAxxaIZO2Pt_CsiFndi6i2DOmWn9j43AiXN984gcpwuV4",
      "title": "日常穿搭与自信（节选）",
      "publishedAt": "2024-01-16",
      "frameSeconds": 35,
      "capturedAt": "2026-10-19",
      "context": "这是视频中的一个户外片段，不能与室内镜头直接当作单变量前后对比。以下是衣序的画面观察，不是对原作者观点的转述。"
    }
  }
};

export const creatorCaseContent: Omit<CaseStudy, 'image' | 'photo'>[] = [
  {
    "id": "chammy-navy-white",
    "title": "藏青与米白，先看分界，再看收尾",
    "subtitle": "博主观察 / 藏青长袖 × 米白宽直裤 × 深色鞋",
    "photoId": "chammyNavyWhite",
    "position": "center",
    "tags": [
      "色彩",
      "轮廓",
      "博主案例"
    ],
    "impression": "上半身是较集中的深色，下半身是大面积浅色；深色鞋在底部再次出现，让亮色裤装有明确的收尾。松量主要靠衣物间的边界组织起来。",
    "factors": [
      "衣摆停在裤腰附近，藏青与米白形成一条清楚分界",
      "裤腿从膝部向下保持宽度，浅色区域连续延伸",
      "深色鞋呼应上衣，裤脚轻覆鞋面而没有完全遮住鞋头"
    ],
    "analysis": {
      "比例": "图中衣摆接近裤腰，但腰头被遮挡，不能仅凭颜色交界判断实际腰位。可以观察上下色块的长度关系，不推算人物真实身高。",
      "轮廓": "上衣肩袖有松量，裤腿向下较直；上衣下摆与裤腿之间仍可辨认出两段外边界。",
      "量感": "上衣颜色深、裤装面积大，两者以不同方式参与视觉分量。深色鞋为浅色裤腿提供底部停顿。",
      "色彩": "藏青、米白和近黑色鞋形成深—浅—深的节奏。鞋与上衣并不需要完全同色，也能通过明度呼应。",
      "材质": "衣袖和裤脚的褶皱方向可用于观察垂落关系；原画面中的面料名称属于作者的单品介绍，本站未据此验证实际成分。",
      "风格": "宽松上衣与较宽裤腿保留日常感，深色收束的鞋头增加一点利落。这里的效果来自组合，不意味着某种单品天然百搭。",
      "细节": "项链在深色领口前形成小面积亮点，裤脚与鞋面的接触则是下半身的观察重点。先看这两个位置，再考虑更多配饰。"
    },
    "observationNote": "这一帧人物略低头、身体重心偏移，衣摆也处在调整过程中。用于观察颜色和裤脚；不拿站姿差异证明某条裤子一定更显高。",
    "relatedLessonIds": [
      "color",
      "silhouette",
      "trouser-shoe-break",
      "read-creator-outfits"
    ]
  },
  {
    "id": "ayuan-dark-layers",
    "title": "深色叠穿，用白色内搭打开一道线",
    "subtitle": "博主观察 / 深色外套 × 白色内搭 × 深色长裤",
    "photoId": "ayuanDarkLayers",
    "position": "center",
    "tags": [
      "叠穿",
      "比例",
      "博主案例"
    ],
    "impression": "外套与裤装连接成较连续的深色区域，敞开的前襟露出白色内搭。亮色没有铺满上半身，而是沿中间留下一条可见的纵向线索。",
    "factors": [
      "敞开的前襟让白色内搭形成中间亮线",
      "外套下摆接近胯部，袖口与下摆提供横向停顿",
      "黑白鞋在脚部重复内搭的亮色，裤脚保留了可见鞋面"
    ],
    "analysis": {
      "比例": "衣长与裤腰位置需要分开看，画面没有完整展示裤腰。可观察外套下摆在哪里结束，以及下装从哪里开始形成连续区域。",
      "轮廓": "外套肩袖与前襟勾勒上半身边界，裤腿从膝部向下保持一定宽度；整体没有只靠紧身制造线条。",
      "量感": "大面积深色容易形成整体块面，白色内搭与鞋面的浅色将块面分成几个可读区域。",
      "色彩": "外套和裤装在当前光线下接近深色，白色内搭是主要明度对比。视频画面不能精确区分深蓝与黑色，分析以深浅关系为主。",
      "材质": "外套表面的高光和裤腿褶皱提示两者的表面并不完全相同；单帧不足以判断厚度、触感或成分。",
      "风格": "外套领型和裤装直线提供秩序，敞穿与运动鞋保留日常活动感。它是可拆解的穿法，不是必须复制的人设。",
      "细节": "前襟开口、内搭下摆和鞋面是三处连接点。动手调整其中一处时，另外两处尽量保持不变，更容易理解改变来自哪里。"
    },
    "observationNote": "户外光线、拍摄高度、人物站位和镜头距离都会影响画面。本案例只描述这一帧中可见的穿着关系，不把视频内不同场景当作同条件实验。",
    "relatedLessonIds": [
      "layering-openings",
      "proportion",
      "shoe-ending",
      "read-creator-outfits"
    ]
  }
];

export const creatorLessons: Lesson[] = [
  {
    "id": "read-creator-outfits",
    "category": "人",
    "kind": "principle",
    "title": "看博主图，学关系，不急着抄结论",
    "subtitle": "把衣物变化与拍摄效果分开",
    "core": "真正可迁移的，是画面里能说清楚、也能在自己身上验证的衣物关系。",
    "observation": "看阿源匹林的户外画面：先描述外套开口、内搭明度与裤脚落点，再留意镜头高度、距离和站姿。前一组是穿着线索，后一组是拍摄条件。",
    "a": "先记录可见的衣物关系",
    "b": "先判断拍摄条件的影响",
    "explanation": "两种观察都需要。先写下深色外套敞开、白内搭露出、裤脚接近鞋面，再检查是否存在低机位、站位变化或不同场景。只有一个人、同一件衣服、相近姿势和拍摄位置的对比，才更容易判断某一次调整的影响。作者的身高、购买链接或字幕结论，都不能替你完成这一步。",
    "mistake": "把截图里的“显高”“百搭”直接当作普遍规则，或者根据一帧就断定面料与版型一定适合自己。",
    "takeaway": "先写一个看得见的关系，再用自己的衣服做一次验证。",
    "minutes": 6,
    "caseId": "ayuan-dark-layers",
    "relatedCaseIds": [
      "chammy-navy-white"
    ],
    "variable": "shape",
    "relatedLessonIds": [
      "proportion",
      "silhouette",
      "person"
    ],
    "practice": {
      "steps": [
        "选一张全身图，只用中性词写下三处衣物关系，例如“前襟打开、内搭较亮、裤脚接近鞋面”。",
        "检查头脚是否完整，记录姿势、光线、镜头高度和距离；无法确认的地方直接记为未知。",
        "用自己的相似单品，只调整衣摆或外套开口，保持手机位置、站位和鞋子一致，再看变化。"
      ],
      "checkpoint": "你能区分“我看见了什么”和“我推测它会怎样”吗？不需要得出身材好坏的结论。"
    }
  },
  {
    "id": "layering-openings",
    "category": "轮廓",
    "kind": "principle",
    "title": "叠穿，先照顾三个开口",
    "subtitle": "领口、前襟与下摆如何一起工作",
    "core": "叠穿的层次来自可见的边界与留白，不只是多穿一件。",
    "observation": "在户外案例中沿领口向下看：白色内搭从敞开的深色外套中露出，外套下摆结束在胯部附近，深色裤装接着向下延伸。",
    "a": "收小前襟开口，让外形集中",
    "b": "敞开前襟，露出内搭亮线",
    "explanation": "收小开口时，深色外套更像完整的块面；敞开后，白色内搭在中间形成可见线条。两种设想都要一起看领口高度和下摆长度：领口、前襟、下摆如果都在抢注意，层次可能变得零碎。这张图只展示敞穿状态，其他穿法需要实际试穿验证。",
    "mistake": "把“露得越多越有层次”当成规则，或仅凭照片忽略温度、抬手和坐下时的舒适度。",
    "takeaway": "先调整一个开口，看清变化，再决定是否增加另一层。",
    "minutes": 5,
    "caseId": "ayuan-dark-layers",
    "variable": "shape",
    "relatedLessonIds": [
      "coat-length",
      "color",
      "detail"
    ],
    "practice": {
      "steps": [
        "用一件外套和一件内搭，固定裤子与鞋子，先观察外套闭合或开口较小时的整体块面。",
        "逐步打开前襟，比较内搭露出面积与领口焦点，保持衣摆位置不变。",
        "再单独调整内搭下摆，检查是否出现过多横向分界，并抬手、坐下检查活动感受。"
      ],
      "checkpoint": "哪一个开口是你想保留的重点？其余开口是否能更安静一点？"
    }
  },
  {
    "id": "trouser-shoe-break",
    "category": "细节",
    "kind": "principle",
    "title": "裤脚怎么结束，比裤型名字更具体",
    "subtitle": "看接触点、堆积与鞋面露出面积",
    "core": "裤长要结合鞋面高度、裤口宽度与走动状态一起判断。",
    "observation": "看痴五安的米白裤脚：布料在鞋面上方出现褶皱，鞋头仍可见。再沿裤腿向上看，这个局部停顿有没有打断你想要的纵向线条。",
    "a": "减少裤脚堆积，让鞋面更清楚",
    "b": "保留少量接触，延续裤腿体积",
    "explanation": "裤脚离鞋面更远时，收尾边界更明确；轻触鞋面时，裤腿与鞋更容易连成整体。是否需要调整，取决于裤口宽度、面料垂落与鞋面高度。图中是静止状态，不能由一帧推断走路是否拖地，也不能把鞋头可见当成唯一标准。",
    "mistake": "只按身高选固定裤长，或把九分、全长、微喇当成自带好坏的标签。",
    "takeaway": "穿着当天的鞋，再决定裤脚应该停在哪里。",
    "minutes": 5,
    "caseId": "chammy-navy-white",
    "relatedCaseIds": [
      "ayuan-dark-layers"
    ],
    "variable": "shape",
    "relatedLessonIds": [
      "straight-trousers",
      "wide-trousers",
      "shoe-ending"
    ],
    "practice": {
      "steps": [
        "穿上实际准备搭配的鞋，站直看正面和侧面，找裤脚第一次接触鞋面的位置。",
        "临时向内折起少量裤脚，其他部分保持不变，比较鞋面露出与褶皱数量。",
        "来回走几步再坐下，确认裤脚没有踩地、卡住鞋跟，也没有影响活动。"
      ],
      "checkpoint": "你选择的是清楚的停顿还是连续的体积？这个选择在走动时仍然成立吗？"
    }
  }
];

export const tutorialExtensions: Record<string, Partial<Lesson>> = {
  "proportion": {
    "relatedCaseIds": [
      "chammy-navy-white",
      "ayuan-dark-layers"
    ],
    "relatedLessonIds": [
      "read-creator-outfits",
      "layering-openings"
    ],
    "practice": {
      "steps": [
        "固定鞋子、手机高度和站位，先拍衣摆自然放下的状态。",
        "只把前侧衣摆少量收进腰头，保持肩线和站姿不变。",
        "比较分界与侧面堆积，再抬手坐下，找视觉与舒适都能接受的位置。"
      ],
      "checkpoint": "你能指出变化来自哪条衣物边界，而不是镜头角度吗？"
    }
  },
  "color": {
    "relatedCaseIds": [
      "chammy-navy-white"
    ],
    "relatedLessonIds": [
      "read-creator-outfits",
      "weight"
    ],
    "practice": {
      "steps": [
        "在全身画面中先找最亮和最暗的两块区域，不急着给颜色命名。",
        "观察一种明度是否在上衣、鞋或配饰间重复。",
        "用现有单品换掉一处颜色，保持光线和其他单品不变，比较视线先停在哪里。"
      ],
      "checkpoint": "呼应来自同色、近似明度，还是只是背景造成的错觉？"
    }
  },
  "silhouette": {
    "relatedCaseIds": [
      "chammy-navy-white"
    ],
    "relatedLessonIds": [
      "trouser-shoe-break",
      "wide-trousers"
    ],
    "practice": {
      "steps": [
        "先忽略图案，只沿肩、衣摆、裤口追踪外边界。",
        "只改变裤脚的收放，比较下半身是收束还是展开。",
        "用侧面和走动状态复看，确认边界并非由单一站姿制造。"
      ],
      "checkpoint": "不用“显瘦”或“显高”，你能描述轮廓怎样改变吗？"
    }
  },
  "shoe-ending": {
    "relatedCaseIds": [
      "chammy-navy-white",
      "ayuan-dark-layers"
    ],
    "relatedLessonIds": [
      "trouser-shoe-break",
      "loafers"
    ],
    "practice": {
      "steps": [
        "保持裤子与上衣一致，只更换鞋面高度不同的两双鞋。",
        "分别观察裤脚接触点、露出的鞋头长度与局部褶皱。",
        "走几步再拍侧面，比较是否需要调整裤脚，而不是马上否定鞋型。"
      ],
      "checkpoint": "改变的主要是颜色、体积还是裤脚接触位置？"
    }
  },
  "coat-length": {
    "relatedCaseIds": [
      "ayuan-dark-layers"
    ],
    "relatedLessonIds": [
      "layering-openings",
      "proportion"
    ],
    "practice": {
      "steps": [
        "把外套下摆、内搭下摆与裤腰三个位置分开辨认。",
        "先只改变前襟开口，比较内搭能被看见的面积。",
        "再单独收起一部分内搭下摆，确认层次是否更清楚。"
      ],
      "checkpoint": "你关注的是衣长本身，还是开口使衣长看起来不同？"
    }
  },
  "tee": {
    "relatedCaseIds": [
      "chammy-navy-white"
    ],
    "relatedLessonIds": [
      "read-creator-outfits",
      "detail"
    ],
    "practice": {
      "steps": [
        "先看T恤的肩线和袖口，再看衣摆遮住多少裤腰。",
        "只调整衣摆，保留同一条裤子和同一站位。",
        "把图案遮住再观察一次，分辨吸引你的是版型还是印花。"
      ],
      "checkpoint": "哪一处变量真正影响了你想要的休闲程度？"
    }
  }
};
