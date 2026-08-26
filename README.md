<img src="https://imperative-surface.vercel.app/logo.png" alt="Imperative Surface Logo" width="196" />

# Imperative Surface

A lightweight, TypeScript-first UI library for React that lets you present **Dialogs and Sheets imperatively** and receive the user's result through a Promise.

Instead of managing modal visibility and result state manually, simply present a surface and `await` its result.

## Usage

```tsx
import { Surface } from 'imperative-surface';

const confirmed = await Surface.Dialog.present<boolean>({
  body: (context) => (
     <Surface.Body>
      <Surface.Header
        title="Confirm"
        onPop={() => context.pop(false)}
      />
      <Surface.Content>
        Continue with this action?
      </Surface.Content>
      <Surface.Footer>
        <button onClick={() => context.pop(false)}>
          Cancel
        </button>
        <button onClick={() => context.pop(true)}>
          Confirm
        </button>
      </Surface.Footer>
    </Surface.Body>
  ),
});

if (confirmed) {
  console.log('User confirmed'); // true or false
}
```

```tsx
const data = await Surface.Sheet.present({
  body: (context) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      const entries = Object.fromEntries(formData.entries());
      context.pop(entries);
    }

    return (
      <Surface.Body onSubmit={onSubmit}>
        <Surface.Header
          title="Create User"
          onPop={context.pop}
        />
        <Surface.Content>
          <label>
            Name:
            <input 
              type="text"
              name="name"
              placeholder="Enter name"
            />
          </label>
          <label>
            Email:
            <input 
              type="text"
              name="email"
              placeholder="Enter email"
            />
          </label>
        </Surface.Content>
        <Surface.Footer>
          <button>
            Save
          </button>
        </Surface.Footer>
      </Surface.Body>
    );
  },
});

if (data) {
  console.log(data); // { name: '...', email: '...' }
}
```

## Documentation

📚 **[Read the full documentation →](https://imperative-surface.vercel.app/docs)**

The documentation includes installation, quick start, concepts, Dialogs, Sheets, API reference, TypeScript, theming, Next.js, and examples.