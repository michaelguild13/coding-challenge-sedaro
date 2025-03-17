import { Card } from "@radix-ui/themes";
import Plotly, { PlotParams } from "react-plotly.js";

interface PlotProps extends Omit<PlotParams, "layout" | "data" | "frames"> {
  title: string;
  data?: PlotParams["data"];
  frames?: PlotParams["frames"];
}

export const Plot = (
  ({ data, title, frames } :PlotProps) => {
    const layout = {
      title,
      scene: {
        xaxis: { title: 'X Position'},
        yaxis: { title: 'Y Position'},
        zaxis: { title: 'Z Position'},
      },
      autosize: true,
      dragmode: "turntable",
      ...(frames && {
        updatemenus: [
          {
            type: 'buttons',
            showactive: false,
            y: 0,
            x: 0,
            yanchor: 'top',
            xanchor: 'left',
            pad: { t: 40, r: 10 },
            buttons: [
              {
                label: '▶ Play',
                method: "animate",
                args: [
                  null,
                  { frame: { duration: 100, redraw: true }, fromcurrent: true },
                ],
              },
              {
                label: '❚❚ Pause',
                method: "animate",
                args: [
                  [null],
                  { mode: "immediate", frame: { duration: 0, redraw: false } },
                ],
              },
            ],
          },
        ],
        sliders: [
          {
            x: 0.2,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            active: 0,
            steps: frames.map((frame, index) => ({
              label: `Frame ${index}`,
              method: "animate",
              args: [
                [frame.name],
                { mode: "immediate", frame: { duration: 0, redraw: true } },
              ],
            })),
          },
        ],
      }),
    };
    return (
      <Card style={{ width: "100%", height: "100%" }}>
      <Plotly
        style={{ width: "100%", height: "100%" }}
        layout={layout}
        data={data}
        frames={frames}
        useResizeHandler
        config={{
          scrollZoom: true,
          responsive: true,
        }}
      />
      </Card>
    );
  }
);
