'use-client';
import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import styles from './Topbar.module.css';

type AddNewWidgetProps = {
  onClick: () => void;
  label?: string;
};

const AddNewWidget = ({ label = 'Add New Widget', onClick }: AddNewWidgetProps) => {
  return (
    <div>
      <Button type='primary' className={styles.rightAligned} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default AddNewWidget;
