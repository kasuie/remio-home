/*
 * @Author: kasuie
 * @Date: 2024-05-31 13:22:52
 * @LastEditors: kasuie
 * @LastEditTime: 2025-02-22 19:54:25
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
import { TextEffect } from "../effect/TextEffect";
import { SocialIcons } from "../social-icons/SocialIcons";
import { Links } from "../links/Links";
import { Sliders } from "../sliders/Sliders";
interface VerticalProps extends HTMLAttributes<HTMLDivElement> {
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
  footers?: number;
}

export function Vertical({
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
  footers = 0,
  ...others
}: VerticalProps) {
  return (
    <div
      className={clsx(
        "relative z-[1] flex w-full flex-col items-center justify-center pb-16",
        {
          "gap-8 pt-[20vh]": gapSize == "sm",
          "gap-10 pt-[18vh]": gapSize == "md",
          "gap-12 pt-[15vh]": gapSize == "lg",
          "!pb-20": footers > 2,
          [`${className}`]: className,
        }
      )}
      {...others}
    >
      {!avatarConfig?.hidden && (
        <Avatar
          priority
          isShowMotion
          alt={name}
          src={avatarConfig?.src || ""}
          motions={getMotion(0.1, 0, 0, istTransition)}
          animateStyle={avatarConfig?.style}
          {...avatarConfig}
          style={""}
        />
      )}
      <TextEffect
        {...subTitleConfig}
        motions={getMotion(0.1, 1, 0.2, istTransition)}
        text={subTitle}
      ></TextEffect>
      <SocialIcons
        {...socialConfig}
        motions={getMotion(0.1, 2, 0.2, istTransition)}
        links={links}
      />
      {!sitesConfig?.hidden && (
        <Links
          sitesConfig={sitesConfig}
          motions={getMotion(0.1, 3, 0.2, istTransition)}
          primaryColor={primaryColor}
          staticSites={staticSites}
          modalSites={modalSites}
          cardOpacity={cardOpacity}
        />
      )}
      {!sliders?.hidden && (
        <Sliders
          motions={getMotion(0.1, 4, 0.2, istTransition)}
          cardOpacity={cardOpacity}
          {...sliders}
        />
      )}
    </div>
  );
}
