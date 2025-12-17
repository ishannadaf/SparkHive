import React from "react";
import { ScrollView, View } from "react-native";
import StoryCircle from "./StoryCircle";

export default function StoriesBar() {
  const dummyStories = ["You", "Aman", "Priya", "Rahul", "TechClub"];

  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dummyStories.map((name, index) => (
          <StoryCircle key={index} name={name} />
        ))}
      </ScrollView>
    </View>
  );
}
