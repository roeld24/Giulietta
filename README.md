# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## how to start
- sudo systemctl start mongod
- npm run dev

## how does it work? 
- users 
   - login: should be able to login thanks to a pw and a username
   - register: not needed, every user will be registered from the admin
   - should be able to start a timer only through a qr code, once timer started they should be able to pause it or to stop it and to save the session
   - each user should be able to see his sessions, filter them by month
   *optional*
   - can check his shifts, will receive notification to start/stop the timer
      - after 6 hours shift, user will start receiving notifications to stop the timer

- admin
   - possibility to register and delete users 
   - possibility to see all users and their sessions
   - can see per month the total of hours done
   - can export each monthly session in a file
   - can modify single session of a user (in case they forgot to start/stop the timer)
   *optional*
   - can upload users shift
   - receive notification when a user starts/stop the timer


