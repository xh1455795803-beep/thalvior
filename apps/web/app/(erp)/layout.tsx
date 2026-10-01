import Link from "next/link";
import { tenantMenu, type TenantMenuItem } from "../../config/tenant-menu";

function MenuItems({ items, depth = 0 }: { items: TenantMenuItem[]; depth?: number }) {
  return <>{items.map((item) => (
    <div key={item.key} className={depth === 0 ? "nav-section" : "nav-subsection"}>
      {item.href ? <Link className="nav" href={item.href}>{item.label}</Link> : <div className="group">{item.label}</div>}
      {item.children ? <div className="nav-children"><MenuItems items={item.children} depth={depth + 1} /></div> : null}
    </div>
  ))}</>;
}

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand">thalvior</div>
      <div className="tenant-label">企业 ERP</div>
      <nav aria-label="租户 ERP 主导航"><MenuItems items={tenantMenu} /></nav>
    </aside>
    <main className="main">
      <header className="topbar"><strong>thalvior</strong><div className="actions"><button className="btn">通知</button><button className="btn">管理员</button></div></header>
      {children}
    </main>
  </div>;
}
