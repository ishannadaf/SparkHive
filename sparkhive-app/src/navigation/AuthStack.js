import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
