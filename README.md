# Iqlix

## Implementation

- [x] Dark Mode
- [x] Get Started Screen
- [x] Sign In Screen (please use default value to login. logout button is in from profile tab)
- [x] Login Success Modal
- [ ] Register Screen
- [ ] Onboarding Screen
- [x] Home Screen
- [x] Movie Details Screen (Clicking on a movie in Recommendations)
- [ ] Booking flow (on progress 🚀)
- [x] Tested on iOS simulator and Android

![Group 12](https://github.com/zulvkr/try-expo/assets/25371085/f3eff6c5-4074-427c-98fa-0b9b688b764a)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd project-directory
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Development Server

To run the Expo development server, use the following command:

```bash
npx expo start
```

This will start the development server and open the Expo DevTools in your default web browser. From there, you can launch the app on an emulator/simulator or scan the QR code using the Expo Go app on your mobile device to run it on a physical device.

You might need to install [Expo Go](https://docs.expo.dev/get-started/expo-go/) on real device

## Stacks Used

1. **Expo**: The framework in general and file based routing.
2. **Mirage JS**: Mocking API responses.
3. **React Query + Axios**: Data fetching and management.
4. **React Hook Form**: Form handling.
5. **MobX**: Holding global (auth) state, but mostly for curiousity
