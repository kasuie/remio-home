/*
 * @Author: kasuie
 * @Date: 2024-05-31 13:22:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-31 13:32:29
 * @Description: 
 */
import { clsx } from "@kasuie/utils";
import { Avatar } from "../ui/image/Avatar";
import { getMotion } from "@/lib/motion";
import { Link, Site, SitesConfig, SocialConfig, SubTitleConfig } from "@/config/config";
import { TextEffect } from "../effect/TextEffect";
import { SocialIcons } from "../social-icons/SocialIcons";
import { Links } from "../links/Links";

interface VerticalProps {
    gapSize: string;
    name: string;
    avatar: string;
    subTitleConfig?: SubTitleConfig;
    sitesConfig?: SitesConfig;
    socialConfig?: SocialConfig;
    istTransition: boolean;
    links: Link[];
    staticSites: Site[];
    modalSites: Site[];
    primaryColor?: string;
    subTitle?: string;
}
export function Vertical({ gapSize, name, avatar, subTitleConfig, sitesConfig, socialConfig, istTransition, links, staticSites, modalSites, primaryColor, subTitle }: VerticalProps) {

    return  <div className={clsx("flex w-full flex-col items-center justify-center pb-10", {
        "gap-[30px] pt-[20vh]": gapSize == "md",
        "gap-8 pt-[25vh]": gapSize == "sm",
        "gap-12 pt-[15vh]": gapSize == "lg"
      })}>
        <Avatar
          fill
          priority
          isShowMotion
          alt={name}
          src={avatar}
          motions={getMotion(0.1, 0, 0.2, istTransition)}
          warpClass="hover:top-[-10px] w-32 h-32 relative transition-[top] rounded-full inline-block overflow-hidden cursor-pointer duration-500 top-0 ease-in-out animate-[light_4s_ease-in-out_infinite]"
        />
        <TextEffect { ...subTitleConfig } motions={getMotion(0.1, 1, 0.2, istTransition)} text={subTitle}></TextEffect>
        <SocialIcons { ...socialConfig} motions={getMotion(0.1, 2, 0.2, istTransition)} links={links} />
        <Links sitesConfig={sitesConfig} motions={getMotion(0.1, 3, 0.2, istTransition)} primaryColor={primaryColor} staticSites={staticSites} modalSites={modalSites} />
      </div>
}