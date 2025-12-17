import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  const posts = [
    { id: 1, user: "Aman", type: "question", content: "Anyone working on AI projects?" },
    { id: 2, user: "Tech Club", type: "event", content: "Hackathon this weekend 🚀" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        ListHeaderComponent={<StoriesBar />}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
