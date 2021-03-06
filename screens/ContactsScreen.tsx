import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import ContactListItem from "../components/ContactListItem";
import { useEffect, useState } from "react";
import Users from "../data/Users";

const ContactsScreen = () => {
  //   const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const usersData = await API.graphql(graphqlOperation(listUsers));
  //         setUsers(usersData.data.listUsers.items);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     fetchUsers();
  //   }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={Users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactsScreen;
