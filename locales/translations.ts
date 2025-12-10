
import { Project, Skill } from "../types";

export const translations = {
  'zh-CN': {
    nav: {
      home: '首页',
      homeSub: 'HOME',
      skills: '技能',
      skillsSub: 'SKILLS',
      works: '作品集',
      worksSub: 'WORKS',
      about: '关于',
      aboutSub: 'ABOUT',
      business: '商务合作',
      businessSub: 'CONTACT',
      startProject: '发起项目',
      langName: '中文'
    },
    hero: {
      greeting: '<你好世界 />',
      iam: '我是',
      roles: ['全栈开发', 'AI 自动化', 'UI/UX 设计'],
      description: '将复杂的问题转化为优雅的交互式 Web 体验。专注于将生成式 AI 集成到现代 Web 应用程序中，打造下一代数字产品。',
      contact: '联系我',
      businessBtn: '商单洽谈'
    },
    skills: {
      title: '技术专长',
      desc: '我的技术武器库可视化分解。我专注于现代 Web 技术和 AI 集成。',
      core: '核心技能指标',
      radar: '能力雷达',
      other: '其他工具与技术'
    },
    works: {
      title: '精选作品',
      desc: '定义我职业生涯的项目列表。',
      viewGithub: '查看 Github',
      modal: {
        challenges: '技术挑战',
        results: '项目成果',
        techStack: '技术栈',
        features: '核心功能',
        visit: '访问项目',
        close: '关闭'
      },
      projects: [
        {
          id: 6,
          title: 'N8N+Dify 打造新闻定时推送流',
          category: '自动化设计',
          description: '基于 N8N 与 DeepSeek 的全自动新闻摘要与推送系统。',
          fullDescription: '这是一个全自动化的信息获取工作流。通过 N8N 监听多个 RSS 订阅源（包括掘金、B站、36Kr、虎嗅等），自动进行数据清洗与去重。随后调用 Dify (DeepSeek 模型) 对长文章进行智能摘要，提取核心观点，最后汇聚成一份 Markdown 格式的早报，通过 SMTP 邮件服务定时发送。',
          challenges: '主要难点在于处理不同 RSS 源的数据格式异构性，以及优化 LLM 的 prompt 以确保摘要的准确度与可读性。',
          results: '实现了"零噪音"的高效阅读体验，每天自动处理 100+ 条资讯，节省阅读时间 90%。',
          image: '/n8n-news-detail-1.png',
          gallery: [],
          features: ['RSS 多源聚合', 'DeepSeek 智能摘要', 'HTML/Markdown 邮件模版', '定时自动化任务'],
          tech: ['N8N', 'Dify', 'DeepSeek', 'RSS', 'SMTP'],
          link: '#'
        },
        {
          id: 2,
          title: 'Dify 视频生成自动化',
          category: '自动化设计',
          description: '零代码用 Dify 使用梦 AI 3.0 多模态模型，免费生成影视级视频。',
          fullDescription: '这是一个基于 Dify 的创新自动化工作流，整合了最新的 Dream AI 3.0 多模态大模型。用户只需输入简单的文本提示词，系统即可自动完成脚本编写、分镜生成、图像绘制及视频合成的全过程。无需任何编程基础，即可免费产出好莱坞级别的影视短片。',
          challenges: '主要挑战在于解决多模态模型间的上下文连贯性，以及在 Dify 编排中优化视频生成的等待时间与回调机制。',
          results: '实现了"输入即视频"的自动化闭环，帮助内容创作者将视频生产成本降低至零，效率提升 50 倍。',
          image: '/dify-video-detail-1.png',
          gallery: [],
          features: ['零代码 Dify 编排', 'Dream AI 3.0 多模态', '自动分镜脚本', '影视级 4K 输出'],
          tech: ['Dify', 'Dream AI 3.0', 'Stable Diffusion', 'FFmpeg'],
          link: '#'
        },
        {
          id: 1,
          title: 'Sitology 家具独立站',
          category: '网站设计',
          description: '基于 Headless Shopify 架构的高端家具电商平台，融合自然美学与人体工学。',
          fullDescription: '这是一个专注于"自然舒适与健康办公"的独立站。采用了 Headless Shopify 架构，前端使用 Next.js 构建，实现了极致的页面加载速度和高度定制化的视觉体验。网站不仅仅是卖货，更通过沉浸式的视觉叙事，传达品牌的核心理念。',
          challenges: '在保证大量高清产品图秒开的同时，实现复杂的 3D 产品预览与变体切换逻辑。',
          results: '网站上线后，跳出率降低了 40%，移动端转化率提升了 200%。',
          image: '/sitology.png',
          gallery: ['/sitology-1.png', '/sitology-2.png', '/sitology-3.png', '/sitology-4.png'],
          features: ['Headless 电商架构', '沉浸式视觉叙事', '高性能图片加载', '极简主义 UI 设计'],
          tech: ['Next.js', 'Shopify Plus', 'Tailwind CSS', 'Framer Motion'],
          link: '#'
        },
        {
          id: 11,
          title: '私人医生预约网站',
          category: '网站设计',
          description: '面向高端医疗服务的在线预约平台，提供私人医生匹配、在线问诊与健康管理一体化解决方案。',
          fullDescription: '这是一个专为高净值人群打造的私人医疗服务平台。用户可以根据专业领域、从业经验、用户评价等多维度筛选心仪的私人医生，支持在线预约、视频问诊、健康档案管理等核心功能。平台采用现代化的 UI 设计，以清爽的蓝绿配色传达专业与信赖感，同时注重用户隐私保护与数据安全。',
          challenges: '如何在保证医疗信息安全合规的前提下，实现流畅的预约流程与实时通讯功能，同时兼顾多端适配与无障碍访问。',
          results: '平台上线后获得用户一致好评，预约转化率达到 35%，用户满意度评分 4.9/5.0，成功签约 50+ 位认证医生。',
          image: '/my-doctor-1.png',
          gallery: ['/my-doctor-2.png', '/my-doctor-3.png', '/my-doctor-4.png'],
          features: ['智能医生匹配', '在线视频问诊', '健康档案管理', '安全隐私保护', '多端响应式适配'],
          tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'WebRTC'],
          link: '#'
        },
        {
          id: 8,
          title: '宠物商城小程序',
          category: '小程序设计',
          description: '一站式宠物购买平台，提供海量宠物选购、在线咨询与个性化推荐服务。',
          fullDescription: '这是一个专为宠物爱好者打造的综合性小程序。集成了 Home 首页推荐、Shop 宠物商城、Chat 在线咨询、Profile 个人中心四大核心模块。用户可以浏览各类萌宠（猫、狗、鸟类、爬行动物等），查看详细健康档案，通过智能筛选快速找到心仪宠物，并与商家实时沟通。小程序还支持在线预约、订单追踪以及宠物养护知识分享。',
          challenges: '主要难点在于处理大量宠物图片的高性能加载与优化，以及实现流畅的即时通讯功能（WebSocket），同时确保小程序包体积控制在微信限制范围内。',
          results: '上线三个月内，用户量突破 5000+，月均成交订单 200+，用户满意度达 4.8/5.0。成为本地最受欢迎的宠物交易平台之一。',
          image: '/pet-shop.png',
          gallery: ['/pet-1.png', '/pet-2.png', '/pet-3.png', '/pet-4.png'],
          features: ['首页智能推荐', '分类宠物商城', '实时在线咨询', '个人订单中心', '健康档案展示', '智能筛选与搜索'],
          tech: ['WeChat Mini Program', 'Vant Weapp', 'WebSocket', 'Cloud Database', 'Image Optimization'],
          link: '#'
        },
        {
          id: 9,
          title: 'Logo 设计作品集',
          category: '平面设计',
          description: '为不同行业客户打造的品牌标识设计合集，涵盖科技、餐饮、教育、电商等领域。',
          fullDescription: '这是一套涵盖多个行业的 Logo 设计作品集。每个设计都从品牌定位出发，深入挖掘客户的核心价值，通过简洁而富有辨识度的视觉语言传达品牌个性。作品包含完整的 Logo 变体、配色方案、应用场景展示等，确保在不同媒介与尺寸下都能保持最佳视觉效果。从初创公司到成熟品牌，从传统行业到新兴领域，每一个 Logo 都承载着独特的品牌故事。',
          challenges: '如何在保持极简设计风格的同时，准确传达不同行业的品牌调性与差异化特征，并确保 Logo 在各种应用场景下的可识别性与适配性。',
          results: '累计为 20+ 客户完成品牌标识设计，其中多个作品被客户应用于完整的品牌视觉系统中，帮助企业建立专业的品牌形象，提升市场竞争力。',
          image: '/my-logo.png',
          gallery: ['/my-logo-1.png', '/my-logo-2.png', '/my-logo-3.jpg'],
          features: ['多行业覆盖', '完整设计系统', 'Logo 响应式变体', '应用场景模拟', '配色与字体规范'],
          tech: ['Illustrator', 'Photoshop', 'Figma', 'CorelDRAW'],
          link: '#'
        },
        {
          id: 10,
          title: '商业海报设计',
          category: '平面设计',
          description: '涵盖活动宣传、产品推广、品牌营销的商业海报设计作品集。',
          fullDescription: '这是一系列面向商业场景的视觉传达设计作品。涵盖线上社交媒体推广海报、线下活动宣传物料、产品发布会视觉、促销海报等多种应用场景。设计风格灵活多变，根据品牌调性与目标受众量身定制，注重视觉冲击力与信息传达的平衡。每一张海报都经过精心的排版与色彩搭配，确保在碎片化的信息流中快速抓住用户注意力，同时保持品牌视觉的一致性与专业度。',
          challenges: '在有限的视觉空间内，既要保持美观性，又要清晰传达核心信息，同时满足不同平台的尺寸与格式要求，平衡创意表达与商业目标。',
          results: '设计作品累计曝光量超过 100 万次，多个海报被客户用于实际商业推广活动，有效提升了品牌知名度与转化率，获得客户一致好评。',
          image: '/my-show.png',
          gallery: ['/my-show-1.jpg', '/my-show-2.jpg', '/my-show-3.jpg', '/my-show-4.jpg'],
          features: ['多场景应用', '品牌视觉一致性', '高冲击力排版', '社交媒体优化', '印刷与数字双输出'],
          tech: ['Photoshop', 'Illustrator', 'InDesign', 'Canva'],
          link: '#'
        }
      ]
    },
    about: {
      profile: {
        role: '全栈开发 | AI 自动化',
        email: 'lsl1113479669@163.com',
        phone: '15337145797',
        status: '2026届毕业生 / 自由职业',
        location: '中国 湖北 武汉'
      },
      bio: {
        title: '关于我',
        p1: '我是一名拥有生物工程背景的全栈开发工程师。这种独特的跨界背景让我习惯于用系统论的思维去解决复杂问题。目前，我致力于弥合传统软件工程与现代大模型应用（LLM）之间的鸿沟，探索 "Bio-IT" 与 "AI for Science" 的跨界创新。',
        p2: '我偏好“流动与创意”的设计风格，善于在 UI/UX 设计中使用渐变色与流畅线条，致力于在技术产品中融入艺术美感。'
      },
      currentFocus: {
        title: '近期重点 / 任务',
        items: [
          '构建 Dify Enterprise 级知识库 Agent',
          '深入探索 React 19 新特性',
          '优化 n8n 自动化工作流'
        ]
      },
      experience: {
        title: '工作经历',
        items: [
          {
            role: '独立全栈开发者 & AI 自动化设计师',
            company: 'Freelance / Studio',
            period: '2025.05 - 至今',
            desc: '专注于为个人创作者及中小团队提供 AI 工作流自动化解决方案与 Web 应用开发。',
            achievements: [
              '搭建全自动化个人品牌系统 (n8n + DeepSeek)，效率提升 300%。',
              '采用 React + Tailwind CSS 开发多个高交互性着陆页。',
              '部署基于 RAG 的 Dify 智能客服，检索准确率达 90% 以上。'
            ]
          }
        ]
      },
      education: {
        title: '教育与校园',
        school: '生物工程 (本科)',
        grad: '',
        activities: [
          { name: '院篮球队 (控卫)', desc: '培养极强抗压能力与快速决策力，身体素质强健。', icon: 'Activity' },
          { name: '校视频部 (拍摄剪辑)', desc: '熟练掌握视觉叙事，为 AI 视频生成奠定基础。', icon: 'Video' },
          { name: '院宣传部 (排版组织)', desc: '积累早期排版审美与用户视觉引导经验。', icon: 'Users' }
        ]
      }
    },
    business: {
      title: '商务合作',
      subtitle: '让我们谈谈您的下一个大项目',
      desc: '我有兴趣与初创公司和成熟企业合作。无论您是想构建 MVP、自动化工作流程，还是需要技术咨询，我都在这里。',
      aiTitle: 'AI 商务经理',
      aiDesc: '这是一个专门训练用于商务洽谈的 AI 代理。它可以根据您的需求提供初步报价估算、技术方案建议或安排会议。',
      inputPlaceholder: '描述您的项目需求（例如：我需要一个类似 Airbnb 的小程序...）',
      quickActions: ['你对AI的看法', '你的计算机学习经历', '学历', 'AI分身的原理', '该网站的架构', '获取联系方式'],
      initialMsg: '您好！我是 Ling 的商务代理人。请告诉我您想构建什么，或者您面临的技术挑战，我会为您提供专业的建议和初步估算。'
    }
  },
  'en-US': {
    nav: {
      home: 'Home',
      homeSub: 'HOME',
      skills: 'Skills',
      skillsSub: 'SKILLS',
      works: 'Works',
      worksSub: 'WORKS',
      about: 'About',
      aboutSub: 'ABOUT',
      business: 'Business',
      businessSub: 'CONTACT',
      startProject: 'Start Project',
      langName: 'EN'
    },
    hero: {
      greeting: '<Hello World />',
      iam: 'I am',
      roles: ['Full Stack Development', 'AI Automation', 'UI/UX Design'],
      description: 'Transforming complex problems into elegant, interactive web experiences. Specializing in integrating Generative AI into modern web applications to create the next generation of digital products.',
      contact: 'Contact Me',
      businessBtn: 'Business Inquiry'
    },
    skills: {
      title: 'Technical Proficiency',
      desc: 'A visual breakdown of my technical arsenal. I focus on modern web technologies and AI integration.',
      core: 'Core_Skills_Metric',
      radar: 'Capability_Radar',
      other: 'Other Tools & Technologies'
    },
    works: {
      title: 'Selected Works',
      desc: 'A curated list of projects that define my career.',
      viewGithub: 'View Github',
      modal: {
        challenges: 'Challenges',
        results: 'Results',
        techStack: 'Tech Stack',
        features: 'Key Features',
        visit: 'Visit Project',
        close: 'Close'
      },
      projects: [
        {
          id: 6,
          title: 'N8N+Dify News Flow',
          category: 'Automation Design',
          description: 'Fully automated news summarization and push system based on N8N and DeepSeek.',
          fullDescription: 'A fully automated information retrieval workflow. N8N monitors multiple RSS feeds (TechCrunch, Medium, etc.), performs data cleaning and deduplication. It then calls Dify (DeepSeek model) to intelligently summarize long articles, extracting core insights, and finally aggregates them into a Markdown morning report sent via SMTP.',
          challenges: 'Handling data heterogeneity from different RSS sources and optimizing LLM prompts for summary accuracy.',
          results: 'Achieved "zero noise" efficient reading, processing 100+ articles daily and saving 90% of reading time.',
          image: '/n8n-news-detail-1.png',
          gallery: [],
          features: ['RSS Aggregation', 'DeepSeek AI Summary', 'Automated Email Push', 'Cron Scheduling'],
          tech: ['N8N', 'Dify', 'DeepSeek', 'RSS', 'SMTP'],
          link: '#'
        },
        {
          id: 2,
          title: 'Dify Video Automation',
          category: 'Automation Design',
          description: 'Zero-code workflow using Dify and Dream AI 3.0 to generate cinematic videos for free.',
          fullDescription: 'An innovative automation workflow based on Dify, integrating the latest Dream AI 3.0 multimodal large model. Users simply input text prompts, and the system automatically handles scriptwriting, storyboarding, image generation, and video synthesis. Create Hollywood-level short films for free without any coding skills.',
          challenges: 'The main challenge was ensuring context coherence across multimodal models and optimizing latency and callback mechanisms for video generation within Dify.',
          results: 'Achieved a "Text-to-Video" closed loop, reducing video production costs to zero and increasing efficiency by 50x for creators.',
          image: '/dify-video-detail-1.png',
          gallery: [],
          features: ['Zero-code Dify', 'Dream AI 3.0', 'Auto Storyboard', 'Cinematic 4K Output'],
          tech: ['Dify', 'Dream AI 3.0', 'Stable Diffusion', 'FFmpeg'],
          link: '#'
        },
        {
          id: 1,
          title: 'Sitology Furniture Store',
          category: 'Website Design',
          description: 'A premium furniture e-commerce platform built on Headless Shopify, blending natural aesthetics with ergonomics.',
          fullDescription: 'An independent station focused on "Natural Comfort & Focus on Health". Built with a Headless Shopify architecture using Next.js for the frontend, it delivers blazing fast load speeds and a highly customized visual experience. The site goes beyond sales, using immersive visual storytelling to convey the brand\'s core philosophy.',
          challenges: 'Ensuring instant loading of massive high-res product images while implementing complex 3D product previews and variant switching logic.',
          results: 'Reduced bounce rate by 40% and increased mobile conversion rate by 200% after launch.',
          image: '/sitology.png',
          gallery: ['/sitology-1.png', '/sitology-2.png', '/sitology-3.png', '/sitology-4.png'],
          features: ['Headless Architecture', 'Immersive Storytelling', 'High-Performance Images', 'Minimalist UI'],
          tech: ['Next.js', 'Shopify Plus', 'Tailwind CSS', 'Framer Motion'],
          link: '#'
        },
        {
          id: 11,
          title: 'Private Doctor Booking',
          category: 'Website Design',
          description: 'An online booking platform for premium healthcare services, offering private doctor matching, telemedicine, and integrated health management.',
          fullDescription: 'A private healthcare service platform designed for high-net-worth individuals. Users can filter and select private doctors based on specialization, years of experience, and patient reviews. Core features include online booking, video consultations, and health record management. The platform features a modern UI design with a refreshing blue-green color scheme that conveys professionalism and trust, while prioritizing user privacy and data security.',
          challenges: 'Implementing a smooth booking flow and real-time communication features while ensuring healthcare data security and compliance, along with multi-device responsiveness and accessibility.',
          results: 'Received overwhelmingly positive user feedback after launch, achieving a 35% booking conversion rate, 4.9/5.0 user satisfaction score, and successfully onboarding 50+ certified doctors.',
          image: '/my-doctor-1.png',
          gallery: ['/my-doctor-2.png', '/my-doctor-3.png', '/my-doctor-4.png'],
          features: ['Smart Doctor Matching', 'Video Consultations', 'Health Record Management', 'Privacy Protection', 'Responsive Multi-device'],
          tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'WebRTC'],
          link: '#'
        },
        {
          id: 8,
          title: 'Pet Shop Mini Program',
          category: 'Mini Program Design',
          description: 'One-stop pet purchase platform offering massive pet selection, online consultation, and personalized recommendations.',
          fullDescription: 'A comprehensive mini-program designed for pet lovers. Integrates four core modules: Home recommendations, Shop marketplace, Chat consultation, and Profile center. Users can browse various pets (cats, dogs, birds, reptiles, etc.), view detailed health records, quickly find their ideal pet through smart filtering, and communicate with sellers in real-time. The program also supports online appointments, order tracking, and pet care knowledge sharing.',
          challenges: 'The main challenges were handling high-performance loading and optimization of massive pet images, implementing smooth instant messaging functionality (WebSocket), while keeping the mini-program package size within WeChat\'s limits.',
          results: 'Within three months of launch, reached 5000+ users with an average of 200+ monthly transactions and a user satisfaction rating of 4.8/5.0. Became one of the most popular local pet trading platforms.',
          image: '/pet-shop.png',
          gallery: ['/pet-1.png', '/pet-2.png', '/pet-3.png', '/pet-4.png'],
          features: ['Smart Home Feed', 'Categorized Pet Shop', 'Real-time Chat', 'Personal Order Center', 'Health Records Display', 'Smart Filter & Search'],
          tech: ['WeChat Mini Program', 'Vant Weapp', 'WebSocket', 'Cloud Database', 'Image Optimization'],
          link: '#'
        },
        {
          id: 9,
          title: 'Logo Design Portfolio',
          category: 'Graphic Design',
          description: 'A curated collection of brand identity designs across tech, food & beverage, education, and e-commerce industries.',
          fullDescription: 'A comprehensive logo design portfolio spanning multiple industries. Each design starts from brand positioning, deeply exploring the client\'s core values and translating them into concise, highly recognizable visual language. The portfolio includes complete logo variants, color schemes, and application scenarios, ensuring optimal visual performance across different media and sizes. From startups to established brands, from traditional industries to emerging sectors, every logo carries a unique brand story.',
          challenges: 'Balancing minimalist design principles with accurate communication of diverse industry brand tones and differentiation, while ensuring logo recognizability and adaptability across various application scenarios.',
          results: 'Completed brand identity designs for 20+ clients, with multiple works integrated into complete brand visual systems, helping businesses establish professional brand images and enhance market competitiveness.',
          image: '/my-logo.png',
          gallery: ['/my-logo-1.png', '/my-logo-2.png', '/my-logo-3.jpg'],
          features: ['Multi-Industry Coverage', 'Complete Design System', 'Responsive Logo Variants', 'Application Mockups', 'Color & Typography Guidelines'],
          tech: ['Illustrator', 'Photoshop', 'Figma', 'CorelDRAW'],
          link: '#'
        },
        {
          id: 10,
          title: 'Commercial Poster Design',
          category: 'Graphic Design',
          description: 'A portfolio of commercial poster designs covering event promotions, product launches, and brand marketing.',
          fullDescription: 'A series of visual communication designs tailored for commercial scenarios. Includes online social media promotional posters, offline event materials, product launch visuals, promotional posters, and more. Design styles are flexible and adaptable, customized based on brand tone and target audience, emphasizing the balance between visual impact and information delivery. Each poster is carefully composed with thoughtful layout and color coordination, ensuring quick attention capture in fragmented information streams while maintaining brand visual consistency and professionalism.',
          challenges: 'Maintaining aesthetic appeal while clearly communicating core messages within limited visual space, meeting size and format requirements across different platforms, and balancing creative expression with commercial objectives.',
          results: 'Design works achieved over 1 million cumulative impressions, with multiple posters used in actual commercial campaigns, effectively enhancing brand awareness and conversion rates, receiving consistent client praise.',
          image: '/my-show.png',
          gallery: ['/my-show-1.jpg', '/my-show-2.jpg', '/my-show-3.jpg', '/my-show-4.jpg'],
          features: ['Multi-Scenario Application', 'Brand Visual Consistency', 'High-Impact Layout', 'Social Media Optimization', 'Print & Digital Dual Output'],
          tech: ['Photoshop', 'Illustrator', 'InDesign', 'Canva'],
          link: '#'
        }
      ]
    },
    about: {
      profile: {
        role: 'Full Stack | AI Automation',
        email: 'lsl1113479669@163.com',
        phone: '15337145797',
        status: 'Class of 2026 / Freelancer',
        location: 'Wuhan, Hubei, China'
      },
      bio: {
        title: 'About Me',
        p1: 'I am a Full Stack Engineer with a background in Bio-engineering. This unique cross-disciplinary background allows me to approach complex problems with systems thinking. Currently, I am dedicated to bridging the gap between traditional software engineering and modern LLM applications, exploring innovations at the intersection of "Bio-IT" and "AI for Science".',
        p2: 'I prefer a "Fluid & Creative" design style, adept at using gradients and smooth lines in UI/UX design, striving to integrate artistic beauty into technical products.'
      },
      currentFocus: {
        title: 'Current Focus / Recent Tasks',
        items: [
          'Building Dify Enterprise Knowledge Base Agent',
          'Deep dive into React 19 Server Actions',
          'Refining n8n Automation Workflows'
        ]
      },
      experience: {
        title: 'Experience',
        items: [
          {
            role: 'Freelance Full Stack Dev & AI Automation Designer',
            company: 'Freelance / Studio',
            period: '2025.05 - Present',
            desc: 'Focusing on providing AI workflow automation solutions and Web application development for individual creators and small teams.',
            achievements: [
              'Built a fully automated personal brand system (n8n + DeepSeek), increasing efficiency by 300%.',
              'Developed high-interaction landing pages using React + Tailwind CSS.',
              'Deployed RAG-based Dify smart customer service with over 90% retrieval accuracy.'
            ]
          }
        ]
      },
      education: {
        title: 'Education & Campus',
        school: 'Bio-engineering (Bachelor)',
        grad: '',
        activities: [
          { name: 'College Basketball Team (PG)', desc: 'Cultivated resilience and quick decision-making under pressure.', icon: 'Activity' },
          { name: 'Campus Video Dept', desc: 'Mastered visual storytelling, laying the foundation for AI video generation.', icon: 'Video' },
          { name: 'Publicity Dept', desc: 'Accumulated early experience in typography and visual user guidance.', icon: 'Users' }
        ]
      }
    },
    business: {
      title: 'Business Inquiry',
      subtitle: 'Let\'s Discuss Your Next Big Project',
      desc: 'I am available for freelance work and consulting. Whether you need an MVP, workflow automation, or technical advice, I am here to help.',
      aiTitle: 'AI Business Manager',
      aiDesc: 'This is an AI agent trained specifically for business negotiations. It can provide preliminary quote estimates, technical proposals, or schedule meetings.',
      inputPlaceholder: 'Describe your project (e.g., I need an Airbnb-like app...)',
      quickActions: ['Your view on AI', 'Your CS learning journey', 'Education', 'How AI Avatar works', 'This site architecture', 'Get Contact Info'],
      initialMsg: 'Hello! I am Ling\'s Business Agent. Tell me what you want to build or what technical challenges you are facing, and I will provide professional advice and rough estimates.'
    }
  }
};
