# 衣序 · 个人穿搭系统 V0.1A

一个以“学 / 看 / 我的”为核心的穿搭学习型 Web App。当前版本使用本地静态内容和浏览器 localStorage，不包含登录、数据库、AI、衣橱、购买判断或穿搭评分。

## 本地启动

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:3000`。

生产构建：

```bash
pnpm build
pnpm start
```

完整工程检查：

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## 页面

- `/`：首页，包括今日继续、一个穿搭案例、最近学到
- `/learn`：基础原理与单品知识列表
- `/learn/[id]`：知识详情、先判断后解释、误区与应用案例
- `/explore`：案例流、A/B 对比入口、我的收藏
- `/explore/compare`：单变量 A/B 对比
- `/explore/[id]`：案例详情与分项分析
- `/me`：学习记录、收藏笔记与设置

## 数据说明

课程、案例和分析文字来自 `lib/data.ts` 的高质量演示数据。学习状态（没看过 / 学过 / 我理解了）、A/B 选择、收藏理由和设置保存在当前浏览器的 localStorage 中，不会同步到其他设备。
