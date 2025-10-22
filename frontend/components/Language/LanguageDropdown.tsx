import React, { useEffect, useRef, useState } from "react";
import i18n from "@/app/i18n";
import { H2 } from "../typography/typography";
import { Button } from "../ui/button";
import { LANGUAGES } from "@/constants/MockData";
import { StyleSheet, View } from "react-native";

export function LanguageDropdown() {
  const [isOpened, setIsOpened] = useState(false);

  const [language, setLanguage] = React.useState("english");

  const containerRef = useRef(null);

  function handleChangeLanguage(language: string) {
    setLanguage(language);
    if (language === "romanian") {
      i18n.changeLanguage("ro");
    } else {
      i18n.changeLanguage("en");
    }

    setIsOpened(false);
  }

  useEffect(() => {
    if (i18n.language === "ro") {
      setLanguage("romanian");
    } else {
      setLanguage("english");
    }
  }, [setLanguage]);

  useEffect(() => {
    function checkClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        // @ts-ignore
        !containerRef.current?.contains(e.target)
      ) {
        setIsOpened(false);
      }
    }
    document.addEventListener("click", checkClickOutside);

    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, []);
  return (
    <View ref={containerRef}>
      <Button type="ghost" handlePress={() => setIsOpened((prev) => !prev)}>
        <H2>{language.substring(0, 2).toUpperCase()}</H2>
      </Button>

      {isOpened && (
        <View style={styles.dropdownContainer}>
          {LANGUAGES.map((lang) => (
            <Button
              key={lang.name}
              //   type="ghost"
              handlePress={() => handleChangeLanguage(lang.name.toLowerCase())}
            >
              <H2>{lang.name}</H2>
            </Button>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 20,
    position: "absolute",
    top: 50,
    right: 0,
    gap: 20,
  },
});
