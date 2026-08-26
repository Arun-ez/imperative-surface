<img src="https://imperative-surface.vercel.app/logo.png" alt="Imperative Surface Logo" width="196" />

# Imperative Surface

A lightweight, TypeScript-first UI library for React that lets you present **Dialogs and Sheets imperatively** and receive the user's result through a Promise.

Instead of managing modal visibility and result state manually, simply present a surface and `await` its result.

```tsx
import { Surface } from 'imperative-surface';

const confirmed = await Surface.Dialog.present<boolean>({
  body: ConfirmDialog,
});

if (confirmed) {
  console.log('User confirmed');
}
```

## Documentation

📚 **[Read the full documentation →](https://imperative-surface.vercel.app/docs)**

The documentation includes installation, quick start, concepts, Dialogs, Sheets, API reference, TypeScript, theming, Next.js, and examples.

## Features

- **Promise-based API** — Treat UI interactions like asynchronous operations.
- **TypeScript-first** — Type the values returned from your surfaces.
- **React-first** — Render normal React components inside Dialogs and Sheets.
- **Dialogs & Sheets** — Use centered dialogs or edge-attached surfaces.
- **Typed results** — Return any value through `pop(value)`.
- **Responsive Sheets** — Automatically adapt to different screen sizes.
- **Customizable styling** — Customize the UI using CSS variables.
- **No provider required** — Surfaces mount themselves when presented.
- **Next.js ready** — Supports React and Next.js applications.

## Installation

```bash
npm install imperative-surface
```

Or with pnpm:

```bash
pnpm add imperative-surface
```

Or with Yarn:

```bash
yarn add imperative-surface
```

## Quick Start

Create a React component that receives `pop`:

```tsx
const ConfirmDialog = ({ pop }) => {
  return (
    <Surface.Body>
      <Surface.Header
        title="Confirm"
        onPop={() => pop(false)}
      />

      <Surface.Content>
        Continue with this action?
      </Surface.Content>

      <Surface.Footer>
        <button onClick={() => pop(false)}>
          Cancel
        </button>

        <button onClick={() => pop(true)}>
          Confirm
        </button>
      </Surface.Footer>
    </Surface.Body>
  );
};
```

Then present it:

```tsx
const confirmed = await Surface.Dialog.present<boolean>({
  body: ConfirmDialog,
});

if (confirmed) {
  console.log('Confirmed');
}
```

Calling `pop(value)` closes the surface and resolves the Promise with that value.

## Sheets

Sheets can be presented from any supported edge:

```tsx
const result = await Surface.Sheet.present({
  body: MySheet,
  position: 'bottom',
  size: 'large',
});
```

Supported positions include:

- `top`
- `bottom`
- `left`
- `right`
- `auto`

## Dialogs

Dialogs are ideal for confirmations and focused interactions:

```tsx
const result = await Surface.Dialog.present({
  body: MyDialog,
  size: 'medium',
  barrierDismissible: false,
});
```

## Type-Safe Results

Use TypeScript generics to define the value returned by a surface:

```tsx
interface User {
  id: string;
  name: string;
}

const user = await Surface.Dialog.present<User>({
  body: UserDialog,
});

console.log(user?.name);
```

Inside the surface:

```tsx
pop({
  id: '123',
  name: 'John Doe',
});
```

## Requirements

- React 18+
- React DOM 18+
- TypeScript recommended

## Learn More

For the complete API reference, advanced usage, theming, accessibility, Next.js integration, and examples:

**[→ Read the Imperative Surface Documentation](https://imperative-surface.vercel.app/docs)**