import { Text, View } from "react-native";
import { strokehistory } from "../../utils/strokehistory";

const StrokeHistory = ({ strokeHistory }) => {
  return (
    <>
      <Text className="mt-9 mb-4 text-black dark:text-white font-inter500 text-2xl leading-[29.05px]">
        Stroke History
      </Text>
      {strokeHistory.length > 0 ? (
        <View className="rounded-lg border border-[#2F3E50] bg-white dark:bg-secondaryDark">
          <View className="flex-row">
            <TableHeadingView label={"Date"} />
            <TableHeadingView label={"Day"} />
            <TableHeadingView label={"Time"} borderRight={false} />
          </View>
          {strokeHistory.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </View>
      ) : (
        <View>
          <Text className="font-inter400 text-black dark:text-white">
            No History Found
          </Text>
        </View>
      )}
    </>
  );
};

export default StrokeHistory;

const TableRow = ({ item }) => {
  return (
    <View className="flex-row">
      <TableEntryView value={item.date} />
      <TableEntryView value={item.day} />
      <TableEntryView value={item.time} border={false} />
    </View>
  );
};

const TableHeadingView = ({ label, borderRight = true }) => {
  return (
    <View
      className={`${
        borderRight && "border-r border-[#2F3E50]"
      } flex-1 items-center py-1`}
    >
      <Text className="text-sm leading-[21px] font-inter700 dark:font-inter400 text-black dark:text-white tracking-[-0.011em]">
        {label}
      </Text>
    </View>
  );
};

const TableEntryView = ({ value, border = true }) => {
  return (
    <View
      className={`border-t border-[#2F3E50] ${
        border && "border-r"
      } flex-1 py-1 pl-2`}
    >
      <Text className="text-sm leading-[21px] font-inter400 text-black dark:text-grayA tracking-[-0.011em]">
        {value}
      </Text>
    </View>
  );
};

export const SkeletonStrokeHistory = () => {
  return (
    <>
      <Text className="mt-9 mb-4 text-black dark:text-white font-inter500 text-2xl leading-[29.05px]">
        Stroke History
      </Text>
      <View className="bg-gray-200 animate-pulse rounded-lg border border-[#2F3E50]">
        <View className="flex-row">
          <SkeletonTableHeadingView label={"Date"} />
          <SkeletonTableHeadingView label={"Day"} />
          <SkeletonTableHeadingView label={"Time"} borderRight={false} />
        </View>
        {strokehistory.map((item, index) => (
          <SkeletonTableRow key={index} item={item} />
        ))}
      </View>
    </>
  );
};

const SkeletonTableHeadingView = ({ label, borderRight = true }) => {
  return (
    <View
      className={`${
        borderRight && "border-r border-[#2F3E50]"
      } flex-1 items-center py-1`}
    >
      <Text className="text-sm leading-[21px] font-inter700 dark:font-inter400 tracking-[-0.011em] text-transparent">
        {label}
      </Text>
    </View>
  );
};

const SkeletonTableRow = ({ item }) => {
  return (
    <View className="flex-row">
      <SkeletonTableEntryView value={item.date} />
      <SkeletonTableEntryView value={item.day} />
      <SkeletonTableEntryView value={item.time} border={false} />
    </View>
  );
};

const SkeletonTableEntryView = ({ value, border = true }) => {
  return (
    <View
      className={`border-t border-[#2F3E50] ${
        border && "border-r"
      } flex-1 py-1 pl-2`}
    >
      <Text className="text-sm leading-[21px] font-inter400 tracking-[-0.011em] text-transparent">
        {value}
      </Text>
    </View>
  );
};
