'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { FileExplorer } from '@/components/file-viewer/FileExplorer';
import { CodeViewer } from '@/components/code-viewer/CodeViewer';
import { FileNode } from '@/lib/mock-data';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileNode | undefined>();
  const [showMobileExplorer, setShowMobileExplorer] = useState(true);
  const [showDesktopExplorer, setShowDesktopExplorer] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <main className={clsx("h-screen", theme === 'dark' ? 'dark' : '')}>
      <div className={clsx("flex flex-col xl:flex-row h-screen w-full overflow-hidden", theme === 'light' ? "bg-white" : "bg-zinc-950")}>
        {/* Left Side */}
        <div className={clsx(
          "flex flex-col border-b xl:border-b-0 xl:border-r relative shrink-0 w-full h-1/2 xl:h-full xl:w-[25%] 2xl:w-1/5",
          theme === 'light' ? "border-zinc-300" : "border-zinc-800/80"
        )}>
          <ChatWindow theme={theme} />
        </div>

        {/* Right Side */}
        <div className={clsx("flex-1 flex flex-col min-w-0 h-1/2 xl:h-full", theme === 'light' ? "bg-white" : "bg-zinc-900/50")}>
          <div className={clsx("flex h-full relative", theme === 'light' ? 'bg-white' : 'bg-zinc-950')}>
            {/* Mobile Dropdown */}
            {showMobileExplorer && (
              <div
                className="xl:hidden absolute inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
                onClick={() => setShowMobileExplorer(false)}
              />
            )}

            {/* Mobile Drawer */}
            <div className={clsx(
              "xl:hidden absolute inset-y-0 left-0 z-50 w-72 flex-col border-r transition-transform duration-300 ease-in-out shadow-2xl",
              theme === 'light' ? "bg-zinc-50 border-zinc-200" : "bg-zinc-950 border-zinc-800/50",
              showMobileExplorer ? "translate-x-0" : "-translate-x-full"
            )}>
              <FileExplorer
                onSelectFile={(file) => {
                  setSelectedFile(file);
                  setShowMobileExplorer(false);
                }}
                selectedFileId={selectedFile?.id}
                theme={theme}
              />
            </div>

            {/* Desktop Sidebar */}
            <div className={clsx(
              "hidden xl:flex flex-col border-r h-full shrink-0 z-50",
              theme === 'light' ? "bg-zinc-50 border-zinc-200" : "bg-zinc-950 border-zinc-800/50",
              "transition-all duration-300 ease-in-out",
              showDesktopExplorer ? "w-72 xl:w-[25%] translate-x-0" : "w-0 -translate-x-full opacity-0 overflow-hidden"
            )}>
              <FileExplorer
                onSelectFile={(file) => {
                  setSelectedFile(file);
                }}
                selectedFileId={selectedFile?.id}
                theme={theme}
              />
            </div>

            <div className="flex-1 h-full min-w-0 overflow-hidden">
              <CodeViewer
                file={selectedFile}
                theme={theme}
                setTheme={setTheme}
                onToggleMobileExplorer={() => setShowMobileExplorer(!showMobileExplorer)}
                onToggleDesktopExplorer={() => setShowDesktopExplorer(!showDesktopExplorer)}
              />
            </div>
          </div>
        </div>

      </div>
    </main >
  );
}
