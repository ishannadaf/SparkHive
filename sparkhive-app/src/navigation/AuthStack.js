import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MainTabs from "./MainTabs";
import StoryViewer from "../screens/StoryViewer";
import Comments from "../screens/Comments";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="StoryViewer" component={StoryViewer} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CreatePost" component={CreatePost} />

    </Stack.Navigator>
  );
}
