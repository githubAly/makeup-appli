import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ActivityIndicator, Text, TouchableOpacity, Linking } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import { useMakeup } from "../hooks/useMakeup";
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultImage from '../../assets/makeup.jpeg';

const MakeupFeedScreen = () => {
  const { data: makeup, isLoading, error } = useMakeup();
  const [selectedProductType, setSelectedProductType] = React.useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedProductLink, setSelectedProductLink] = useState<string | null>(null);

  const FeedCard = ({
    brand,
    name,
    productType,
    price,
    image,
    description,
    productLink,
  }: {
    brand: string;
    name: string;
    productType: string;
    price: string;
    image: string;
    description: string;
    productLink: string;
  }) => {
    const handleCardPress = () => {
      setSelectedDescription(description);
      setSelectedProductLink(productLink);
      setModalVisible(true);
    };

    return (
      <Card style={styles.card} onPress={handleCardPress}>
        <Card.Title 
          titleStyle={styles.titre} 
          title={name} 
        />
        <Card.Title 
          title={brand}
          titleStyle={styles.sousTitre}
        />
        <Card.Cover 
          source={{ uri: image }} 
          defaultSource={DefaultImage} 
          style={styles.img}
          resizeMode="cover" />
        <Card.Content>
          <Paragraph style={[styles.paragraph, styles.type]}> {productType}</Paragraph>
          <Paragraph style={styles.paragraph}>
            {parseFloat(price) !== 0.0 ? `${parseFloat(price)} $` : "Not Found Price"}
          </Paragraph>


        </Card.Content>
      </Card>
    );
  };

  const renderDescriptionModal = () => (
    <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <Icon name="times" size={20} color="#000" />
        </TouchableOpacity>
        <Text>{selectedDescription}</Text>
        {selectedProductLink && (
          <TouchableOpacity onPress={() => Linking.openURL(selectedProductLink)}>
            <Text style={styles.productLink}>{selectedProductLink}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );

  const renderItem = ({ item }: { item: any }) => {
    const cleanDescription = item.description ? item.description.replace(/<\/?[^>]+(>|$)/g, "") : "";
    
    return (
      <FeedCard
        brand={item.brand}
        name={item.name}
        productType={item.product_type}
        price={item.price}
        image={item.image_link}
        description={cleanDescription}
        productLink={item.product_link}
      />
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container_loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="pink" />
        </View>
        <Text style={styles.loadingText}> Make your choice ! </Text>
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
    <SafeAreaView style={styles.container_filtre}>
      <RNPickerSelect
        items={[
          { label: 'Blush', value: 'blush' },
          { label: 'Bronzer', value: 'bronzer' },
          { label: 'Eyeliner', value: 'eyeliner' },
          { label: 'Eyeshadow', value: 'eyeshadow' },
          { label: 'Lipstick', value: 'lipstick' },
          { label: 'Foundation', value: 'foundation' },
          { label: 'Lipliner', value: 'lip_liner' },
          { label: 'Mascara', value: 'mascara' },
          { label: 'Nail polish', value: 'nail_polish' },
        ]}
        placeholder={{
          label: 'Sélectionner un type de maquillage',
          value: null,
        }}
        value={selectedProductType}
        onValueChange={(value) => setSelectedProductType(value)}
        style={{
          inputIOS: {
            height: 40,
            marginVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fafafa',
            textAlign: "center",
            fontSize: 17,
            color: 'rgba(128, 128, 128, 0.5)'
          },
          inputAndroid: {
            height: 40,
            marginVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: '#fafafa',
            textAlign: "center",
          },
        }}
      />
      <FlatList
        data={makeup.filter((item: any) => !selectedProductType || item.product_type === selectedProductType)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />
      {renderDescriptionModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    width: '100%',
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
    alignItems: "center",
    height: 'auto'
  },
  titre: {
    fontWeight: 'bold',
    color: 'pink',
    fontSize: 18,
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  paragraph: {
    fontSize: 12,
    textAlign: "center",
  },
  img: {
    width: 300,
  },
  sousTitre:{
    fontWeight: 'bold',
    textAlign: "center",
  },
  type:{
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  container_filtre: {
    backgroundColor: "pink",
  },
  productLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  container_loading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loadingText: {
    color: "pink",
    fontStyle: "italic",
    fontSize: 20,
    margin: 10,
  }
});

export default MakeupFeedScreen;
