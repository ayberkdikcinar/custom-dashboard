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

  useEffect(() => {
    const layoutsOnLocalStorage = LocalStorageService.getFromLocalStorage('ly-it');
    if (layoutsAndItems.items.length > 0 || !layoutsOnLocalStorage) {
      return;
    }
    const lsJSON = JSON.parse(layoutsOnLocalStorage);
    setLayoutsAndItems(lsJSON);
  }, []);

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayoutsAndItems((prevState) => ({ ...prevState, layouts: allLayouts }));
  };

  const handleRemoveItemApprove = (itemId: string) => {
    const newLayouts = { lg: layoutsAndItems.layouts.lg.filter((item) => item.i !== itemId) };
    const newItems = layoutsAndItems.items.filter((i) => i.key !== itemId);

    setLayoutsAndItems({ items: newItems, layouts: newLayouts });
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

  const onChartModalSubmit = (chartType: string) => {
    onAddItem(chartType as ChartType);
  };

  return (
    <div className='App'>
      <div>
        <Topbar handleChartModalSubmit={onChartModalSubmit} />
        <Button onClick={handleSaveClick}>Save to Local </Button>
        <Switch onChange={(e) => setEditModeStatus(e)} title='Edit Mode' />
        <ResponsiveGrid
          editModeStatus={editModeStatus}
          handleRemoveItemApprove={handleRemoveItemApprove}
          layoutsAndItems={layoutsAndItems}
          onLayoutChange={onLayoutChange}
        />
      </div>
    </div>
  );
};

export default Home;
