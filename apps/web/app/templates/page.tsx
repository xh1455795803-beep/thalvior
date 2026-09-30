import Link from "next/link";

const templateGroups = [
  { name: "商品模板", description: "统一定义商品字段、规格、属性和内容结构。", count: 0 },
  { name: "Listing 模板", description: "为不同销售渠道预设发布字段与内容规则。", count: 0 },
  { name: "订单模板", description: "预留订单处理、审核和履约规则模板。", count: 0 },
  { name: "采购模板", description: "预留采购单、供应商和收货流程模板。", count: 0 },
  { name: "工作流模板", description: "预留自动化触发条件、动作和执行流程。", count: 0 },
  { name: "AI 内容模板", description: "预留翻译、标题、卖点、描述、SEO 和视频任务模板。", count: 0 },
];

export default function TemplatesPage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">thalvior</div>
        <div className="group">平台</div>
        <Link className="nav" href="/">产品总览</Link>
        <div className="group">基础设置</div>
        <Link className="nav active" href="/templates">模板中心</Link>
      </aside>
      <main className="main">
        <header className="topbar"><strong>模板中心</strong><span className="muted">统一管理业务模板</span></header>
        <section className="content">
          <div className="hero">
            <h1>模板中心</h1>
            <p>这里先建立统一的模板入口，后续各业务模块将共享模板定义、版本和使用范围。</p>
          </div>
          <div className="actions section"><button className="btn primary">新建模板</button><button className="btn">导入模板</button></div>
          <div className="grid grid3 section">
            {templateGroups.map((item) => (
              <div className="card" key={item.name}>
                <div className="label">模板类型</div>
                <div className="metric" style={{fontSize: 19}}>{item.name}</div>
                <p className="muted">{item.description}</p>
                <span className="tag">{item.count} 个模板</span>
              </div>
            ))}
          </div>
          <div className="card section">
            <h2 style={{marginTop:0}}>模板列表</h2>
            <table className="table"><thead><tr><th>模板名称</th><th>类型</th><th>版本</th><th>状态</th><th>操作</th></tr></thead><tbody><tr><td colSpan={5} className="muted">暂时没有模板。模板数据结构与编辑器将在模板中心下一阶段接入。</td></tr></tbody></table>
          </div>
        </section>
      </main>
    </div>
  );
}
