/*
 * @Author: kasuie
 * @Date: 2024-06-16 14:25:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-17 00:46:35
 * @Description:
 */
"use client";
import { Button } from "@/components/ui/button/Button";
import { Loader } from "@/components/ui/loader/Loader";
import { dateFormat, toHsl } from "@kasuie/utils";
import { Suspense, useState } from "react";

export default function Pray() {
  const primaryColor = "#229fff";

  const style: any = {
    "--mio-foreground": "210 5.56% 92.94%",
    "--primary-color": primaryColor,
    "--mio-primary": toHsl(primaryColor),
  };

  const role = [
    { name: "莫娜", count: 45, ver: "1.0", stage: 3 },
    { name: "可莉", count: 81, ver: "1.0", stage: 3 },
    { name: "钟离", count: 76, ver: "1.1", stage: 3 },
    { name: "甘雨", count: 55, ver: "1.2", stage: 3 },
    { name: "刻晴", count: 75, ver: "1.3", stage: 2 },
    { name: "刻晴", count: 74, ver: "1.3", stage: 2 },
    { name: "神里绫华", count: 80, ver: "2.0", stage: 1 },
    { name: "迪卢克", count: 78, ver: "2.1", stage: 3 },
    { name: "珊瑚宫心海", count: 79, ver: "2.1", stage: 3 },
    { name: "申鹤", count: 78, ver: "2.4", stage: 1 },
    { name: "七七", count: 80, ver: "2.5", stage: 1, flag: "八重神子" },
    { name: "八重神子", count: 38, ver: "2.5", stage: 1 },
    { name: "刻晴", count: 78, ver: "2.7", stage: 1, flag: "夜兰" },
    { name: "夜兰", count: 67, ver: "2.7", stage: 1 },
    { name: "刻晴", count: 24, ver: "2.8", stage: 1, flag: "枫原万叶" },
    { name: "枫原万叶", count: 77, ver: "2.8", stage: 1 },
    { name: "温迪", count: 75, ver: "3.1", stage: 1 },
    { name: "莫娜", count: 77, ver: "3.1", stage: 3 },
    { name: "妮露", count: 9, ver: "3.1", stage: 3 },
    { name: "刻晴", count: 79, ver: "3.2", stage: 1, flag: "纳西妲" },
    { name: "纳西妲", count: 76, ver: "3.2", stage: 1 },
    { name: "七七", count: 83, ver: "3.3", stage: 3 },
    { name: "雷电将军", count: 10, ver: "3.3", stage: 3 },
    { name: "白术", count: 80, ver: "3.6", stage: 3 },
    { name: "宵宫", count: 78, ver: "3.7", stage: 1 },
    { name: "优菈", count: 2, four: 7, ver: "3.8", stage: 1 },
  ];

  const [versions, setVersions]: any = useState();

  const maps: any = {
    w: "302",
    r: "301",
    c: "200",
  };

  const fours = {
    role: 222,
    weapon: 121,
    common: 60,
  };

  const weapon = [
    { name: "天空之刃", count: 63, ver: "1.4", stage: 1 },
    { name: "四风原典", count: 37, ver: "1.4", stage: 3 },
    { name: "天空之脊", count: 67, ver: "2.0", stage: 1 },
    { name: "尘世之锁", count: 47, ver: "2.2", stage: 1 },
    { name: "天空之傲", count: 10, ver: "2.4", stage: 1, flag: "和璞鸢" },
    { name: "和璞鸢", count: 65, ver: "2.4", stage: 1 },
    { name: "神乐之真意", count: 64, ver: "2.5", stage: 1 },
    { name: "无工之剑", count: 19, ver: "2.6", stage: 3 },
    { name: "千夜浮梦", count: 68, ver: "3.2", stage: 1 },
    { name: "薙草之稻光", count: 66, ver: "3.3", stage: 3 },
    { name: "若水", count: 65, ver: "3.4", stage: 3 },
    { name: "雾切之回光", count: 25, ver: "3.5", stage: 3 },
    { name: "狼的末路", count: 72, ver: "3.5", stage: 3 },
    { name: "雾切之回光", count: 25, ver: "3.5", stage: 3 },
    { name: "息灾", count: 67, ver: "3.5", stage: 3 },
    { name: "飞雷之弦振", count: 65, ver: "3.7", stage: 1 },
    {
      name: "天空之脊",
      count: 1,
      four: 7,
      ver: "3.8",
      stage: 1,
      flag: "松籁响起之时",
    },
  ];

  const common = [
    { name: "阿莫斯之弓", count: 81, ver: "1.0", stage: 3 },
    { name: "琴", count: 78, ver: "1.0", stage: 3 },
    { name: "天空之卷", count: 23, ver: "1.1", stage: 3 },
    { name: "琴", count: 23, ver: "1.2", stage: 3 },
    { name: "迪卢克", count: 44, ver: "1.3", stage: 2 },
    { name: "阿莫斯之弓", count: 81, ver: "2.0", stage: 1 },
    { name: "迪卢克", count: 77, ver: "2.0", stage: 1 },
    { name: "四风原典", count: 79, ver: "2.4", stage: 1 },
    { name: "琴", count: 4, ver: "2.4", stage: 1 },
    { name: "刻晴", count: 10, ver: "2.5", stage: 1 },
  ];

  function generateRandom6DigitNumber() {
    // 使用 Math.random() 生成一个大数，然后将其转换为字符串，取前 19 位。
    let randomNum = "";

    while (randomNum.length < 6) {
      // 生成一个 10 到 18 位之间的数字字符串
      randomNum += Math.floor(
        Math.random() * Number.MAX_SAFE_INTEGER
      ).toString();
    }

    // 截取前 19 位，确保结果长度为 19 位
    randomNum = randomNum.substring(0, 6);

    return randomNum;
  }

  const format = (item: any, startTime: string | any, type: string) => {
    const id = generateRandom6DigitNumber();
    const time = new Date(startTime);
    if (!item) {
      console.log(item, startTime, type);
    }
    return {
      uigf_gacha_type: maps[type],
      gacha_type: maps[type],
      item_id: `${id}`,
      count: "1",
      time: dateFormat(time, "YYYY-MM-DD HH:mm:ss"),
      name: item?.role,
      item_type: type === "r" && item?.star != 3 ? "角色" : "武器",
      rank_type: `${item?.star}`,
      id: `${time.getTime()}${id}`,
    };
  };

  const getData = (
    count: number,
    name: string,
    nofour: number,
    versions: any,
    stage: number,
    end: boolean,
    type: string,
    prevCount: number,
    flag: string
  ) => {
    const wishes: any = versions["wishUps"].filter(
      (v: any) => (v.wishStage = stage)
    );
    let version = wishes.find((v: any) => {
      const index = v.objects.findIndex(
        (vv: any) => vv.role == name || vv.role == flag
      );
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    });
    if (!version) {
      if (type == "r") {
        version = wishes[0];
      } else {
        const wps = wishes.filter((vv: any) => vv.wishType == 0);
        version = wps[0];
      }
    }
    console.log(version, name);
    const result = [],
      ups = version["objects"];
    let startTime = new Date(version["startTime"]);
    // console.log(startTime, name, prevCount, version, wishes);
    // startTime.setHours(startTime.getHours() + 24 + (prevCount ? 24 : 0));
    startTime.setMinutes(startTime.getMinutes() + 5 + prevCount * 5);
    const fourUps = ups.filter((v: any) => v.star === 4);
    const fiveUps = ups.filter((v: any) => v.star === 5);
    const fiveSatrs = [
      ...versions["roleStar5"],
      ...versions["weaponStar5"],
      ...fiveUps,
    ];
    const fourSatrs = [...versions["roleStar4"], ...versions["weaponStar4"]];
    const commons = versions["weaponStar3"];
    let _nofour = nofour;
    while (count > 0) {
      const random = Math.random();
      startTime.setMinutes(startTime.getMinutes() + 5);
      if (count == 1) {
        if (!end) {
          // console.log(name, version, versions);
          ++_nofour;
          const role = fiveSatrs.find((v: any) => v.role === name);
          result.push(format(role, startTime, type));
        } else {
          ++_nofour;
          const index = Math.floor(Math.random() * commons.length);
          result.push(format(commons[index], startTime, type));
        }
      } else {
        if (random < 0.09 || _nofour >= 9) {
          _nofour = 0;
          const index = Math.floor(Math.random() * fourUps.length);
          result.push(format(fourUps[index], startTime, type));
        } else {
          ++_nofour;
          const index = Math.floor(Math.random() * commons.length);
          result.push(format(commons[index], startTime, type));
        }
      }
      --count;
    }
    return {
      result,
      nofour: _nofour,
    };
  };

  const reduceData = (versionss: any, arr: any, type: string) => {
    return arr.reduce(
      (prev: any, { name, stage, count, ver, four, flag }: any) => {
        const { data, nofour, prevObj } = prev;
        const result: any = getData(
          count,
          name,
          nofour < 0 && four ? four : nofour,
          versionss[ver],
          stage,
          typeof four != "undefined" && four > -1,
          type,
          prevObj.ver == ver && stage == prevObj.stage ? prevObj.count : 0,
          flag
        );
        // console.log(result.result, name);
        return {
          data: data.concat(result.result),
          nofour: result.nofour,
          prevObj: {
            ver: ver,
            count:
              prevObj.ver == ver && stage == prevObj.stage
                ? count + prevObj.count
                : count,
            stage: stage,
          },
        };
      },
      {
        data: [],
        nofour: 0,
        prevObj: {
          ver: "",
          count: 0,
          stage: 0,
        },
      }
    );
  };

  const onClick = () => {
    const versMap = [...role, ...weapon].reduce((prev: any, curr) => {
      if (prev.includes(curr.ver)) {
        return prev;
      } else {
        return [...prev, curr.ver];
      }
    }, []);
    const queryParams = versMap
      .map((v: string) => `vs=${encodeURIComponent(v)}`)
      .join("&");
    99;
    fetch(`/apis/ys/getWishByVs?${queryParams}`, {
      next: { revalidate: 0 },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res: any) => {
        const versionss = res.data;
        console.log(versionss, "versionss");
        const roleJson = reduceData(versionss, role, "r");
        // const roleJson = { data: [] };
        const weaponJson = reduceData(versionss, weapon, "w");
        fetch("/api/wish").then(async (ress) => {
          const data = await ress.json();
          if (data.success) {
            const resss = data.data;
            const list = [
              ...resss.list,
              ...roleJson.data,
              ...weaponJson.data,
            ].sort(
              (a: any, b: any) =>
                new Date(a.time).getTime() - new Date(b.time).getTime()
            );
            console.log({
              ...resss,
              list,
            });
          }
        });
      });
  };

  return (
    <Suspense
      fallback={
        <Loader warpClass="h-screen bg-black" miao>
          ᓚᘏᗢ猫猫正在努力加载...
        </Loader>
      }
    >
      <div
        style={style}
        className="relative z-[1] flex h-screen w-full items-center justify-center text-white"
      >
        <Button onClick={onClick}>生成</Button>
      </div>
    </Suspense>
  );
}
