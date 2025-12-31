import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const { login, loading } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const success = await login(username, password);
    if (success) {
      navigation.replace("MainTabs");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020617",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#38BDF8",
          textAlign: "center",
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Login to SparkHive
      </Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#64748B"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: "#0F172A",
          color: "white",
          padding: 14,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#64748B"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#0F172A",
          color: "white",
          padding: 14,
          borderRadius: 10,
        }}
      />

      {error ? (
        <Text style={{ color: "#F87171", marginTop: 10 }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          marginTop: 25,
          backgroundColor: "#38BDF8",
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#020617" />
        ) : (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#38BDF8", textAlign: "center" }}>
          Create new account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
