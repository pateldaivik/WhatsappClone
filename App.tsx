import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure(config);
function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const randomImages = [
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
  ];

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        if (userData.data.getUser) {
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "Hey I am using whatsapp",
        };
        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
