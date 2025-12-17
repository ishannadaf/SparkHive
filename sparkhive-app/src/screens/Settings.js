import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const { darkMode, setDarkMode, theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ color: theme.text, fontSize: 18 }}>Dark Mode</Text>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
}
