/*
 * @Author: kasuie
 * @Date: 2024-06-15 20:58:32
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-24 21:18:54
 * @Description:
 */
"use client";
import { clsx } from "@kasuie/utils";
import { ItemsItem } from "@/lib/rules";
import { Select } from "../select/Select";
import { Input } from "../input/Input";
import { FormObj } from "./Form";
import { BaseSyntheticEvent } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Cross } from "@kasuie/icon";

interface FormListProps {
  className?: string;
  data?: Array<any>;
  rules?: Array<ItemsItem>;
  controlProps?: FormObj;
  title?: string;
  onChange?: Function;
  onProxy?: Function;
}

export const FormList = ({
  className,
  data,
  rules,
  controlProps,
  title,
  onChange,
  onProxy,
  ...props
}: FormListProps) => {
  const renderCol = (
    {
      controlKey,
      desc,
      value: field,
      label,
      controlProps: _props,
      ...others
    }: ItemsItem,
    row: FormObj,
    index: number
  ) => {
    const props = {
      ...others,
      ...controlProps,
      ..._props,
      description: desc,
      className: "md:mio-col-4",
    };
    switch (controlKey) {
      case "select":
        return (
          <Select
            {...props}
            key={field}
            selectedKeys={row[field] ? [row[field]] : []}
            // items={items}
            // onSelectionChange={(val: any) => {
            //   if (!val || !val["currentKey"]) return;
            //   setFormData({
            //     ...formData,
            //     [field]: val["currentKey"],
            //   });
            // }}
          />
        );
      default:
        return (
          <Input
            key={field}
            value={row[field] || ""}
            {...props}
            onValueChange={(val: string) => {
              onChange?.(index, field, val);
            }}
          />
        );
    }
  };

  const renderRow = (row: any, key: number) => {
    return (
      <li key={key} className="flex w-full flex-row justify-between gap-y-3">
        {rules?.map((col: ItemsItem) => renderCol(col, row, key))}
        <div
          onClick={() => onProxy?.("del", key)}
          className="flex cursor-pointer flex-nowrap items-center text-red-600 duration-300 hover:underline"
        >
          <Cross size={14} />
          <span>删除</span>
        </div>
      </li>
    );
  };

  return (
    <Accordion className="w-full">
      <AccordionItem
        className="w-full"
        aria-label={title}
        subtitle={
          <span className="flex flex-nowrap items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-[var(--primary-color)]"></span>
            <span className="font-semibold text-white/70">{title}</span>
          </span>
        }
      >
        <ul className="flex w-full flex-col gap-3">
          <li className="flex w-full flex-row justify-between">
            {rules?.map((col: ItemsItem) => {
              return (
                <span key={col.label} className="md:mio-col-4">
                  {col.label}
                </span>
              );
            })}
          </li>
          {data?.map((v, i) => renderRow(v, i))}
          <li
            className="flex items-center justify-end pt-3"
            onClick={() => onProxy?.("add")}
          >
            <span className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[var(--primary-color)] px-2 text-[var(--primary-color)]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>新增一行</span>
            </span>
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
