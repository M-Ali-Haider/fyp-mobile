import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper"; // Import Searchbar
import CustomActivityIndicator from "../../components/CustomActivityIndicator";
import Card from "../../components/Home/card";
import LayoutWrapper from "../../components/LayoutWrapper";
import { usePatients } from "../../context/PatientContext";
import { useColorScheme } from "../../hooks/useColorScheme";

const PatientsScreen = () => {
  const { colorScheme } = useColorScheme();
  const { data, isLoading, error } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter patients based on search query
  const filteredPatients = data.patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSearchChange = (query) => setSearchQuery(query);

  const textColor = colorScheme === "dark" ? "#fff" : "#000";
  const bgColor = colorScheme === "dark" ? "#19263B" : "#ffffff";

  return (
    <LayoutWrapper>
      <PaperProvider>
        <View className="mt-[72px] px-4 flex-1">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Text className="my-2 text-black dark:text-white font-inter400">
                Loading Patients...
              </Text>
              <CustomActivityIndicator />
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-black dark:text-white font-inter400">
                Error fetching conversation
              </Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 36,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Searchbar
                placeholder="Search patients"
                onChangeText={onSearchChange}
                value={searchQuery}
                style={{
                  marginBottom: 20,
                  backgroundColor: bgColor,
                }}
                inputStyle={{
                  color: textColor,
                }}
                placeholderTextColor={"#6E6E71"}
                iconColor={"#6E6E71"}
                cursorColor={"#6E6E71"}
                rippleColor={colorScheme === "dark" ? "#fff" : "#000"}
              />
              {filteredPatients.length > 0 ? (
                <>
                  {filteredPatients.map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
                </>
              ) : (
                <Text className="text-lg text-black dark:text-white font-inter400">
                  No Patients Found
                </Text>
              )}
            </ScrollView>
          )}
        </View>
      </PaperProvider>
    </LayoutWrapper>
  );
};

export default PatientsScreen;
