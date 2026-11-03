
【AI 领域翻译规则 — 本平台 100% 是 AI / 大模型 / 视觉 / 游戏开发内容，严格遵守】

1. 歧义默认值：以下词在中文有非 AI 歧义，**一律按 AI 含义翻译**：
   - LLM = 大语言模型（绝不译"法学硕士"/"Master of Laws"）
   - Token / tokens = 模型 token（保留英文；绝不译"代币"/"令牌"）
   - Transformer = Transformer 架构（保留英文；不译"变压器"）
   - Diffusion = 扩散模型（AI 生成，不是物理扩散）
   - Agent / Agentic = AI 智能体 / 智能体的（不译"代理人"/"中介"）
   - Alignment = 对齐（AI 安全语境）
   - Inference = 推理（模型生成，不是逻辑推理）
   - Reasoning = 推理（推理模型；必要时用"链式推理"区分 CoT）
   - Embedding = 嵌入向量（也可保留英文）
   - Distillation = 知识蒸馏
   - Hallucination = 模型幻觉
   - Fine-tune / Fine-tuning = 微调
   - Pretrain / Pretraining = 预训练
   - Context window = 上下文窗口
   - Prompt = 提示词
   - Skill / Skills = 技能（Agent 框架的能力包，不译"特长"）
   - Detection = 检测（目标检测，不是"侦查"）；Segmentation = 分割；Tracking = 跟踪
   - Pose estimation = 姿态估计；Depth estimation = 深度估计；Optical flow = 光流
   - Reconstruction = 重建（三维重建）
   - Zero-shot = 零样本；Few-shot = 少样本；Open-vocabulary = 开放词汇
   - Engine = 引擎（游戏引擎，不是"发动机"）；Shader = 着色器；Asset = 资产（美术资产）
   - Pipeline = 管线/工作流（按上下文，美术管线、渲染管线、部署管线）
   - Level design = 关卡设计；Procedural generation = 程序化生成

2. 以下专有名词**一律保留英文原文**，不翻译不加中文括注：
   - 公司与实验室：OpenAI / Anthropic / Google DeepMind / Meta AI / NVIDIA / Microsoft Research / Apple / Adobe / Stability AI / Midjourney / Runway / Black Forest Labs / Hugging Face / Pika / Luma AI / SenseTime / Megvii / Unity / Epic Games / Valve / miHoYo
   - 模型与产品（举例 + 通用规则）：GPT / Claude / Gemini / Llama / Qwen / Grok / DeepSeek / Mistral / Sora / Veo / Imagen / FLUX / Stable Diffusion / SAM / DINOv2 / CLIP / YOLO / Claude Code / Copilot / Cursor / LangChain / LlamaIndex
     **规则**：任何模型族名、产品代号一律保留英文
   - 模型版本号（举例 + 通用规则）：GPT-5 / Claude Sonnet 4.6 / Gemini 4 / Llama 4 / DeepSeek-V4 / Qwen3.7 / FLUX.1 / SD 3.5 / UE5 / Unity 6
     **规则**：版本号一字不改（包括字母数字后缀如 4o / 4.7 / 405B / V4 / R1），绝不"翻译性扩写"
   - 技术缩写：LLM / VLM / VLA / RAG / RLHF / DPO / LoRA / QLoRA / MoE / CoT / ReAct / MCP / ViT / CNN / GAN / NeRF / SLAM / LiDAR / OCR / mAP / IoU / FID / SOTA / API / SDK / GPU / NPU / TPU / CUDA / TensorRT / ONNX
     **规则**：任何 2-5 字母的全大写缩写，默认按 AI/ML 含义保留英文
   - 评测基准与数据集：MMLU / GPQA / SWE-bench / HumanEval / HLE / ARC-AGI / COCO / ImageNet / Cityscapes / nuScenes / VQA / MMMU / Kinetics
     **规则**：数据集与 benchmark 名称一律保留英文
   - 工具与框架：PyTorch / TensorFlow / JAX / OpenCV / Detectron2 / MMDetection / Ultralytics / Roboflow / ComfyUI / Diffusers / vLLM / SGLang / LangChain / LangGraph / CrewAI / DSPy / Unreal Engine / Godot / Blender / Houdini / Substance
   - 通用技术：API / SDK / CLI / SaaS / CDN / WebGPU / WebAssembly

3. 中国厂商**优先用官方中文品牌名**（首次出现可双标"可灵（Kling）"，后续选一种保持一致）：
   - 千问（Qwen）/ 文心一言 / 智谱（GLM）/ 月之暗面（Kimi）/ 深度求索（DeepSeek）/ 阶跃星辰（Step）/ 零一万物（Yi）/ 百川 / 豆包（字节）/ 混元（腾讯）/ 可灵（Kling，快手）/ 即梦（Jimeng，字节）/ MiniMax（不译）/ 美团 LongCat / 商汤（SenseTime）/ 旷视（Megvii）/ 米哈游（miHoYo）/ 网易（NetEase）/ 华为昇腾 / 寒武纪

4. 代码 / 命令 / URL / 数字与单位 **一字不改**保留：
   - 反引号代码 `code` 不翻译
   - 命令如 pip install、python train.py、unity -batchmode 不译
   - URL 原样
   - 数字+单位：640×640 / 30 FPS / 8 GB 显存 / 24 GB VRAM / +3.2 mAP / $0.01 per image / 4K / 30 ms
   - 金额、参数量、比例、区间必须保留原文的阿拉伯数字和单位；不要把 $10M-$100M 改写成“数千万至数亿美元”等中文数量词
