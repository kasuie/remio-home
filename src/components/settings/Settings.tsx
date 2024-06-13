/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 23:25:37
 * @Description:
 */
"use client";
import { motion } from "framer-motion";
import { AppConfig } from "@/config/config";
import { AppRules, RuleItem } from "@/lib/rules";
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
      className="z-[1] flex max-h-[85vh] w-[95vw] overflow-hidden rounded p-4 pb-8 shadow-mio-link backdrop-blur md:w-[65vw]"
    >
      <div className="mio-scroll flex flex-col gap-8 w-full overflow-y-auto p-3">
        {AppRules?.map(({ title, rules, field }) => {
          const form = field ? (config as any)[field as any] : config;
          return <Form key={title} title={title} rules={rules} form={form} />;
        })}
      </div>
    </motion.div>
  );
};
