import { useRouter } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
  View,
} from "react-native";
import { GlobalSearch } from "../GlobalSearch/GlobalSearch";
import { ThemedView } from "../themed-view";
import { H2 } from "../typography/typography";
import UserProfile from "../UserProfile/UserProfile";

type HeaderProps = {
  scrollOffset: number;
  backPath?: "/my-recipe-page" | "/favorites" | "/" | "/profile";
  withArrowBack?: boolean;
  title: string;
  withSearch?: boolean;
};
function Header({
  scrollOffset,
  backPath = "/",
  withArrowBack = false,
  title,
  withSearch = false,
}: HeaderProps) {
  const router = useRouter();
  const theme = useColorScheme();
  const scrollDirection = useRef(0);
  const [hideNav, setHideNav] = useState(false);
  const [globalSearchVisible, setGlobalSearchVisible] = useState(false);

  useEffect(() => {
    if (scrollDirection.current < scrollOffset) {
      setHideNav(true);
      scrollDirection.current = scrollOffset;
    } else {
      setHideNav(false);
      scrollDirection.current = scrollOffset;
    }
  }, [scrollOffset]);

  function handleBack() {
    router.push(`${backPath}`);
  }

  function handleSearch() {
    setGlobalSearchVisible(true);
  }

  return (
    <>
      <ThemedView
        style={[
          styles.container,
          hideNav
            ? { transform: "translateY(-100px)" }
            : { transform: "translateY(0)" },
          { backgroundColor: theme === "light" ? "#787878" : "#131313" },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {withArrowBack ? (
            <TouchableHighlight onPress={handleBack} style={{ padding: 15 }}>
              <ArrowLeft color={"white"} />
            </TouchableHighlight>
          ) : withSearch ? (
            <>
              <TouchableHighlight
                onPress={handleSearch}
                style={{ padding: 15 }}
              >
                <Search color={"white"} />
              </TouchableHighlight>
            </>
          ) : (
            <View />
          )}
          <H2>{title}</H2>

          <UserProfile avatar={"https://reactnative.dev/img/tiny_logo.png"} />
        </View>
      </ThemedView>
      {globalSearchVisible && (
        <GlobalSearch handleCloseSearch={() => setGlobalSearchVisible(false)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#787878",
    position: "fixed",
    top: 0,
    width: "100%",
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default Header;
