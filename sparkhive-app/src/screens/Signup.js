import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import api from "../services/api";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !contactNo ||
      !password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/accounts/signup/", {
        first_name: firstName,
        last_name: lastName,
        username,
        contact_no: contactNo,
        password,
      });
      setLoading(false);
      navigation.replace("Login");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error || "Signup failed"
      );
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#020617" }}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#38BDF8",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        Create Account
      </Text>

      <Text
        style={{
          color: "#94A3B8",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Join SparkHive today
      </Text>

      <TextInput
        placeholder="First Name"
        placeholderTextColor="#64748B"
        value={firstName}
        onChangeText={setFirstName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#64748B"
        value={lastName}
        onChangeText={setLastName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Username"
        placeholderTextColor="#64748B"
        value={username}
        onChangeText={setUsername}
        style={inputStyle}
      />

      <TextInput
        placeholder="Contact Number"
        placeholderTextColor="#64748B"
        keyboardType="phone-pad"
        value={contactNo}
        onChangeText={setContactNo}
        style={inputStyle}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#64748B"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={inputStyle}
      />

      {error ? (
        <Text style={{ color: "#F87171", marginTop: 10 }}>
          {error}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSignup}
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
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#38BDF8", textAlign: "center" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const inputStyle = {
  backgroundColor: "#0F172A",
  color: "white",
  padding: 14,
  borderRadius: 10,
  marginBottom: 15,
};
