import React, { createContext, useState } from "react";
import api from "../services/api";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);

      const res = await api.post("/accounts/login/", {
        username,
        password,
      });

      await SecureStore.setItemAsync("access", res.data.access);
      await SecureStore.setItemAsync("refresh", res.data.refresh);

      setUser({ username });
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
