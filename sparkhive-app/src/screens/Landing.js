import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Landing({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary, justifyContent: "center", padding: 30 }}>
      <Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>
        SparkHive
      </Text>

      <Text style={{ color: "white", marginVertical: 15, fontSize: 16 }}>
        Where College Ideas Spark 🚀
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ textAlign: "center", color: theme.primary }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ borderColor: "white", borderWidth: 1, padding: 15, borderRadius: 10, marginTop: 15 }}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
