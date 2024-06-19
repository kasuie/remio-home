/*
 * @Author: kasuie
 * @Date: 2024-06-12 19:52:57
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-19 15:46:12
 * @Description:
 */
"use client";
import { motion } from "framer-motion";
import { AppConfig } from "@/config/config";
import { AppRules } from "@/lib/rules";
import { Form, FormObj } from "../ui/form/Form";
import { memo, useState } from "react";
import { Button } from "../ui/button/Button";
import fetch from "@/lib/fetch";
import { useRouter } from "next/navigation";
import message from "@/components/message";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

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
  const router = useRouter();

  const onMerge = (data: FormObj, field?: string) => {
    setResult({
      ...result,
      ...(field ? { [field]: data } : data),
    });
  };

  return (
    <motion.div className="flex h-[85vh] w-[95vw] flex-col items-center gap-4 overflow-hidden rounded p-4 text-[hsl(var(--mio-foreground)/1)] shadow-mio-link backdrop-blur-lg md:w-[65vw]">
      <Accordion
        showDivider
        className="mio-scroll flex w-full flex-col overflow-y-auto px-2"
        selectionMode="multiple"
      >
        {AppRules?.map(({ title, rules, field }) => {
          const form = field ? (config as any)[field as any] : config;
          return (
            <AccordionItem
              key={title}
              aria-label={title}
              title={
                <span className="flex flex-nowrap items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]"></span>
                  <span className="font-semibold">{title}</span>
                </span>
              }
            >
              <MemoizedForm
                key={title}
                title={title}
                onMerge={(data: FormObj) => onMerge(data, field)}
                rules={rules}
                form={form}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
      <div>
        <Button
          loading={loading}
          className="rounded-2xl"
          onClick={() => {
            setLoading(true);
            fetch
              .post("/api/config", result)
              .then((res) => {
                if (res.success) {
                  message.success("保存成功~");
                  router.refresh();
                } else {
                  message.error(res.message || "操作失败！")
                }
              })
              .catch(_ => message.error("操作失败！"))
              .finally(() => setLoading(false));
          }}
        >
          保存
        </Button>
      </div>
    </motion.div>
  );
};
