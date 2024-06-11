/*
 * @Author: kasuie
 * @Date: 2024-06-06 19:50:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-11 14:27:42
 * @Description:
 */
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

interface HorizontalProps {
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
}: HorizontalProps) {
  return (
    <div
      className={clsx(
        "mx-auto flex min-h-screen w-[65vw] flex-wrap items-center justify-between pb-10",
        {
          "gap-[30px]": gapSize == "md",
          "gap-8": gapSize == "sm",
          "gap-12": gapSize == "lg",
        }
      )}
    >
      <div className="flex flex-col items-start gap-24">
        <TextEffect
          {...subTitleConfig}
          motions={getMotion(0.1, 1, 0.2, istTransition)}
          text={subTitle}
        />
        <SocialIcons
          {...socialConfig}
          motions={getMotion(0.1, 2, 0.2, istTransition)}
          links={links}
        />
      </div>
      <Avatar
        priority
        isShowMotion
        width={avatarConfig?.size || 128}
        height={avatarConfig?.size || 128}
        alt={name}
        src={avatarConfig?.src || ""}
        motions={getMotion(0.1, 0, 0, istTransition)}
        warpClass={clsx(
          "relative z-[1] transition-[top,transform] rotate-0 inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]",
          {
            "rounded-full":
              !avatarConfig?.round || avatarConfig?.round == "full",
            "rounded-3xl": avatarConfig?.round == "3xl",
            "rounded-xl": avatarConfig?.round == "xl",
            "rounded-sm": avatarConfig?.round == "sm",
            "rounded-md": avatarConfig?.round == "md",
            "rounded-lg": avatarConfig?.round == "lg",
            "hover:top-[-10px]": avatarConfig?.hoverAnimate == "top",
            "hover:!rotate-[360deg] ": avatarConfig?.hoverAnimate == "rotate",
          }
        )}
      />
      {/* <Links
        sitesConfig={sitesConfig}
        motions={getMotion(0.1, 3, 0.2, istTransition)}
        primaryColor={primaryColor}
        staticSites={staticSites}
        modalSites={modalSites}
        cardOpacity={cardOpacity}
      />
      {!sliders?.hidden && (
        <Sliders
          motions={getMotion(0.1, 4, 0.2, istTransition)}
          cardOpacity={cardOpacity}
          {...sliders}
        />
      )} */}
    </div>
  );
}
