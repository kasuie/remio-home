/*
 * @Author: kasuie
 * @Date: 2024-05-30 21:28:45
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-30 21:36:08
 * @Description: 
 */
"use client";
import { motion } from "framer-motion";

export function Footer({ text, motions }: { text: string, motions?: object }) {

    return (
        <motion.footer {...motions} className="absolute bottom-2 left-1/2 !translate-x-[-50%] cursor-pointer select-none whitespace-nowrap text-sm">
        {text}
      </motion.footer>
    );
  }