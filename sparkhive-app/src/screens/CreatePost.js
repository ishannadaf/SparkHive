import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";

const POST_TYPES = [
  { label: "Announcement", value: "announcement" },
  { label: "Question", value: "question" },
  { label: "Project", value: "project" },
  { label: "Event", value: "event" },
  { label: "Internship", value: "internship" },
  { label: "Resource", value: "resource" },
];

export default function CreatePost({ navigation }) {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("question");
  const [image, setImage] = useState(null);

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

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 16 }}>
      <Text style={{ color: "#38BDF8", fontSize: 22 }}>
        Create Post
      </Text>

      {/* Post Type */}
      <View style={{ marginVertical: 15 }}>
        <Text style={{ color: "#CBD5E1", marginBottom: 6 }}>
          Post Type
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {POST_TYPES.map((p) => (
            <TouchableOpacity
              key={p.value}
              onPress={() => setPostType(p.value)}
              style={{
                padding: 10,
                borderRadius: 8,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor:
                  postType === p.value
                    ? "#38BDF8"
                    : "#0F172A",
              }}
            >
              <Text
                style={{
                  color:
                    postType === p.value
                      ? "#020617"
                      : "#CBD5E1",
                }}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <TextInput
        placeholder="Write something for your college community..."
        placeholderTextColor="#64748B"
        multiline
        value={content}
        onChangeText={setContent}
        style={{
          backgroundColor: "#0F172A",
          color: "white",
          padding: 12,
          borderRadius: 10,
          minHeight: 120,
        }}
      />

      {/* Image */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          marginVertical: 15,
          backgroundColor: "#1E293B",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#38BDF8" }}>
          {image ? "Change Image" : "Add Image"}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ height: 200, borderRadius: 12 }}
        />
      )}

      {/* Submit */}
      <TouchableOpacity
        onPress={submitPost}
        style={{
          marginTop: 20,
          backgroundColor: "#38BDF8",
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}
