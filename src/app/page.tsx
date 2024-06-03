'use client';
import styles from './page.module.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import dynamic from 'next/dynamic';
import React, { useState, useCallback, useEffect } from 'react';
import { withSize } from 'react-sizeme';
import ResizableWidget from '../app/components/Widget/Widget';
import Topbar from '../app/components/Topbar/Topbar';
import { Button, Switch } from 'antd';
import { config } from './charts.config';
import ChartSelectModal from './components/Modal/Modal';
import Card from './components/Card/Card';
import CardList from './components/Card/CardList';
import { items } from './items';
interface LayoutCoordinates {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

enum ChartType {
  PIE = 'pie-chart',
  LINE = 'line-chart',
  AREA = 'stacked-area-chart',
  BAR = 'bar-chart',
  SCATTER = 'scatter-chart',
  GAUGE = 'gauge-chart',
  COLUMN = 'column-chart',
  WATERFALL = 'waterfall-chart',
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
const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), { ssr: false });
const Area = dynamic(() => import('@ant-design/plots').then((mod) => mod.Area), { ssr: false });
const Bar = dynamic(() => import('@ant-design/plots').then((mod) => mod.Bar), { ssr: false });
const Line = dynamic(() => import('@ant-design/plots').then((mod) => mod.Line), { ssr: false });
const Scatter = dynamic(() => import('@ant-design/plots').then((mod) => mod.Scatter), { ssr: false });
const Gauge = dynamic(() => import('@ant-design/plots').then((mod) => mod.Gauge), { ssr: false });
const Column = dynamic(() => import('@ant-design/plots').then((mod) => mod.Column), { ssr: false });
const Waterfall = dynamic(() => import('@ant-design/plots').then((mod) => mod.Waterfall), { ssr: false });

const rowHeight = 60;

const ResponsiveGridLayout = WidthProvider(Responsive);
const originalItems: ChartItem[] = [];

const Home = () => {
  const [layoutsAndItems, setLayoutsAndItems] = useState<LSJSON>({
    items: originalItems,
    layouts: { lg: [] },
  });

  const [editModeStatus, setEditModeStatus] = useState(false);
  const [widgetModalOpen, setWidgetModalOpen] = useState<boolean>(false);
  const [selectedChart, setSelectedChart] = useState(items[0].itemId);
  useEffect(() => {
    const layoutsOnLocalStorage = getFromLocalStorage('ly-it');
    if (layoutsAndItems.items.length > 0 || !layoutsOnLocalStorage) {
      return;
    }
    const lsJSON = JSON.parse(layoutsOnLocalStorage);
    setLayoutsAndItems(lsJSON);
  }, []);

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayoutsAndItems({ items: [...layoutsAndItems.items], layouts: allLayouts });
  };

  const onRemoveItem = (itemId: string) => {
    const newLayouts = { lg: layoutsAndItems.layouts.lg.filter((item) => item.i !== itemId) };
    const newItems = layoutsAndItems.items.filter((i) => i.key !== itemId);

    setLayoutsAndItems({ items: newItems, layouts: newLayouts });
  };

  const onAddItem = (chartType: string) => {
    const newItemPlace = locateNext(layoutsAndItems.layouts.lg);
    const newKey = Date.now().toString();

    setLayoutsAndItems({
      items: [...layoutsAndItems.items, { type: chartType as ChartType, key: newKey }],
      layouts: {
        lg: [...layoutsAndItems.layouts.lg, { ...newItemPlace, i: newKey }],
      },
    });
  };

  function locateNext(lg: LayoutCoordinates[]): LayoutCoordinates {
    let maxValY = 0;
    let h = 0;
    const values = Object.values(lg);
    values.map((val, index) => {
      if (val.y > maxValY) {
        maxValY = val.y;
        h = val.h;
      }
    });
    return { i: '', x: 0, y: maxValY + h, w: 3, h: 3 };
  }

  function handleSaveClick() {
    saveToLocalStorage('ly-it', layoutsAndItems);
  }

  const onChartModalSubmit = () => {
    onAddItem(selectedChart as ChartType);
    setWidgetModalOpen(false);
  };

  return (
    <div className='App'>
      <div>
        <Topbar
          onAddItem={onAddItem}
          onAddWidgetClick={() => {
            setWidgetModalOpen(true);
          }}
        >
          CHILDREN
        </Topbar>
        <Button onClick={handleSaveClick}>Save to Local </Button>
        <Switch onChange={(e) => setEditModeStatus(e)} title='Edit Mode' />

        <ResponsiveGridLayout
          className='layout'
          layouts={layoutsAndItems.layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={rowHeight}
          isResizable={editModeStatus}
          isDraggable={editModeStatus}
          onLayoutChange={onLayoutChange}
        >
          {layoutsAndItems?.items.map((item, i) => (
            <div key={item.key} className={styles['resizable-widget-container']}>
              <ResizableWidget itemKey={item.key} onRemove={() => onRemoveItem(item.key)} editMode={editModeStatus}>
                {getChart(item, config, layoutsAndItems.layouts.lg, rowHeight)}
              </ResizableWidget>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
      <ChartSelectModal
        title='Add Widget'
        open={widgetModalOpen}
        onClose={() => setWidgetModalOpen(false)}
        onSubmit={onChartModalSubmit}
      >
        <CardList
          itemList={items}
          defaultCheckedItem={selectedChart}
          onChecked={(itemId) => setSelectedChart(itemId)}
        ></CardList>
      </ChartSelectModal>
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

function saveToLocalStorage(key: string, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value));
  }
}

function getFromLocalStorage(key: string) {
  if (global.localStorage) {
    const item = global.localStorage.getItem(key);
    return item;
  }
  return null;
}

export default Home;
