import { ChartType } from '../enums/enums';

interface LayoutCoordinates {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Breakpoints {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;
}

interface ChartItem {
  type: ChartType;
  key: string;
}
interface LSJSON {
  layouts: { lg: LayoutCoordinates[] };
  items: ChartItem[];
}

export type { LayoutCoordinates, Breakpoints, LSJSON, ChartItem };
