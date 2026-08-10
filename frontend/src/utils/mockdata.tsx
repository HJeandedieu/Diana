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
    id: "3",
    role: "user",
    content:
      "I'm struggling with TypeScript types. I have a large 'User' interface, but I need different versions for creating, updating, and displaying users without rewriting the whole thing. Is there a better way?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Absolutely! You're describing the perfect use case for **TypeScript Utility Types**.  These are built-in tools that let you transform an existing type into a new one without duplication.\n\nThe most common ones for your scenario are:\n- **`Pick<T, K>`**: Selects specific properties.\n- **`Omit<T, K>`**: Removes specific properties.\n- **`Partial<T>`**: Makes all properties optional.\n- **`Required<T>`**: Makes all properties mandatory.\n\nCould you share your `User` interface?",
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
      "Perfect. Here is how we can derive your specific types from that single source of truth:\n\n**1.  For Creating a User (`CreateUserDTO`)**\nYou usually don't provide the `id` or `createdAt` (the database handles that), and you definitely don't want to type the `role` manually every time if it defaults to 'user'.  We can use **`Omit`** to remove the fields you don't need in the input.\n\n```typescript\n// Removes 'id', 'createdAt', and 'role' from User\ntype CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'role'>;\n\n// Result: { email, name, password }\n```\n\n**2.  For Updating a User (`UpdateUserDTO`)**\nWhen updating, you typically only send the fields that changed. Everything should be optional.  We combine **`Omit`** (to remove read-only fields like id) and **`Partial`** (to make the rest optional).\n\n```typescript\n// Removes 'id' and 'createdAt', then makes everything else optional\ntype UpdateUserDTO = Partial<Omit<User, 'id' | 'createdAt'>>;\n\n// Result: { email?, name?, password?, role? }\n```\n\n**3.  For Displaying a User (`PublicUser`)**\nYou never want to send the `password` to the frontend. We can use **`Omit`** again.\n\n```typescript\n// Removes 'password' and 'role' (if you want to hide roles too)\ntype PublicUser = Omit<User, 'password' | 'role'>;\n\n// Result: { id, email, name, createdAt }\n```\n\nDoes this make sense?",
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
      "Great question! They are essentially opposites:\n\n- **`Pick<T, K>`** is **inclusive**.  You list the keys you *want to keep*. Use this when you only need a small subset of a large type.\n  ```typescript\n  // I only want the 'email' and 'name'\n  type UserSummary = Pick<User, 'email' | 'name'>;\n  ```\n\n- **`Omit<T, K>`** is **exclusive**.  You list the keys you *want to remove*. Use this when you want almost everything except a few fields (like dropping an ID or password).\n  ```typescript\n  // I want everything EXCEPT 'password'\n  type SafeUser = Omit<User, 'password'>;\n  ```\n\n**Rule of Thumb:** If the list of keys you are typing is shorter than the list of keys you are ignoring, use `Pick`. Otherwise, use `Omit`.",
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
      "Exactly. **`Partial<T>`** takes a type and makes **every** property optional.  \n\nIt is ideal for:\n1. **Update forms**: As we saw, you rarely update every single field at once.\n2. **Configuration objects**: Where a user might only override specific default settings.\n\n```typescript\ninterface Config {\n  darkMode: boolean;\n  language: string;\n  fontSize: number;\n}\n\n// User only wants to change darkMode\ntype ConfigUpdate = Partial<Config>; \n// Result: { darkMode?: boolean, language?: string, fontSize?: number }\n```\n\nJust remember: `Partial` is **shallow**.  It only makes top-level properties optional. If your type has nested objects, those inner properties remain required unless you create a custom `DeepPartial` type.",
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
      "**Yes, exactly!** That is the biggest benefit.\n\nIf you add `phoneNumber` to your base `User` interface:\n1. Your `CreateUserDTO` (using `Omit`) will automatically include `phoneNumber` as a required field (unless you explicitly omit it).\n2. Your `UpdateUserDTO` will automatically allow `phoneNumber` as an optional update.\n3. Your `PublicUser` will automatically include `phoneNumber` (unless you omit it for privacy).\n\nYou maintain a **Single Source of Truth**.  You don't have to hunt down five different interfaces to add that one new field, which drastically reduces bugs and inconsistencies.",
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
      "You're very welcome! Happy coding, and feel free to reach out if you run into any more TypeScript challenges. 🚀",
  },
];
