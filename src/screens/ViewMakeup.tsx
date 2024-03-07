import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ActivityIndicator, Text } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useMakeup } from "../hooks/useMakeup";
import DropDownPicker from 'react-native-dropdown-picker';

const MakeupFeedScreen = () => {
  const { data: makeup, isLoading, error } = useMakeup();
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [filteredMakeup, setFilteredMakeup] = useState<any[]>([]);

  useEffect(() => {
    // Filtrer les données lorsqu'il y a un changement dans selectedProductType
    if (selectedProductType) {
      const filteredData = makeup.filter(item => item.product_type === selectedProductType);
      setFilteredMakeup(filteredData);
    } else {
      // Si aucune sélection, afficher toutes les données
      setFilteredMakeup(makeup);
    }
  }, [selectedProductType, makeup]);

  const FeedCard = ({
    brand,
    name,
    productType,
    productCategory,
    productTags,
    price,
    rating,
    image,
  }: {
    brand: string;
    name: string;
    productType: string;
    productCategory: string;
    productTags: string[];
    price: number;
    rating: number;
    image: string;
  }) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={name} />
        <Paragraph> {brand}</Paragraph>
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <Paragraph >Product Type: {productType}</Paragraph>
          <Paragraph>Category: {productCategory}</Paragraph>
          <Paragraph>Tags: {productTags}</Paragraph>
          <Paragraph>Price: {price}</Paragraph>
          <Paragraph>Rating: {rating}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <FeedCard
      brand={item.brand}
      name={item.name}
      productType={item.product_type}
      productCategory={item.product_category}
      productTags={item.product_tags}
      price={item.price}
      rating={item.rating}
      image={item.image_link}
    />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text>Error fetching data</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DropDownPicker
        items={[
          { label: 'Tous les types de maquillage', value: null },
          { label: 'Blush', value: 'blush' },
          { label: 'Bronzer', value: 'bronzer' },
          // Ajoutez les autres types de maquillage ici
        ]}
        defaultValue={null}
        placeholder="Sélectionner un type de maquillage"
        containerStyle={{ height: 40, marginVertical: 10 }}
        onChangeItem={(item) => setSelectedProductType(item.value)}
      />
      <FlatList
        data={filteredMakeup}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    color: "black",
    paddingHorizontal: 20,
  },
});

export default MakeupFeedScreen;
