import styles from './Topbar.module.css';
import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type TopbarProps = {
  onAddItem: (chartType: string) => void;
  children: React.ReactNode;
  onAddWidgetClick: () => void;
};

function Topbar(props: TopbarProps) {
  return (
    <div className={styles.topbar}>
      <Button type='primary' className={styles.rightAligned} onClick={() => props.onAddWidgetClick()}>
        Add New Widget
      </Button>
    </div>
  );
}

export default Topbar;
