// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import React, { useContext } from "react";
import { NutriContext } from "../Nutri_Context";
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const Chart = () => {
  const { responseData } = useContext(NutriContext);
  const calc =
    responseData.carbohydrateRate +
    responseData.proteinRate +
    responseData.fatRate;

  return (
    <ResponsivePie
      data={[
        {
          id: "탄수화물",
          value: Math.floor((responseData.carbohydrateRate / calc) * 100),
        },
        {
          id: "단백질",
          value: Math.floor((responseData.proteinRate / calc) * 100),
        },
        { id: "지방", value: Math.floor((responseData.fatRate / calc) * 100) },
      ]}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "yellow_green_blue" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "탄수화물",
          },
          id: "lines",
        },
        {
          match: {
            id: "단백질",
          },
          id: "lines",
        },
        {
          match: {
            id: "지방",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
export default Chart;
