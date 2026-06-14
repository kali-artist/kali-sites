import { useEffect, useMemo, useState } from 'react'

const directions = [
  {
    slug: 'decision',
    name: 'AI 辅助决策',
    desc: '经营分析报告生成、GEO 数据看板分析、销售预测、库存预警、客户经营诊断。',
    ai: '分析、总结、预测、洞察生成',
    rpa: '数据获取、清洗加工、定时触发',
    color: 'blue',
  },
  {
    slug: 'operation',
    name: 'AI 辅助运营',
    desc: '客服质检、客户情绪分析、工单分类、运营日报、营销内容生成。',
    ai: '内容理解、分类、生成、风险判断',
    rpa: '流程执行、数据流转、结果推送',
    color: 'green',
  },
  {
    slug: 'knowledge',
    name: 'AI 知识管理',
    desc: '企业知识库、SOP 问答助手、培训助手、内部知识检索。',
    ai: '知识理解、语义检索、问答生成',
    rpa: '知识更新、文档同步、调用入口',
    color: 'purple',
  },
  {
    slug: 'agent-rpa',
    name: 'AI Agent + RPA',
    desc: '财务费用审核、自动理解业务需求、触发业务流程、执行任务并反馈结果。',
    ai: '理解、决策、异常判断、任务规划',
    rpa: '自动执行、跨系统操作、留痕反馈',
    color: 'orange',
  },
]

const scenarios = [
  {
    id: 1,
    slug: 'ai-product-listing',
    name: 'AI 辅助商品上架',
    direction: 'AI 辅助运营',
    stage: '场景池',
    priority: '高',
    value: '缩短商品资料整理与发布周期，提升商品信息一致性与发布效率。',
    ai: '商品标题、卖点、详情、分类、参数生成与判断',
    rpa: '登录平台、填写表单、上传图片、提交并检查状态',
    flow: ['采集商品素材', 'AI 生成标题/卖点/详情', 'RPA 填写上架表单', '提交后回写状态'],
    fit: '电商、零售、制造企业中存在大量 SKU 上架和资料维护的客户。',
  },
  {
    id: 2,
    slug: 'ai-service-quality-inspection',
    name: 'AI 辅助客服质检',
    direction: 'AI 辅助运营',
    stage: '方案库',
    priority: '高',
    value: '提升质检覆盖率，识别风险话术与服务问题，沉淀服务质量改进建议。',
    ai: '分析聊天记录、识别服务问题、判断风险话术',
    rpa: '拉取记录、生成质检表、推送结果、沉淀报告',
    flow: ['RPA 拉取会话记录', 'AI 识别问题和风险', '生成质检结论', '自动推送主管和沉淀报表'],
    fit: '客服团队规模较大、会话记录标准化、需要持续质检与复盘的客户。',
  },
  {
    id: 3,
    slug: 'ai-data-organization',
    name: 'AI 辅助数据整理',
    direction: 'AI 辅助决策',
    stage: '方案库',
    priority: '高',
    value: '将非结构化内容转为可分析、可回填的数据资产，减少人工整理。',
    ai: '非结构化内容归类、摘要、判断、生成说明',
    rpa: '采集多系统数据、下载文件、整理表格、回填结果',
    flow: ['跨系统采集资料', 'AI 提取字段与摘要', '规则校验与人工抽检', 'RPA 回填表格/系统'],
    fit: '资料分散、表格回填频繁、人工判断口径多的运营/财务/销售团队。',
  },
  {
    id: 4,
    slug: 'ai-requirement-analysis',
    name: 'AI 辅助需求分析',
    direction: 'AI 知识管理',
    stage: '共创中',
    priority: '中',
    value: '减少需求访谈后的整理成本，提升客户成功与技术侧交接质量。',
    ai: '会议纪要、聊天记录、客户需求归纳分析',
    rpa: '同步需求到表格、项目系统或飞书文档',
    flow: ['收集会议/聊天材料', 'AI 归纳需求与约束', '生成评估初稿', 'RPA 同步到项目资料库'],
    fit: '需求沟通频繁、交接链路长、依赖文档沉淀的项目交付团队。',
  },
  {
    id: 5,
    slug: 'ai-rpa-autonomous-execution',
    name: 'AI + RPA 自动执行',
    direction: 'AI Agent + RPA',
    stage: '共创中',
    priority: '高',
    value: '让自动化从固定规则升级为智能判断后的自动执行。',
    ai: '判断任务类型、处理优先级、异常情况',
    rpa: '根据 AI 判断结果执行不同自动化流程',
    flow: ['任务进入统一入口', 'AI 判断任务意图和优先级', '调用对应 RPA 流程', '反馈执行结果与异常'],
    fit: '流程种类多、入口分散、存在条件判断和异常处理的业务团队。',
  },
  {
    id: 6,
    slug: 'ai-remote-control-monitoring',
    name: 'AI 远程控制 / 任务监控',
    direction: 'AI Agent + RPA',
    stage: '场景池',
    priority: '中',
    value: '提升自动化任务稳定性与问题定位效率，降低人工巡检成本。',
    ai: '分析日志、识别异常、给出处理建议',
    rpa: '重试任务、截图留痕、通知人员、执行修复',
    flow: ['RPA 定时采集任务状态', 'AI 分析日志和截图', '输出异常原因', '触发重试/通知/留痕'],
    fit: '已有较多机器人流程、需要稳定性运营和异常监控的客户。',
  },
  {
    id: 7,
    slug: 'ai-customer-operation-report',
    name: 'AI 生成客户经营分析报告',
    direction: 'AI 辅助决策',
    stage: '案例候选',
    priority: '高',
    value: '让客户经营数据转化为结论、风险与行动建议，形成可复用案例材料。',
    ai: '生成经营分析结论、风险提示、行动建议',
    rpa: '自动采集销售、订单、客户、库存等数据',
    flow: ['采集经营数据', '清洗汇总关键指标', 'AI 生成报告洞察', '自动分发并沉淀历史版本'],
    fit: '经营数据相对完整、需要周期性复盘和管理层汇报的客户。',
  },
]

const customerTypes = [
  { type: 'A 类', title: 'AI 已落地客户', focus: '案例收集与经验总结', feature: '已有成熟 AI 应用场景，已取得实际业务成果', score: '传播价值高' },
  { type: 'B 类', title: 'AI 需求客户', focus: '场景共创与方案设计', feature: '有明确需求，尚未落地，适合短周期验证', score: '共创优先级高' },
  { type: 'C 类', title: 'AI 关注客户', focus: '持续经营与场景启发', feature: '关注 AI 发展，但尚无明确需求', score: '长期经营价值' },
]

const timeline = [
  { time: '6.15 - 6.19', title: '客户调研与摸排', output: '5-8 家客户调研结果 / 客户画像卡 / 客户分类清单' },
  { time: '6.20 - 7.20', title: '场景挖掘与方案共创', output: '10-20 个场景清单 / AI 需求场景池 / 能力边界分析' },
  { time: '7.21 - 7.31', title: '成果沉淀与标准化', output: '5-10 个高价值方案 / 共创方法论 / 销售可用案例材料' },
]

const methods = [
  '优先选择 AI 意愿强、场景清晰、配合度高、验证周期短的客户',
  '从小场景、小样本、短周期验证切入，避免一开始做过大综合场景',
  'CS 负责客户资料、业务背景、客户反馈沉淀；RP 教练负责场景拆解、AI/RPA 分工与验证落地',
  'AI 负责理解、判断、分析、生成；RPA 负责执行、操作、流转、反馈',
]

const routeTitle = {
  '/': 'AI + RPA 标杆客户共创成果展示',
  '/customers': '客户地图',
  '/directions': '四大探索方向',
  '/scenarios': '场景池',
  '/solutions': '方案库',
  '/methodology': '方法论',
}

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

function useHashRoute() {
  const [route, setRoute] = useState(getRoute())
  useEffect(() => {
    const onChange = () => {
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

function href(path) {
  return `#${path}`
}

function Pill({ children, tone = 'default' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function Nav({ route }) {
  const links = [
    ['/', '首页'],
    ['/customers', '客户地图'],
    ['/scenarios', '场景池'],
    ['/solutions', '方案库'],
    ['/methodology', '方法论'],
  ]
  return (
    <nav className="nav-bar route-nav">
      <a className="brand" href={href('/')} aria-label="返回首页">
        <span className="brand-mark">AI</span>
        <span>AI + RPA 共创专项</span>
      </a>
      <div className="nav-links">
        {links.map(([path, label]) => (
          <a className={route === path || route.startsWith(`${path}/`) && path !== '/' ? 'active' : ''} href={href(path)} key={path}>{label}</a>
        ))}
      </div>
    </nav>
  )
}

function PageHero({ pill, title, desc, actions }) {
  return (
    <section className="page-hero">
      <Pill tone="blue">{pill}</Pill>
      <h1>{title}</h1>
      <p>{desc}</p>
      {actions ? <div className="hero-actions">{actions}</div> : null}
    </section>
  )
}

function Home() {
  return (
    <>
      <header className="hero-section route-hero">
        <section className="hero" id="top">
          <div className="hero-copy">
            <Pill tone="blue">项目二 · 浙江组 · 6.15 - 7.31</Pill>
            <h1>AI + RPA 标杆客户共创成果展示网站</h1>
            <p className="hero-lead">面向浙江区域，通过真实客户场景验证 AI 与 RPA 的协同价值，沉淀第一批可复用标杆案例、解决方案库与共创方法论。</p>
            <div className="hero-actions">
              <a className="btn primary" href={href('/scenarios')}>进入场景池</a>
              <a className="btn secondary" href={href('/methodology')}>查看共创方法</a>
            </div>
          </div>
          <div className="hero-dashboard" aria-label="项目核心指标">
            <div className="dashboard-glow" />
            <p className="dashboard-title">核心交付目标</p>
            <div className="metric-grid">
              <div><strong>5-8</strong><span>AI 高潜客户</span></div>
              <div><strong>2-3</strong><span>试点共创客户</span></div>
              <div><strong>10-20</strong><span>沉淀场景清单</span></div>
              <div><strong>5-10</strong><span>高价值方案</span></div>
            </div>
            <div className="delivery-card"><span>最终沉淀</span><strong>案例库 + 方案库 + 方法论模板</strong></div>
          </div>
        </section>
      </header>

      <main>
        <section className="section overview route-overview">
          <div className="section-heading">
            <Pill>正式网站导航</Pill>
            <h2>每个模块都已拆成独立页面，点击会改变 URL</h2>
          </div>
          <div className="overview-grid clickable-grid">
            <a href={href('/customers')}><span>01</span><h3>客户地图</h3><p>A/B/C 三类客户分层，识别 AI 土壤、场景清晰度与共创意愿。</p></a>
            <a href={href('/directions')}><span>02</span><h3>探索方向</h3><p>四大方向梳理 AI 与 RPA 的分工边界和协同特点。</p></a>
            <a href={href('/scenarios')}><span>03</span><h3>场景池</h3><p>七大重点场景支持列表浏览、分类筛选和详情页跳转。</p></a>
            <a href={href('/solutions')}><span>04</span><h3>方案库</h3><p>沉淀可分享、可销售、可复制的标准方案资产结构。</p></a>
          </div>
        </section>
        <TimelineSection />
      </main>
    </>
  )
}

function CustomersPage() {
  return (
    <main>
      <PageHero pill="客户地图" title="AI 应用客户三层分布" desc="围绕 AI 意愿、场景清晰度、客户配合度、技术可行性、传播价值、商业潜力等维度，筛选浙江区域 AI+RPA 共创高潜客户。" />
      <section className="section page-section">
        <div className="customer-grid">
          {customerTypes.map((item) => (
            <article className="customer-card" key={item.type}>
              <span className="customer-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.feature}</p>
              <div><b>重点工作：</b>{item.focus}</div>
              <div><b>判断价值：</b>{item.score}</div>
            </article>
          ))}
        </div>
        <div className="criteria-card">
          <h2>5 条硬性筛选标准</h2>
          <ol>
            <li>已使用 AI 工具或正在关注 AI 应用</li>
            <li>存在明确业务痛点或效率优化需求</li>
            <li>愿意参与场景共创</li>
            <li>具备一定数字化基础</li>
            <li>具有行业代表性或案例价值</li>
          </ol>
        </div>
      </section>
    </main>
  )
}

function DirectionsPage() {
  return (
    <main>
      <PageHero pill="四大探索方向" title="明确 AI 与 RPA 的协同边界" desc="不是让 AI 替代 RPA，而是让自动化从规则驱动升级为智能辅助 + 自动执行。" />
      <section className="section page-section">
        <div className="direction-grid route-direction-grid">
          {directions.map((item) => (
            <article className={`direction-card ${item.color}`} key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <dl>
                <div><dt>AI 负责</dt><dd>{item.ai}</dd></div>
                <div><dt>RPA 负责</dt><dd>{item.rpa}</dd></div>
              </dl>
              <a className="text-link" href={href(`/scenarios?direction=${encodeURIComponent(item.name)}`)}>查看相关场景 →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function ScenariosPage({ route }) {
  const query = route.includes('?') ? new URLSearchParams(route.split('?')[1]) : new URLSearchParams()
  const initial = query.get('direction') || '全部'
  const [filter, setFilter] = useState(initial)
  useEffect(() => setFilter(initial), [initial])
  const filters = ['全部', ...directions.map((item) => item.name)]
  const visibleScenarios = useMemo(() => filter === '全部' ? scenarios : scenarios.filter((item) => item.direction === filter), [filter])
  return (
    <main>
      <PageHero pill="场景池" title="七大重点 AI+RPA 场景" desc="每个场景都提供独立详情页。点击场景卡片后，URL 会跳转到对应的场景详情地址。" actions={<a className="btn primary" href={href('/solutions')}>查看方案库结构</a>} />
      <section className="section page-section">
        <div className="filter-bar route-filter" aria-label="按探索方向筛选场景">
          {filters.map((item) => (
            <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
          ))}
        </div>
        <div className="scenario-card-grid">
          {visibleScenarios.map((item) => (
            <a className="scenario-card-link" href={href(`/scenarios/${item.slug}`)} key={item.slug}>
              <span>0{item.id}</span>
              <Pill tone={item.priority === '高' ? 'orange' : 'blue'}>{item.priority}优先级</Pill>
              <h3>{item.name}</h3>
              <p>{item.value}</p>
              <small>{item.direction} · {item.stage}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function ScenarioDetailPage({ slug }) {
  const scenario = scenarios.find((item) => item.slug === slug) || scenarios[0]
  return (
    <main>
      <PageHero pill="场景详情" title={scenario.name} desc={scenario.value} actions={<><a className="btn primary" href={href('/scenarios')}>返回场景池</a><a className="btn secondary light" href={href('/solutions')}>查看方案库</a></>} />
      <section className="section page-section detail-page-grid">
        <article className="scenario-detail route-detail">
          <div className="detail-head">
            <Pill tone={scenario.priority === '高' ? 'orange' : 'blue'}>{scenario.priority}优先级</Pill>
            <Pill>{scenario.stage}</Pill>
            <Pill tone="purple">{scenario.direction}</Pill>
          </div>
          <h3>AI / RPA 分工</h3>
          <div className="split-box">
            <div><span>AI 负责</span><p>{scenario.ai}</p></div>
            <div><span>RPA 负责</span><p>{scenario.rpa}</p></div>
          </div>
        </article>
        <article className="criteria-card">
          <h2>建议流程</h2>
          <ol>{scenario.flow.map((step) => <li key={step}>{step}</li>)}</ol>
          <h2>适用客户画像</h2>
          <p>{scenario.fit}</p>
        </article>
      </section>
    </main>
  )
}

function SolutionsPage() {
  const fields = ['场景背景', '业务流程', 'AI 能力', 'RPA 能力', '实施建议', '适用客户画像']
  const desc = ['描述客户现状、痛点与目标', '拆解触发、处理、校验、反馈链路', '明确理解、判断、分析、生成环节', '明确采集、录入、点击、上传、回写动作', '说明验证方式、资源与风险控制', '定义行业、系统基础、配合条件']
  return (
    <main>
      <PageHero pill="方案库" title="可分享、可销售、可复制的方案资产" desc="将场景池中的高价值场景沉淀为统一结构，方便团队复用、销售表达与客户共创。" />
      <section className="section page-section">
        <div className="solution-table" role="table" aria-label="方案库字段">
          {fields.map((field, index) => (
            <div className="table-cell" key={field}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{field}</strong>
              <p>{desc[index]}</p>
            </div>
          ))}
        </div>
        <div className="route-cta-card">
          <h2>优先沉淀方向</h2>
          <p>优先选择“小场景、小样本、短周期可验证”的方向，沉淀 5-10 个高价值方案，并完成至少 1 个完整可分享案例。</p>
          <a className="btn primary" href={href('/scenarios')}>从场景池选择方案</a>
        </div>
      </section>
    </main>
  )
}

function MethodologyPage() {
  return (
    <main>
      <PageHero pill="共创方法论" title="AI + RPA 场景探索与共创方法" desc="把客户筛选、场景识别、能力边界、共创推进沉淀为可复用模板。" />
      <section className="section page-section method-section">
        <div className="method-card">
          <div>
            <Pill tone="purple">协同公式</Pill>
            <h2>AI + RPA 协同公式</h2>
            <p className="formula">AI 负责：理解 · 判断 · 分析 · 生成<br />RPA 负责：执行 · 操作 · 流转 · 反馈</p>
          </div>
          <ul>{methods.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <TimelineSection />
    </main>
  )
}

function TimelineSection() {
  return (
    <section className="section timeline-section">
      <div className="section-heading">
        <Pill tone="green">实施节奏</Pill>
        <h2>三阶段推进，从摸排到标准化沉淀</h2>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article key={item.title}>
            <span className="timeline-index">0{index + 1}</span>
            <time>{item.time}</time>
            <h3>{item.title}</h3>
            <p>{item.output}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Router({ route }) {
  const cleanRoute = route.split('?')[0]
  if (cleanRoute === '/') return <Home />
  if (cleanRoute === '/customers') return <CustomersPage />
  if (cleanRoute === '/directions') return <DirectionsPage />
  if (cleanRoute === '/scenarios') return <ScenariosPage route={route} />
  if (cleanRoute.startsWith('/scenarios/')) return <ScenarioDetailPage slug={cleanRoute.split('/').pop()} />
  if (cleanRoute === '/solutions') return <SolutionsPage />
  if (cleanRoute === '/methodology') return <MethodologyPage />
  return <Home />
}

function App() {
  const route = useHashRoute()
  useEffect(() => {
    const cleanRoute = route.split('?')[0]
    const title = routeTitle[cleanRoute] || (cleanRoute.startsWith('/scenarios/') ? '场景详情' : routeTitle['/'])
    document.title = `${title}｜AI + RPA 标杆客户共创成果展示`
  }, [route])

  return (
    <div className="app-shell route-shell">
      <Nav route={route.split('?')[0]} />
      <Router route={route} />
      <footer className="footer">
        <p>© {new Date().getFullYear()} AI + RPA 标杆客户共创专项 · Built with Vite + React + GitHub Pages</p>
        <a href="https://github.com/kali-artist/kali-sites" target="_blank" rel="noreferrer">GitHub Repository</a>
      </footer>
    </div>
  )
}

export default App
