/*
 * @Author: kasuie
 * @Date: 2024-06-13 11:03:00
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 23:24:56
 * @Description:
 */
"use client";
import { useEffect, useState } from "react";
import { Input } from "../input/Input";
import { Radio } from "../radio/Radio";
import { Select } from "../select/Select";
import { Checkbox } from "../checkbox/Checkbox";
import { RuleItem } from "@/lib/rules";

interface FormObj {
  [key: string]: any;
}

export const Form = ({
  className = "",
  title,
  rules,
  form,
  controlProps = {
    size: "sm",
    variant: "flat",
    color: "success",
    classNames: {
      label: "text-mio-text-color",
      description: "text-mio-text-color/80 indent-1",
    },
  },
  transform = true,
}: {
  className?: string;
  title?: string;
  rules?: Array<RuleItem>;
  form?: FormObj;
  controlProps?: FormObj;
  transform?: boolean;
}) => {
  const [formData, setFormData] = useState<FormObj>();

  useEffect(() => {
    if (rules?.length && form) {
      const object = rules.reduce((prev, curr) => {
        let value =
          typeof form[curr.field] != "undefined" && form[curr.field] != ""
            ? form[curr.field]
            : curr.default;
        if (curr.field.includes("$boolean")) {
          const booleans = curr.items?.reduce((iprev, icurr) => {
            const ivalue =
              typeof form[icurr.value] != "undefined"
                ? form[icurr.value]
                : value?.includes(icurr.value);
            if (ivalue) {
              if (Array.isArray(value)) {
                !value.includes(icurr.value) && value.push(icurr.value);
              } else {
                value = [icurr.value];
              }
            }
            return { ...iprev, [icurr.value]: ivalue };
          }, {});
          return {
            ...prev,
            ...booleans,
            [curr.field]: value,
          };
        } else {
          return {
            ...prev,
            [curr.field]: value,
          };
        }
      }, {});
      setFormData(object);
    } else if (form) {
      setFormData(form);
    }
  }, [rules, form]);

  const onSubmit = () => {
    if (transform && formData) {
      const keys = Object.keys(formData)?.filter?.((v) =>
        v.includes("$boolean")
      );
      keys.map((key) => {
        formData[key]?.map((v: string) => (formData[v] = true));
      });
    }
    console.log(formData);
  };

  return (
    <div>
      {title && (
        <div className="mb-2 flex flex-nowrap items-center gap-2">
          <span className="ml-1 h-2 w-2 rounded-full bg-black dark:bg-white"></span>
          <span className=" text-base font-semibold">{title}</span>
        </div>
      )}
      <div className="flex flex-wrap justify-between gap-y-4">
        {formData &&
          rules?.map(
            (
              {
                field,
                controlKey,
                items,
                desc,
                controlProps: _props,
                ...others
              },
              index
            ) => {
              const props = {
                ...others,
                ...controlProps,
                ..._props,
                description: desc,
                className: "md:mio-col-2-full",
              };
              switch (controlKey) {
                case "select":
                  return (
                    <Select
                      {...props}
                      key={field}
                      selectedKeys={formData[field] ? [formData[field]] : []}
                      items={items}
                      onSelectionChange={(val: any) => {
                        if (!val || !val["currentKey"]) return;
                        setFormData({
                          ...formData,
                          [field]: val["currentKey"],
                        });
                      }}
                    />
                  );
                case "checkbox":
                  const value = formData[field] || [];
                  return (
                    <Checkbox
                      {...props}
                      key={field}
                      value={value}
                      items={items}
                      onValueChange={(val: string[]) => {
                        setFormData({
                          ...formData,
                          [field]: val,
                        });
                      }}
                    />
                  );
                case "radio":
                  return (
                    <Radio
                      key={field}
                      value={formData[field]}
                      items={items}
                      {...props}
                      onValueChange={(val: string) => {
                        setFormData({
                          ...formData,
                          [field]: val,
                        });
                      }}
                    />
                  );
                default:
                  return (
                    <Input
                      key={field}
                      value={formData[field] || ""}
                      {...props}
                      onValueChange={(val: string) => {
                        setFormData({
                          ...formData,
                          [field]: val,
                        });
                      }}
                    />
                  );
              }
            }
          )}
      </div>
      {/* <button onClick={onSubmit}>保存</button> */}
    </div>
  );
};
