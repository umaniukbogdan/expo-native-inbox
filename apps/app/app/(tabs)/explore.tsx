import React from "react";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "red", fontSize: 24, fontWeight: "bold" }}>
        Explore
      </Text>
    </View>
  );
}
