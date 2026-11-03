// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "vision", tagColor: "indigo", label: "视觉", feedLabel: "计算机视觉", section: "视觉", guide: "让机器看懂或生成画面：图像、视频、3D 与点云的理解、生成、编辑、重建、检测、分割、跟踪与测量；视觉模型、数据集、相机与影像硬件；机器人视觉、自动驾驶感知、遥感、医学影像、工业质检等视觉应用。只是配了图、核心却是通用大模型或游戏制作的，不归这里。" },
  { key: "llm-apps", tagColor: "turquoise", label: "大模型应用", feedLabel: "大模型应用", section: "大模型应用", guide: "用大模型做成可用的东西：Agent、RAG、工作流、编码助手、客服与办公应用、企业落地案例、API 与价格、选型与成本、提示词与上下文工程。模型本身的发布、能力评测和训练方法归 AI 前沿；把模型接进产品、落进业务的做法归这里。" },
  { key: "game-dev", tagColor: "orange", label: "游戏开发", feedLabel: "游戏开发", section: "游戏开发", guide: "游戏制作本身：引擎与工具链（Unity、Unreal、Godot）、游戏 AI、AI 美术与资产生成、程序化生成、关卡与动画工作流、游戏公司经营与发行。面向游戏制作的通用 AI 研究也归这里；单纯的新游评测、玩家讨论和硬件开箱不收。" },
  { key: "frontier", tagColor: "violet", label: "AI 前沿", feedLabel: "AI 前沿", section: "AI 前沿", guide: "通用 AI 的模型发布、能力评测、论文与研究、实验室与人才、算力芯片与基础设施、政策与安全。前三个方向都装不下时的 AI 行业新闻也放这里。判断看它是否改变对 AI 能力边界、成本或供给的判断。" },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（视觉行业是新模型）：日报报头的“N 个新模型”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = null;

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "api", "sdk", "gpu", "npu", "llm", "vlm", "agent", "rag", "cv", "3d", "ocr", "sota", "moe", "rlhf", "dpo", "sft", "unity", "unreal", "steam"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "模型发布", "产品更新", "论文/研究", "开源/仓库", "评测/基准", "数据集", "教程/实践", "行业动态", "政策/监管",
  "安全/对齐", "硬件/设备", "现象/趋势", "大佬观点", "工具更新", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "目标检测", "图像分割", "图像生成", "视频生成", "视频理解", "3D/重建", "多模态", "具身智能", "自动驾驶", "医学影像", "遥感", "OCR/文档",
  "Agent", "RAG", "编码助手", "提示词/工作流", "企业落地",
  "游戏引擎", "游戏AI", "AI美术",
  "算力/芯片", "世界模型", "推理模型", "开源模型", "端侧部署",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = [
  "OpenAI", "Google", "Meta", "NVIDIA", "Microsoft", "Apple", "Adobe", "Anthropic", "DeepSeek", "阿里巴巴", "腾讯", "字节跳动",
  "Unity", "Epic Games", "米哈游", "网易", "Stability AI", "Runway", "Black Forest Labs", "Hugging Face", "商汤", "Tesla",
] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "教程/玩法": "教程/实践", "技巧/最佳实践": "教程/实践", "合作/生态": "行业动态", "融资/收购": "行业动态", "公司动态": "行业动态",
  合作: "行业动态", 生态: "行业动态", 融资: "行业动态", 收购: "行业动态", 投资: "行业动态", 并购: "行业动态",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 安全: "安全/对齐", 对齐: "安全/对齐",
  论文: "论文/研究", 研究: "论文/研究", paper: "论文/研究", papers: "论文/研究",
  "open-source": "开源/仓库", 开源: "开源/仓库", 仓库: "开源/仓库", repo: "开源/仓库",
  教程: "教程/实践", 玩法: "教程/实践", 指南: "教程/实践", 技巧: "教程/实践", 最佳实践: "教程/实践", 实践: "教程/实践",
  产品: "产品更新", 更新: "产品更新", 发布: "模型发布", 模型: "模型发布", 新模型: "模型发布", 趋势: "现象/趋势", 现象: "现象/趋势", 观点: "大佬观点",
  数据集: "数据集", dataset: "数据集", datasets: "数据集", benchmark: "评测/基准", benchmarks: "评测/基准", 榜单: "评测/基准", 跑分: "评测/基准",
  硬件: "硬件/设备", 芯片: "硬件/设备", 设备: "硬件/设备", 相机: "硬件/设备", 传感器: "硬件/设备",
  行业: "行业动态", 动态: "行业动态", 工具: "工具更新", 工具链: "工具更新", devtool: "工具更新",
  检测: "目标检测", detection: "目标检测", 目标识别: "目标检测",
  分割: "图像分割", segmentation: "图像分割", 抠图: "图像分割",
  生成: "图像生成", 文生图: "图像生成", 图像合成: "图像生成",
  文生视频: "视频生成", 视频合成: "视频生成", 视频编辑: "视频生成",
  多模态: "多模态", multimodal: "多模态", vlm: "多模态", 视觉语言模型: "多模态",
  "3d": "3D/重建", 三维: "3D/重建", 重建: "3D/重建", nerf: "3D/重建", 点云: "3D/重建",
  具身: "具身智能", 具身智能: "具身智能", 机器人: "具身智能",
  自动驾驶: "自动驾驶", 智驾: "自动驾驶", 医学影像: "医学影像", 医疗: "医学影像",
  遥感: "遥感", ocr: "OCR/文档", 文档: "OCR/文档", 文字识别: "OCR/文档",
  agent: "Agent", 智能体: "Agent", 代理: "Agent",
  rag: "RAG", 检索增强: "RAG", 知识库: "RAG",
  编码: "编码助手", 编程: "编码助手", coding: "编码助手", 代码助手: "编码助手",
  提示词: "提示词/工作流", prompt: "提示词/工作流", 工作流: "提示词/工作流", mcp: "提示词/工作流", 上下文工程: "提示词/工作流",
  落地: "企业落地", 案例: "企业落地", 企业应用: "企业落地", 商业化: "企业落地",
  引擎: "游戏引擎", 游戏引擎: "游戏引擎", unity: "游戏引擎", unreal: "游戏引擎", godot: "游戏引擎",
  游戏ai: "游戏AI", npc: "游戏AI", 游戏: "游戏AI",
  美术: "AI美术", 资产生成: "AI美术", 原画: "AI美术", "3d资产": "AI美术",
  算力: "算力/芯片", 数据中心: "算力/芯片",
  世界模型: "世界模型", "world model": "世界模型",
  推理模型: "推理模型", reasoning: "推理模型", 思维链: "推理模型",
  开源模型: "开源模型", 开放权重: "开源模型",
  端侧: "端侧部署", "on-device": "端侧部署",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家公司发消息时开头用的组织名（公司、实验室、团队），
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是公司的其他称呼（官方账号名、子品牌）。
 * 所有这些名字都用来认出说的是哪家公司，比如把事实的主体对到发布方。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  openai: { name: "OpenAI", displayTag: "OpenAI", aliases: ["OpenAI", "ChatGPT", "GPT", "Sora", "DALL·E", "DALL-E", "Codex"], orgNames: ["OpenAI"], otherNames: ["OpenAI Developers"] },
  google: { name: "Google / DeepMind", displayTag: "Google", aliases: ["Google", "DeepMind", "Gemini", "Veo", "Imagen", "谷歌"], orgNames: ["Google DeepMind", "Google Research", "Google", "DeepMind", "谷歌"], otherNames: ["Google AI", "Google Labs", "Gemini"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Llama", "SAM", "Segment Anything", "DINO"], orgNames: ["Meta AI", "Meta", "FAIR"], otherNames: ["AI at Meta"] },
  nvidia: { name: "NVIDIA 英伟达", displayTag: "NVIDIA", aliases: ["NVIDIA", "英伟达", "CUDA", "TensorRT", "Omniverse", "Isaac"], orgNames: ["NVIDIA", "英伟达"], otherNames: ["NVIDIA Research", "NVIDIA Developer"] },
  microsoft: { name: "Microsoft 微软", displayTag: "Microsoft", aliases: ["Microsoft", "微软", "Copilot", "Azure", "Phi"], orgNames: ["Microsoft Research", "Microsoft", "微软"] },
  apple: { name: "Apple 苹果", displayTag: "Apple", aliases: ["Apple", "苹果", "Vision Pro", "Core ML"], orgNames: ["Apple", "苹果"], otherNames: ["Apple Machine Learning Research"] },
  adobe: { name: "Adobe", displayTag: "Adobe", aliases: ["Adobe", "Firefly", "Photoshop", "Premiere", "Lightroom"], orgNames: ["Adobe", "Adobe Research"] },
  anthropic: { name: "Anthropic / Claude", displayTag: "Anthropic", aliases: ["Anthropic", "Claude", "Claude Code"], orgNames: ["Anthropic"], otherNames: ["Claude Code"] },
  deepseek: { name: "DeepSeek 深度求索", displayTag: "DeepSeek", aliases: ["DeepSeek", "深度求索"], orgNames: ["DeepSeek", "深度求索"] },
  alibaba: { name: "阿里 / 通义", displayTag: "阿里巴巴", aliases: ["阿里巴巴", "阿里", "Alibaba", "通义", "Qwen", "万相", "Wan"], orgNames: ["阿里巴巴", "阿里云", "通义实验室", "Qwen Team", "Alibaba"] },
  tencent: { name: "腾讯", displayTag: "腾讯", aliases: ["腾讯", "Tencent", "混元", "Hunyuan"], orgNames: ["腾讯", "Tencent", "混元", "Hunyuan"] },
  bytedance: { name: "字节跳动", displayTag: "字节跳动", aliases: ["字节跳动", "字节", "ByteDance", "豆包", "即梦", "Seedream", "Seedance", "Seed"], orgNames: ["字节跳动", "ByteDance", "Seed", "豆包", "即梦"] },
  baidu: { name: "百度", displayTag: null, aliases: ["百度", "Baidu", "文心", "ERNIE", "Apollo", "萝卜快跑"], orgNames: ["百度", "Baidu", "Apollo"] },
  unity: { name: "Unity", displayTag: "Unity", aliases: ["Unity", "Unity Technologies", "Unity 6"], orgNames: ["Unity", "Unity Technologies"] },
  "epic-games": { name: "Epic Games / Unreal", displayTag: "Epic Games", aliases: ["Epic Games", "Unreal Engine", "Unreal", "UE5", "UE6", "Fortnite"], orgNames: ["Epic Games", "Unreal Engine"] },
  mihoyo: { name: "米哈游", displayTag: "米哈游", aliases: ["米哈游", "miHoYo", "HoYoverse", "原神", "Genshin", "崩坏", "星穹铁道", "绝区零", "Zenless"], orgNames: ["米哈游", "miHoYo", "HoYoverse"] },
  netease: { name: "网易", displayTag: "网易", aliases: ["网易", "NetEase", "Netease", "逆水寒", "蛋仔派对"], orgNames: ["网易", "NetEase"] },
  valve: { name: "Valve / Steam", displayTag: null, aliases: ["Valve", "Steam", "Valve Corporation"], orgNames: ["Valve"] },
  "stability-ai": { name: "Stability AI", displayTag: "Stability AI", aliases: ["Stability AI", "Stable Diffusion", "SDXL", "SD3"], orgNames: ["Stability AI"] },
  midjourney: { name: "Midjourney", displayTag: null, aliases: ["Midjourney"], orgNames: ["Midjourney"] },
  runway: { name: "Runway", displayTag: "Runway", aliases: ["Runway", "Gen-3", "Gen-4"], orgNames: ["Runway", "Runway ML"] },
  "black-forest-labs": { name: "Black Forest Labs", displayTag: "Black Forest Labs", aliases: ["Black Forest Labs", "FLUX"], orgNames: ["Black Forest Labs"] },
  "hugging-face": { name: "Hugging Face", displayTag: "Hugging Face", aliases: ["Hugging Face"], orgNames: ["Hugging Face", "HuggingFace"] },
  sensetime: { name: "商汤 SenseTime", displayTag: "商汤", aliases: ["商汤", "SenseTime", "日日新", "绝影"], orgNames: ["商汤科技", "商汤", "SenseTime"] },
  megvii: { name: "旷视 Megvii", displayTag: null, aliases: ["旷视", "Megvii", "Face++"], orgNames: ["旷视科技", "旷视", "Megvii"] },
  kuaishou: { name: "快手 / 可灵", displayTag: null, aliases: ["快手", "Kuaishou", "可灵", "Kling"], orgNames: ["快手", "Kuaishou", "可灵", "Kling"] },
  tesla: { name: "Tesla", displayTag: "Tesla", aliases: ["Tesla", "特斯拉", "FSD", "Optimus"], orgNames: ["Tesla", "特斯拉"] },
  waymo: { name: "Waymo", displayTag: null, aliases: ["Waymo"], orgNames: ["Waymo"] },
  dji: { name: "大疆 DJI", displayTag: null, aliases: ["大疆", "DJI", "RoboMaster", "Osmo"], orgNames: ["大疆", "DJI"] },
  xai: { name: "xAI / Grok", displayTag: null, aliases: ["xAI", "Grok"], orgNames: ["xAI"] },
  zhipu: { name: "智谱 GLM", displayTag: null, aliases: ["智谱", "GLM", "Z.ai"], orgNames: ["智谱AI", "智谱", "Zhipu AI", "Z.ai"] },
  minimax: { name: "MiniMax", displayTag: null, aliases: ["MiniMax", "海螺"], orgNames: ["MiniMax", "稀宇科技"] },
  moonshot: { name: "月之暗面 / Kimi", displayTag: null, aliases: ["Kimi", "月之暗面", "Moonshot"], orgNames: ["Moonshot AI", "月之暗面", "Kimi"] },
  hikvision: { name: "海康威视", displayTag: null, aliases: ["海康威视", "海康", "Hikvision", "萤石", "EZVIZ"], orgNames: ["海康威视", "Hikvision"] },
  "horizon-robotics": { name: "地平线", displayTag: null, aliases: ["地平线", "Horizon Robotics", "征程"], orgNames: ["地平线", "Horizon Robotics"] },
  unitree: { name: "宇树科技", displayTag: null, aliases: ["宇树", "Unitree"], orgNames: ["宇树科技", "Unitree"] },
  roblox: { name: "Roblox", displayTag: null, aliases: ["Roblox"], orgNames: ["Roblox"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "openai", name: "OpenAI", patterns: [/openai|chatgpt|\bsora\b|dall[\s·-]?e\b|\bgpt-?[45]o?\b|\bcodex\b/i] },
  { id: "google", name: "Google / DeepMind", patterns: [/google|deepmind|\bgemini\b|\bveo\b|\bimagen\b/i] },
  { id: "meta", name: "Meta", patterns: [/\bmeta\b|\bllama\b|segment anything|\bsam\s?\d\b/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|英伟达|\bcuda\b|omniverse|\bisaac\b|jetson|tensorrt/i] },
  { id: "microsoft", name: "Microsoft", patterns: [/microsoft|微软|copilot|azure/i] },
  { id: "apple", name: "Apple", patterns: [/\bapple\b|苹果|vision\s?pro|core\s?ml/i] },
  { id: "adobe", name: "Adobe", patterns: [/adobe|photoshop|firefly|premiere|lightroom/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|\bclaude\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|深度求索/i] },
  { id: "alibaba", name: "阿里 / 通义", patterns: [/阿里|alibaba|通义|\bqwen\b|万相/i] },
  { id: "tencent", name: "腾讯", patterns: [/腾讯|tencent|混元|hunyuan/i] },
  { id: "bytedance", name: "字节跳动", patterns: [/字节|bytedance|豆包|即梦|seedream|seedance/i] },
  { id: "baidu", name: "百度", patterns: [/百度|baidu|文心|\bernie\b|apollo|萝卜快跑/i] },
  { id: "unity", name: "Unity", patterns: [/\bunity\b/i] },
  { id: "epic-games", name: "Epic Games", patterns: [/epic\s?games|unreal\s?engine|\bue[56]\b|fortnite/i] },
  { id: "mihoyo", name: "米哈游", patterns: [/米哈游|mihoyo|hoyoverse|原神|genshin|崩坏|星穹铁道|绝区零|zenless/i] },
  { id: "netease", name: "网易", patterns: [/网易|netease|逆水寒|蛋仔派对/i] },
  { id: "valve", name: "Valve / Steam", patterns: [/\bvalve\b|\bsteam\b|half-life|dota|\bcs2\b/i] },
  { id: "stability-ai", name: "Stability AI", patterns: [/stability\s?ai|stable\s?diffusion|sdxl|\bsd3\b/i] },
  { id: "midjourney", name: "Midjourney", patterns: [/midjourney/i] },
  { id: "runway", name: "Runway", patterns: [/\brunway\b|gen-?[34]/i] },
  { id: "black-forest-labs", name: "Black Forest Labs", patterns: [/black\s?forest\s?labs|\bflux\b/i] },
  { id: "hugging-face", name: "Hugging Face", patterns: [/hugging\s?face/i] },
  { id: "sensetime", name: "商汤", patterns: [/商汤|sensetime|日日新|绝影/i] },
  { id: "megvii", name: "旷视", patterns: [/旷视|megvii|face\+\+/i] },
  { id: "kuaishou", name: "快手 / 可灵", patterns: [/快手|kuaishou|可灵|\bkling\b/i] },
  { id: "tesla", name: "Tesla", patterns: [/tesla|特斯拉|\bfsd\b|optimus/i] },
  { id: "waymo", name: "Waymo", patterns: [/waymo/i] },
  { id: "dji", name: "大疆", patterns: [/大疆|\bdji\b|robomaster|osmo/i] },
  { id: "xai", name: "xAI", patterns: [/\bxai\b|\bgrok\b/i] },
  { id: "zhipu", name: "智谱", patterns: [/智谱|\bglm-?[4-9]/i] },
  { id: "minimax", name: "MiniMax", patterns: [/minimax/i] },
  { id: "moonshot", name: "月之暗面", patterns: [/\bkimi\b|月之暗面|\bmoonshot\s?ai\b/i] },
  { id: "hikvision", name: "海康威视", patterns: [/海康|hikvision|萤石|ezviz/i] },
  { id: "horizon-robotics", name: "地平线", patterns: [/地平线|horizon\s?robotics|征程/i] },
  { id: "unitree", name: "宇树", patterns: [/宇树|unitree/i] },
  { id: "roblox", name: "Roblox", patterns: [/roblox/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "google", domains: ["deepmind.google", "research.google", "blog.google", "ai.google"] },
  { entityId: "meta", domains: ["ai.meta.com", "about.fb.com"] },
  { entityId: "nvidia", domains: ["blogs.nvidia.com", "developer.nvidia.com", "nvidia.com"] },
  { entityId: "microsoft", domains: ["microsoft.com"] },
  { entityId: "apple", domains: ["machinelearning.apple.com", "apple.com"] },
  { entityId: "adobe", domains: ["adobe.com", "blog.adobe.com", "research.adobe.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "alibaba", domains: ["alibabacloud.com", "aliyun.com"] },
  { entityId: "tencent", domains: ["tencent.com"] },
  { entityId: "bytedance", domains: ["bytedance.com"] },
  { entityId: "baidu", domains: ["baidu.com"] },
  { entityId: "unity", domains: ["unity.com", "blog.unity.com"] },
  { entityId: "epic-games", domains: ["epicgames.com", "unrealengine.com"] },
  { entityId: "mihoyo", domains: ["mihoyo.com", "hoyoverse.com"] },
  { entityId: "netease", domains: ["netease.com", "163.com"] },
  { entityId: "valve", domains: ["valvesoftware.com", "steampowered.com"] },
  { entityId: "stability-ai", domains: ["stability.ai"] },
  { entityId: "midjourney", domains: ["midjourney.com"] },
  { entityId: "runway", domains: ["runwayml.com"] },
  { entityId: "black-forest-labs", domains: ["blackforestlabs.ai"] },
  { entityId: "hugging-face", domains: ["huggingface.co"] },
  { entityId: "sensetime", domains: ["sensetime.com"] },
  { entityId: "megvii", domains: ["megvii.com"] },
  { entityId: "kuaishou", domains: ["kuaishou.com"] },
  { entityId: "tesla", domains: ["tesla.com"] },
  { entityId: "waymo", domains: ["waymo.com"] },
  { entityId: "dji", domains: ["dji.com"] },
  { entityId: "xai", domains: ["x.ai"] },
  { entityId: "zhipu", domains: ["zhipuai.cn", "bigmodel.cn"] },
  { entityId: "minimax", domains: ["minimaxi.com"] },
  { entityId: "moonshot", domains: ["moonshot.cn"] },
  { entityId: "hikvision", domains: ["hikvision.com"] },
  { entityId: "horizon-robotics", domains: ["horizon.cc", "horizon.ai"] },
  { entityId: "unitree", domains: ["unitree.com"] },
  { entityId: "roblox", domains: ["roblox.com"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "meta", pattern: /@AIatMeta\b/i },
  { entityId: "google", pattern: /@GoogleDeepMind\b/i },
  { entityId: "anthropic", pattern: /@AnthropicAI\b/i },
];
