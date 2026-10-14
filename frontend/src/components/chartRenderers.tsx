import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from 'recharts'

export type ChartType =
  | 'bar'
  | 'horizontal_bar'
  | 'stacked_bar'
  | 'line'
  | 'multi_line'
  | 'area'
  | 'scatter'
  | 'bubble'
  | 'histogram'
  | 'pie'
  | 'donut'
  | 'treemap'
  | 'correlation_heatmap'

export type AppChartType = Extract<ChartType, 'scatter' | 'bar' | 'line' | 'histogram'>

export type ChartRenderer<Props> = (props: Props) => ReactNode

export type AppChartRendererProps = {
  scatterLineData: Array<{ x: number; y: number }>
  barChartData: Array<{ name: string; value: number }>
  histogramData: Array<{ name: string; count: number }>
  chartXAxis: string
  chartYAxis: string
}

export type VisualizationChartRendererProps = {
  scatterData: Array<{ x: number; y: number }>
  groupedData: Array<{ name: string; value: number }>
  multiLineData: Array<Record<string, string | number>>
  histData: Array<{ name: string; count: number }>
  pieData: Array<{ name: string; value: number }>
  correlationMatrix: Array<{ x: string; y: string; value: number | null }>
  colors: string[]
  xAxis: string
  yAxis: string
}

export const APP_CHART_RENDERERS = {
  scatter: ({ scatterLineData, chartXAxis, chartYAxis }: AppChartRendererProps) => (
    <ScatterChart>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" name={chartXAxis} />
      <YAxis dataKey="y" name={chartYAxis} />
      <Tooltip />
      <Scatter data={scatterLineData} fill="#0ea5e9" />
    </ScatterChart>
  ),
  line: ({ scatterLineData }: AppChartRendererProps) => (
    <LineChart data={scatterLineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="y" stroke="#22c55e" strokeWidth={2} dot={false} />
    </LineChart>
  ),
  bar: ({ barChartData }: AppChartRendererProps) => (
    <BarChart data={barChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#f59e0b" />
    </BarChart>
  ),
  histogram: ({ histogramData }: AppChartRendererProps) => (
    <BarChart data={histogramData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8b5cf6" />
    </BarChart>
  ),
} satisfies Record<AppChartType, ChartRenderer<AppChartRendererProps>>

export const VISUALIZATION_CHART_RENDERERS = {
  bar: ({ groupedData }: VisualizationChartRendererProps) => (
    <BarChart data={groupedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#2563eb" />
    </BarChart>
  ),
  horizontal_bar: ({ groupedData }: VisualizationChartRendererProps) => (
    <BarChart data={groupedData} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" width={120} />
      <Tooltip />
      <Bar dataKey="value" fill="#16a34a" />
    </BarChart>
  ),
  stacked_bar: ({ multiLineData, colors }: VisualizationChartRendererProps) => (
    <BarChart data={multiLineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(multiLineData[0] ?? {})
        .filter((key) => key !== 'name')
        .map((key, index) => (
          <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
        ))}
    </BarChart>
  ),
  line: ({ scatterData }: VisualizationChartRendererProps) => (
    <LineChart data={scatterData.map((point) => ({ x: point.x, y: point.y }))}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="y" stroke="#d97706" dot={false} />
    </LineChart>
  ),
  multi_line: ({ multiLineData, colors }: VisualizationChartRendererProps) => (
    <LineChart data={multiLineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(multiLineData[0] ?? {})
        .filter((key) => key !== 'name')
        .map((key, index) => (
          <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} dot={false} />
        ))}
    </LineChart>
  ),
  area: ({ scatterData }: VisualizationChartRendererProps) => (
    <AreaChart data={scatterData.map((point) => ({ x: point.x, y: point.y }))}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="y" stroke="#9333ea" fill="#d8b4fe" />
    </AreaChart>
  ),
  scatter: ({ scatterData, xAxis, yAxis }: VisualizationChartRendererProps) => (
    <ScatterChart>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" name={xAxis} />
      <YAxis dataKey="y" name={yAxis} />
      <Tooltip />
      <Scatter data={scatterData} fill="#0891b2" />
    </ScatterChart>
  ),
  bubble: ({ scatterData, xAxis, yAxis }: VisualizationChartRendererProps) => (
    <ScatterChart>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" name={xAxis} />
      <YAxis dataKey="y" name={yAxis} />
      <Tooltip />
      <Scatter data={scatterData.map((point, index) => ({ ...point, z: (index % 12) + 4 }))} fill="#ef4444" />
    </ScatterChart>
  ),
  histogram: ({ histData }: VisualizationChartRendererProps) => (
    <BarChart data={histData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#0f766e" />
    </BarChart>
  ),
  pie: ({ pieData, colors }: VisualizationChartRendererProps) => (
    <PieChart>
      <Tooltip />
      <Legend />
      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120}>
        {pieData.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  ),
  donut: ({ pieData, colors }: VisualizationChartRendererProps) => (
    <PieChart>
      <Tooltip />
      <Legend />
      <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={120}>
        {pieData.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  ),
  treemap: ({ pieData }: VisualizationChartRendererProps) => (
    <Treemap
      data={pieData.map((item) => ({ ...item, size: item.value }))}
      dataKey="size"
      stroke="#fff"
      fill="#60a5fa"
    />
  ),
  correlation_heatmap: ({ correlationMatrix }: VisualizationChartRendererProps) => (
    <table>
      <thead>
        <tr>
          <th>Column A</th>
          <th>Column B</th>
          <th>Correlation</th>
        </tr>
      </thead>
      <tbody>
        {correlationMatrix.map((cell) => (
          <tr key={`${cell.x}-${cell.y}`}>
            <td>{cell.x}</td>
            <td>{cell.y}</td>
            <td>{cell.value ?? 'NA'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
} satisfies Record<ChartType, ChartRenderer<VisualizationChartRendererProps>>

export function isRendererType<Type extends string, Props>(
  renderers: Readonly<Record<Type, ChartRenderer<Props>>>,
  value: string,
): value is Type {
  return Object.hasOwn(renderers, value)
}

export function getChartRenderer<Type extends string, Props>(
  renderers: Readonly<Record<Type, ChartRenderer<Props>>>,
  value: string,
): ChartRenderer<Props> | null {
  return isRendererType(renderers, value) ? renderers[value] : null
}
