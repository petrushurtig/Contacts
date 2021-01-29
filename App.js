import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contact, setContact] = useState({});
  

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if(data.length > 0) {
        setContact(data);
        console.log(contact)
      }
  }
}
  return (
    <View style={styles.container}>
      <FlatList
      keyExtractor={(item, index) => String(index)}
      data={contact}
      renderItem={({ item }) => <Text>{item.name} {item.phoneNumbers[0].number}</Text>}></FlatList>
      <View style={{width: 200, margin:5}}>
        <Button title="Get Contact" onPress={getContacts}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
