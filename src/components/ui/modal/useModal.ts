/*
 * @Author: kasuie
 * @Date: 2024-05-23 11:11:18
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-23 15:38:38
 * @Description:
 */
import { useState, useCallback, useEffect } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(() => setIsVisible(true), []);
  const closeModal = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    const body: any = document.getElementsByTagName("body")[0];
    if (body) {
      if (isVisible) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }, [isVisible]);

  return {
    isVisible,
    openModal,
    closeModal,
  };
};

export default useModal;
