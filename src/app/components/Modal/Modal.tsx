import './Modal.module.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';

type ChartSelectModalProps = {
  title: string;
  open: boolean;
  okText?: string;
  width?: string;
  cancelText?: string;
  onSubmit: () => void;
  onClose: () => void;
  children: any;
};

export default function ChartSelectModal({
  title,
  open,
  okText = 'Submit',
  cancelText = 'Cancel',
  width = '800px',
  onClose,
  onSubmit,
  children,
}: ChartSelectModalProps) {
  console.log('isOpen:', open);

  const closeModal = () => {
    onClose();
  };

  const submitModal = () => {
    onSubmit();
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={submitModal}
        onCancel={closeModal}
        okText={okText}
        cancelText={cancelText}
        width={width}
      >
        {children}
      </Modal>
    </>
  );
}
