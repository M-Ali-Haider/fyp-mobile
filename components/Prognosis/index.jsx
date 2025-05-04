import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GenerateReport from "./generate-report";

const diffBlurHash =
  "|LP%FmM{~qkU-;xax[xukBIBR-s,bbofoJbbn$bc?akCV@bIbFWBWCV@X8RljYflj?ofWBn$R-t6%MofWBj[V[aeV[kCafofofkBj[WBa#WCafjuxuj@V@aeaybHa|ayjZxujajsf7bGj]bHkBaeogafRjj?a{WCbHkCoJ";

const baseBlurHash =
  "|NP?m:Na_NXS-;t7tRxtXSIAayofkWofj[kCjZoz.8oJRPj[W;WBjZWBjYWBWBoLWBkCa|j[ayjt%MofR*jFV@kCbHjZf6ozj[ayjZayjZayfkaexaayWBfkayaeaekCj[xuj[j[j[ayj[aej[fkt7a|RjaeWVaefkkCj[";

const critBlurHash =
  "|OP%V200^+~q?b%Mt7t7M{4oM|%Lxut7t7t7RkM{%2-pWUM{Rjayofj[of%2t6M{WDj]ofj[j[t7D%t7xuf5axRjayWBWBIUWAt7xuWCWBj@ayj[V]t8ofWBWBWBj[azj[IAofozj]xbf7WBaykB9Gxu%LWAoeRjWBj[of";

const Prognosis = ({ patient_id, data }) => {
  const {
    Baseline_interictal,
    Baseline_preictal,
    critical_zone,
    diff_heatmap,
  } = data;

  return (
    <View>
      <Unit
        heading={"Base Interictal"}
        src={Baseline_interictal}
        blurhash={baseBlurHash}
      />
      <Unit
        heading={"Base Preictal"}
        src={Baseline_preictal}
        blurhash={baseBlurHash}
      />
      <Unit
        heading={"Critical Zone"}
        src={critical_zone}
        blurhash={critBlurHash}
      />
      <Unit
        heading={"Difference Heatmap"}
        src={diff_heatmap}
        blurhash={diffBlurHash}
      />
      <GenerateReport patient_id={patient_id} />
    </View>
  );
};

export default Prognosis;

const Unit = ({ heading, src, blurhash }) => {
  return (
    <>
      <Text className="mt-9 mb-4 text-black dark:text-white font-inter500 text-2xl leading-[29.05px]">
        {heading}
      </Text>
      <View className="aspect-square">
        <Image
          style={styles.image}
          source={src}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0553",
    borderRadius: 6,
  },
});
