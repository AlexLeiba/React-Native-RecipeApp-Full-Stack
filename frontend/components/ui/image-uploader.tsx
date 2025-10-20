import * as ImagePicker from "expo-image-picker";
import { X } from "lucide-react-native";
import { Image, TouchableHighlight, useColorScheme, View } from "react-native";
import { Button } from "./button";

type ImageUploaderProps = {
  handlePick: (value: string) => void;
  image?: string;
  title?: string;
};
export function ImageUploader({
  handlePick,
  image,
  title,
}: ImageUploaderProps) {
  const theme = useColorScheme() ?? "light";
  //   const [image, setImage] = useState<string | null>(null);

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
      handlePick(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title={title || "Pick an image"} handlePress={pickImage} />
      {image && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
          <TouchableHighlight onPress={() => handlePick("")}>
            <X color={theme === "dark" ? "white" : "black"} />
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}
