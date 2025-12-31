import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function StoryBubble({ story, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", marginHorizontal: 10 }}
    >
      <View
        style={{
          width: 65,
          height: 65,
          borderRadius: 35,
          borderWidth: 2,
          borderColor: "#38BDF8",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#020617",
        }}
      >
        <Text style={{ fontSize: 24 }}>👤</Text>
      </View>

      <Text
        style={{
          color: "#CBD5E1",
          fontSize: 12,
          marginTop: 6,
        }}
        numberOfLines={1}
      >
        {story.user}
      </Text>
    </TouchableOpacity>
  );
}
