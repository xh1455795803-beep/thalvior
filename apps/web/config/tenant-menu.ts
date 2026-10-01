export type TenantMenuItem = { key: string; label: string; href?: string; children?: TenantMenuItem[] };

export const tenantMenu: TenantMenuItem[] = [
  { key: "dashboard", label: "工作台", href: "/dashboard" },
  { key: "products", label: "商品中心", children: [
    { key: "product-list", label: "商品管理", href: "/products" },
    { key: "product-create", label: "新增商品", href: "/products/new" },
    { key: "categories", label: "分类管理", href: "/products/categories" },
    { key: "brands", label: "品牌管理", href: "/products/brands" },
    { key: "attributes", label: "属性与规格", href: "/products/attributes" },
    { key: "bundles", label: "组合商品", href: "/products/bundles" }
  ]},
  { key: "media", label: "媒体中心", children: [
    { key: "library", label: "素材库", href: "/media" },
    { key: "images", label: "图片工具", href: "/media/images" },
    { key: "videos", label: "视频工具", href: "/media/videos" }
  ]},
  { key: "ai", label: "AI 工作台", children: [
    { key: "workspace", label: "AI 工作台", href: "/ai-workspace" },
    { key: "translation", label: "AI 翻译", href: "/ai/translation" },
    { key: "content", label: "内容优化", href: "/ai/content" },
    { key: "ai-images", label: "图片生成", href: "/ai/images" },
    { key: "ai-videos", label: "视频生成", href: "/ai/videos" },
    { key: "ai-tasks", label: "AI 任务", href: "/ai/tasks" }
  ]},
  { key: "listings", label: "Listing 中心", children: [
    { key: "listings", label: "Listing 管理", href: "/listings" },
    { key: "listing-new", label: "创建 Listing", href: "/listings/new" },
    { key: "templates", label: "Listing 模板", href: "/listings/templates" },
    { key: "mapping", label: "属性映射", href: "/listings/mappings" },
    { key: "publishing", label: "发布管理", href: "/listings/publishing" },
    { key: "sync", label: "同步中心", href: "/listings/sync" }
  ]},
  { key: "channels", label: "渠道与店铺", children: [
    { key: "shops", label: "店铺管理", href: "/channels/shops" },
    { key: "marketplaces", label: "销售渠道", href: "/channels/marketplaces" },
    { key: "connectors", label: "平台连接", href: "/channels/connectors" },
    { key: "webhooks", label: "Webhook", href: "/channels/webhooks" }
  ]},
  { key: "orders", label: "订单中心", children: [
    { key: "all-orders", label: "全部订单", href: "/orders" },
    { key: "pending", label: "待付款", href: "/orders/pending-payment" },
    { key: "processing", label: "处理中", href: "/orders/processing" },
    { key: "shipped", label: "已发货", href: "/orders/shipped" },
    { key: "completed", label: "已完成", href: "/orders/completed" },
    { key: "exceptions", label: "异常订单", href: "/orders/exceptions" }
  ]},
  { key: "returns", label: "售后中心", children: [
    { key: "after-sales", label: "售后申请", href: "/returns" },
    { key: "refunds", label: "退款管理", href: "/returns/refunds" },
    { key: "inspection", label: "退货质检", href: "/returns/inspection" },
    { key: "rules", label: "售后规则", href: "/returns/rules" }
  ]},
  { key: "inventory", label: "库存中心", children: [
    { key: "overview", label: "库存总览", href: "/inventory" },
    { key: "ledger", label: "库存流水", href: "/inventory/ledger" },
    { key: "reservations", label: "库存预留", href: "/inventory/reservations" },
    { key: "stocktakes", label: "库存盘点", href: "/inventory/stocktakes" },
    { key: "transfers", label: "库存调拨", href: "/inventory/transfers" },
    { key: "adjustments", label: "库存调整", href: "/inventory/adjustments" }
  ]},
  { key: "procurement", label: "采购中心", children: [
    { key: "purchase-orders", label: "采购订单", href: "/procurement/orders" },
    { key: "receipts", label: "收货管理", href: "/procurement/receipts" },
    { key: "suppliers", label: "供应商", href: "/procurement/suppliers" },
    { key: "supplier-products", label: "供应商商品", href: "/procurement/products" },
    { key: "purchase-prices", label: "采购价格", href: "/procurement/prices" }
  ]},
  { key: "warehouses", label: "仓储中心", children: [
    { key: "warehouses", label: "仓库管理", href: "/warehouses" },
    { key: "locations", label: "库位管理", href: "/warehouses/locations" },
    { key: "inbound", label: "入库管理", href: "/warehouses/inbound" },
    { key: "outbound", label: "出库管理", href: "/warehouses/outbound" },
    { key: "picking", label: "拣货管理", href: "/warehouses/picking" },
    { key: "packing", label: "打包管理", href: "/warehouses/packing" }
  ]},
  { key: "logistics", label: "物流中心", children: [
    { key: "fulfillment", label: "履约管理", href: "/logistics/fulfillment" },
    { key: "packages", label: "包裹管理", href: "/logistics/packages" },
    { key: "labels", label: "面单管理", href: "/logistics/labels" },
    { key: "tracking", label: "物流轨迹", href: "/logistics/tracking" },
    { key: "exceptions", label: "物流异常", href: "/logistics/exceptions" }
  ]},
  { key: "finance", label: "财务中心", children: [
    { key: "finance", label: "财务总览", href: "/finance" },
    { key: "transactions", label: "财务流水", href: "/finance/transactions" },
    { key: "settlements", label: "平台结算", href: "/finance/settlements" },
    { key: "reconciliation", label: "对账中心", href: "/finance/reconciliation" },
    { key: "costs", label: "成本管理", href: "/finance/costs" },
    { key: "profit", label: "利润分析", href: "/finance/profit" },
    { key: "exchange-rates", label: "汇率管理", href: "/finance/exchange-rates" }
  ]},
  { key: "crm", label: "客户中心", children: [
    { key: "customers", label: "客户管理", href: "/crm/customers" },
    { key: "segments", label: "客户分群", href: "/crm/segments" },
    { key: "tags", label: "客户标签", href: "/crm/tags" },
    { key: "value", label: "客户价值", href: "/crm/value" }
  ]},
  { key: "advertising", label: "广告中心", children: [
    { key: "accounts", label: "广告账户", href: "/advertising/accounts" },
    { key: "campaigns", label: "广告计划", href: "/advertising/campaigns" },
    { key: "performance", label: "广告效果", href: "/advertising/performance" },
    { key: "ad-costs", label: "广告费用", href: "/advertising/costs" }
  ]},
  { key: "analytics", label: "数据中心", children: [
    { key: "business", label: "经营分析", href: "/analytics/business" },
    { key: "sales", label: "销售分析", href: "/analytics/sales" },
    { key: "product-analysis", label: "商品分析", href: "/analytics/products" },
    { key: "inventory-analysis", label: "库存分析", href: "/analytics/inventory" },
    { key: "finance-analysis", label: "财务分析", href: "/analytics/finance" },
    { key: "reports", label: "自定义报表", href: "/analytics/reports" }
  ]},
  { key: "automation", label: "自动化中心", children: [
    { key: "workflows", label: "工作流", href: "/automation/workflows" },
    { key: "tasks", label: "执行任务", href: "/automation/tasks" },
    { key: "schedules", label: "定时任务", href: "/automation/schedules" },
    { key: "events", label: "事件中心", href: "/automation/events" }
  ]},
  { key: "notifications", label: "消息中心", children: [
    { key: "notifications", label: "通知", href: "/notifications" },
    { key: "message-rules", label: "消息规则", href: "/notifications/rules" },
    { key: "message-templates", label: "消息模板", href: "/notifications/templates" }
  ]},
  { key: "settings", label: "系统设置", children: [
    { key: "company", label: "企业设置", href: "/settings/company" },
    { key: "users", label: "用户管理", href: "/settings/users" },
    { key: "roles", label: "角色与权限", href: "/settings/roles" },
    { key: "departments", label: "组织架构", href: "/settings/departments" },
    { key: "localization", label: "语言与地区", href: "/settings/localization" },
    { key: "currencies", label: "币种设置", href: "/settings/currencies" },
    { key: "audit", label: "操作审计", href: "/settings/audit" }
  ]}
];
