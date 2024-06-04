import React, { useState } from 'react';
import ChartCard from './Card';
import { Row, Col } from 'antd';
import styles from './Card.module.css';

type CardListProps = {
  itemList: Item[];
  onChecked: (itemId: string) => void;
  defaultCheckedItem?: string;
};

type Item = {
  title: string;
  description: string;
  image: string;
  itemId: string;
};

export default function CardList({ itemList, defaultCheckedItem, onChecked }: CardListProps) {
  const [radioCheckedItem, setRadioCheckedItem] = useState<string | null>(defaultCheckedItem || null);

  const handleItemClick = (itemId: string) => {
    setRadioCheckedItem(itemId);
    onChecked(itemId);
  };

  return (
    <div>
      <Row>
        {itemList.map((item, index) => {
          return (
            <Col span={12} key={index}>
              <div className={styles['cardContainer']}>
                <ChartCard
                  {...item}
                  key={index}
                  handleItemClick={handleItemClick}
                  checkedItem={radioCheckedItem || ''}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
