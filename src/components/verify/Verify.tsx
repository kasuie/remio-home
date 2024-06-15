/*
 * @Author: kasuie
 * @Date: 2024-06-15 10:30:25
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 18:46:12
 * @Description:
 */
"use client";
import { FlipCard } from "../cards/FlipCard";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import { useState } from "react";
import { Encrypt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import message from "../message";
import { LockClosed } from "@kasuie/icon";

export const Verify = () => {
  const [checkCode, setCheckCode] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <FlipCard
      flip
      className="flex-col gap-8 p-1 md:px-20 md:py-4"
      contentClass="backdrop-blur-md"
      warpClass="w-[96%] md:w-[750px] h-[350px]"
    >
      <Input
        label="Password"
        isClearable
        radius="lg"
        size="lg"
        onValueChange={setCheckCode}
        autoComplete="off"
        type="password"
        classNames={{
          label: "!text-[hsl(var(--mio-primary)/1)]",
          input: [
            "bg-transparent",
            "text-white/90",
            "placeholder:text-white/70",
            "group-data-[has-value=true]:text-white/90",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-black/40",
            "hover:bg-black/70",
            "data-[hover=true]:bg-black/50",
            "group-data-[focus=true]:bg-black/40",
            "!cursor-text",
          ],
        }}
        placeholder="输入密码以继续..."
        startContent={
          <LockClosed className="pointer-events-none mb-[3px] flex-shrink-0 text-white/90" />
        }
      />
      <Button
        loading={loading}
        className="mt-8 rounded-2xl text-white"
        onClick={() => {
          if (!checkCode) return message.warning("密码不能为空~");
          setLoading(true);
          fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify({
              checkCode: Encrypt(checkCode),
            }),
          }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            if (data?.success) {
              message.success("操作成功");
              router.refresh();
            } else {
              message.error("操作失败");
            }
            setLoading(false);
          });
        }}
      >
        提交
      </Button>
    </FlipCard>
  );
};
