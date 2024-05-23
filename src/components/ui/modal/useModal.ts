/*
 * @Author: kasuie
 * @Date: 2024-05-23 11:11:18
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 11:11:24
 * @Description:
 */
import { useState, useCallback } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => setIsVisible(true), []);
  const closeModal = useCallback(() => setIsVisible(false), []);

  return {
    isVisible,
    openModal,
    closeModal,
  };
};

export default useModal;
