import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function StoryCircle({ name }) {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={{ alignItems: "center", marginRight: 12 }}>
      <View
        style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          borderWidth: 3,
          borderColor: theme.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={{ width: 58, height: 58, borderRadius: 29 }}
        />
      </View>
      <Text style={{ color: theme.text, fontSize: 12, marginTop: 4 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
