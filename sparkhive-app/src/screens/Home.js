import React, { useEffect, useState } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import PostCard from "../components/PostCard";
import api from "../services/api";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFeed = async () => {
      try {
        setLoading(true);
        const res = await api.get("/posts/feed/");
        setPosts([...res.data]); // 👈 force new reference
      } catch (err) {
        console.log("Feed error", err.response?.data);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      {/* Header */}
      <View
        style={{
          padding: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: "#1E293B",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#38BDF8",
          }}
        >
          SparkHive
        </Text>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadFeed}
            colors={["#38BDF8"]}
            tintColor="#38BDF8"
          />
        }
      />
    </View>
  );
}
