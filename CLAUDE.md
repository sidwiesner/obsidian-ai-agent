# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Development mode with watch (esbuild, inline sourcemaps)
- `npm run build` - Production build with TypeScript type checking and minification
- `npm run version` - Bump version in manifest.json and versions.json

## Architecture

This is an Obsidian plugin that integrates Claude Code CLI directly into Obsidian's interface, enabling AI-assisted workflows without leaving the editor.

### Core Components

**main.ts** - Plugin entry point. Handles lifecycle (`onload`/`onunload`), registers the custom view type `ai-chat-view`, manages settings, and activates the chat view in the right sidebar.

**ChatView.ts** - Primary UI component (~930 lines). Manages:
- Real-time chat interface with streaming message rendering
- Claude Code process spawning via `child_process`
- Stream JSON parsing from Claude's `--output-format stream-json` output
- Session management with resumption support (`--resume`)
- Context-aware messaging (includes active file path when enabled)
- Tool use visualization (collapsible cards for bash, file operations, TodoWrite)

**commandDetector.ts** - Cross-platform path detection for Node.js and Claude CLI. Checks NVM, Homebrew, system paths, and supports user overrides via settings.

**SettingsTab.ts** - Plugin settings UI for configuring Node.js/Claude paths and debug mode.

**types.ts** - TypeScript interfaces including `AIChatSettings`.

### Claude Code Integration

The plugin spawns Claude as a child process with these arguments:
- `--output-format stream-json` (for real-time streaming)
- `--permission-mode bypassPermissions`
- `--dangerously-skip-permissions`
- `--verbose`
- `--resume [session_id]` (for session continuation)

Working directory is set to the vault root. User input is piped via stdin.

### Key Patterns

- Message types: user, assistant, tool_use, tool_result, system
- Streaming: JSON lines parsed incrementally, UI updates on each complete message
- Tool rendering: Collapsible sections with special handling for TodoWrite (task cards)
- File context: Active Obsidian file path included in messages when toggle enabled

## TypeScript Configuration

- Target: ES6 (transpiled to ES2018 by esbuild)
- Strict mode enabled (`strictNullChecks`, `noImplicitAny`)
- Output: CommonJS bundle (`main.js`)
