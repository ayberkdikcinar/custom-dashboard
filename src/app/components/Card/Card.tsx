import styles from './Card.module.css';
import React from 'react';
import { Row, Col, Radio } from 'antd';

type ChartCardProps = {
  title: string;
  description: string;
  image: string;
  handleItemClick?: (itemId: string) => void;
  itemId: string;
  checkedItem: string;
};
export default function ChartCard({ itemId, title, description, image, handleItemClick, checkedItem }: ChartCardProps) {
  const onItemClick = () => {
    if (handleItemClick) {
      handleItemClick(itemId);
    }
  };

  return (
    <div className={styles['cardItem']} onClick={onItemClick}>
      <Row className={styles['cardRow']}>
        <Col span={2}>
          <Radio checked={itemId === checkedItem ? true : false} />
        </Col>
        <Col span={14}>
          <div className={styles['cardTitle']}>{title}</div>
          <div className={styles['cardDescription']}> {description}</div>
        </Col>
        <Col span={8}>
          <img src={image} className={styles['cardImage']} alt='textAlt' />
        </Col>
      </Row>
    </div>
  );
}
