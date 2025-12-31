import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import api from "../services/api";

export default function Comments({ route }) {
  const { postId } = route.params;

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.log("Load comments error", err.response?.data);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await api.post(`/posts/${postId}/comments/`, {
        text: text,
      });
      setText("");
      loadComments();
    } catch (err) {
      console.log("Add comment error", err.response?.data);
    }
  };


  useEffect(() => {
    loadComments();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#020617" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View
        style={{
          padding: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: "#1E293B",
        }}
      >
        <Text style={{ color: "#38BDF8", fontSize: 18 }}>
          Comments
        </Text>
      </View>

      {/* Comment List */}
      <FlatList
        data={comments}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "#38BDF8", fontWeight: "bold" }}>
              {item.user}
            </Text>
            <Text style={{ color: "#E5E7EB" }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderTopWidth: 0.5,
          borderTopColor: "#1E293B",
        }}
      >
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor="#64748B"
          value={text}
          onChangeText={setText}
          style={{
            flex: 1,
            backgroundColor: "#0F172A",
            color: "white",
            padding: 12,
            borderRadius: 8,
          }}
        />

        <TouchableOpacity
          onPress={addComment}
          disabled={loading}
          style={{
            marginLeft: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#38BDF8" }}>
            {loading ? "..." : "Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
