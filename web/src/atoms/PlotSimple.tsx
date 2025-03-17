import { Card } from "@radix-ui/themes";
import Plotly, { PlotParams } from "react-plotly.js";

interface PlotProps extends Omit<PlotParams, "layout" | "data" | "frames"> {
  title: string;
  data?: PlotParams["data"];
}

export const PlotSimple = ({ data, title }: PlotProps) => {
  const layout = {
    title,
    scene: {
      xaxis: { title: "X Position" },
      yaxis: { title: "Y Position" },
      zaxis: { title: "Z Position" },
      aspectratio: {
        x: 1,
        y: 1,
        z: 1,
      },
    },
    autosize: true,
    dragmode: "turntable",
    margin: { l: 0, r: 0, b: 0, t: 50 },
    legend: {
      x: 0,
      y: 1,
    },
  };
  return (
    <Card>
      <Plotly
        style={{ width: "100%", height: "100%" }}
        layout={layout}
        data={data}
        config={{
          scrollZoom: true,
          responsive: true,
        }}
      />
    </Card>
  );
};
