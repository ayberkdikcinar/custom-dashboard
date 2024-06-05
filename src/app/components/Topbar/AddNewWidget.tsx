'use-client';
import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import styles from './Topbar.module.css';
import CustomModal from '../Modal/Modal';
import { items } from '../../items';
import CardList from '../Card/CardList';

type AddNewWidgetProps = {
  label?: string;
  handleChartModalSubmit: (chartType: string) => void;
};

const initialSelectedChart = items[0].itemId;

const AddNewWidgetButton = ({ label = 'Add New Widget', handleChartModalSubmit }: AddNewWidgetProps) => {
  const [widgetModalOpen, setWidgetModalOpen] = useState<boolean>(false);
  const [selectedChart, setSelectedChart] = useState(initialSelectedChart);

  function onChartModalSubmit() {
    handleChartModalSubmit(selectedChart);
    setWidgetModalOpen(false);
  }

  return (
    <div>
      <Button type='primary' className={styles.rightAligned} onClick={() => setWidgetModalOpen(true)}>
        {label}
      </Button>
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
    </div>
  );
};

export default AddNewWidgetButton;
