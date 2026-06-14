import { useMemo, useState } from 'react'

const directions = [
  {
    name: 'AI 辅助决策',
    desc: '经营分析报告生成、GEO 数据看板分析、销售预测、库存预警、客户经营诊断。',
    ai: '分析、总结、预测、洞察生成',
    rpa: '数据获取、清洗加工、定时触发',
    color: 'blue',
  },
  {
    name: 'AI 辅助运营',
    desc: '客服质检、客户情绪分析、工单分类、运营日报、营销内容生成。',
    ai: '内容理解、分类、生成、风险判断',
    rpa: '流程执行、数据流转、结果推送',
    color: 'green',
  },
  {
    name: 'AI 知识管理',
    desc: '企业知识库、SOP 问答助手、培训助手、内部知识检索。',
    ai: '知识理解、语义检索、问答生成',
    rpa: '知识更新、文档同步、调用入口',
    color: 'purple',
  },
  {
    name: 'AI Agent + RPA',
    desc: '财务费用审核、自动理解业务需求、触发业务流程、执行任务并反馈结果。',
    ai: '理解、决策、异常判断、任务规划',
    rpa: '自动执行、跨系统操作、留痕反馈',
    color: 'orange',
  },
]

const scenarios = [
  { id: 1, name: 'AI 辅助商品上架', direction: 'AI 辅助运营', stage: '场景池', priority: '高', value: '缩短商品资料整理与发布周期', ai: '商品标题、卖点、详情、分类、参数生成与判断', rpa: '登录平台、填写表单、上传图片、提交并检查状态' },
  { id: 2, name: 'AI 辅助客服质检', direction: 'AI 辅助运营', stage: '方案库', priority: '高', value: '提升质检覆盖率，识别风险话术与服务问题', ai: '分析聊天记录、识别服务问题、判断风险话术', rpa: '拉取记录、生成质检表、推送结果、沉淀报告' },
  { id: 3, name: 'AI 辅助数据整理', direction: 'AI 辅助决策', stage: '方案库', priority: '高', value: '将非结构化内容转为可分析、可回填的数据资产', ai: '非结构化内容归类、摘要、判断、生成说明', rpa: '采集多系统数据、下载文件、整理表格、回填结果' },
  { id: 4, name: 'AI 辅助需求分析', direction: 'AI 知识管理', stage: '共创中', priority: '中', value: '减少需求访谈后的整理成本，提升交接质量', ai: '会议纪要、聊天记录、客户需求归纳分析', rpa: '同步需求到表格、项目系统或飞书文档' },
  { id: 5, name: 'AI + RPA 自动执行', direction: 'AI Agent + RPA', stage: '共创中', priority: '高', value: '让自动化从固定规则升级为智能判断后的自动执行', ai: '判断任务类型、处理优先级、异常情况', rpa: '根据 AI 判断结果执行不同自动化流程' },
  { id: 6, name: 'AI 远程控制 / 任务监控', direction: 'AI Agent + RPA', stage: '场景池', priority: '中', value: '提升自动化任务稳定性与问题定位效率', ai: '分析日志、识别异常、给出处理建议', rpa: '重试任务、截图留痕、通知人员、执行修复' },
  { id: 7, name: 'AI 生成客户经营分析报告', direction: 'AI 辅助决策', stage: '案例候选', priority: '高', value: '让客户经营数据转化为结论、风险与行动建议', ai: '生成经营分析结论、风险提示、行动建议', rpa: '自动采集销售、订单、客户、库存等数据' },
]

const customerTypes = [
  { type: 'A 类', title: 'AI 已落地客户', focus: '案例收集与经验总结', feature: '已有成熟 AI 应用场景，已取得实际业务成果' },
  { type: 'B 类', title: 'AI 需求客户', focus: '场景共创与方案设计', feature: '有明确需求，尚未落地，适合短周期验证' },
  { type: 'C 类', title: 'AI 关注客户', focus: '持续经营与场景启发', feature: '关注 AI 发展，但尚无明确需求' },
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

function Pill({ children, tone = 'default' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function App() {
  const [filter, setFilter] = useState('全部')
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const filters = ['全部', ...directions.map((item) => item.name)]
  const visibleScenarios = useMemo(() => {
    if (filter === '全部') return scenarios
    return scenarios.filter((item) => item.direction === filter)
  }, [filter])

  return (
    <div className="app-shell">
      <header className="hero-section">
        <nav className="nav-bar">
          <a className="brand" href="#top" aria-label="返回顶部">
            <span className="brand-mark">AI</span>
            <span>AI + RPA 共创专项</span>
          </a>
          <div className="nav-links">
            <a href="#map">客户地图</a>
            <a href="#scenarios">场景池</a>
            <a href="#solutions">方案库</a>
            <a href="#method">方法论</a>
          </div>
        </nav>

        <section className="hero" id="top">
          <div className="hero-copy">
            <Pill tone="blue">项目二 · 浙江组 · 6.15 - 7.31</Pill>
            <h1>AI + RPA 标杆客户共创成果展示网站</h1>
            <p className="hero-lead">
              面向浙江区域，通过真实客户场景验证 AI 与 RPA 的协同价值，沉淀第一批可复用标杆案例、解决方案库与共创方法论。
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#scenarios">查看场景池</a>
              <a className="btn secondary" href="#method">查看共创方法</a>
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
            <div className="delivery-card">
              <span>最终沉淀</span>
              <strong>案例库 + 方案库 + 方法论模板</strong>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="section overview">
          <div className="section-heading">
            <Pill>项目定位</Pill>
            <h2>从客户摸排到成果沉淀的一站式展示入口</h2>
          </div>
          <div className="overview-grid">
            <article><span>01</span><h3>客户地图</h3><p>A/B/C 三类客户分层，识别 AI 土壤、场景清晰度与共创意愿。</p></article>
            <article><span>02</span><h3>场景池</h3><p>沉淀已落地、共创中、可启发的 AI+RPA 场景，支持按方向筛选。</p></article>
            <article><span>03</span><h3>方案库</h3><p>统一输出场景背景、AI/RPA 分工、流程路径、应用价值与适用客户。</p></article>
            <article><span>04</span><h3>方法论</h3><p>沉淀客户筛选、场景识别、能力边界、共创推进的标准模板。</p></article>
          </div>
        </section>

        <section className="section" id="map">
          <div className="section-heading two-col">
            <div>
              <Pill tone="green">客户地图</Pill>
              <h2>AI 应用客户三层分布</h2>
            </div>
            <p>围绕“AI 意愿、场景清晰度、客户配合度、技术可行性、传播价值、商业潜力”等维度筛选高潜客户。</p>
          </div>
          <div className="customer-grid">
            {customerTypes.map((item) => (
              <article className="customer-card" key={item.type}>
                <span className="customer-type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.feature}</p>
                <div><b>重点工作：</b>{item.focus}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="directions">
          <div className="section-heading">
            <Pill tone="purple">四大探索方向</Pill>
            <h2>明确 AI 与 RPA 的协同边界</h2>
          </div>
          <div className="direction-grid">
            {directions.map((item) => (
              <article className={`direction-card ${item.color}`} key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <dl>
                  <div><dt>AI 负责</dt><dd>{item.ai}</dd></div>
                  <div><dt>RPA 负责</dt><dd>{item.rpa}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="section scenario-section" id="scenarios">
          <div className="section-heading two-col">
            <div>
              <Pill tone="orange">七大重点场景</Pill>
              <h2>可筛选、可展开的 AI+RPA 场景池</h2>
            </div>
            <div className="filter-bar" aria-label="按探索方向筛选场景">
              {filters.map((item) => (
                <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
              ))}
            </div>
          </div>
          <div className="scenario-layout">
            <div className="scenario-list">
              {visibleScenarios.map((item) => (
                <button className={`scenario-item ${activeScenario.id === item.id ? 'active' : ''}`} onClick={() => setActiveScenario(item)} key={item.id}>
                  <span>0{item.id}</span>
                  <strong>{item.name}</strong>
                  <small>{item.direction} · {item.stage}</small>
                </button>
              ))}
            </div>
            <article className="scenario-detail">
              <div className="detail-head">
                <Pill tone={activeScenario.priority === '高' ? 'orange' : 'blue'}>{activeScenario.priority}优先级</Pill>
                <Pill>{activeScenario.stage}</Pill>
              </div>
              <h3>{activeScenario.name}</h3>
              <p className="value-text">{activeScenario.value}</p>
              <div className="split-box">
                <div><span>AI 负责</span><p>{activeScenario.ai}</p></div>
                <div><span>RPA 负责</span><p>{activeScenario.rpa}</p></div>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="solutions">
          <div className="section-heading">
            <Pill tone="blue">方案库结构</Pill>
            <h2>统一沉淀为可分享、可销售、可复制的方案资产</h2>
          </div>
          <div className="solution-table" role="table" aria-label="方案库字段">
            {['场景背景', '业务流程', 'AI 能力', 'RPA 能力', '实施建议', '适用客户画像'].map((field, index) => (
              <div className="table-cell" key={field}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{field}</strong>
                <p>{['描述客户现状、痛点与目标', '拆解触发、处理、校验、反馈链路', '明确理解、判断、分析、生成环节', '明确采集、录入、点击、上传、回写动作', '说明验证方式、资源与风险控制', '定义行业、系统基础、配合条件'][index]}</p>
              </div>
            ))}
          </div>
        </section>

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

        <section className="section method-section" id="method">
          <div className="method-card">
            <div>
              <Pill tone="purple">共创方法论</Pill>
              <h2>AI + RPA 协同公式</h2>
              <p className="formula">AI 负责：理解 · 判断 · 分析 · 生成<br />RPA 负责：执行 · 操作 · 流转 · 反馈</p>
            </div>
            <ul>
              {methods.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} AI + RPA 标杆客户共创专项 · Built with Vite + React + GitHub Pages</p>
        <a href="https://github.com/kali-artist/kali-sites" target="_blank" rel="noreferrer">GitHub Repository</a>
      </footer>
    </div>
  )
}

export default App
