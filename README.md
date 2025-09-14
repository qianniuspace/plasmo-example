# Plasmo Examples Collection

A comprehensive collection of Chrome extension examples built with the [Plasmo](https://www.plasmo.com/) framework. This repository serves as a learning resource and reference for developers building browser extensions with modern web technologies.

## 🎯 Purpose

This repository provides practical, production-ready examples of Chrome extensions built with Plasmo, demonstrating various features, patterns, and best practices for extension development.

## 📦 Available Examples

### [base-case](./base-case/) - Content Distribution Extension
A full-featured content distribution tool that demonstrates multiple extension components and advanced features.

**Features:**
- Multi-platform content publishing
- Rich Markdown editor
- Multiple extension views (popup, side panel, options, new tab, devtools)
- Cross-platform API integration
- Storage management
- Real-time content preview

**Technologies:**
- Plasmo 0.90.5
- React 19 + TypeScript
- Next.js 15
- Chrome Manifest V3

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Chrome browser (for development)
- pnpm or npm

### Installation
1. Clone this repository:
```bash
git clone <repository-url>
cd plasmo-example
```

2. Navigate to the desired example:
```bash
cd base-case
```

3. Install dependencies:
```bash
pnpm install
# or
npm install
```

### Development
Start the development server:
```bash
pnpm dev
```

Load the extension in Chrome:
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-dev` directory

## 🏗️ Project Structure

```
plasmo-example/
├── base-case/                 # Content distribution example
│   ├── src/                   # Source code
│   │   ├── app/              # Next.js app pages
│   │   ├── components/       # Shared React components
│   │   ├── devtools/         # Chrome DevTools panel
│   │   ├── newtab/           # New tab page
│   │   ├── options/          # Extension options page
│   │   ├── panels/           # Extension panels
│   │   ├── popup/            # Extension popup
│   │   ├── sandboxes/        # Sandboxed scripts
│   │   ├── sidepanel/        # Side panel
│   │   └── tabs/             # Tab pages
│   ├── assets/               # Static assets
│   ├── build/                # Production builds
│   ├── examples/             # Usage examples and documentation
│   ├── package.json          # Dependencies and scripts
│   └── README.md            # Example-specific documentation
└── README.md                # This file
```

## 📚 Learning Resources

Each example includes detailed documentation covering:

- **Architecture Overview**: How the extension is structured
- **Component Usage**: Implementation details for each extension part
- **API Integration**: How to work with browser APIs and external services
- **Best Practices**: Recommended patterns and anti-patterns
- **Troubleshooting**: Common issues and solutions

## 🛠️ Development Guidelines

### Adding New Examples
1. Create a new directory with a descriptive name
2. Include comprehensive documentation
3. Follow the established patterns and structure
4. Test across different Chrome versions
5. Include build and deployment instructions

### Code Standards
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Include meaningful comments
- Write comprehensive tests

## 🔧 Common Tasks

### Building for Production
```bash
pnpm build
```

### Running Production Build
```bash
pnpm start
```

### Debugging
```bash
pnpm verbose
```

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch for your example
3. Add comprehensive documentation
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- Check the [Plasmo Documentation](https://docs.plasmo.com/)
- Review example-specific README files
- Create an issue for bugs or questions
- Check existing issues before creating new ones

## 🔗 Useful Links

- [Plasmo Framework](https://www.plasmo.com/)
- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Maintained by**: @esx
**Last Updated**: 2025
