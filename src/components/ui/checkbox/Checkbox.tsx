/*
 * @Author: kasuie
 * @Date: 2024-06-13 15:45:16
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-13 17:23:03
 * @Description: 
 */
"use client";
import { CheckboxGroup as UCheckboxGroup, Checkbox as UCheckbox, type CheckboxGroupProps, type CheckboxProps } from "@nextui-org/checkbox";

export const Checkbox = ({
    items,
    orientation = "horizontal",
    value,
    ...checkboxProps
}: {
    items?: Array<any>;
} & CheckboxGroupProps) => {
    return (
        <UCheckboxGroup orientation={orientation} value={value} {...checkboxProps}>
            {
                items?.map((v, index) => (<UCheckbox key={index} value={v?.value}>{v?.label}</UCheckbox>))
            }
        </UCheckboxGroup>
    );
};