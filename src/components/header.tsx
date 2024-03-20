import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

import colors from "tailwindcss/colors";
import logo from "@/assets/logo.png";

type HeaderProps = {
  title: string;
  cartQuantityItens?: number;
};

export function Header({ title, cartQuantityItens = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5 mt-5">
      <View className="flex-1 bg-transparent">
        <Image source={logo} className="h-6 w-32" alt="Logo" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>
      {cartQuantityItens > 0 && (
        <Link href={"/cart"} asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-1 z-10 -right-2">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItens}
              </Text>
            </View>
            <Feather name="shopping-cart" size={24} color={colors.white} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
