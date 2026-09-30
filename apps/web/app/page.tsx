import Link from "next/link";

const modules = ["商品中心","Listing 中心","订单 OMS","库存 WMS","采购中心","物流 TMS","财务中心","CRM / 售后","BI 数据中心","AI 商品工作台","自动化中心","开放平台"];

export default function Home() {
  return <div className="shell"><aside className="sidebar"><div className="brand">thalvior</div><div className="group">平台</div><Link className="nav active" href="/">产品总览</Link></aside><main className="main"><header className="topbar"><strong>thalvior</strong><span className="muted">跨境电商经营操作系统</span></header><section className="content"><div className="hero"><h1>thalvior</h1><p>从商品、订单、库存到财务与 AI 的统一跨境电商经营平台。</p></div><div className="grid grid4 section">{modules.map((name)=><div className="card" key={name}><div className="label">业务域</div><div className="metric" style={{fontSize:20}}>{name}</div><p className="muted">按统一领域模型接入，保证业务链路互通。</p></div>)}</div></section></main></div>;
}
