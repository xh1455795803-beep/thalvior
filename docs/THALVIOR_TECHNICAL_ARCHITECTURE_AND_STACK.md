# Thalvior ERP 技术架构与项目技术选型总表

**版本：v1.0**  
**项目：Thalvior ERP**

## 1. 技术总原则

Thalvior 采用模块化单体（Modular Monolith）+ Worker 架构作为第一阶段基线，避免过早微服务化；通过清晰 Domain、Module、Event、Connector 边界，为后续按业务压力拆分微服务预留能力。

核心原则：

- TypeScript：主 ERP 业务、API、权限、任务编排。
- Python：AI、数据分析、算法、预测、重计算。
- PostgreSQL：核心业务事实数据源。
- Redis + BullMQ：缓存、异步任务、重试和任务状态。
- S3/MinIO：媒体和文件。
- OpenSearch：大规模搜索。
- Connector：所有外部平台统一 Adapter/Provider 模式。
- AI Gateway：所有 AI Provider 统一接入。
- Docker：开发与部署环境一致。
- GitHub Actions：CI/CD。
- OpenTelemetry + Prometheus + Grafana：可观测性。

## 2. 技术栈总表

| 领域 | 技术 | 主要职责 |
|---|---|---|
| Web | Next.js + React + TypeScript | ERP Web、路由、页面、SSR/客户端交互 |
| UI | Tailwind CSS + shadcn/ui | Design System、企业级组件 |
| Core API | NestJS + TypeScript | API、业务 Service、权限、认证、事件 |
| ORM | Prisma | Schema、迁移、数据库访问 |
| Database | PostgreSQL | 订单、商品、库存、财务、租户等核心事实数据 |
| Cache | Redis | 缓存、短期状态、限流基础设施 |
| Queue | BullMQ + Redis | 异步任务、批处理、重试、定时任务 |
| Node Worker | NestJS/Node Worker | ERP 批处理、同步、Webhook、报表任务 |
| Python | Python | AI、预测、数据分析、算法、重计算 |
| Object Storage | S3 / MinIO | 图片、视频、附件、导入导出 |
| Search | OpenSearch | 全文搜索、大规模检索、复杂筛选 |
| API | REST + OpenAPI | 前端、开放平台、集成接口 |
| Realtime | WebSocket / SSE | 任务状态、实时通知、进度 |
| Auth | JWT + Refresh Token + MFA | 身份、会话与安全 |
| Authorization | RBAC + Data Scope | 菜单、操作、API、数据权限 |
| Container | Docker / Docker Compose | 环境与部署 |
| CI/CD | GitHub Actions | Lint、Typecheck、Test、Build、Deploy |
| Testing | Unit + Integration + API + E2E + Performance + Security | 全链路质量 |
| Observability | OpenTelemetry + Prometheus + Grafana | 日志、指标、链路、告警 |

## 3. 总体架构

```text
                    ┌──────────────────────┐
                    │      Next.js Web     │
                    │ Tenant + Platform    │
                    └──────────┬───────────┘
                               │
                         REST / SSE / WS
                               │
                    ┌──────────▼───────────┐
                    │    NestJS API        │
                    │ Auth / RBAC / Domain │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   PostgreSQL               Redis/BullMQ          Connector
        │                      │                      │
        │                 ┌────▼────┐          Provider Adapters
        │                 │ Workers │
        │                 └────┬────┘
        │                      │
        │                 Python Worker
        │                 AI / Data / ML
        │
   S3 / MinIO        OpenSearch       Observability
```

## 4. 前端规范

- Next.js + React + TypeScript。
- Tailwind CSS + shadcn/ui。
- 统一 Design System。
- 菜单、权限、路由支持配置化。
- Platform 与 Tenant 路由和权限严格隔离。
- 列表页标准化：搜索、筛选、排序、分页、批量操作、导出、空态、错误态。
- 长任务使用 SSE/WebSocket 显示进度。

## 5. NestJS 后端规范

业务领域按模块拆分：

- Tenant / Organization
- Identity / Auth
- Product
- Listing
- Order / OMS
- Inventory
- Procurement
- Warehouse / WMS
- Logistics / TMS
- Finance
- CRM
- After-sales
- Advertising
- BI
- AI
- Automation
- Notification
- Connector
- Audit

每个模块应具有清晰的 Controller、DTO、Service/Domain、权限定义、数据访问、事件和测试边界。

## 6. Python 技术域

Python 不承担全部 ERP 主业务，而承担：

- AI 任务
- 文本翻译与本地化
- Listing/SEO/关键词生成
- 商品智能处理
- 数据分析
- 销量预测
- 库存预测
- 补货建议
- 异常检测
- 大规模数据处理
- 算法和重计算

Python Worker 通过 API、事件或 Queue 与 NestJS 协作，不让核心业务依赖某一个 Python 实现。

## 7. PostgreSQL 数据规范

- 所有 Tenant 业务表具备 tenant_id。
- 核心实体统一 created_at、updated_at；重要操作增加 created_by、updated_by。
- 核心交易优先使用流水模型保证可追溯。
- 库存、财务等领域不得仅保存最终余额而没有变化记录。
- 索引围绕 Tenant、状态、时间、业务主键和高频查询设计。
- 数据库结构必须通过版本化迁移管理。

## 8. Redis / BullMQ / Worker

任务标准状态：

```text
queued → running → succeeded
                  ↘ failed → retry → succeeded
                  ↘ cancelled
```

任务必须支持：

- Job ID
- Tenant ID
- 幂等键
- 超时
- 重试次数
- 退避策略
- 取消
- 失败原因
- 执行日志
- 人工恢复

适用任务：平台同步、订单同步、库存同步、Listing 发布、导入导出、Webhook、AI、报表、预测等。

## 9. AI Gateway

AI Gateway 负责：

- Provider 抽象
- Model Registry
- 模型路由
- Token 统计
- 成本统计
- 限流
- 超时
- 重试
- 错误统一化
- 审计

AI 长任务必须进入 Queue/Worker；AI 输出默认经过预览/审核，再回写业务对象。涉及价格、库存、财务等核心事实时必须受业务规则保护。

## 10. Connector / Provider

所有第三方平台必须使用 Adapter/Connector：

```text
Tenant
  ↓
Connector Manager
  ↓
Provider Adapter
  ↓
External API
```

Connector 标准能力：

- OAuth/授权
- Token 刷新
- API Key
- 数据映射
- 分页
- 限流
- 重试
- 幂等
- Webhook
- 同步方向
- 错误分类
- 健康检查
- 同步日志

预留：Amazon、TikTok Shop、Shopee、Temu、AliExpress、eBay、Walmart、Shopify，以及支付、物流、广告和 AI Provider。

## 11. API 标准

- REST + OpenAPI。
- 统一 Request ID。
- 统一错误码。
- 统一分页、筛选、排序。
- 支持幂等键。
- API 版本化。
- OpenAPI 为 API Contract 事实来源。
- Open API 必须绑定 Tenant、Application、API Key 和 Scope。

## 12. Webhook 标准

- Signature 验证。
- Timestamp 校验。
- Event Type + Version。
- Event ID 幂等。
- 投递记录。
- 自动重试。
- Dead-letter / 失败任务。
- 人工重放。

## 13. 安全

- JWT + Refresh Token + MFA。
- RBAC + Data Scope。
- Platform / Tenant 双重隔离。
- 敏感 Token、API Key、Secret 加密存储。
- 禁止敏感信息进入普通日志。
- 输入验证、输出过滤、速率限制。
- 关键操作审计。
- Webhook 防重放。
- 租户隔离测试必须纳入 CI。

## 14. 测试金字塔

### Unit
领域规则、状态机、计算、权限判断。

### Integration
数据库、事务、Redis、Queue、模块协作。

### API
认证、权限、参数、响应、错误码、幂等。

### E2E
商品 → Listing → 订单 → 库存 → WMS → 物流 → 财务 → BI。

### Multi-tenant
跨租户查询、越权访问、数据隔离。

### Performance
API、搜索、批处理、Queue、Worker。

### Security
认证、越权、Webhook、输入攻击、敏感数据。

### Recovery
超时、重复消息、失败任务、重试、回滚/补偿。

## 15. DevOps

开发环境：Docker Compose。生产环境：容器化部署。

CI 最低流程：

```text
Install
 ↓
Lint
 ↓
Typecheck
 ↓
Unit Test
 ↓
Integration Test
 ↓
Build
 ↓
E2E / Security（按环境）
 ↓
Deploy
```

必须提供健康检查、数据库迁移、日志、监控、告警和回滚/恢复策略。

## 16. 可观测性

OpenTelemetry 负责统一 Trace/Metric/Log 上下文；Prometheus 负责指标；Grafana 负责看板和告警。

关键监控：

- API latency / error rate
- DB connection / slow query
- Redis health
- Queue depth
- Worker failure rate
- Connector error rate
- Webhook failure rate
- AI token/cost/job failure
- 关键业务异常

## 17. 工程目录

```text
apps/
├── web/
├── api/
├── worker/
└── python/

packages/
├── ui/
├── types/
├── config/
├── api-client/
├── domain/
└── testing/

infra/
├── docker/
├── postgres/
├── redis/
├── minio/
├── opensearch/
└── observability/

docs/
├── architecture/
├── api/
├── modules/
└── runbooks/
```

## 18. Git / Coding Agent 规范

- 每个任务有明确目标、范围和验收标准。
- 完成一个可验证阶段后 Commit。
- Commit 必须描述真实变更。
- Agent 不得覆盖未提交工作。
- Agent 不得通过删除业务能力绕过测试。
- 大型模块必须拆成可回滚的小阶段。
- 每阶段开发 → 测试 → 修复 → Commit → 更新进度。
- 只有满足 Definition of Done 才能标记 DONE。

## 19. 最终技术定案

**主 ERP：** Next.js + React + TypeScript + NestJS + PostgreSQL/Prisma  
**异步：** Redis + BullMQ + Node Worker  
**AI/Data：** Python Worker + AI Gateway  
**文件：** S3/MinIO  
**搜索：** OpenSearch  
**认证：** JWT + Refresh Token + MFA  
**权限：** RBAC + Data Scope  
**部署：** Docker  
**CI/CD：** GitHub Actions  
**测试：** Unit + Integration + API + E2E + Performance + Security  
**可观测性：** OpenTelemetry + Prometheus + Grafana  
**第三方：** Connector / Provider Adapter  
**架构：** Modular Monolith + Worker，可按规模拆分微服务

以上技术方案为 Thalvior 的技术基线。任何新增技术必须说明替代关系、收益、成本、兼容性及对现有架构的影响，不得无理由更换核心技术栈。
