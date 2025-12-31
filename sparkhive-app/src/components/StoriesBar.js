import React, { useContext } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import StoryCircle from "./StoryCircle";
import api from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function StoriesBar() {
  const { theme } = useContext(ThemeContext);

  const stories = [
      { name: "Aman", image: "https://picsum.photos/500/800" },
      { name: "Priya", image: "https://picsum.photos/501/800" },
      { name: "TechClub", image: "https://picsum.photos/502/800" },
    ];
  
  {stories.map((story, index) => (
    <StoryCircle
      key={index}
      name={story.name}
      imageUrl={story.image}
    />
  ))}

  const uploadStory = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        name: "story.jpg",
        type: "image/jpeg",
      });

      try {
        await api.post("/posts/story/create/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Story uploaded");
      } catch (err) {
        console.log("Story upload error", err);
      }
    }
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        
        {/* Add Story */}
        <TouchableOpacity onPress={uploadStory}>
          <StoryCircle name="You +" isAdd />
        </TouchableOpacity>

        {/* Other Stories */}
        {stories.map((name, index) => (
          <StoryCircle key={index} name={name} />
        ))}
      </ScrollView>
    </View>
  );
}
