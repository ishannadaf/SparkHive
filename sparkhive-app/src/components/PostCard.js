import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function PostCard({ post }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.card,
        margin: 10,
        padding: 15,
        borderRadius: 14,
      }}
    >
      {/* Header */}
      <Text style={{ color: theme.text, fontWeight: "bold" }}>
        {post.user}
      </Text>

      <Text style={{ color: theme.subText, fontSize: 12 }}>
        {post.type.toUpperCase()}
      </Text>

      {/* Content */}
      <Text style={{ color: theme.text, marginVertical: 10 }}>
        {post.content}
      </Text>

      {/* Actions */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity>
          <Text style={{ color: theme.primary }}>❤️ Like</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: theme.primary }}>💬 Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: theme.primary }}>📤 Share</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#FFB703" }}>🚀 Promote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
