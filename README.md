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

### One-time machine setup (Linux, no Android Studio needed)

You only need the Android SDK. Android Studio is optional; it's only useful if you want a GUI emulator.

1. **JDK 17** (React Native recommends 17; newer JDKs can fail):
   ```bash
   sudo apt install openjdk-17-jdk unzip
   ```
2. **Android command-line tools**: download "Command line tools only" for Linux from
   https://developer.android.com/studio#command-tools, then:
   ```bash
   mkdir -p ~/Android/Sdk/cmdline-tools
   unzip ~/Downloads/commandlinetools-linux-*_latest.zip -d ~/Android/Sdk/cmdline-tools
   mv ~/Android/Sdk/cmdline-tools/cmdline-tools ~/Android/Sdk/cmdline-tools/latest
   ```
   `sdkmanager` only runs from `cmdline-tools/latest/bin`, which is why the folder is renamed.
3. Add to `~/.bashrc`, then run `source ~/.bashrc`:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
   ```
4. **SDK packages and licenses:**
   ```bash
   sdkmanager "platform-tools" "platforms;android-35" "build-tools;36.0.0"
   yes | sdkmanager --licenses
   ```
   With the licenses accepted, Gradle downloads anything else on the first build, such as the NDK and CMake.
5. **EAS CLI** (only for Option A): `npm i -g eas-cli`, then `eas login` (free account).

Check the setup with `java -version` (should be 17), `sdkmanager --list_installed` and `adb devices` (your phone should appear with USB debugging on).

**Disk space** (approximate): the SDK takes ~3 GB, including the ~2–2.5 GB NDK. The Gradle cache in `~/.gradle` takes another ~1.5–3 GB, so plan for **6–8 GB free**. The first build downloads ~1.5–2 GB. To reclaim space, run `rm -rf ~/.gradle/caches` (it re-downloads on the next build).

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
