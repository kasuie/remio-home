/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 20:10:25
 * @Description:
 */
"use client";
import { motion } from "framer-motion";
import { AppConfig } from "@/config/config";
import { AppRules } from "@/lib/data";
import { Form } from "../ui/form/Form";

export const Settings = ({
  config,
  cardOpacity = 0.3,
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
      className="z-[1] mb-8 flex w-[95vw] flex-col gap-8 rounded p-4 pb-8 shadow-mio-link backdrop-blur md:w-[65vw]"
    >
      {AppRules?.map((v) => (
        <Form key={v.title} title={v.title} rules={v.rules} form={config} />
      ))}
    </motion.div>
  );
};
