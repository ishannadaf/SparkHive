import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";

export default function EditProfile({ navigation }) {
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
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

  const saveProfile = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("contact_no", contact);

    if (image) {
      formData.append("profile_image", {
        uri: image.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    await api.put("/accounts/profile/update/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 20 }}>
      <Text style={{ color: "#38BDF8", fontSize: 22 }}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage} style={{ marginVertical: 20 }}>
        <Text style={{ color: "#38BDF8" }}>Change Profile Photo</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Bio"
        placeholderTextColor="#64748B"
        value={bio}
        onChangeText={setBio}
        style={inputStyle}
      />

      <TextInput
        placeholder="Contact Number"
        placeholderTextColor="#64748B"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
        style={inputStyle}
      />

      <TouchableOpacity onPress={saveProfile} style={btn}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  backgroundColor: "#0F172A",
  color: "white",
  padding: 12,
  borderRadius: 8,
  marginBottom: 15,
};

const btn = {
  backgroundColor: "#38BDF8",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
};
