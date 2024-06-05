import styles from './Topbar.module.css';
import React from 'react';
import AddNewWidgetButton from './AddNewWidget';

type TopbarProps = {
  handleChartModalSubmit: (chartType: string) => void;
};

function Topbar({ handleChartModalSubmit }: TopbarProps) {
  return (
    <div className={styles.topbar}>
      <AddNewWidgetButton handleChartModalSubmit={handleChartModalSubmit} />
    </div>
  );
}

export default Topbar;
