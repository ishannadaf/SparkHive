import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import api from "../services/api";
import PostCard from "../components/PostCard";
export default function Profile({ navigation }) {
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    const res = await api.get("/accounts/profile/");
    setProfile(res.data);
  };

  const toggleFollow = async () => {
    const res = await api.post(
      `/accounts/follow/${profile.username}/`
    );
    setProfile({
      ...profile,
      is_following: res.data.following,
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#020617", padding: 15 }}>
      {/* Header */}
      <Text style={{ color: "#38BDF8", fontSize: 22 }}>
        {profile.username}
      </Text>

      <Text style={{ color: "#E5E7EB", marginBottom: 10 }}>
        {profile.first_name} {profile.last_name}
      </Text>

      {/* Stats */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Text style={statStyle}>
          {profile.posts.length} Posts
        </Text>
        <Text style={statStyle}>
          {profile.followers} Followers
        </Text>
        <Text style={statStyle}>
          {profile.following} Following
        </Text>
      </View>

      {/* Actions */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={toggleFollow}
          style={buttonStyle}
        >
          <Text>
            {profile.is_following ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            buttonStyle,
            { backgroundColor: "#1E293B" },
          ]}
        >
          <Text style={{ color: "#38BDF8" }}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={buttonStyle}
            >
            <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate("CreatePost")}
            style={buttonStyle}
            >
            <Text>Create Post</Text>
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <Text
        style={{
            color: "#38BDF8",
            fontSize: 18,
            marginBottom: 10,
        }}
        >
        My Posts
        </Text>

        <FlatList
        data={profile.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <PostCard post={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
        />
    </View>
  );
}

const statStyle = {
  color: "#CBD5E1",
  marginRight: 20,
};

const buttonStyle = {
  backgroundColor: "#38BDF8",
  padding: 10,
  borderRadius: 8,
  marginRight: 10,
};

const postStyle = {
  backgroundColor: "#0F172A",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
};
