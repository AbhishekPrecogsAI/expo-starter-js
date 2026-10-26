This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Project conventions (read first)

- **JavaScript only.** Write `.js` files. Do not add TypeScript, `.ts`/`.tsx` files, `tsconfig.json`, or type packages.
- **Styling: NativeWind v4 (Tailwind CSS v3).** Style with `className` on React Native components. Avoid `StyleSheet.create` and inline `style` unless a value can't be expressed in Tailwind.
  - Theme colors and tokens live in `tailwind.config.js` (`theme.extend`). Use `primary` rather than hardcoding hex values.
  - Support dark mode with `dark:` variants.
  - If you add a top-level folder that uses `className`, add it to `content` in `tailwind.config.js`.
  - Don't upgrade to NativeWind v5 or Tailwind v4 unless asked; the configs here are for v4/v3.
- **Imports:** use the `@/` alias for `src/` (`import Button from "@/components/Button"`).
- **Layout:** `src/app/` holds routes only. `src/components/` holds shared UI (`Screen`, `Button`, `Card`), `src/hooks/` holds hooks, `src/utils/` holds helpers and `src/constants/` holds constants.
- Wrap each screen in `<Screen>` so it gets safe-area padding and the background color.
- `global.css` is imported once, in `src/app/_layout.js`. Don't import it anywhere else.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.js` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
