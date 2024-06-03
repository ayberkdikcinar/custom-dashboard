import React, { useEffect } from 'react';
import styles from './Widget.module.css';
import { Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type ResizableWidgetProps = {
  layout: any;
  onRemove: any;
  children: any;
  editMode: boolean;
  itemKey: string;
};

function ResizableWidget({ layout, onRemove, itemKey, children, editMode }: ResizableWidgetProps) {
  return (
    <div className={styles['root']}>
      {editMode ? (
        <div className={styles['header']}>
          <Button size={'small'} icon={<CloseOutlined />} onClick={onRemove}></Button>
        </div>
      ) : null}
      <div className={styles['body']}>{children}</div>
    </div>
  );
}

export default ResizableWidget;
