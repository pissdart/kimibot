# Kimibot

<p align="center">
  <img src="./assets/kimibot-banner.png" alt="Kimibot" width="600">
</p>

<p align="center">
  <strong>Native Kimi AI Gateway for Personal Assistants</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/github/actions/workflow/status/pissdart/kimibot/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="#"><img src="https://img.shields.io/github/v/release/pissdart/kimibot?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://www.kimi.com"><img src="https://img.shields.io/badge/Kimi-AI-6366f1?style=for-the-badge" alt="Kimi AI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-6366f1.svg?style=for-the-badge" alt="MIT License"></a>
</p>

---

## Overview

Kimibot is a personal AI assistant gateway that runs on your own infrastructure. It provides native integration with the Kimi API and connects to your existing communication channels, allowing you to interact with AI models through familiar messaging platforms.

**Key Capabilities:**
- Native Kimi K2.5, K2, and Moonshot V1 model support
- Multi-channel messaging (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams)
- Voice wake and talk mode on macOS/iOS/Android
- Live Canvas workspace with A2UI protocol
- Browser automation via Chrome/Chromium
- Device node system for cross-platform capabilities
- Local-first architecture with self-hosted Gateway

---

## Quick Start

### Prerequisites

- **Node.js** >= 22.12.0
- **Kimi API Key** from [kimi.com](https://www.kimi.com)

### Installation

```bash
# Install globally
npm install -g kimibot@latest

# Run the onboarding wizard
kimibot onboard --install-daemon
```

The wizard will guide you through:
1. Gateway configuration
2. Channel setup (WhatsApp, Telegram, etc.)
3. API key configuration
4. Daemon installation (optional)

### Basic Usage

```bash
# Start the gateway
kimibot gateway --port 18789 --verbose

# Send a message via CLI
kimibot agent --message "What is the weather today?"

# With specific model and thinking level
kimibot agent --message "Optimize this function" --model moonshot/kimi-k2.5 --thinking high
```

---

## Configuration

### API Keys

Set your Kimi API key as an environment variable:

```bash
export MOONSHOT_API_KEY="your-api-key-here"
```

Or add to your shell profile (`.bashrc`, `.zshrc`, etc.) for persistence.

### Configuration File

Kimibot stores configuration in `~/.kimibot/config.json`. Key settings:

```json
{
  "agent": {
    "model": "moonshot/kimi-k2.5",
    "thinking": "medium"
  },
  "gateway": {
    "port": 18789,
    "host": "127.0.0.1"
  },
  "channels": {
    "whatsapp": {
      "enabled": true
    },
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN"
    },
    "slack": {
      "enabled": true,
      "botToken": "xoxb-YOUR-TOKEN"
    }
  }
}
```

### Model Selection

Available models:

| Model | Context | Best For |
|-------|---------|----------|
| `moonshot/kimi-k2.5` | 256K | Complex reasoning, long documents |
| `moonshot/kimi-k2` | 256K | General purpose, coding |
| `moonshot/kimi-v1-128k` | 128K | Long context tasks |
| `moonshot/kimi-v1-32k` | 32K | Standard conversations |
| `moonshot/kimi-v1-8k` | 8K | Quick responses |

Switch models via CLI:
```bash
kimibot agent --message "Hello" --model moonshot/kimi-k2.5
```

Or set as default in config:
```bash
kimibot config set agent.model moonshot/kimi-k2.5
```

---

## Channel Setup

### WhatsApp

```bash
# Login to WhatsApp (generates QR code in terminal)
kimibot channels login whatsapp

# Check status
kimibot channels status whatsapp
```

### Telegram

1. Create a bot via [@BotFather](https://t.me/botfather)
2. Set the token:
```bash
kimibot config set channels.telegram.botToken "YOUR_BOT_TOKEN"
kimibot config set channels.telegram.enabled true
```

### Discord

1. Create a bot at [Discord Developer Portal](https://discord.com/developers/applications)
2. Configure:
```bash
kimibot config set channels.discord.token "YOUR_BOT_TOKEN"
kimibot config set channels.discord.enabled true
```

### Slack

1. Create a Slack app at [api.slack.com](https://api.slack.com/apps)
2. Add Bot Token scopes: `chat:write`, `im:history`, `channels:history`
3. Configure:
```bash
kimibot config set channels.slack.botToken "xoxb-YOUR-TOKEN"
kimibot config set channels.slack.appToken "xapp-YOUR-APP-TOKEN"
kimibot config set channels.slack.enabled true
```

---

## Usage Patterns

### Direct CLI Usage

```bash
# Simple query
kimibot agent --message "Explain quantum computing"

# With file attachment
kimibot agent --message "Review this code" --file ./script.js

# With image
kimibot agent --message "Describe this image" --image ./photo.png

# Long-running task with high thinking
kimibot agent --message "Design a database schema for..." --thinking high
```

### Daemon Mode

Run the Gateway as a background service:

```bash
# Install daemon (macOS: launchd, Linux: systemd)
kimibot onboard --install-daemon

# Start daemon
kimibot daemon start

# Check status
kimibot daemon status

# View logs
kimibot logs --follow
```

### Web Interface

Access the Control UI at `http://localhost:18789` when the Gateway is running.

Features:
- Real-time chat interface
- Session management
- Channel configuration
- Tool execution logs
- Usage statistics

---

## Advanced Features

### Voice Mode

On macOS with the companion app:

```bash
# Enable voice wake
kimibot config set voice.wake.enabled true

# Set wake phrase
kimibot config set voice.wake.phrase "Hey Kimi"
```

### Browser Automation

```bash
# Start browser session
kimibot browser start

# The assistant can now:
# - Navigate to URLs
# - Click elements
# - Fill forms
# - Take screenshots
# - Download files
```

### Canvas Workspace

Enable visual workspace:

```bash
kimibot config set canvas.enabled true
```

The assistant can render:
- Interactive dashboards
- Data visualizations
- Form interfaces
- Live previews

### Device Nodes

Connect additional devices:

```bash
# List available nodes
kimibot nodes list

# Pair a new device
kimibot nodes pair

# Invoke device capability
kimibot nodes invoke <device-id> camera.snap
```

---

## Commands Reference

### Core Commands

| Command | Description |
|---------|-------------|
| `kimibot onboard` | Interactive setup wizard |
| `kimibot gateway` | Start the Gateway server |
| `kimibot agent` | Send message to assistant |
| `kimibot daemon` | Manage background service |
| `kimibot config` | View/edit configuration |
| `kimibot doctor` | Diagnose issues |

### Channel Commands

| Command | Description |
|---------|-------------|
| `kimibot channels list` | List configured channels |
| `kimibot channels login <name>` | Authenticate channel |
| `kimibot channels status` | Check channel health |
| `kimibot message send` | Send message via channel |

### Node Commands

| Command | Description |
|---------|-------------|
| `kimibot nodes list` | List connected devices |
| `kimibot nodes pair` | Pair new device |
| `kimibot nodes invoke` | Execute device action |
| `kimibot nodes camera` | Camera operations |
| `kimibot nodes screen` | Screen recording |

### Utility Commands

| Command | Description |
|---------|-------------|
| `kimibot logs` | View system logs |
| `kimibot update` | Update to latest version |
| `kimibot reset` | Reset configuration |
| `kimibot uninstall` | Remove kimibot |

---

## Development

### From Source

```bash
git clone https://github.com/pissdart/kimibot.git
cd kimibot

# Install dependencies
pnpm install

# Build UI components
pnpm ui:build

# Compile TypeScript
pnpm build

# Run in development mode
pnpm gateway:watch
```

### Project Structure

```
kimibot/
├── src/
│   ├── agents/        # AI agent runtime
│   ├── channels/      # Messaging channel integrations
│   ├── cli/          # Command-line interface
│   ├── gateway/      # WebSocket gateway server
│   └── ...
├── ui/               # Control UI components
├── website/          # Marketing website
├── docs/             # Documentation
└── apps/             # Companion apps (iOS, Android, macOS)
```

---

## Troubleshooting

### Gateway won't start

```bash
# Check if port is in use
lsof -i :18789

# Try different port
kimibot gateway --port 8080

# Check logs
kimibot logs --since 1h
```

### Channel not responding

```bash
# Verify channel configuration
kimibot doctor

# Re-authenticate
kimibot channels login <channel-name>
```

### Model errors

```bash
# Verify API key
kimibot config get agent.model
kimibot agent --message "test" --verbose

# Check model availability
kimibot models list
```

---

## Security

- API keys stored in OS keychain (macOS) or config (Linux)
- Gateway binds to localhost by default
- Channel access controlled via allowlists
- DM pairing codes for unknown senders
- Optional sandbox mode for bash execution

See [SECURITY.md](SECURITY.md) for detailed security documentation.

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Support

- Documentation: [docs.kimibot.io](https://docs.kimibot.io)
- Issues: [GitHub Issues](https://github.com/pissdart/kimibot/issues)
- Kimi API: [kimi.com](https://www.kimi.com)
