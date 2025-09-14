# Dispatch Island - Content Distribution Chrome Extension

Dispatch Island is a powerful Chrome extension built with Plasmo that enables content creators to write once and publish to multiple platforms simultaneously. It provides a rich editing experience with Markdown support and comprehensive platform management.

## 🚀 Features

- **Multi-Platform Publishing**: Write content once and distribute to multiple platforms
- **Rich Markdown Editor**: Full Markdown support for content creation
- **Platform Management**: Easy management of connected publishing platforms
- **Distribution Tracking**: Monitor and track content distribution across platforms
- **Multiple Extension Views**:
  - Popup interface for quick access
  - Side panel for real-time information
  - Options page for configuration
  - New tab page for dedicated editing
  - Developer tools panel

## 📦 Project Structure

```
dispatch-island/
├── src/
│   ├── app/                 # Next.js app pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main app page
│   ├── components/          # Shared React components
│   │   └── main.tsx         # Main component
│   ├── devtools/            # Chrome DevTools panel
│   │   └── index.tsx        # DevTools interface
│   ├── newtab/              # New tab page
│   │   └── index.tsx        # New tab interface
│   ├── options/             # Extension options page
│   │   └── index.tsx        # Options interface
│   ├── panels/              # Extension panels
│   │   ├── font-picker/     # Font picker panel
│   │   └── font-properties/ # Font properties panel
│   ├── popup/               # Extension popup
│   │   └── index.tsx        # Popup interface
│   ├── sandboxes/           # Sandboxed scripts
│   │   └── sandbox.ts       # Sandbox functionality
│   ├── sidepanel/           # Side panel
│   │   └── index.tsx        # Side panel interface
│   └── tabs/                # Tab pages
│       └── delta-flyer.tsx  # Delta Flyer tab page
├── .github/                 # GitHub configuration
├── .next/                   # Next.js build output
├── .plasmo/                 # Plasmo configuration
├── assets/                  # Static assets
├── build/                   # Production builds
├── keys.json                # Browser store API keys
├── package.json             # Project dependencies and scripts
├── TODO.md                  # Development roadmap
└── tsconfig.json           # TypeScript configuration
```

## 🛠️ Technology Stack

- **Framework**: Plasmo (Chrome Extension Framework)
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Next.js 15
- **Styling**: Inline styles + CSS-in-JS
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ 
- pnpm or npm
- Chrome browser (for development)

## 🚦 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dispatch-island
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

This will start both:
- Plasmo development server for the extension
- Next.js development server on port 1947

### Loading the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-dev` directory

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Create production builds
- `pnpm start` - Start production server
- `pnpm verbose` - Run Plasmo with verbose output

## 🎯 Extension Components

### Popup (`src/popup/index.tsx`)
Quick access interface with:
- Welcome message
- Input field for content
- Tab opening functionality
- Iframe mounting capabilities

### Side Panel (`src/sidepanel/index.tsx`)
Persistent side panel for:
- Real-time information display
- Quick actions
- Content preview

### Options Page (`src/options/index.tsx`)
Extension configuration with:
- Settings management
- Platform connections
- User preferences

### New Tab Page (`src/newtab/index.tsx`)
Custom new tab page featuring:
- Dedicated editing interface
- Quick access to content creation
- Personalized browsing experience

### Developer Tools (`src/devtools/index.tsx`)
Developer-focused panel for:
- Debugging information
- Performance monitoring
- Extension diagnostics

## 🔧 Configuration

### Browser Store Deployment

Configure store credentials in `keys.json`:

```json
{
  "chrome": {
    "clientId": "your-client-id",
    "refreshToken": "your-refresh-token",
    "extId": "your-extension-id",
    "clientSecret": "your-client-secret"
  },
  "edge": {
    "clientId": "your-edge-client-id",
    "clientSecret": "your-edge-client-secret",
    "productId": "your-product-id",
    "accessTokenUrl": "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/token"
  }
}
```

### Manifest Permissions

The extension requires:
- `host_permissions`: ["https://*/*"] - For cross-platform API access
- `permissions`: ["tabs"] - For tab management and content injection

## 📝 Usage

1. **Click the extension icon** to open the popup
2. **Use the side panel** for persistent access to tools
3. **Configure settings** through the options page
4. **Open new tabs** for dedicated editing sessions
5. **Access developer tools** through Chrome DevTools

### Content Creation Flow

1. Write content using the Markdown editor
2. Connect to desired publishing platforms
3. Preview content across different platforms
4. Schedule or publish immediately
5. Track distribution and engagement

## 🚧 Development Roadmap

See `TODO.md` for current development priorities:

- [ ] Automated deployment setup
- [ ] Enhanced new tab editing experience
- [ ] Internationalization (i18n) support
- [ ] Additional platform integrations
- [ ] Advanced analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For issues and questions:
1. Check the existing documentation
2. Review the Plasmo framework docs
3. Create an issue in the repository

## 🔗 Resources

- [Plasmo Documentation](https://www.plasmocn.org/)
- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Version**: 0.1.10  
**Author**: @esx  
**Last Updated**: 2024