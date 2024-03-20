import React from "react";
import { View, ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator size={32} />
    </View>
  );
}
