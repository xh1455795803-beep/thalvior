import Link from "next/link";

const groups = [
  ["平台运营", ["平台总览", "租户管理", "平台用户"]],
  ["商业化", ["套餐管理", "订阅管理", "平台账单"]],
  ["平台能力", ["AI 服务商", "翻译服务商", "视频服务商", "物流服务商", "支付服务商", "广告服务商"]],
  ["平台系统", ["开放接口", "Webhook", "任务队列", "系统监控", "平台审计"]],
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <div className="shell"><aside className="sidebar"><div className="brand">thalvior <small style={{display:"block",fontSize:11,color:"#98a2b3",marginTop:5}}>平台管理</small></div>{groups.map(([group, items]) => <div key={group as string}><div className="group">{group}</div>{(items as string[]).map(item => <Link className="nav" href="#" key={item}>{item}</Link>)}</div>)}</aside><main className="main"><header className="topbar"><strong>平台管理中心</strong><div className="actions"><button className="btn">系统通知</button><button className="btn">平台管理员</button></div></header>{children}</main></div>;
}
