/*
 * @Author: kasuie
 * @Date: 2024-06-06 19:50:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-21 21:55:29
 * @Description:
 */
import { HTMLAttributes } from "react";
import { clsx } from "@kasuie/utils";
import { Avatar } from "../ui/image/Avatar";
import { getMotion } from "@/lib/motion";
import {
  AvatarConfig,
  Link,
  Site,
  SitesConfig,
  SlidersConfig,
  SocialConfig,
  SubTitleConfig,
} from "@/config/config";
import { SocialIcons } from "../social-icons/SocialIcons";
import { Links } from "../links/Links";
import { Sliders } from "../sliders/Sliders";
import dynamic from "next/dynamic";
import { DoubleArrow } from "@kasuie/icon";

const TextEffect = dynamic(
  async () => (await import("@/components/effect/TextEffect")).TextEffect
);

const HoriTextEffect = dynamic(
  async () =>
    (await import("@/components/effect/HoriTextEffect")).HoriTextEffect
);

interface HorizontalProps extends HTMLAttributes<HTMLDivElement> {
  gapSize: string;
  name: string;
  avatarConfig?: AvatarConfig;
  subTitleConfig?: SubTitleConfig;
  sitesConfig?: SitesConfig;
  socialConfig?: SocialConfig;
  istTransition: boolean;
  links: Link[];
  staticSites: Site[];
  modalSites: Site[];
  primaryColor?: string;
  subTitle?: string;
  sliders?: SlidersConfig;
  cardOpacity?: number;
}
export function Horizontal({
  gapSize,
  name,
  avatarConfig,
  subTitleConfig,
  sitesConfig,
  socialConfig,
  istTransition,
  links,
  staticSites,
  modalSites,
  primaryColor,
  subTitle,
  sliders,
  cardOpacity = 0.1,
  className,
  ...others
}: HorizontalProps) {
  const renderSubTitle = ({ style, ...props }: any) => {
    switch (style) {
      case "desc":
        return <HoriTextEffect {...props} />;
      default:
        return <TextEffect {...props} />;
    }
  };

  return (
    <div
      className={clsx(
        "mx-auto flex min-h-screen w-11/12 flex-wrap items-center justify-between pb-10 md:w-[68vw]",
        {
          "gap-[30px]": gapSize == "md",
          "gap-8": gapSize == "sm",
          "gap-12": gapSize == "lg",
          [`${className}`]: className
        }
      )}
      {...others}
    >
      <div className="flex [@media(max-width:768px)]:pt-12 relative min-h-screen w-full flex-col-reverse flex-wrap items-center justify-between gap-10 md:gap-20 md:flex-row">
        <div className="flex flex-1 [@media(max-width:768px)]:text-center [@media(max-width:768px)]:items-center flex-col items-start gap-8 md:gap-20">
          {renderSubTitle(subTitleConfig)}
          <SocialIcons
            {...socialConfig}
            initialDelay={
              `${subTitleConfig?.content || ""}${subTitleConfig?.desc || ""}`
                .length * (subTitleConfig?.gapDelay || 0.05)
            }
            motions={getMotion(0.1, 2, 0.2, istTransition)}
            links={links}
          />
        </div>
        <Avatar
          priority
          isShowMotion
          alt={name}
          src={avatarConfig?.src || ""}
          motions={getMotion(0.1, 0, 0, istTransition)}
          animateStyle={avatarConfig?.style}
          {...avatarConfig}
          style={''}
          className="[@media(max-width:768px)]:mx-auto"
        />
        <p className="absolute z-10 text-white flex justify-center right-0 left-0 bottom-6 animate-bounce"><DoubleArrow className="rotate-90" /></p>
      </div>
      {
        (!sitesConfig?.hidden || !sliders?.hidden) && (
          <div className="min-h-[calc(100vh-2.5rem)] w-full flex justify-center items-center gap-16 flex-col">
            {
              !sitesConfig?.hidden && <Links
                sitesConfig={sitesConfig}
                motions={getMotion(0.1, 3, 0.2, istTransition)}
                primaryColor={primaryColor}
                staticSites={staticSites}
                modalSites={modalSites}
                cardOpacity={cardOpacity}
              />
            }
            {!sliders?.hidden && (
              <Sliders
                motions={getMotion(0.1, 4, 0.2, istTransition)}
                cardOpacity={cardOpacity}
                {...sliders}
              />
            )}
          </div>
        )
      }
    </div>
  );
}
