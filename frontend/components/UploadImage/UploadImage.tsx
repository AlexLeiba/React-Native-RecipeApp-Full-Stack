import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { Edit } from "lucide-react-native";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type AvatarProps = {
  selectedImage: string;
  readOnly?: boolean;
  handleSelectImage: (image: string) => void;
};
export function UploadImage({
  selectedImage,
  readOnly,
  handleSelectImage,
}: AvatarProps) {
  // const [selectedImage, setSelectedImage] = React.useState("");
  const theme = useColorScheme() ?? "light";
  const avatarUrl =
    "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80";

  const pickImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleSelectImage(result.assets[0].uri);
    }
  };
  return (
    <ThemedView
      style={[
        { paddingTop: 100 },
        { flexDirection: "row", justifyContent: "center" },
      ]}
    >
      <View style={{ position: "relative" }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: selectedImage || avatarUrl }}
          />
        </View>
        {!readOnly && (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              padding: 10,
            }}
          >
            <Edit color={Colors.dark.text} />
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 5,
    borderRadius: "100%",
    width: 100,
    height: 100,
    backgroundColor: "#787878",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
});
