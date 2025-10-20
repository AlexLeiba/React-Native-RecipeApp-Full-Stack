import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedView } from "../themed-view";

type UserProfileProps = {
  avatar?: string;
};
function UserProfile({ avatar }: UserProfileProps) {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  function handlePressAvatar() {
    // @ts-ignore
    router.push("/profile");
  }
  return (
    <TouchableOpacity onPress={handlePressAvatar} style={{ padding: 10 }}>
      <ThemedView style={styles.avatarContainer}>
        {avatar ? (
          <Image style={styles.avatar} source={{ uri: avatar || "" }} />
        ) : (
          <User color={theme === "light" ? "black" : "white"} />
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    objectFit: "cover",
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: "100%",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#6d6c6c",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default UserProfile;
