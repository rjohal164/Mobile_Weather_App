# React Native Routing Practice

## Practice Scenario: Pet Tracker App (Stack Routing)

### Objective:
Build a multi-screen React Native app using **Stack navigation with React Navigation (native stack)** to help users track their pets.

---

## 🧱 Required Screens

### 1. **Welcome Screen**
- Displays app name/logo using `Text` or `Image`.
- A **"Start Tracking"** button (using `TouchableOpacity` or `Button`) navigates to the **Pet List Screen**.

### 2. **Pet List Screen**
- Uses `ScrollView` to list pets inside `View` blocks.
- Includes a `Button` to navigate to the **Add Pet Screen**.
- Each pet name is wrapped in a `TouchableOpacity` and navigates to the **Pet Details Screen**, passing pet info using **navigation parameters**.

### 3. **Add Pet Screen**
- `TextInput` fields to enter pet name, type, and age.
- A `Button` to "Save" the new pet:
  - Validates inputs.
  - Navigates back to **Pet List Screen** and passes the new pet as a parameter (or uses a callback function).

### 4. **Pet Details Screen**
- Receives pet info via navigation params.
- Displays name, type, and age using `Text`.
- A **Back** button to return to the list.

---

## 🌀 How Navigation & State Work

- Use `useNavigation()` or `navigation` prop to move between screens.
- Use `route.params` to pass data (like a pet object) between screens.
- For managing multiple pets, maintain a `pets` array state in **Pet List Screen**.

---

## ✅ Must Use Tags / Components

| Tag | Purpose |
|-----|--------|
| `Text` | To display static or dynamic text |
| `View` | Container for layout and grouping |
| `ScrollView` | Scrollable area to show pet list |
| `TextInput` | To input pet details |
| `Button` | Basic clickable UI element |
| `TouchableOpacity` | Wraps content with press behavior and visual feedback 

---


