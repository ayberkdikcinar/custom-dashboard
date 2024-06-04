import './Modal.module.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { LegacyButtonType } from 'antd/es/button/button';

type CustomModalProps = {
  title: string;
  open: boolean;
  okText?: string;
  okType?: LegacyButtonType;
  width?: string;
  cancelText?: string;
  onSubmit: () => void;
  onClose: () => void;
  children: any;
};

export default function CustomModal({
  title,
  open,
  okText = 'Submit',
  cancelText = 'Cancel',
  width = '800px',
  okType = 'primary',
  onClose,
  onSubmit,
  children,
}: CustomModalProps) {
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
        okType={okType}
        cancelText={cancelText}
        width={width}
      >
        {children}
      </Modal>
    </>
  );
}
