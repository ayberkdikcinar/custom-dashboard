import React, { useEffect } from 'react';
import styles from './Widget.module.css';
import { Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type ResizableWidgetProps = {
  onRemove: () => void;
  children: any;
  editMode?: boolean;
};

function ResizableWidget({ onRemove, children, editMode = true }: ResizableWidgetProps) {
  console.log('log from widget.');
  return (
    <div className={styles['root']}>
      {editMode ? (
        <div className={styles['header']}>
          <Button
            size={'small'}
            icon={<CloseOutlined />}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onRemove}
          ></Button>
        </div>
      ) : null}
      <div className={`${styles['body']} ${!editMode ? styles['extraPadding'] : ''}`}>{children}</div>
    </div>
  );
}

export default ResizableWidget;
