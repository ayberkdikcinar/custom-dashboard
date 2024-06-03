'use client';

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
const items = [
  {
    title: 'Line',
    description: 'Compare metrics over time',
    image: 'https://www.svgrepo.com/show/324249/line-chart-dots-business-analytics-statistics.svg',
    itemId: 'line-chart',
    key: '0',
  },
  {
    title: 'Stacked Area',
    description: 'Compare the total over time',
    image: 'https://www.svgrepo.com/show/324237/area-chart-business-analytics-statistics.svg',
    itemId: 'stacked-area-chart',
    key: '1',
  },
  {
    title: 'Bar',
    description: 'Compare categories of data',
    image: 'https://www.svgrepo.com/show/401170/bar-chart.svg',
    itemId: 'bar-chart',
    key: '2',
  },
  {
    title: 'Pie',
    description: 'Show percentage of total data',
    image: 'https://www.svgrepo.com/show/489940/pie-chart.svg',
    itemId: 'pie-chart',
    key: '3',
  },
  {
    title: 'Gauge',
    description: 'Show percentage of total data',
    image: 'https://www.svgrepo.com/show/247566/gauge-indicator.svg',
    itemId: 'gauge-chart',
    key: '4',
  },
  {
    title: 'Column',
    description: 'To analyze the cost per unit of output, helping to understand the efficiency and profitability',
    image: 'https://www.svgrepo.com/show/410302/stacked-bar-chart.svg',
    itemId: 'column-chart',
    key: '5',
  },
  {
    title: 'Waterfall',
    description: 'To visualize realized savings from various cost optimization initiatives',
    image: 'https://www.svgrepo.com/show/458436/waterfall.svg',
    itemId: 'waterfall-chart',
    key: '6',
  },
];

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
    if (!layoutsOnLocalStorage) {
      return;
    }
    const lsJSON = JSON.parse(layoutsOnLocalStorage);
    setLayoutsAndItems(lsJSON);
  }, []);

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayoutsAndItems({ items: [...layoutsAndItems.items], layouts: allLayouts });
  };

  const onRemoveItem = (itemId: string) => {
    //setItems(items.filter((i) => i.key !== itemId));
    //setLayouts({...layouts.lg.filter(i=> i.i!==itemId)});
  };

  const onAddItem = (chartType: string) => {
    const newItemPlace = locateNext(layoutsAndItems.layouts.lg);

    setLayoutsAndItems({
      items: [...layoutsAndItems.items, { type: chartType as ChartType, key: newItemPlace.i }],
      layouts: {
        lg: [...layoutsAndItems.layouts.lg, newItemPlace],
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
    return { i: lg.length.toString(), x: 0, y: maxValY + h, w: 3, h: 3 };
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
        <div>
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
              <div key={item.key} style={{ backgroundColor: '#F2F3F4' }}>
                <ResizableWidget
                  itemKey={item.key}
                  layout={undefined}
                  onRemove={() => onRemoveItem(item.key)}
                  editMode={editModeStatus}
                >
                  {getChart(item, config, layoutsAndItems.layouts.lg, rowHeight)}
                </ResizableWidget>
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
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
  const width = lg[Number(item.key)].w * 120;
  const height = lg[Number(item.key)].h * rowHeight;
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
