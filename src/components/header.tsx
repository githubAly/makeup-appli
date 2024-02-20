import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

var width = Dimensions.get('window').width;
export default function Header() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titre}variant="displayMedium">Spacecraft</Text>
        </ScrollView>
      
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      paddingTop: 50,
      paddingBottom: 30,
      width: width,
      backgroundColor: 'purple',
    },

})