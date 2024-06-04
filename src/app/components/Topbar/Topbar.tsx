import styles from './Topbar.module.css';
import React from 'react';
import AddNewWidget from './AddNewWidget';

type TopbarProps = {
  //children: React.ReactNode;
  onAddWidgetClick: () => void;
};

function Topbar({ onAddWidgetClick }: TopbarProps) {
  console.log('log from topbar.');
  return (
    <div className={styles.topbar}>
      <AddNewWidget onClick={onAddWidgetClick} />
    </div>
  );
}

export default Topbar;
