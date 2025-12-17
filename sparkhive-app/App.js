import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
