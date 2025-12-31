import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";

export default function StoryCircle({ name, imageUrl, isAdd }) {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const openStory = () => {
    if (isAdd) return;

    navigation.navigate("StoryViewer", {
      imageUrl: imageUrl || "https://picsum.photos/600/900",
      username: name,
    });
  };

  return (
    <TouchableOpacity onPress={openStory} activeOpacity={0.8}>
      <View style={{ alignItems: "center", marginRight: 12 }}>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: 34,
            borderWidth: 3,
            borderColor: isAdd ? theme.secondary : theme.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: imageUrl || "https://i.pravatar.cc/150" }}
            style={{ width: 58, height: 58, borderRadius: 29 }}
          />
        </View>

        <Text style={{ color: theme.text, fontSize: 12, marginTop: 4 }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
