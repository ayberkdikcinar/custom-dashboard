import React, { useMemo, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { config as responsiveGridLayoutConfig } from '../../config/responsiveGridLayout.config';
import ResizableWidget from '../Widget/Widget';
import { ChartType } from 'responsive/app/enums/enums';
import dynamic from 'next/dynamic';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ChartItem, LSJSON, LayoutCoordinates } from 'responsive/app/types/types';
import { config as chartConfigs } from '../../config/charts.config';
import CustomModal from '../Modal/Modal';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), { ssr: false });
const Area = dynamic(() => import('@ant-design/plots').then((mod) => mod.Area), { ssr: false });
const Bar = dynamic(() => import('@ant-design/plots').then((mod) => mod.Bar), { ssr: false });
const Line = dynamic(() => import('@ant-design/plots').then((mod) => mod.Line), { ssr: false });
const Scatter = dynamic(() => import('@ant-design/plots').then((mod) => mod.Scatter), { ssr: false });
const Gauge = dynamic(() => import('@ant-design/plots').then((mod) => mod.Gauge), { ssr: false });
const Column = dynamic(() => import('@ant-design/plots').then((mod) => mod.Column), { ssr: false });
const Waterfall = dynamic(() => import('@ant-design/plots').then((mod) => mod.Waterfall), { ssr: false });

type ResponsiveGridLayoutsProps = {
  layoutsAndItems: LSJSON;
  handleRemoveItemApprove: (itemId: string) => void;
  onLayoutChange: (_: any, allLayouts: any) => void;
  editModeStatus: boolean;
};

const ResponsiveGrid = ({
  editModeStatus,
  onLayoutChange,
  handleRemoveItemApprove,
  layoutsAndItems,
}: ResponsiveGridLayoutsProps) => {
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
  const [inRemoveStateItemId, setInRemoveStateItemId] = useState<string>('');

  const onRemoveItem = (itemId: string) => {
    setApproveModalOpen(true);
    setInRemoveStateItemId(itemId);
  };

  const onRemoveItemApprove = () => {
    handleRemoveItemApprove(inRemoveStateItemId);
    setApproveModalOpen(false);
  };

  const itemMap = useMemo(
    () =>
      layoutsAndItems?.items.map((item, i) => (
        <div key={item.key}>
          <ResizableWidget onRemove={() => onRemoveItem(item.key)} editMode={editModeStatus}>
            {getChart(item, chartConfigs, layoutsAndItems.layouts.lg, responsiveGridLayoutConfig.rowHeight)}
          </ResizableWidget>
        </div>
      )),
    [layoutsAndItems, editModeStatus]
  );

  return (
    <div>
      <ResponsiveGridLayout
        {...responsiveGridLayoutConfig}
        layouts={layoutsAndItems.layouts}
        isResizable={editModeStatus}
        isDraggable={editModeStatus}
        onLayoutChange={onLayoutChange}
      >
        {itemMap}
      </ResponsiveGridLayout>
      {approveModalOpen && (
        <CustomModal
          title='Remove Widget'
          open={approveModalOpen}
          okText='Delete'
          okType='danger'
          width='400px'
          onClose={() => setApproveModalOpen(false)}
          onSubmit={onRemoveItemApprove}
        >
          Are you sure do you want to delete?
        </CustomModal>
      )}
    </div>
  );
};

function getChart(item: ChartItem, config: any, lg: LayoutCoordinates[], rowHeight: number) {
  const layoutIndex = lg.findIndex((i) => i.i === item.key);
  /*const breakpoints: Breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
  };

  let breakpoint = breakpoints.lg;
  if (window.innerWidth < 1200) {
    breakpoint = breakpoints.md;
  } else if (window.innerWidth < 996) {
    breakpoint = breakpoints.sm;
  } else if (window.innerWidth < 768) {
    breakpoint = breakpoints.xs;
  } else if (window.innerWidth < 480) {
    breakpoint = breakpoints.xxs;
  }

  const width = (lg[layoutIndex].w * breakpoint) / 9 + lg[layoutIndex].w * 15;*/
  const width = lg[layoutIndex].w * 130 + lg[layoutIndex].w * 15;
  const height = lg[layoutIndex].h * rowHeight;
  const data = [
    { type: 'Cat', value: 27 },
    { type: 'Dog', value: 25 },
    { type: 'Bird', value: 20 },
    { type: 'Snake', value: 5 },
    { type: 'Mouse', value: 15 },
    { type: 'Cow', value: 8 },
  ];

  switch (item.type) {
    case ChartType.PIE:
      return <Pie {...config.pie} width={width} height={height} data={data} />;
    case ChartType.SCATTER:
      return <Scatter {...config.scatter} width={width} height={height} /* data={data}  */ />;
    case ChartType.LINE:
      return <Line {...config.line} width={width} height={height} /* data={data}  */ />;
    case ChartType.AREA:
      return <Area {...config.area} width={width} height={height} /* data={data}  */ />;
    case ChartType.BAR:
      return <Bar {...config.bar} width={width} height={height} /* data={data}  */ />;
    case ChartType.GAUGE:
      return <Gauge {...config.gauge} width={width} height={height} /* data={data}  */ />;
    case ChartType.COLUMN:
      return <Column {...config.column} width={width} height={height} /* data={data}  */ />;
    case ChartType.WATERFALL:
      return <Waterfall {...config.waterfall} width={width} height={height} /* data={data}  */ />;
    default:
      return null;
  }
}

export default ResponsiveGrid;
