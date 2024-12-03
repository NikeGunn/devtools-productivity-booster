# 🚀 DevBoost CLI

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license"/>
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg" alt="node version"/>
  <br/>
  <strong>A powerful command-line toolkit engineered for developers who demand military-grade precision and efficiency in their workflow.</strong>
</div>

## ⚡ Features Matrix

```
╭──────────────────────────────────────╮
│ 🛠  Project Scaffolding              │
│ 📦 Dependency Management             │
│ 🔐 Environment Variable Control      │
│ 🌿 Git Workflow Automation           │
│ 🧪 API Testing Suite                 │
│ 📊 Logging & Monitoring             │
╰──────────────────────────────────────╯
```

## 🎯 Installation

### Prerequisites

1. **Node.js Installation**
   - Ensure Node.js ≥ 16.0.0 is installed
   - Download from [Node.js Official Website](https://nodejs.org/)

2. **Global Installation**
   ```bash
   npm install -g devboost-cli
   ```

## 💻 Command Arsenal

### 🚀 Project Initialization

Create new projects with customizable templates:

```bash
devboost init [template] [-t|--typescript] [-d|--directory <dir>]
```

**Available Templates:**
- `node` - Node.js application
- `react` - React application
- `vue` - Vue.js application
- `express` - Express API

**Example:**
```bash
devboost init react -t -d my-react-app
```

### 📦 Dependency Management

Manage project dependencies efficiently:

```bash
# Add dependency
devboost add <package> [-D|--dev]

# Remove dependency
devboost remove <package>
```

**Example:**
```bash
devboost add lodash
devboost add typescript --dev
```

### 🔐 Environment Operations

Secure environment variable management:

```bash
# Set environment variable
devboost env -s KEY=VALUE

# List environment variables
devboost env -l
```

### 🌿 Git Operations

Streamline your Git workflow:

```bash
devboost git [-b|--branch <name>] [-c|--commit <message>] [-p|--push]
```

**Example:**
```bash
devboost git -b feature/new-feature -c "feat: add new feature" -p
```

### 🧪 API Testing

Test APIs directly from CLI:

```bash
devboost api -u <url> [-m <method>] [-d <data>] [-h <headers>]
```

**Example:**
```bash
devboost api -u https://api.example.com/users \
  -m POST \
  -d '{"name": "John Doe"}' \
  -h '{"Authorization": "Bearer token"}'
```

### 📊 Log Analysis

Monitor application logs:

```bash
devboost logs [-t|--tail <lines>]
```

## 🏗 Project Architecture

```
devboost-cli/
├── src/
│   ├── commands/
│   │   ├── api.js        # API testing module
│   │   ├── dependency.js # Package management
│   │   ├── env.js        # Environment module
│   │   ├── git.js        # Git operations
│   │   ├── init.js       # Project initialization
│   │   ├── logs.js       # Logging module
│   │   └── index.js      # Command orchestration
│   └── utils/
│       ├── logger.js     # Logging utilities
│       └── project.js    # Project utilities
└── package.json
```

## 🛡️ Security Protocols

- Secure environment variable handling
- Protected dependency management
- Encrypted Git operations
- Secure API request handling

## 🔧 Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/devboost-cli.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm run dev
   ```

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/enhancement`
3. Commit changes: `git commit -m 'feat: implement enhancement'`
4. Push to branch: `git push origin feature/enhancement`
5. Submit a Pull Request

## ⚠️ Error Handling

```javascript
try {
  // Operation execution
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
}
```

---

<div align="center">
  <strong>[ DevBoost CLI ]</strong><br>
  <em>Engineered for Developer Excellence</em>
</div>