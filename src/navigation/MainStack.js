import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import ConfirmacaoScreen from "../screens/ConfirmacaoScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Tabs" component={BottomTabs} />

      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
    </Stack.Navigator>
  );
}
