import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("/notifications/")
      .then((res) => setNotifications(res.data))
      .catch((err) =>
        console.log("Notification error", err.response?.data)
      );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      <View
        style={{
          padding: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: "#1E293B",
        }}
      >
        <Text style={{ color: "#38BDF8", fontSize: 20 }}>
          Notifications
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "#E5E7EB" }}>
              <Text style={{ color: "#38BDF8" }}>
                {item.sender}
              </Text>{" "}
              {item.message}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
