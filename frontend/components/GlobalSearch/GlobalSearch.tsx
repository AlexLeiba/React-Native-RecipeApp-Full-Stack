import { useDebounce } from "@/hooks/useDebounce";
import { RootState } from "@/store/config";
import { RecipeType } from "@/store/slices/recipeReducer";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { ThemedView } from "../themed-view";
import { Input } from "../ui/input";
import RecipeSearchCard from "./RecipeSearchCard";

export function GlobalSearch({
  handleCloseSearch,
}: {
  handleCloseSearch: () => void;
}) {
  const debounce = useDebounce();
  const router = useRouter();
  const hardcodedRecipeData = useSelector(
    (state: RootState) => state.hardcodedRecipes["beef"].data
  );
  const [value, onChangeText] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<
    {
      name: string;
      image: ImageSourcePropType;
      id: number;
      categoryId: number;
      details: RecipeType;
    }[]
  >([]);

  useEffect(() => {
    function handleSearch() {
      if (value.trim() !== "") {
        const searchedData = hardcodedRecipeData.filter((data) =>
          data.details.title.toLowerCase().includes(value.toLowerCase())
        );
        console.log("🚀 ~ handleSearch ~ searchedData:", searchedData);

        setSearchResults(searchedData);
      } else if (value.trim() === "") {
        setSearchResults([]);
      }
    }
    debounce(handleSearch);
  }, [value]);

  function handleClearSearch() {
    onChangeText("");
    setSearchResults([]);
  }

  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Input
          handleClearInput={() => handleClearSearch()}
          inputType="search"
          handleChange={onChangeText}
          value={value}
          placeholder="Search for recipe"
        />
        {/* </ThemedView> */}

        <TouchableOpacity onPress={() => handleCloseSearch()}>
          <X size={"40px"} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }} />

      {searchResults.length > 0 && (
        <FlatList
          keyExtractor={(item, index) => item.details.id.toString() + index}
          contentContainerStyle={{ gap: 20 }}
          numColumns={1}
          renderItem={({ item }) => (
            <RecipeSearchCard
              handleSelectRecipe={() =>
                router.push(
                  `/recipe/${item.details.id + "-" + item.name.toLowerCase()}`
                )
              }
              title={item.details.title}
              category={item.name}
              image={item.image}
            />
          )}
          data={searchResults}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
