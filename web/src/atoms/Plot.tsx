import Ploty, { PlotParams } from "react-plotly.js";

interface PlotProps extends Omit<PlotParams, "layout"> {
    title: string;
}

export const Plot = ({ data, title }: PlotProps) => {
  return (
    <Ploty
      style={{ width: "45%", height: "100%", margin: "5px" }}
      data={data}
      layout={{
        title,
        scene: {
          xaxis: { title: "X" },
          yaxis: { title: "Y" },
          zaxis: { title: "Z" },
        },
        autosize: true,
        dragmode: "turntable",
      }}
      useResizeHandler
      config={{
        scrollZoom: true,
      }}
    />
  );
};
