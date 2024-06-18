import { BarChart } from "@mui/x-charts/BarChart";
import { useQuery } from "@tanstack/react-query";
import { IDoc } from "@/model/Doc";

const chartSetting = {
  xAxis: [
    {
      label: "Size (MB)",
    },
  ],
  width: 400,
  height: 250,
};

const valueFormatter = (value: number | null) => `${value?.toPrecision(2)}mm`;

export default function StorageDistribution() {
  async function fetchData() {
    const response = await fetch(`/api/file`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["filesFolder"],
    queryFn: fetchData,
  });

  const dataSet = fileDataFormatter(data?.userDocs);
  if (isLoading) {
    return <div>Loading</div>;
  }

  function fileDataFormatter(docs: IDoc[]) {
    const extensions = ["pdf", "png", "txt", "jpg", "jpeg"];
    let mp = new Map<string, number>();

    docs?.forEach((doc) => {
      let extension = doc.extension;
      if (!extensions.includes(extension)) {
        extension = "others";
      }
      if (!mp.has(extension)) {
        mp.set(extension, 0);
      }
      mp.set(extension, mp.get(extension)! + Number(doc.docSize));
    });

    const result: { extension: string; size: number }[] = [];

    mp.forEach((value, key) => {
      result.push({ extension: key, size: value / (1024 * 1024) });
    });

    result.reduce((acc, it) => {
      return it.size + acc;
    }, 0);

    console.log(result);
    return result;
  }

  return (
    <BarChart
      dataset={dataSet}
      yAxis={[{ scaleType: "band", dataKey: "extension" }]}
      series={[
        {
          dataKey: "size",
          label: `Storage Used ${dataSet
            .reduce((acc, it) => {
              return it.size + acc;
            }, 0)
            .toPrecision(2)} MB`,
          valueFormatter,
        },
      ]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
