# React Native Push Notification Demo

A comprehensive React Native (Expo) application demonstrating push notification capabilities with background task handling and notification history tracking. Organized as a monorepo with shared UI components and Storybook.

## Monorepo Structure

This project is organized as a monorepo using npm workspaces:

```
react-native-push-notification/
├── packages/
│   └── ui/                    # Shared UI package with components
├── apps/
│   ├── app/                   # Main application
│   └── storybook/             # Storybook for component documentation
└── package.json               # Root workspace configuration
```

## Features

### Push Notification Support
- **Foreground Notifications**: Handle notifications when app is active
- **Background Notifications**: Process notifications when app is minimized
- **Terminated State**: Capture notifications even when app is fully closed
- **Deep Linking**: Navigate to specific screens from notifications
- **Data Payload Handling**: Extract and process custom notification data

### Notification History
- **Persistent Storage**: Save all received notifications locally using AsyncStorage
- **Read/Unread Status**: Track which notifications have been viewed
- **Batch Mark as Read**: Mark all notifications as read with one tap
- **Persistent Across Sessions**: History survives app restarts

### Technical Implementation
- **Expo Router**: File-based routing for navigation
- **Expo Notifications**: Native notification handling
- **Expo Task Manager**: Background task execution
- **AsyncStorage**: Local data persistence
- **TypeScript**: Full type safety
- **EAS Build**: Development and production builds

## Tech Stack

- **React Native 0.81.5**
- **Expo SDK 54**
- **Expo Router 6.0**
- **TypeScript 5.9**
- **EAS Build** for production builds

## Project Structure

### Main Application (`apps/app/`)
```
├── app/                          # Expo Router pages
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx            # Home screen (notification testing)
│   │   ├── explore.tsx           # Notification details
│   │   └── history.tsx          # Notification history (coming soon)
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
├── hooks/                        # Custom React hooks
├── tasks/                        # Background tasks
│   └── notificationHandler.ts   # Background notification handler
├── utils/                        # Utility functions
│   ├── notificationHistory.ts   # History management
│   └── navigation.ts            # Navigation helpers
└── types/                        # TypeScript types
    └── notification.ts           # Notification interfaces
```

### UI Package (`packages/ui/`)
Shared UI components, themes, hooks, and utilities used across the monorepo.

### Storybook (`apps/storybook/`)
Component documentation and testing environment. Currently includes Typography component stories covering all variants.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally
- Expo account for EAS Build
- Physical device or emulator for testing

### Installation

1. Install dependencies (from root):
   ```bash
   npm install
   ```
   This will install all dependencies for all workspace projects.

2. Start the main application:
   ```bash
   npm run app:start
   # or
   cd apps/app && npm start
   ```

3. Start Storybook:
   ```bash
   npm run storybook:start
   # or
   cd apps/storybook && npm start
   ```

### Development Modes

#### Using Expo Go (Limited Functionality)
```bash
npx expo start
# Scan QR code with Expo Go app
```
**Note**: Background tasks and advanced notification features require a development build.

#### Using Development Build (Full Functionality)
```bash
# Build development build
npm run build:dev:android  # For Android
npm run build:dev:ios      # For iOS

# Start dev server
npx expo start --dev-client
```

## Usage

### Testing Push Notifications

1. **Get Push Token**: Open the app and copy the push token from the Home screen
2. **Send Test Notification**: Use the built-in test button or send via Expo's push service
3. **Test Scenarios**:
   - Send notification while app is **active** (foreground)
   - Send notification while app is **minimized** (background)
   - Send notification while app is **closed** (terminated)
   - Open app via notification tap (deep link testing)

### Features

#### Home Screen
- Display Expo push token
- Show last received notification details
- Send test notifications
- Track notification source (active/background/startup)

#### Explore Screen
- View notification details
- See notification metadata and data payload
- Navigate from background notifications

#### History Screen (Coming Soon)
- View all received notifications
- Filter read/unread status
- Batch mark as read
- Delete notifications

## Build for Production

```bash
# Android APK
eas build --profile development --platform android

# Android App Bundle (for Play Store)
eas build --profile production --platform android

# iOS
eas build --profile development --platform ios
```

## Configuration

### Push Notification Setup
The app uses Expo's push notification service. Configure your `app.json`:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    },
    "android": {
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

### Background Tasks
Background notification handling is configured in:
- `app.json`: Android background task configuration
- `tasks/notificationHandler.ts`: Background task implementation

## Architecture

### Notification Flow

```
Push Notification Received
    ↓
Foreground? → Active Listener
Background? → Background Task Handler
Terminated? → Background Task Handler
    ↓
Save to History (AsyncStorage)
    ↓
Display in UI
```

### Data Flow

```
Notification → notificationHandler.ts
              ↓
        Save to AsyncStorage
              ↓
        Read by history screen
              ↓
        Display in FlatList
```

## Key Implementation Details

1. **Background Tasks**: Registered via `Notifications.registerTaskAsync()` 
2. **Persistence**: All notifications saved to AsyncStorage
3. **Navigation**: Deep linking via expo-router
4. **State Management**: React hooks + AsyncStorage
5. **Type Safety**: Full TypeScript coverage

## Troubleshooting

### Background Tasks Not Working
- Requires development build (not Expo Go)
- Check AndroidManifest.xml configuration
- Verify task is registered on app startup

### Notifications Not Received
- Check device has internet connection
- Verify push token is valid
- Ensure permissions are granted

### History Not Persisting
- Check AsyncStorage is working
- Verify app has storage permissions
- Look for console errors in debug logs

## License

MIT License - Private project

## Storybook

Storybook is available to view and test UI components. To run:

```bash
npm run storybook:start
# Then select the storybook app in Expo
```

### Available Stories

- **Typography**: Comprehensive coverage of all typography variants
  - All variant types (head14, head16, text12, caption10, etc.)
  - Text alignment examples (left, center, right, justify)
  - Text transform (uppercase, lowercase, capitalize)
  - Custom colors and palette colors
  - Grouped by category (Headings, BodyText, Captions, Headers)

## Workspace Packages

### @react-native-push-notification/ui

Shared UI package containing all components, themes, hooks, and utilities.

Import in your apps:
```typescript
import { Typography } from '@react-native-push-notification/ui';
import { theme } from '@react-native-push-notification/ui/theme';
```

## Learn More

- [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Storybook for React Native](https://storybook.js.org/docs/react-native/get-started/introduction)
