import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { formatCurrency } from "@/utils/functions/format-currency";

import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { Header } from "@/components/header";
import { Button } from "@/components/button";
import Input from "@/components/input";

import { ProductCardProps, useCartStore } from "@/stores/cart-store";

const PHONE_NUMBER = "5599999999999";

export default function Cart() {
  const cardStore = useCartStore();
  const navigation = useNavigation();
  const [address, setAddress] = useState("");

  const total = formatCurrency(
    cardStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCardProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover produto ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Remover",
          onPress: () => cardStore.remove(product.id),
        },
      ]
    );
  }

  function handleOrder() {
    if (address.trim() === "") {
      Alert.alert("Pedido", "Informe o endereço de entrega");
    }

    const products = cardStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
    🍔 Novo Pedido \n
    Entregra em: ${address} \n
    ${products} \n
    Valor Total: ${total}
    `;

    console.log(message);

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cardStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <View className="flex-1 p-5">
        {cardStore.products.length > 0 ? (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {cardStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        ) : (
          <Text className="font-body text-slate-400 text-center my-8">
            Seu carrinho está vazio.
          </Text>
        )}

        <View className="flex-row gap-2 items-center  mt-5 mb-4 pt-4 border-t border-slate-700">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
        </View>

        <Input
          onChangeText={setAddress}
          blurOnSubmit={true} //Ativa o botão de enter smartphone para submit
          returnKeyType="next"
          onSubmitEditing={handleOrder}
          placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
        />

        <View className="pt-5 gap-5">
          {cardStore.products.length > 0 && (
            <Button onPress={handleOrder}>
              <Button.Text>Enviar pedido</Button.Text>
              <Feather name="arrow-right-circle" size={20} />
            </Button>
          )}

          <LinkButton href={"/"} title="Voltar ao cardápio" />
        </View>
      </View>
    </View>
  );
}
