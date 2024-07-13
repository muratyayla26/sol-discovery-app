import { IPerformanceItem } from "@/types/dashboard.interface";
import { useTheme } from "@emotion/react";
import { Card, CardContent, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body2">{`TPS : ${payload[0].value}`}</Typography>
          <Typography variant="body2">{`${label} minute(s) ago`}</Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const TPSChart = ({ performance }: { performance: IPerformanceItem[] }) => {
  // https://stackoverflow.com/questions/69272996/typescript-error-says-property-does-not-exist-on-type
  // @ts-ignore
  const theme: Theme = useTheme();
  const dataFormatted = performance.map(
    (item: IPerformanceItem, index: number) => ({
      tps: Number((item.numTransactions / item.samplePeriodSecs).toFixed(2)),
      minuteAgo: performance.length - index,
    })
  );

  return (
    <Card sx={{ width: "100%", height: 350, mt: 3 }}>
      <CardContent sx={{ width: "100%", height: 350 }}>
        <Typography sx={{ mb: 1.6 }}>Transactions per second (TPS)</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={350} height={300} data={dataFormatted}>
            <XAxis dataKey="minuteAgo" tick={false} />
            <YAxis
              width={40}
              style={{
                fontSize: "1.4rem",
                fill: `${theme.palette.text.secondary}`,
              }}
            />
            <Tooltip
              cursor={{ fill: "#1e2630" }}
              content={
                <CustomTooltip
                  active={undefined}
                  payload={undefined}
                  label={undefined}
                />
              }
            />
            <Legend />
            <Bar
              dataKey="tps"
              fill={`${theme.palette.success.main}`}
              activeBar={
                <Rectangle
                  fill={`${theme.palette.success.main}CC`}
                  stroke={`${theme.palette.success.main}CC`}
                />
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default TPSChart;
