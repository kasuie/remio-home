/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 14:03:36
 * @Description:
 */
"use client";
import { motion } from "framer-motion";
import { AppConfig } from "@/config/config";
import { mainRules } from "@/lib/data";
import { Form } from "../ui/form/Form";

export const Settings = ({
  config,
  cardOpacity,
}: {
  config: AppConfig;
  cardOpacity?: number;
}) => {
  // fetch("/api/config", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       ...config,
  //     }),
  //   }).then(async (res) => {
  //     console.log(await res.json());
  //   });
  return (
    <motion.div
      style={{
        backgroundColor: `rgba(var(--mio-main), ${cardOpacity})`,
      }}
      className="z-[1] mb-8 w-[95vw] rounded p-4 pb-8 shadow-mio-link backdrop-blur md:w-[65vw]"
    >
      <Form rules={mainRules} form={config} />
    </motion.div>
  );
};
