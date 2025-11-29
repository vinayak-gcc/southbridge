# SouthBridge AI Agent Frontend

A high-polish, responsive frontend for a modern AI agent, featuring a streaming chat interface and a fully functional file viewer.

## Features

*   **Streaming Chat**: Simulates token-by-token streaming with distinct styling for "Reasoning" vs. "Content".
*   **File Viewer**: A recursive file tree explorer and a Monaco-powered code editor with syntax highlighting.
*   **Global Theming**: Robust Light/Dark mode that toggles the entire application state.
*   **Responsive Design**:
    *   **Mobile/Tablet/Laptop (< xl)**: Vertical layout with a slide-over file explorer drawer (open by default for quick access).
    *   **Desktop (xl+)**: Side-by-side split view with a persistent, collapsible sidebar.
*   **Markdown Support**: Rich text rendering in chat (Bold, Lists, Code Blocks) with syntax highlighting.

## Tech Stack

*   **Framework**: [Next.js 14]
*   **Styling**: [Tailwind CSS]
*   **Icons**: [Lucide React]
*   **Animations**: [Framer Motion]
*   **Editor**: [@monaco-editor/react]
*   **Markdown**: `react-markdown` + `react-syntax-highlighter`

## Folder Structure

```
app/
├── globals.css                 # Global styles & Tailwind directives
├── layout.tsx                  # Root layout
└── page.tsx                    # Main application entry point (State & Layout)

components/
├── chat/
│   ├── ChatMessage.tsx         # Individual message bubble (Markdown & Styling)
│   ├── ChatWindow.tsx          # Message list & Scrolling logic
│   └── useChatStream.ts        # Custom hook for simulating streaming
├── code-viewer/
│   ├── CodeViewer.tsx          # Monaco editor wrapper
│   ├── CodeViewerHeader.tsx    # Editor header (Theme toggle, File info)
│   └── CodeViewerFooter.tsx    # Editor footer (Status bar)
└── file-viewer/
    ├── FileExplorer.tsx        # Recursive file tree container
    └── FileTreeItem.tsx        # Individual file/folder node

```

## Some Cool Things I Added

*   **Anime Theme**: Mock data now features an Anime Watchlist.
*   **Custom Icons**: Chat interface uses personalized `Me.webp` and `southbridge.jpeg` avatars.
*   **Branding**: Integrated Southbridge logo as the application favicon.

## Future Features

*   **Real Backend Integration**: Connect `useChatStream` to a real LLM endpoint via WebSocket or Server-Sent Events.
*   **File System API**: Replace mock data with a real file system connection (e.g., via WebContainers or a local bridge).
*   **Tabs**: Support opening multiple files in tabs within the Code Viewer.
*   **Command Palette**: Add a `Ctrl+K` command palette for quick file navigation and theme toggling.

## Getting Started

1.  Install dependencies:
    ```bash
    pnpm install
    ```

2.  Run the development server:
    ```bash
    pnpm dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.
