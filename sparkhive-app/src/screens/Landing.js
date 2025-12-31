import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F172A",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#38BDF8" }}>
        SparkHive
      </Text>

      <Text style={{ color: "#CBD5E1", marginTop: 10 }}>
        Connect • Build • Innovate
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          marginTop: 40,
          backgroundColor: "#38BDF8",
          paddingHorizontal: 40,
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#020617", fontSize: 16 }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#38BDF8" }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
