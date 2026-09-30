import Link from "next/link";

const groups = [
  ["工作台", ["经营总览"]],
  ["商品", ["商品中心", "AI 商品工作台", "媒体中心", "Listing 中心"]],
  ["交易", ["订单中心", "售后管理"]],
  ["供应链", ["库存中心", "采购中心", "物流中心"]],
  ["经营", ["财务中心", "客户管理", "广告中心", "数据中心"]],
  ["自动化", ["自动化中心", "消息中心"]],
  ["系统", ["权限中心", "系统设置", "开放平台", "AI 服务"]],
];

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  return <div className="shell"><aside className="sidebar"><div className="brand">thalvior</div>{groups.map(([group, items]) => <div key={group as string}><div className="group">{group}</div>{(items as string[]).map(item => <Link className="nav" href="#" key={item}>{item}</Link>)}</div>)}</aside><main className="main"><header className="topbar"><strong>thalvior</strong><div className="actions"><button className="btn">通知</button><button className="btn">管理员</button></div></header>{children}</main></div>;
}
