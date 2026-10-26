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

## Build an APK locally (no EAS cloud)

### One-time machine setup (Linux)

1. **JDK 17** (React Native recommends 17; newer JDKs can fail):
   ```bash
   sudo apt install openjdk-17-jdk
   ```
2. **Android SDK**: install Android Studio. In SDK Manager, install *Android SDK Platform 35*, *Build-Tools 36*, *Command-line Tools* and *NDK (Side by side)*.
3. Add to `~/.bashrc`, then run `source ~/.bashrc`:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
   ```
4. **EAS CLI**: `npm i -g eas-cli`, then `eas login` (free account).

### Option A: EAS local build (uses `eas.json`)

Run `eas init` once per new project to link it to your Expo account. Then:

```bash
npm run build:apk    # eas build -p android --profile preview --local  -> .apk
npm run build:aab    # production .aab for the Play Store
```

The build runs on your machine, and the `.apk` lands in the project root. EAS servers are only contacted to check the project and fetch signing credentials. The first build creates a keystore for you.

Install the APK on a USB-connected phone (with USB debugging on):

```bash
adb install build-*.apk
```

### Option B: plain Gradle (no Expo account at all)

```bash
npx expo prebuild -p android             # generates /android (gitignored)
cd android && ./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

Or build and install straight onto a connected phone:

```bash
npx expo run:android --variant release --device
```

Option B signs with the debug keystore. That's fine for testing on your own device, but set up your own keystore before publishing.

## Notes

- Style with `className="..."`. Theme colors live in `tailwind.config.js`.
- Import from `src` with `@/`, e.g. `import Button from "@/components/Button"`.
- If styles don't update after a config change, run `npm run reset-cache`.
- Add packages with `npx expo install <pkg>` so you get SDK-compatible versions.
