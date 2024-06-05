/*
 * @Author: kasuie
 * @Date: 2024-06-05 10:09:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-05 21:42:31
 * @Description:
 */
import { Site } from "@/config/config";
import { clsx } from "@kasuie/utils";
import { Avatar } from "../ui/image/Avatar";
import { ExternalLink, DotsHorizontal } from "@kasuie/icon";

export function FlipCard({
  animate,
  outer,
  data,
  direction = "col",
  hoverFlip = true,
}: {
  data: Site;
  outer?: boolean;
  animate?: boolean;
  direction?: string;
  hoverFlip?: boolean;
}) {
  return (
    <div
      className={clsx(
        "group/flip z-[1] h-[100px] min-w-48 overflow-visible rounded"
      )}
    >
      <div
        className={clsx(
          "transform-preserve-3d relative h-full w-full rounded shadow transition-transform duration-300",
          {
            "group-hover/flip:rotate-y-180": outer && hoverFlip,
          }
        )}
      >
        <div
          className={clsx(
            "backface-hidden absolute z-[1] flex h-full w-full items-center justify-center overflow-hidden rounded backdrop-blur-[7px]",
            {
              "bg-black/10": outer,
            }
          )}
        >
          <div
            className={clsx(
              "absolute flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center gap-2",
              {
                "flex-row": direction == "row",
                "flex-col": direction != "row"
              }
            )}
          >
            <Avatar
              warpClass="rounded-full overflow-hidden"
              width={30}
              height={30}
              src={data.icon || ""}
              alt={data.title}
            />
            <span>{data?.title}</span>
            {(!outer || !hoverFlip) && (
              <span className="absolute bottom-[5px] right-[7px]">
                {data?.url ? (
                  <ExternalLink size={14} />
                ) : (
                  <DotsHorizontal size={14} />
                )}
              </span>
            )}
          </div>
        </div>
        {outer && hoverFlip && (
          <div
            className={clsx(
              "backface-hidden group-active/flip:mio-flip-active absolute h-full w-full overflow-hidden rounded duration-300",
              {
                "rotate-y-180 bg-black/10 backdrop-blur-[7px]": outer,
              }
            )}
          >
            <div className="flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center">
              <span>{data?.desc}</span>
              <span className="absolute bottom-[5px] right-[7px]">
                {data?.url ? (
                  <ExternalLink size={14} />
                ) : (
                  <DotsHorizontal size={14} />
                )}
              </span>
            </div>
            {outer && (
              <div className="absolute top-0 h-full w-full object-cover object-center">
                <div className="absolute left-0 top-0 h-16 w-16 animate-[mio-floating_2600ms_infinite_linear] rounded-full bg-[#ffbb66] blur-md"></div>
                <div className="mio-delay-1800 absolute right-0 top-0 h-12 w-12 animate-[mio-floating_2600ms_infinite_linear] rounded-full bg-[#ff2233] blur-md"></div>
                <div className="mio-delay-800 absolute bottom-0 right-0 h-6 w-6 animate-[mio-floating_2600ms_infinite_linear] rounded-full bg-[#ff8866] blur-md"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
