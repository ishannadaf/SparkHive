import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function Post() {
  const { theme } = useContext(ThemeContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [postType, setPostType] = useState("question");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const submitPost = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_type", postType);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: "post.jpg",
        type: "image/jpeg",
      });
    }

    await api.post("/posts/create/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setContent("");
    setImage(null);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text, fontSize: 18, marginBottom: 10 }}>
        Create Post
      </Text>

      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ height: 200, marginVertical: 10, borderRadius: 12 }}
        />
      )}

      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: theme.primary, marginVertical: 10 }}>
          📷 Add Image
        </Text>
      </TouchableOpacity>

      {/* Post Type Selector (Simple for now) */}
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        {["question", "project", "event"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setPostType(type)}
            style={{
              marginRight: 10,
              padding: 8,
              borderRadius: 8,
              backgroundColor:
                postType === type ? theme.primary : theme.border,
            }}
          >
            <Text style={{ color: "white" }}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={submitPost}
        style={{
          backgroundColor: theme.primary,
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}
