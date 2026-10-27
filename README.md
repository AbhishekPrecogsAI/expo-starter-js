# Expo Starter (JavaScript + Tailwind)

A reusable starter: **Expo SDK 58 · Expo Router · NativeWind v4 (Tailwind CSS v3) · plain JavaScript** (no TypeScript).

It includes Expo Router screens, Tailwind styling with dark mode, reusable `Screen`, `Button` and `Card` components, an `@/` import alias, and `eas.json` profiles for building APKs on your own machine.

---

## 1. Create a new project from this template

This repo is a GitHub **template repository**, so each new project starts with a clean git history.

> Tip: keep projects in a path **without spaces or `&`** (e.g. `~/projects/my-app`). Native build tools can break on paths like `Interview & Job`.

### Option 1: GitHub CLI (fastest)

```bash
cd ~/projects
gh repo create my-app --template AbhishekPrecogsAI/expo-starter-js --private --clone
cd my-app
npm install
```

### Option 2: GitHub website

1. Open https://github.com/AbhishekPrecogsAI/expo-starter-js
2. Click **Use this template**, then **Create a new repository**.
3. Clone your new repo, then run `npm install`.

### Option 3: local only (no GitHub repo)

```bash
git clone https://github.com/AbhishekPrecogsAI/expo-starter-js.git my-app
cd my-app
rm -rf .git && git init
npm install
```

`npm install` also applies the patch in `patches/` automatically (see [Troubleshooting](#7-troubleshooting)).

### Rename the app

| File | Field | Example |
|---|---|---|
| `app.json` | `name` (shown under the app icon) | `"My App"` |
| `app.json` | `slug` (Expo project name) | `"my-app"` |
| `app.json` | `scheme` (deep links) | `"myapp"` |
| `package.json` | `name` | `"my-app"` |
| `src/constants/app.js` | `APP_NAME` | `"My App"` |

The Android package name (`com.<you>.<app>`) is added by `eas init` the first time you build. It must be unique, and it can't change after you publish to the Play Store.

---

## 2. Develop

```bash
npm start            # dev server
```

- Scan the QR code with **Expo Go**, press `a` for a USB-connected Android phone, or press `w` for web.
- Code changes appear instantly. **You don't need a new APK for every change**, only when you add a package with native code or change `app.json`.

| Script | What it does |
|---|---|
| `npm start` | Start the dev server |
| `npm run android` / `ios` / `web` | Start and open on that platform |
| `npm run reset-cache` | Start with a cleared Metro cache (use after Tailwind or Babel config changes) |
| `npm run lint` | Lint |
| `npm run doctor` | Check dependencies and config (`expo-doctor`) |
| `npm run build:apk` | Local APK build, arm64 only (see section 4) |
| `npm run build:aab` | Local Play Store AAB build (see section 4) |

### Project structure

```
src/
  app/              routes; each file is a screen
    _layout.js      root layout: imports global.css, Stack navigator
    index.js        "/"
    about.js        "/about"
    +not-found.js
  components/       Screen, Button, Card
  constants/        app-wide constants
  hooks/            custom hooks
  utils/            helpers
global.css          Tailwind directives (imported only in _layout.js)
tailwind.config.js  theme: colors etc. (`primary` is defined here)
eas.json            build profiles
patches/            patch-package fixes (applied on npm install)
AGENTS.md           conventions for AI coding agents (JS only, className styling, etc.)
```

### Conventions

- **JavaScript only:** `.js` files, no TypeScript.
- **Styling:** style with `className="..."`. Use `primary` and other theme colors from `tailwind.config.js` instead of hex values. Add `dark:` variants for dark mode.
- **Imports:** import from `src` with `@/`, e.g. `import Button from "@/components/Button"`.
- **Screens:** wrap every screen in `<Screen>` for safe-area padding and the background color.
- **Packages:** add them with `npx expo install <pkg>` so the versions match SDK 58.
- **New folders:** if you add a top-level folder that uses `className`, add it to `content` in `tailwind.config.js`.

---

## 3. One-time machine setup for local builds (Linux, no Android Studio)

You only need **JDK 17 and the Android SDK command-line tools**. Android Studio is optional; it's only useful for a GUI emulator.

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
3. **Environment variables.** Add these to `~/.bashrc`, each `export` on **one line**:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
   ```
   Then run `source ~/.bashrc` or open a new terminal.
4. **SDK packages and licenses:**
   ```bash
   sdkmanager "platform-tools" "platforms;android-35" "build-tools;36.0.0"
   yes | sdkmanager --licenses
   ```
   With the licenses accepted, Gradle downloads the rest (NDK, CMake) on the first build. `sdkmanager` may print a deprecation notice; it still works.
5. **EAS CLI** (for `npm run build:apk`):
   ```bash
   npm i -g eas-cli      # keep it up to date
   eas login             # free Expo account
   ```

**Check the setup:**

```bash
java -version            # 17
echo $ANDROID_HOME       # /home/<you>/Android/Sdk
adb version              # Android Debug Bridge ...
sdkmanager --list_installed
```

### Disk space (approximate)

| Item | Size |
|---|---|
| Android SDK (including ~2 GB NDK) | ~3 GB |
| Gradle cache `~/.gradle` | ~1.5–3 GB |
| Temporary EAS build folder in `/tmp` (deleted after each build) | ~2.5 GB while building |
| `node_modules` per project | ~0.5 GB |

Plan for **6–8 GB free**. The first build downloads about 1.5–2 GB.

---

## 4. Build an APK

### Option A: EAS local build (recommended)

Run these from **inside the project folder**:

```bash
eas init               # once per project: links it to your Expo account, sets the package name
npm run build:apk      # eas build -p android --profile preview --local
```

- The build runs **on your machine**. EAS servers are contacted to check the project and to fetch or create the signing keystore. The first build creates a keystore for you, and later builds reuse it.
- The APK is written to the project root as `build-<number>.apk`. `*.apk` and `*.aab` are gitignored. Old APKs aren't deleted automatically.
- The `preview` and `development` profiles build for **arm64-v8a only**, which covers almost every phone from recent years. The `production` profile builds for all architectures.

| Profile | Command | Output | Architectures |
|---|---|---|---|
| `preview` | `npm run build:apk` | APK for testing | arm64-v8a |
| `development` | `eas build -p android --profile development --local` | Dev-client APK | arm64-v8a |
| `production` | `npm run build:aab` | AAB for the Play Store (version code auto-increments) | all |

**Build time.** Measured on this setup (16 cores, 15 GB RAM): **~30 min** when building all 4 architectures. Arm64-only builds should take roughly **10–15 min**; that's an estimate, not measured. Local EAS builds **don't cache** between runs, because each one starts from a fresh copy in `/tmp`, so every build takes about this long. Closing browsers and IDEs gives Gradle more RAM.

### Option B: plain Gradle (fast rebuilds, no Expo account)

```bash
npx expo prebuild -p android          # once; generates android/ (gitignored)
cd android
./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a
# APK: android/app/build/outputs/apk/release/app-release.apk
```

The `android/` folder is kept, so Gradle only rebuilds what changed. **Rebuilds take a few minutes** instead of a full build. Re-run `prebuild` after changing `app.json` or adding native packages.

To build and install straight onto a connected phone:

```bash
npx expo run:android --variant release --device
```

Option B signs with the **debug keystore**. That's fine for testing on your own phone, but use EAS (Option A) or your own keystore before publishing.

---

## 5. Install on your phone

1. On the phone, open **Settings → About phone** (on Samsung: **About phone → Software information**) and tap **Build number** 7 times to enable Developer options.
2. Turn on **Developer options → USB debugging**.
3. Connect by USB and tap **Allow** on the phone.
4. Check and install:
   ```bash
   adb devices                      # your phone should show as "device"
   adb install -r build-*.apk       # -r keeps app data when updating
   ```

Without a cable: copy the `.apk` to the phone (Drive, Telegram, etc.), tap it, and allow "Install unknown apps".

---

## 6. App size

Measured from a build of this starter:

| Build | Size |
|---|---|
| APK, all 4 architectures | ~88 MB |
| APK, arm64 only (`build:apk`) | ~30 MB (estimate) |
| Play Store download (AAB, split per device) | ~10–15 MB (estimate) |

Most of the size is the React Native runtime itself. For arm64, `libreactnative.so` (6.7 MB), Hermes (2.6 MB) and the C++ library (1.2 MB) total ~10.5 MB before any app code. A **1–2 MB app isn't possible with React Native**; that size needs native Kotlin views or a TWA (website wrapped as an app). Publish with the AAB so users download only what their phone needs.

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| `npm error enoent Could not read package.json` | You're in the wrong folder. `cd` into the project first; your prompt should show the project name. |
| `java: command not found` or `ANDROID_HOME` is empty | The `~/.bashrc` lines are missing. Add them (section 3) and run `source ~/.bashrc`. |
| A terminal prints every environment variable when it opens | A wrapped paste left a bare `export` line in `~/.bashrc`. Join it with the `PATH=...` line below it. |
| Styles don't update | `npm run reset-cache` |
| Warning: `ImageBackground is deprecated` | Already fixed by `patches/react-native-css-interop+0.2.7.patch`, which applies on `npm install`. Don't use `ImageBackground`; use a `View` with an absolutely positioned `Image`. Delete the patch if you upgrade NativeWind. |
| `adb devices` shows nothing or `unauthorized` | Enable USB debugging, reconnect, and tap **Allow** on the phone. Try another cable or USB port. |
| Pasted error output into the terminal and got `Unknown command` | Harmless: bash tried to run the pasted lines. Nothing changed. |
| Package version warnings | `npx expo install --fix`, then `npm run doctor` |

### Free up disk space

```bash
du -sh ~/Android/Sdk ~/.gradle ~/.npm   # see what's using space
npm cache clean --force                 # safe; packages re-download when needed (don't run during a build)
rm -rf ~/.gradle/caches                 # safe, but the next build re-downloads ~1.5–3 GB
rm -f build-*.apk                       # old APKs in the project
```

---

## Maintaining this template

- **Don't commit the `app.json` changes from `eas init` to this template repo.** They contain your `projectId`, `owner` and Android `package`, and every app made from the template would share them. Run `eas init` in projects created from the template instead.
- Before upgrading the Expo SDK, read the versioned docs at https://docs.expo.dev and run `npx expo install --fix` and `npm run doctor` afterwards.
