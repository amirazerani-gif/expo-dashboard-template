# Expo Dashboard Template

A production-ready Expo starter for role-based apps with a public interface and protected dashboard — so you skip the boilerplate and go straight to building features.

Built on the Expo tabs template, extended with an auth-gated dashboard group that supports unlimited roles and redirect-based route protection out of the box.

---

## What's Included

### 🎨 UI Primitives
- `text`, `input`, `textArea`, `button`, and `lavaBg` components built in
- [`react-native-size-matters`](https://github.com/nirsky/react-native-size-matters) pre-configured for consistent cross-device scaling
- Typography system with built-in font handling and icon library setup

### 🌗 Theme & Tokens
- Full token-based theme system (`tokens.ts`)
- Automatic dark / light mode toggling
- Default spacing and font size primitives

### 🔐 Auth & Role-Based Routing
- Built on the Expo tabs template with an auth-gated `(protected)` dashboard group
- Supports unlimited roles — add role checks in the layout, no structural changes needed
- Redirect protection built in — unauthenticated users are pushed to `(auth)`, wrong-role users are redirected automatically
- Auth store wired and ready (`auth.store.ts`)
- Separate `(auth)`, `(tabs)`, and `(protected)` route groups pre-scaffolded

### 🌐 API Layer
- Shared `axios` instance (`api/core/base.ts`) with:
  - Bearer token injection via `expo-secure-store`
  - Dev / prod base URL switching via `EXPO_PUBLIC_TESTING` flag
  - `FormData` content-type handling
  - Automatic token cleanup on `401`
- `.env.example` included for environment setup

### ⚠️ Error Handling
- `error.store.ts` — parses and categorizes API errors (validation, auth, network, server, etc.)
- `useErrorListener` hook — listens to the store and fires toasts automatically
- [`sonner-native`](https://github.com/gunnartorfis/sonner-native) pre-installed and wired in root layout

### 🗂️ Project Structure

    app/                  # Expo Router route files and layouts
      (auth)/             # Login, register, forgot password etc.
      (tabs)/             # Public tab-based interface
      (dashboard)/        # Auth-gated dashboard — role checked on layout level
    assets/               # Fonts, images, icons
    components/
      ui/                 # Core UI components (Text, Input, TextArea, Button, LiveBg)
    screens/              # Screen files and orchestrators
    lib/                  # Library and theme infra
    api/
      core/               # Core axios instance and wrapper types
    stores/
      core/               # Error store and core global functionality
    hooks/
      core/               # Core prebuilt hooks (useErrorListener etc.)



### 📦 Core Dependencies
| Package | Purpose |
|---|---|
| `expo-router` | File-based navigation |
| `zustand` | State management |
| `axios` | HTTP client |
| `expo-secure-store` | Token storage |
| `react-native-size-matters` | Responsive scaling |
| `sonner-native` | Toast notifications |
| `@expo/vector-icons` | Icon library |
| `react-native-reanimated` | animations library |

---

## Getting Started

```bash
gh repo create <your-app-name> --template amirazerani-gif/expo-dashboard-template --clone --private
cd <your-app-name>
cp .env.example .env
npm install
npx expo start
```

Then fill in your `.env`:

```env
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_API_TEST_URL=https://staging-api.yourapp.com
EXPO_PUBLIC_TESTING=false
```

---

## Notes
- Switch `EXPO_PUBLIC_TESTING=true` to point at your staging API during development
- Role-based routing is scaffolded — wire your roles into the auth store and protected layout
- All UI primitives respect the token system — update `tokens.ts` to rebrand instantly
