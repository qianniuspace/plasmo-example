# Plasmo 示例集合

一个使用 [Plasmo](https://www.plasmo.com/) 框架构建的 Chrome 扩展示例综合集合。本仓库作为学习资源，为使用现代 Web 技术构建浏览器扩展的开发者提供参考。

## 🎯 项目目的

本仓库提供使用 Plasmo 构建的生产就绪 Chrome 扩展示例，展示各种功能、模式和最佳实践。

## 📦 可用示例

### [base-case](./base-case/) - 内容分发扩展
一个功能完整的内容分发工具，展示多个扩展组件和高级功能。

**功能特性：**
- 多平台内容发布
- 丰富的 Markdown 编辑器
- 多种扩展视图（弹出窗口、侧边栏、选项页、新标签页、开发者工具）
- 跨平台 API 集成
- 存储管理
- 实时内容预览

**技术栈：**
- Plasmo 0.90.5
- React 19 + TypeScript
- Next.js 15
- Chrome Manifest V3

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Chrome 浏览器（用于开发）
- pnpm 或 npm

### 安装步骤
1. 克隆本仓库：
```bash
git clone <仓库地址>
cd plasmo-example
```

2. 进入所需的示例目录：
```bash
cd base-case
```

3. 安装依赖：
```bash
pnpm install
# 或
npm install
```

### 开发运行
启动开发服务器：
```bash
pnpm dev
```

在 Chrome 中加载扩展：
1. 打开 `chrome://extensions/`
2. 启用"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `build/chrome-mv3-dev` 目录

## 🏗️ 项目结构

```
plasmo-example/
├── base-case/                 # 内容分发示例
│   ├── src/                   # 源代码
│   │   ├── app/              # Next.js 应用页面
│   │   ├── components/       # 共享 React 组件
│   │   ├── devtools/         # Chrome 开发者工具面板
│   │   ├── newtab/           # 新标签页
│   │   ├── options/          # 扩展选项页面
│   │   ├── panels/           # 扩展面板
│   │   ├── popup/            # 扩展弹出窗口
│   │   ├── sandboxes/        # 沙盒脚本
│   │   ├── sidepanel/        # 侧边栏
│   │   └── tabs/             # 标签页面
│   ├── assets/               # 静态资源
│   ├── build/                # 生产构建
│   ├── examples/             # 使用示例和文档
│   ├── package.json          # 依赖和脚本
│   └── README.md            # 示例特定文档
└── README.md                # 本文件
```

## 📚 学习资源

每个示例都包含详细的文档，涵盖：

- **架构概述**：扩展的结构设计
- **组件使用**：每个扩展部分的实现细节
- **API 集成**：如何与浏览器 API 和外部服务协作
- **最佳实践**：推荐模式和反模式
- **故障排除**：常见问题和解决方案

## 🛠️ 开发指南

### 添加新示例
1. 创建一个具有描述性名称的新目录
2. 包含全面的文档
3. 遵循既定的模式和结构
4. 在不同 Chrome 版本上进行测试
5. 包含构建和部署说明

### 代码标准
- 使用 TypeScript 确保类型安全
- 遵循 React 最佳实践
- 实现适当的错误处理
- 包含有意义的注释
- 编写全面的测试

## 🔧 常用任务

### 生产环境构建
```bash
pnpm build
```

### 运行生产构建
```bash
pnpm start
```

### 调试
```bash
pnpm verbose
```

## 🤝 贡献指南

我们欢迎贡献！请：

1. Fork 本仓库
2. 为你的示例创建功能分支
3. 添加全面的文档
4. 彻底测试
5. 提交 Pull Request

## 📝 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。

## 🆘 支持帮助

- 查看 [Plasmo 文档](https://docs.plasmo.com/)
- 阅读示例特定的 README 文件
- 为 bug 或问题创建 issue
- 创建新 issue 前先检查现有问题

## 🔗 有用链接

- [Plasmo 框架](https://www.plasmo.com/)
- [Chrome 扩展开发者指南](https://developer.chrome.com/docs/extensions/)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)

---

**维护者**: @esx
**最后更新**: 2025年
