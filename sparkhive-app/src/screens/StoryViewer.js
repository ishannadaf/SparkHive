import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function StoryViewer({ route, navigation }) {
  const { user } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#38BDF8", fontSize: 24 }}>
        {user}'s Story
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 40,
          backgroundColor: "#38BDF8",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
