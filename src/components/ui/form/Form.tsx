/*
 * @Author: kasuie
 * @Date: 2024-06-13 11:03:00
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 11:45:56
 * @Description: 
 */
"use client";
import { useEffect, useState } from "react";
import { Input } from "../input/Input";
interface RuleItem {
    controlKey?: string;
    isRequired?: boolean;
    label?: string;
    placeholder?: string;
    items?: Array<any>;
    field: string;
}

interface FormData {
    [key: string]: any;
}

export const Form = ({
    className = "",
    rules,
    form,
}: {
    className?: string;
    rules?: Array<RuleItem>;
    form?: FormData;
}) => {

    const [formData, setFormData] = useState<FormData>();

    useEffect(() => {
        if (rules?.length) {
            const object = rules.reduce((prev, curr) => ({
                ...prev,
                [curr.field]: null
            }), {})
            console.log(object, "object>>>");
            const newObj = Object.assign(object, form);
            console.log(newObj, "newObj>>>");
            setFormData(newObj);
        } else if (form) {
            setFormData(form);
        }
    }, [rules, form])

    return (
        <div className="flex flex-col gap-4">
            {formData && rules?.map(({ field, controlKey, ...props }, index) => {
                switch (controlKey) {
                    case "select":
                        return <Input value={formData[field]} {...props} />
                    default:
                        return <Input value={formData[field]} onValueChange={(val: string) => {
                            setFormData({
                                ...formData,
                                [field]: val
                            })
                        }} {...props} />
                }
            })}
        </div>
    );
};