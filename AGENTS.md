# AGENTS.md - Kimibot

## Overview

Kimibot is a native Kimi AI gateway for personal assistants. It provides a complete platform for running AI agents across multiple channels and devices.

## Architecture

The system consists of:

- **Gateway** - WebSocket control plane for sessions, channels, tools, and events
- **Agent Runtime** - Pi-based RPC agent with tool streaming
- **Channels** - WhatsApp, Telegram, Slack, Discord, Signal, iMessage, WebChat
- **Nodes** - Device capabilities for macOS, iOS, Android
- **Canvas** - Visual workspace with A2UI protocol

## Development

Run `kimibot onboard` for initial setup.

See docs/ for detailed documentation.
