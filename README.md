# Simple Shopping List App 🛒🛒

### Purpose
The Shopping List Mobile App is designed to help users organize and manage their shopping lists in an efficient, user-friendly way. Users can add items with quantities, mark them as purchased, edit quantities, and remove items from their list. It also allows users to select multiple items to delete at once, offering a smooth shopping experience.

This app is built with React Native and integrates several features such as quantity editing, item deletion.

### Features
Add Items: Users can add items to their shopping list with a name and quantity.
Edit Quantities: Users can edit the quantity of an item directly in the list.
Mark as Purchased: Users can mark items as purchased by checking them off.
Delete Items: Users can delete individual items or select multiple items to delete at once.
Responsive Layout: The app is designed to be mobile-friendly, with support for different screen sizes.
Undo Deletions: If all items are deleted, users can undo this action and restore the list.

## Running it locally:
Node.js installed on your machine (you can download it from [here](https://nodejs.org/en/download/prebuilt-installer/current)).
Expo CLI installed globally or use `npx` to run commands directly.
To install Expo CLI globally, run: `npm install -g expo-cli`

1. Clone the repository: `git clone https://github.com/VanessaBolos/CRUD-App.git`

2. Navigate to the project directory: `cd CRUD-App`

3. Install dependencies

   ```bash
   npm install
   ```
   `@expo/vector-icons
   react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-svg react-native-gesture-handler
` 

4. Start the app

   ```bash
    npm start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Additional Notes:

#### Difficulties:
- Handling empty states: managing the logic for undoing deletions or displaying an empty list while keeping the UI intuitive required some fine-tuning
- Still trying to get used to the CSS styling. I had difficulty trying to see why it didn't appear right in the emulator but looked okay in the web version. Mainly consisting spacing and alighment across the list.
- Still trying to get used to the React Native framework.

#### Wins:
- Had a pretty good idea of what I wanted the app to achieve: a functional shopping list app that is user-friendly, visually appealing, and efficient.
- Successfully implemented the features I wanted to include, including quantity editing, batch item deletion, and undoing deletion
- Managed to get the app running on Android simulators, which was a great learning experience
- Dynamic Editing: Introducing in-list editing of quantities without disrupting the overall flow was a major feature win.

