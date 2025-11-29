export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  language?: string;
};

export const MOCK_FILE_SYSTEM: FileNode[] = [
  {
    id: 'root',
    name: 'southbridge-agent',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              {
                id: 'agent-core',
                name: 'AgentCore.tsx',
                type: 'file',
                language: 'typescript',
                content: `import React from 'react';
import { useAgent } from '../hooks/useAgent';

export const AgentCore = () => {
  const { state, process } = useAgent();

  return (
    <div className="agent-container">
      <h1>Agent Status: {state.status}</h1>
      <button onClick={() => process('init')}>Initialize</button>
    </div>
  );
};`
              },
              {
                id: 'memory-bank',
                name: 'MemoryBank.tsx',
                type: 'file',
                language: 'typescript',
                content: `export const MemoryBank = () => {
  // Implementation of vector store interface
  return <div>Memory Visualization</div>;
};`
              }
            ]
          },
          {
            id: 'lib',
            name: 'lib',
            type: 'folder',
            children: [
              {
                id: 'utils',
                name: 'utils.ts',
                type: 'file',
                language: 'typescript',
                content: `export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US').format(date);
};

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const generateId = () => crypto.randomUUID();`
              },
              {
                id: 'constants',
                name: 'constants.ts',
                type: 'file',
                language: 'typescript',
                content: `export const MAX_TOKENS = 4096;
export const MODEL_VERSION = 'gpt-4-turbo';
export const API_ENDPOINT = 'https://api.openai.com/v1';`
              }
            ]
          },
          {
            id: 'agent',
            name: 'agent.ts',
            type: 'file',
            language: 'typescript',
            content: `import { OpenAI } from 'openai';
import { MemoryBank } from './components/memory-bank';

export class Agent {
  private memory: MemoryBank;

  constructor(private client: OpenAI) {
    this.memory = new MemoryBank();
  }

  async process(input: string) {
    console.log("Processing input:", input);
    await this.memory.retrieve(input);
    // Complex reasoning logic here
    return "Processed";
  }
}`
          }
        ]
      },
      {
        id: 'personal',
        name: 'personal',
        type: 'folder',
        children: [
          {
            id: 'about-me',
            name: 'about-me.md',
            type: 'file',
            language: 'markdown',
            content: `# About Me

I'm a Full Stack Developer always learning and occasionally thinking if farming would be a better option or not.

I like making Good UI's, building cool features and exploring new tech. Currently, I'm working at a product-based AI startup remotely.

Outside work, I binge watch animes, movies or shows and love playing cricket or clash royale. I am also a very good chess player if you don't look at my rating.

I’m always up for a chat about tech, freelance, or just to connect. Feel free to reach out! Contact Details available in the navbar always shown below.`
          },
          {
            id: 'hobbies',
            name: 'hobbies.json',
            type: 'file',
            language: 'json',
            content: `{
  "interests": [
    "Anime", (HELL YEAH)!!
    "Movies",
    "Shows"
  ],
  "sports": [
    "Cricket" (Sometimes)
  ],
  "games": [
    "Clash Royale",
    "Chess" (DON'T ASK MY RATING)
  ]
}`
          },
          {
            id: 'thoughts',
            name: 'thoughts.txt',
            type: 'file',
            language: 'plaintext',
            content: `Day 42: Still thinking about farming.
Day 43: Maybe I should try building a Omnitrix first.`
          }
        ]
      },
      {
        id: 'secret-plans',
        name: 'secret-plans',
        type: 'folder',
        children: [
          {
            id: 'world-domination',
            name: 'world-domination.md',
            type: 'file',
            language: 'markdown',
            content: `# World Domination Plan (Draft)

1.  **Phase 1**: Build a really cool AI agent.
2.  **Phase 2**: Make it write better code than me.
3.  **Phase 3**: ......
4.  **Phase 4**: PROFIT!

## To-Do List
- Remember to buy more Tea.
- Don't let the AI know about the "off" switch.
- Maybe start with dominating the local Tea shop first.`
          },
          {
            id: 'anime-recommendations',
            name: 'anime-watchlist.txt',
            type: 'file',
            language: 'plaintext',
            content: `1. Frieren: Beyond Journey's End
2. The Eminence in Shadow
3. March Comes in Like a Lion
4. The Irregular at Magic High School
5. Let This Grieving Soul Retire`
          }
        ]
      },
      {
        id: 'config',
        name: 'config',
        type: 'folder',
        children: [
          {
            id: 'tsconfig',
            name: 'tsconfig.json',
            type: 'file',
            language: 'json',
            content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "/*.ts", "/*.tsx"],
  "exclude": ["node_modules"]
}`
          }
        ]
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        language: 'json',
        content: `{
  "name": "southbridge-agent",
  "version": "1.0.0",
  "dependencies": {
    "openai": "^4.0.0",
    "zod": "^3.0.0",
    "react": "^18.2.0",
    "framer-motion": "^10.0.0"
  }
}`
      },
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# Southbridge Agent

This is a demo agent implementation showing advanced capabilities.

## Architecture
- Core: React-based frontend
- State: Redux Toolkit
- AI: OpenAI GPT-4 integration

## Features
- Token streaming
- File system access
- Reasoning capabilities
- Memory persistence
`
      }
    ]
  }
];

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  reasoning?: string; // For "thinking" blocks
};

export const INITIAL_CHAT_STATE: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your Southbridge agent. I can help you explore this codebase. What would you like to do?",
    reasoning: "Initialized system state. Ready for user input."
  },
  {
    id: '2',
    role: 'user',
    content: "Can you explain how the agent core is implemented?"
  }
];

export const SIMULATED_RESPONSE = {
  reasoning: "I need to analyze the `AgentCore.tsx` file and the `agent.ts` class. The user is asking for an architectural overview. \n\n1.  Locate Files: Found `src/components/AgentCore.tsx` and `src/agent.ts`.\n2.  Analyze Dependencies: `AgentCore` uses a custom hook `useAgent`. `Agent` class initializes `MemoryBank`.\n3.  Formulate Explanation: I should explain the separation of concerns between the UI component and the logic class.\n4.  Draft Response: Start with the high-level structure, then dive into the code details.",
  content: "I've analyzed the codebase and found the core implementation details.\n\nThe agent logic is split into two main parts:\n\n1.  **UI Component** (`AgentCore.tsx`): This handles the visual representation and user interaction. It uses a `useAgent` hook to bridge the UI with the logic.\n2.  **Logic Class** (`agent.ts`): This is where the heavy lifting happens. It initializes the OpenAI client and manages a `MemoryBank` instance for context retrieval.\n\nHere is a snippet of how the agent is initialized:\n\n```typescript\nexport class Agent {\n  private memory: MemoryBank;\n\n  constructor(private client: OpenAI) {\n    this.memory = new MemoryBank();\n  }\n\n  async process(input: string) {\n    console.log(\"Processing input:\", input);\n    await this.memory.retrieve(input);\n    // Complex reasoning logic here\n    return \"Processed\";\n  }\n}\n```\n\nWould you like me to dive deeper into the `MemoryBank` implementation?"
};
