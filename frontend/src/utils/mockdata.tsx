import type { Message } from "../types";

export const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Hello Diana",
  },
  {
    id: "2",
    role: "assistant",
    content: "Hello! I'm Diana. What can I do for you today?",
  },
  {
    id: "5",
    role: "user",
    content:
      "Sure, here it is:\n\n```typescript\ninterface User {\n  id: string;\n  email: string;\n  name: string;\n  password: string;\n  role: 'admin' | 'user';\n  createdAt: Date;\n}\n```",
  },
  {
    id: "6",
    role: "assistant",
    content:
      "## Derived Types Implementation\n\nPerfect. Here is how we derive strictly typed Data Transfer Objects (DTOs) from your single source of truth:\n\n### 1. Create User DTO (`CreateUserDTO`)\n\nWe omit server-managed fields (`id`, `createdAt`) since the database handles those automatically.\n\n```typescript\n// Input validation schema for POST /users\ntype CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'role'>;\n\n// Result: { email: string, name: string, password: string }\n```\n\n### 2. Update User DTO (`UpdateUserDTO`)\n\nFor PATCH requests, fields must be optional, but we still exclude read-only system fields.\n\n```typescript\n// Input validation schema for PATCH /users/:id\ntype UpdateUserDTO = Partial<Omit<User, 'id' | 'createdAt'>>;\n\n// Result: { email?: string, name?: string, password?: string, role?: 'admin' | 'user' }\n```\n\n### 3. Public User Response (`PublicUser`)\n\nNever expose `password` or internal `role` logic to the client. This type guarantees safety at compile time.\n\n```typescript\n// Response type for GET /users/:id\ntype PublicUser = Omit<User, 'password' | 'role'>;\n\n// Result: { id: string, email: string, name: string, createdAt: Date }\n```\n\n### Why This Matters\n\nBy using `Omit` and `Partial`, you establish a **Single Source of Truth**.  If you add a `phoneNumber` field to `User` tomorrow, your build pipeline will immediately flag any missing handling in your Create/Update flows, preventing runtime bugs.",
  },
  {
    id: "7",
    role: "user",
    content:
      "That is much cleaner! One question: What's the actual difference between `Pick` and `Omit`? They seem similar.",
  },
  {
    id: "8",
    role: "assistant",
    content:
      "## `Pick` vs. `Omit`: Logical Inverses\n\nGreat question! They are essentially opposites:\n\n### `Pick<T, K>`: The Whitelist Approach\n\nUse this when you need a **small subset** of a large type.  It is explicit about what you *include*.\n\n```typescript\n// I only want the 'email' and 'name'\ntype UserSummary = Pick<User, 'email' | 'name'>;\n```\n\n### `Omit<T, K>`: The Blacklist Approach\n\nUse this when you want **almost everything** except a few sensitive or irrelevant fields.  It is explicit about what you *exclude*.\n\n```typescript\n// I want everything EXCEPT 'password'\ntype SafeUser = Omit<User, 'password'>;\n```\n\n### Comparison Summary\n\n| Feature | `Pick` | `Omit` |\n| :--- | :--- | :--- |\n| **Strategy** | Inclusive (Whitelist) | Exclusive (Blacklist) |\n| **Use When** | You need few fields from many | You want all fields except a few |\n| **Risk** | Missing new fields automatically | Accidentally including new sensitive fields |\n\n> **Rule of Thumb:** If the list of keys you are typing is shorter than the list of keys you are ignoring, use `Pick`.  Otherwise, use `Omit`.",
  },
  {
    id: "9",
    role: "user",
    content: "Got it. And `Partial`? I see that used a lot in forms.",
  },
  {
    id: "10",
    role: "assistant",
    content:
      "## Understanding `Partial<T>`\n\nExactly. **`Partial<T>`** takes a type and makes **every** property optional.\n\n### Ideal Use Cases\n\n1.  **Update forms**: As we saw, you rarely update every single field at once.\n2. **Configuration objects**: Where a user might only override specific default settings.\n3. **PATCH endpoints**: APIs that accept partial updates.\n\n### Example Usage\n\n```typescript\ninterface Config {\n  darkMode: boolean;\n  language: string;\n  fontSize: number;\n}\n\n// User only wants to change darkMode\ntype ConfigUpdate = Partial<Config>; \n// Result: { darkMode?: boolean, language?: string, fontSize?: number }\n```\n\n### Critical Note: Shallow vs. Deep\n\n> **Warning:** `Partial` is **shallow**.  It only makes top-level properties optional. If your type has nested objects, those inner properties remain required unless you create a custom `DeepPartial` type.\n\nFor nested structures, you would need a recursive mapped type to make all levels optional.",
  },
  {
    id: "11",
    role: "user",
    content:
      "This is incredibly helpful. So by using these, if I add a new field to `User` later, all these derived types update automatically?",
  },
  {
    id: "12",
    role: "assistant",
    content:
      "## The Power of a Single Source of Truth\n\n**Yes, exactly!** That is the biggest benefit.\n\n### Impact Analysis\n\nIf you add `phoneNumber: string` to your base `User` interface:\n\n1.  **`CreateUserDTO`** (using `Omit`): Will automatically include `phoneNumber` as a required field (unless you explicitly omit it).  The compiler will error until you decide whether to collect it.\n2. **`UpdateUserDTO`**: Will automatically allow `phoneNumber` as an optional update field, ready for your API to handle.\n3. **`PublicUser`**: Will automatically include `phoneNumber` (unless you omit it for privacy). This forces you to make a conscious security decision about PII.\n\n### Benefits of This Approach\n\n- **No Type Drift**: You don't have to hunt down five different interfaces to add that one new field.\n- **Compile-Time Safety**: The compiler forces you to handle new fields explicitly.\n- **Reduced Bugs**: Drastically reduces inconsistencies between your API layers and frontend models.\n\nYou maintain a **Single Source of Truth**, which is the cornerstone of maintainable TypeScript codebases.",
  },
  {
    id: "13",
    role: "user",
    content:
      "You've convinced me. I'm refactoring my types right now. Thanks, Diana!",
  },
  {
    id: "14",
    role: "assistant",
    content:
      "## Next Steps 🚀\n\nYou're very welcome! Refactoring to utility types is a high-leverage move for long-term maintainability.\n\n### Recommended Follow-ups\n\n- **Runtime Validation**: Pair these types with **Zod** or **Valibot** schemas for end-to-end type safety from database to UI.\n- **Deep Partial**: If you have nested forms, I can help you implement a `DeepPartial` utility type.\n- **Advanced Patterns**: Explore `Record<K, V>` for permission maps or `ReturnType<T>` for inferring function results.\n\nFeel free to reach out if you need assistance with implementation details. Happy coding!",
  },
];
