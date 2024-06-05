/*
 * @Author: kasuie
 * @Date: 2024-06-05 10:09:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-05 17:30:25
 * @Description: 
 */
import { Site } from "@/config/config";
import { clsx } from "@kasuie/utils";
import { Avatar } from "../ui/image/Avatar";
import Link from "next/link";
import { ExternalLink, DotsHorizontal } from "@kasuie/icon";
import { BaseSyntheticEvent } from "react";

export function FlipCard({
    animate,
    outer,
    data,
    openModal
}: { data: Site, outer?: boolean, animate?: boolean, openModal?: Function }) {


    const onClick = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        if (!data?.url) return openModal?.();
        window.open(data.url, '_blank');
    }

    return (
        <Link
            href={data.url || ""}
            target="_blank"
            onClick={onClick}
            className="min-w-48 z-[1] group/flip h-28 overflow-visible basis-11/12 sm:mio-col-2 md:mio-col-2 lg:mio-col-3 xl:mio-col-5"
        >
            <div className={clsx("w-full transform-preserve-3d relative h-full transition-transform duration-300 shadow rounded", {
                "group-hover/flip:rotate-y-180": outer
            })}>
                <div className="z-[1] flex items-center bg-black/10 backdrop-blur-[7px] justify-center backface-hidden absolute w-full h-full rounded overflow-hidden">
                    <div className="h-[calc(100%-2px)] w-[calc(100%-2px)] absolute flex-col flex gap-2 items-center justify-center">
                        <Avatar warpClass="rounded-full overflow-hidden" width={28} height={28} src={data.icon || ""} alt={data.title} />
                        <span>{data?.title}</span>
                        {
                            !outer && (
                                <span className="absolute bottom-[5px] right-[7px]">
                                    {data?.url ? (
                                        <ExternalLink size={14} />
                                    ) : (
                                        <DotsHorizontal size={14} />
                                    )}
                                </span>
                            )
                        }
                    </div>
                </div>
                {
                    outer && (
                        <div className={clsx("backface-hidden group-active/flip:mio-flip-active duration-300 absolute w-full h-full rounded overflow-hidden", {
                            "rotate-y-180 backdrop-blur-[7px] bg-black/10": outer
                        })}>
                            <div className="h-[calc(100%-2px)] w-[calc(100%-2px)] flex items-center justify-center">
                                <span>{data?.desc}</span>
                                <span className="absolute bottom-[5px] right-[7px]">
                                    {data?.url ? (
                                        <ExternalLink size={14} />
                                    ) : (
                                        <DotsHorizontal size={14} />
                                    )}
                                </span>
                            </div>
                            {
                                outer && (
                                    <div className="absolute top-0 w-full h-full object-cover object-center">
                                        <div className="w-16 h-16 absolute left-0 top-0 rounded-full bg-[#ffbb66] blur-md animate-[mio-floating_2600ms_infinite_linear]">
                                        </div>
                                        <div className="w-12 h-12 mio-delay-1800 absolute right-0 top-0 rounded-full bg-[#ff2233] blur-md animate-[mio-floating_2600ms_infinite_linear]">
                                        </div>
                                        <div className="w-6 h-6 mio-delay-800 bottom-0 right-0 rounded-full bg-[#ff8866] absolute blur-md animate-[mio-floating_2600ms_infinite_linear]">
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </Link>
    );
}
