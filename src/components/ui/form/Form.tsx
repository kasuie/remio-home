/*
 * @Author: kasuie
 * @Date: 2024-06-13 11:03:00
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 18:02:55
 * @Description: 
 */
"use client";
import { useEffect, useState } from "react";
import { Input } from "../input/Input";
import { Radio } from "../radio/Radio";
import { Select } from "../select/Select";
import { Checkbox } from "../checkbox/Checkbox";
interface RuleItem {
    controlKey?: string;
    isRequired?: boolean;
    label?: string;
    placeholder?: string;
    items?: Array<any>;
    field: string;
}

interface FormObj {
    [key: string]: any;
}

export const Form = ({
    className = "",
    rules,
    form,
    controlProps = {
        size: "sm",
        variant: "faded"
    },
    transform = true,
}: {
    className?: string;
    rules?: Array<RuleItem>;
    form?: FormObj;
    controlProps?: FormObj;
    transform?: boolean;
}) => {

    const [formData, setFormData] = useState<FormObj>();

    useEffect(() => {
        if (rules?.length) {
            const object = rules.reduce((prev, curr) => {
                if (curr.field.includes("$boolean")) {
                    const booleans = curr.items?.reduce((iprev, icurr) => ({ ...iprev, [icurr.value]: false }), {})
                    return {
                        ...prev,
                        ...booleans,
                        [curr.field]: form && form[curr.field] || null
                    }
                } else {
                    return {
                        ...prev,
                        [curr.field]: form && form[curr.field] || null
                    }
                }
            }, {})
            console.log(object, "object>>>");
            // const newObj = Object.assign(object, form);
            // console.log(newObj, "newObj>>>");
            setFormData(object);
        } else if (form) {
            setFormData(form);
        }
    }, [rules, form])

    const onSubmit = () => {
        if (transform && formData) {
            const keys = Object.keys(formData)?.filter?.(v => v.includes("$boolean"));
            keys.map(key => {
                formData[key].map((v: string) => formData[v] = true)
            })
        }
        console.log(formData);
    }

    return (
        <div className="flex flex-col gap-4">
            {formData && rules?.map(({ field, controlKey, items, ...others }, index) => {
                const props = { ...others, ...controlProps };
                switch (controlKey) {
                    case "select":
                        return <Select
                            {...props}
                            key={field}
                            selectedKeys={formData[field] ? [formData[field]] : []}
                            items={items}
                            onSelectionChange={(val: any) => {
                                if (!val || !val['currentKey']) return;
                                setFormData({
                                    ...formData,
                                    [field]: val['currentKey']
                                })
                            }}
                        />
                    case "checkbox":
                        const value = formData[field] || []
                        return <Checkbox
                            {...props}
                            key={field}
                            value={value}
                            items={items}
                            onValueChange={(val: string[]) => {
                                setFormData({
                                    ...formData,
                                    [field]: val
                                })
                            }}
                        />
                    case "radio":
                        return <Radio key={field} value={formData[field]} items={items} {...props} onValueChange={(val: string) => {
                            setFormData({
                                ...formData,
                                [field]: val
                            })
                        }} />
                    default:
                        return <Input key={field} value={formData[field] || ""} {...props} onValueChange={(val: string) => {
                            setFormData({
                                ...formData,
                                [field]: val
                            })
                        }} />
                }
            })}
            <button onClick={onSubmit}>保存</button>
        </div>
    );
};