import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ResizingButton } from "../Button/resizable";

export const blurhash =
  "|ARM9;NK?wg4%h?vtl?b%gNeIAt7s:xut7WBt7t7?^t7MxxtoLaeM{M{t7o~t7xtD%t7j[oLofj[%hxuoLs:MxRjRjRjRj?vt7WBj[RPM{%MM{aex^WAMxj[Rj%Mt6xuM{?bt7M{ofWBRQxuRjj[%gt7t7jsRjaeM{ayIU";

export default function PatientGraphs({ patient_id, imagesData }) {
  return (
    <>
      <Text className="mt-9 mb-4 text-black dark:text-white font-inter500 text-2xl leading-[29.05px]">
        Graphs
      </Text>
      {imagesData?.images?.length === 0 ? (
        <Text className="text-black dark:text-white">No Images Found</Text>
      ) : (
        <View className="flex-row flex-wrap justify-between pb-4">
          {imagesData?.images?.map((item, index) => (
            <Link
              href={{
                pathname: "/image",
                params: {
                  id: item.id,
                  url: item.url,
                  patient_name: item.patient_name,
                  uploaded_at: item.uploaded_at,
                  fileName: item.filename,
                },
              }}
              key={index}
              className="w-[48%] mb-4"
            >
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={item.url}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            </Link>
          ))}
        </View>
      )}
      <View className="my-12 items-center">
        <ResizingButton
          isDisabled={false}
          onPress={() =>
            router.push({
              pathname: "prognosis",
              params: { patient_id: patient_id },
            })
          }
          className={`w-[205px] h-10 bg-blueA items-center justify-center rounded-lg`}
        >
          <Text className="text-[#F5F5F5] font-inter400">Get Prognosis</Text>
        </ResizingButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#0553",
    borderRadius: 6,
  },
});
