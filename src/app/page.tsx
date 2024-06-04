'use client';

import React, { useState, useEffect } from 'react';
import Topbar from '../app/components/Topbar/Topbar';
import { Button, Switch } from 'antd';
import CustomModal from './components/Modal/Modal';
import CardList from './components/Card/CardList';
import { items } from './items';
import LocalStorageService from './services/LocalStorage';
import { ChartType } from './enums/enums';
import { locateNext } from './utils/utils';
import type { LSJSON } from './types/types';
import ResponsiveGrid from './components/ResponsiveGrid/ResponsiveGrid';

const initialState = {
  items: [],
  layouts: { lg: [] },
};

const Home = () => {
  const [layoutsAndItems, setLayoutsAndItems] = useState<LSJSON>(initialState);

  const [editModeStatus, setEditModeStatus] = useState(false);
  const [widgetModalOpen, setWidgetModalOpen] = useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
  const [inRemoveStateItemId, setInRemoveStateItemId] = useState<string>('');
  const [selectedChart, setSelectedChart] = useState(items[0].itemId);

  useEffect(() => {
    const layoutsOnLocalStorage = LocalStorageService.getFromLocalStorage('ly-it');
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
    setApproveModalOpen(true);
    setInRemoveStateItemId(itemId);
  };

  const onRemoveItemApproved = () => {
    const newLayouts = { lg: layoutsAndItems.layouts.lg.filter((item) => item.i !== inRemoveStateItemId) };
    const newItems = layoutsAndItems.items.filter((i) => i.key !== inRemoveStateItemId);

    setLayoutsAndItems({ items: newItems, layouts: newLayouts });
    setApproveModalOpen(false);
  };

  const onAddItem = (chartType: ChartType) => {
    const newItemPlace = locateNext(layoutsAndItems.layouts.lg);
    const newKey = Date.now().toString();

    setLayoutsAndItems({
      items: [...layoutsAndItems.items, { type: chartType, key: newKey }],
      layouts: {
        lg: [...layoutsAndItems.layouts.lg, { ...newItemPlace, i: newKey }],
      },
    });
  };

  const handleSaveClick = () => {
    LocalStorageService.saveToLocalStorage('ly-it', layoutsAndItems);
  };

  const onChartModalSubmit = () => {
    onAddItem(selectedChart as ChartType);
    setWidgetModalOpen(false);
  };

  return (
    <div className='App'>
      <div>
        <Topbar onAddWidgetClick={() => setWidgetModalOpen(true)} />
        <Button onClick={handleSaveClick}>Save to Local </Button>
        <Switch onChange={(e) => setEditModeStatus(e)} title='Edit Mode' />
        <ResponsiveGrid
          editModeStatus={editModeStatus}
          onRemoveItem={onRemoveItem}
          layoutsAndItems={layoutsAndItems}
          onLayoutChange={onLayoutChange}
        />
      </div>
      {widgetModalOpen && (
        <CustomModal
          title='Add Widget'
          open={widgetModalOpen}
          onClose={() => setWidgetModalOpen(false)}
          onSubmit={onChartModalSubmit}
        >
          <CardList
            itemList={items}
            defaultCheckedItem={selectedChart}
            onChecked={(itemId) => setSelectedChart(itemId)}
          />
        </CustomModal>
      )}

      {approveModalOpen && (
        <CustomModal
          title='Remove Widget'
          open={approveModalOpen}
          okText='Delete'
          okType='danger'
          width='400px'
          onClose={() => setApproveModalOpen(false)}
          onSubmit={onRemoveItemApproved}
        >
          Are you sure do you want to delete?
        </CustomModal>
      )}
    </div>
  );
};

export default Home;
