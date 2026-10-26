# Expo Starter (JavaScript + Tailwind)

A reusable starter: **Expo SDK 58 · Expo Router · NativeWind v4 (Tailwind CSS v3) · plain JavaScript**.

## Use it for a new project

```bash
cp -r expo-starter-js my-new-app
cd my-new-app
rm -rf .git node_modules .expo && git init
# rename "name", "slug" and "scheme" in app.json and "name" in package.json
npm install
npm start
```

Press `a` for Android, `i` for iOS, `w` for web, or scan the QR code with Expo Go.

## Structure

```
src/
  app/            routes (each file is a screen)
    _layout.js    root layout: imports global.css, Stack navigator
    index.js      "/"
    about.js      "/about"
    +not-found.js
  components/     Screen, Button, Card
  constants/      app-wide constants
  hooks/          custom hooks
  utils/          helpers
global.css        Tailwind directives
tailwind.config.js  theme (colors, etc.)
```

## Notes

- Style with `className="..."`. Theme colors live in `tailwind.config.js`.
- Import from `src` with `@/`, e.g. `import Button from "@/components/Button"`.
- If styles don't update after a config change, run `npm run reset-cache`.
- Add packages with `npx expo install <pkg>` so you get SDK-compatible versions.
