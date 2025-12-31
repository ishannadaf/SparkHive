import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import api from "../services/api";

export default function PostCard({ post, navigation }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const toggleLike = async () => {
    const res = await api.post(`/posts/${post.id}/react/`);
    setLiked(res.data.liked);
    setLikesCount((prev) =>
      res.data.liked ? prev + 1 : prev - 1
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#0F172A",
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        borderRadius: 14,
      }}
    >
      {/* Header */}
      <Text style={{ color: "#38BDF8", fontWeight: "bold" }}>
        {post.user}
      </Text>

      <Text style={{ color: "#94A3B8", fontSize: 12 }}>
        {(post.post_type || "post").toUpperCase()}
        {post.is_promoted && " • PROMOTED"}
      </Text>

      {/* Content */}
      <Text style={{ color: "#E5E7EB", marginVertical: 10 }}>
        {post.content}
      </Text>

      {/* Counts */}
      <Text style={{ color: "#CBD5E1", marginBottom: 8 }}>
        ❤️ {likesCount} Likes · 💬 {post.comments_count || 0} Comments
      </Text>

      {/* Actions */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={toggleLike}>
          <Text
            style={{
              color: liked ? "#EF4444" : "#38BDF8",
              marginRight: 20,
            }}
          >
            ❤️ Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Comments", { postId: post.id })
          }
        >
          <Text style={{ color: "#38BDF8" }}>💬 Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
