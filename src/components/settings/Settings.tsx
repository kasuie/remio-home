/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-14 15:27:54
 * @Description:
 */
"use client";
import { motion } from "framer-motion";
import { AppConfig } from "@/config/config";
import { AppRules } from "@/lib/rules";
import { Form, FormObj } from "../ui/form/Form";
import { memo, useCallback, useState } from "react";
import { Button } from "../ui/button/Button";

const MemoizedForm = memo(Form);

export const Settings = ({
  config,
  cardOpacity = 0.3,
}: {
  config: AppConfig;
  cardOpacity?: number;
}) => {

  const [result, setResult] = useState<FormObj>(config);
  const [loading, setLoading] = useState(false);

  const onMerge = (data: FormObj, field?: string) => {
    setResult({
      ...result,
      ...(field ? { [field]: data } : data)
    })
  };

  return (
    <motion.div
      style={{
        backgroundColor: `rgba(var(--mio-main), ${cardOpacity})`,
      }}
      className="z-[1] flex flex-col items-center gap-4 max-h-[85vh] w-[95vw] overflow-hidden rounded p-4 shadow-mio-link backdrop-blur md:w-[65vw]"
    >
      <div className="mio-scroll flex flex-col gap-8 w-full overflow-y-auto p-3">
        {AppRules?.map(({ title, rules, field }) => {
          const form = field ? (config as any)[field as any] : config;
          return <MemoizedForm key={title} title={title} onMerge={(data: FormObj) => onMerge(data, field)} rules={rules} form={form} />;
        })}
      </div>
      <div>
        <Button loading={loading} className=" rounded-2xl" onClick={() => {
          console.log(result, "result");
          setLoading(true)
          // fetch("/api/config", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     ...result,
          //   }),
          // }).then(async (res) => {
          //   console.log(await res.json());
          //   setLoading(false)
          // });
        }}>保存</Button>
      </div>
    </motion.div>
  );
};
