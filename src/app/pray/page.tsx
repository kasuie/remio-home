/*
 * @Author: kasuie
 * @Date: 2024-06-16 14:25:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-17 13:18:21
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

  const itemIds: any = {
    "(test)穿模测试": 10008,
    无锋剑: 11101,
    银剑: 11201,
    冷刃: 11301,
    黎明神剑: 11302,
    旅行剑: 11303,
    暗铁剑: 11304,
    吃虎鱼刀: 11305,
    飞天御剑: 11306,
    西风剑: 11401,
    笛剑: 11402,
    祭礼剑: 11403,
    宗室长剑: 11404,
    匣里龙吟: 11405,
    试作斩岩: 11406,
    铁蜂刺: 11407,
    黑岩长剑: 11408,
    黑剑: 11409,
    暗巷闪光: 11410,
    降临之剑: 11412,
    腐殖之剑: 11413,
    天目影打刀: 11414,
    辰砂之纺锤: 11415,
    笼钓瓶一心: 11416,
    原木刀: 11417,
    西福斯的月光: 11418,
    "「一心传」名刀": 11421,
    东花坊时雨: 11422,
    狼牙: 11424,
    海渊终曲: 11425,
    灰河渡手: 11426,
    船坞长剑: 11427,
    水仙十字之剑: 11429,
    风鹰剑: 11501,
    天空之刃: 11502,
    苍古自由之誓: 11503,
    斫峰之刃: 11504,
    磐岩结绿: 11505,
    雾切之回光: 11509,
    波乱月白经津: 11510,
    圣显之钥: 11511,
    裁叶萃光: 11512,
    静水流涌之辉: 11513,
    有乐御簾切: 11514,
    赦罪: 11515,
    训练大剑: 12101,
    佣兵重剑: 12201,
    铁影阔剑: 12301,
    沐浴龙血的剑: 12302,
    白铁大剑: 12303,
    石英大剑: 12304,
    以理服人: 12305,
    飞天大御剑: 12306,
    西风大剑: 12401,
    钟剑: 12402,
    祭礼大剑: 12403,
    宗室大剑: 12404,
    雨裁: 12405,
    试作古华: 12406,
    白影剑: 12407,
    黑岩斩刀: 12408,
    螭骨剑: 12409,
    千岩古剑: 12410,
    雪葬的星银: 12411,
    衔珠海皇: 12412,
    桂木斩长正: 12414,
    玛海菈的水色: 12415,
    恶王丸: 12416,
    森林王器: 12417,
    饰铁之花: 12418,
    聊聊棒: 12424,
    浪影阔剑: 12425,
    "「究极霸王超级魔剑」": 12426,
    便携动力锯: 12427,
    天空之傲: 12501,
    狼的末路: 12502,
    松籁响起之时: 12503,
    无工之剑: 12504,
    赤角石溃杵: 12510,
    苇海信标: 12511,
    裁断: 12512,
    新手长枪: 13101,
    铁尖枪: 13201,
    白缨枪: 13301,
    钺矛: 13302,
    黑缨枪: 13303,
    "「旗杆」": 13304,
    匣里灭辰: 13401,
    试作星镰: 13402,
    流月针: 13403,
    黑岩刺枪: 13404,
    决斗之枪: 13405,
    千岩长枪: 13406,
    西风长枪: 13407,
    宗室猎枪: 13408,
    龙脊长枪: 13409,
    喜多院十文字: 13414,
    "「渔获」": 13415,
    断浪长鳍: 13416,
    贯月矢: 13417,
    风信之锋: 13419,
    峡湾长歌: 13424,
    公义的酬报: 13425,
    沙中伟贤的对答: 13426,
    勘探钻机: 13427,
    护摩之杖: 13501,
    天空之脊: 13502,
    贯虹之槊: 13504,
    和璞鸢: 13505,
    息灾: 13507,
    薙草之稻光: 13509,
    赤沙之杖: 13511,
    赤月之形: 13512,
    学徒笔记: 14101,
    口袋魔导书: 14201,
    魔导绪论: 14301,
    讨龙英杰谭: 14302,
    异世界行记: 14303,
    翡玉法球: 14304,
    甲级宝珏: 14305,
    琥珀玥: 14306,
    西风秘典: 14401,
    流浪乐章: 14402,
    祭礼残章: 14403,
    宗室秘法录: 14404,
    匣里日月: 14405,
    试作金珀: 14406,
    万国诸海图谱: 14407,
    黑岩绯玉: 14408,
    昭心: 14409,
    暗巷的酒与诗: 14410,
    忍冬之果: 14412,
    嘟嘟可故事集: 14413,
    白辰之环: 14414,
    证誓之明瞳: 14415,
    流浪的晚星: 14416,
    盈满之实: 14417,
    遗祀玉珑: 14424,
    纯水流华: 14425,
    无垠蔚蓝之歌: 14426,
    天空之卷: 14501,
    四风原典: 14502,
    尘世之锁: 14504,
    碧落之珑: 14505,
    不灭月华: 14506,
    神乐之真意: 14509,
    千夜浮梦: 14511,
    图莱杜拉的回忆: 14512,
    金流监督: 14513,
    万世流涌大典: 14514,
    鹤鸣余音: 14515,
    猎弓: 15101,
    历练的猎弓: 15201,
    鸦羽弓: 15301,
    神射手之誓: 15302,
    反曲弓: 15303,
    弹弓: 15304,
    信使: 15305,
    黑檀弓: 15306,
    西风猎弓: 15401,
    绝弦: 15402,
    祭礼弓: 15403,
    宗室长弓: 15404,
    弓藏: 15405,
    试作澹月: 15406,
    钢轮弓: 15407,
    黑岩战弓: 15408,
    苍翠猎弓: 15409,
    暗巷猎手: 15410,
    落霞: 15411,
    幽夜华尔兹: 15412,
    风花之颂: 15413,
    破魔之弓: 15414,
    掠食者: 15415,
    曚云之月: 15416,
    王下近侍: 15417,
    竭泽: 15418,
    鹮穿之喙: 15419,
    烈阳之嗣: 15424,
    静谧之曲: 15425,
    筑云: 15426,
    测距规: 15427,
    天空之翼: 15501,
    阿莫斯之弓: 15502,
    终末嗟叹之诗: 15503,
    冬极白星: 15507,
    若水: 15508,
    飞雷之弦振: 15509,
    猎人之径: 15511,
    最初的大魔术: 15512,
    白雨心弦: 15513,
    "(test)竿测试": 20001,
    神里绫华: 10000002,
    琴: 10000003,
    旅行者: 10000007,
    丽莎: 10000006,
    芭芭拉: 10000014,
    凯亚: 10000015,
    迪卢克: 10000016,
    雷泽: 10000020,
    安柏: 10000021,
    温迪: 10000022,
    香菱: 10000023,
    北斗: 10000024,
    行秋: 10000025,
    魈: 10000026,
    凝光: 10000027,
    可莉: 10000029,
    钟离: 10000030,
    菲谢尔: 10000031,
    班尼特: 10000032,
    达达利亚: 10000033,
    诺艾尔: 10000034,
    七七: 10000035,
    重云: 10000036,
    甘雨: 10000037,
    阿贝多: 10000038,
    迪奥娜: 10000039,
    莫娜: 10000041,
    刻晴: 10000042,
    砂糖: 10000043,
    辛焱: 10000044,
    罗莎莉亚: 10000045,
    胡桃: 10000046,
    枫原万叶: 10000047,
    烟绯: 10000048,
    宵宫: 10000049,
    托马: 10000050,
    优菈: 10000051,
    雷电将军: 10000052,
    早柚: 10000053,
    珊瑚宫心海: 10000054,
    五郎: 10000055,
    九条裟罗: 10000056,
    荒泷一斗: 10000057,
    八重神子: 10000058,
    鹿野院平藏: 10000059,
    夜兰: 10000060,
    绮良良: 10000061,
    埃洛伊: 10000062,
    申鹤: 10000063,
    云堇: 10000064,
    久岐忍: 10000065,
    神里绫人: 10000066,
    柯莱: 10000067,
    多莉: 10000068,
    提纳里: 10000069,
    妮露: 10000070,
    赛诺: 10000071,
    坎蒂丝: 10000072,
    纳西妲: 10000073,
    莱依拉: 10000074,
    流浪者: 10000075,
    珐露珊: 10000076,
    瑶瑶: 10000077,
    艾尔海森: 10000078,
    迪希雅: 10000079,
    米卡: 10000080,
    卡维: 10000081,
    白术: 10000082,
    琳妮特: 10000083,
    林尼: 10000084,
    菲米尼: 10000085,
    莱欧斯利: 10000086,
    那维莱特: 10000087,
    夏洛蒂: 10000088,
    芙宁娜: 10000089,
    夏沃蕾: 10000090,
    娜维娅: 10000091,
    嘉明: 10000092,
    闲云: 10000093,
    千织: 10000094,
    希格雯: 10000095,
    阿蕾奇诺: 10000096,
    赛索斯: 10000097,
    克洛琳德: 10000098,
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

  const nameMaps: any = {
    w: "weapon",
    r: "role",
    c: "common",
  };

  const allfours: any = {
    role: 222,
    weapon: 121,
    common: 60,
  };

  const fours: any = {
    role: 60,
    weapon: 39,
    common: 11,
  };

  let countFour = 0,
    allCountFour = 0;

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
    { name: "阿莫斯之弓", count: 81, ver: "3.2", stage: 1 },
    { name: "琴", count: 78, ver: "3.3", stage: 1 },
    { name: "天空之卷", count: 23, ver: "3.4", stage: 1 },
    { name: "琴", count: 23, ver: "3.5", stage: 1 },
    { name: "迪卢克", count: 44, ver: "3.5", stage: 1 },
    { name: "阿莫斯之弓", count: 81, ver: "3.7", stage: 1 },
    { name: "迪卢克", count: 77, ver: "3.7", stage: 1 },
    { name: "四风原典", count: 79, ver: "3.8", stage: 1 },
    { name: "琴", count: 4, ver: "3.8", stage: 1 },
    { name: "刻晴", count: 10, four: 7, ver: "3.8", stage: 1 },
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
    let item_type = "";
    if (item?.star === 3) {
      item_type = "武器";
    } else if (type != "r" && item?.cardCover?.includes("EquipIcon")) {
      item_type = "武器";
    } else {
      item_type = "角色";
    }
    const item_id = itemIds[item?.role];
    return {
      uigf_gacha_type: maps[type],
      gacha_type: maps[type],
      item_id: `${item_id}`,
      count: "1",
      time: dateFormat(time, "YYYY-MM-DD HH:mm:ss"),
      name: item?.role,
      item_type: item_type,
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
    // console.log(version, name);
    let result: any = [],
      ups = version["objects"];
    let startTime = new Date(version["startTime"]);
    // console.log(startTime, name, prevCount, version, wishes);
    // startTime.setHours(startTime.getHours() + 24 + (prevCount ? 24 : 0));
    startTime.setMinutes(startTime.getMinutes() + 5 + prevCount * 5);
    const fourUps = ups.filter((v: any) => v.star === 4);
    const fiveUps = ups.filter((v: any) => v.star === 5);
    let fiveSatrs = [...versions["roleStar5"], ...versions["weaponStar5"]];
    if (type != "c") {
      fiveSatrs = fiveSatrs.concat(fiveUps);
    }
    const fourSatrs = [...versions["roleStar4"], ...versions["weaponStar4"]];
    const commons = versions["weaponStar3"];
    let _nofour = nofour;
    while (count > 0) {
      const random = Math.random();
      startTime.setMinutes(startTime.getMinutes() + 5);
      if (count == 1) {
        if (!end) {
          // console.log(name, fiveSatrs, version, versions);
          ++_nofour;
          const role = fiveSatrs.find((v: any) => v.role === name);
          result.push(format(role, startTime, type));
        } else {
          console.log("allCountFour>>>>", allCountFour);
          ++_nofour;
          const index = Math.floor(Math.random() * commons.length);
          result.push(format(commons[index], startTime, type));
        }
      } else {
        if (_nofour >= 9) {
          _nofour = 0;
          if (type == "c" || random > 0.6) {
            const index = Math.floor(Math.random() * fourSatrs.length);
            result.push(format(fourSatrs[index], startTime, type));
          } else {
            const index = Math.floor(Math.random() * fourUps.length);
            result.push(format(fourUps[index], startTime, type));
          }
        } else {
          if (random < 0.1 && allCountFour < fours[nameMaps[type]]) {
            ++_nofour;
            ++allCountFour;
            if (type == "c" || random > 0.6) {
              const index = Math.floor(Math.random() * fourSatrs.length);
              result.push(format(fourSatrs[index], startTime, type));
            } else {
              const index = Math.floor(Math.random() * fourUps.length);
              result.push(format(fourUps[index], startTime, type));
            }
          } else {
            ++_nofour;
            const index = Math.floor(Math.random() * commons.length);
            result.push(format(commons[index], startTime, type));
          }
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
        allCountFour = 0;
        countFour = 0;
        const roleJson = reduceData(versionss, role, "r");
        console.log(
          roleJson.data.filter((v: any) => v.rank_type == "4").length
        );
        allCountFour = 0;
        countFour = 0;
        // const roleJson = { data: [] };
        const weaponJson = reduceData(versionss, weapon, "w");
        console.log(
          weaponJson.data.filter((v: any) => v.rank_type == "4").length
        );
        allCountFour = 0;
        countFour = 0;
        const commonJson = reduceData(versionss, common, "c");
        console.log(
          commonJson.data.filter((v: any) => v.rank_type == "4").length
        );
        fetch("/api/wish").then(async (ress) => {
          const data = await ress.json();
          if (data.success) {
            const resss = data.data;
            const list = [
              ...resss.list,
              ...roleJson.data,
              ...weaponJson.data,
              ...commonJson.data,
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
