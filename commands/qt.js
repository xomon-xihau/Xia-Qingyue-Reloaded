"use strict";
/*
 * This file is a part of xia qingyue reloaed project.
 * Copyright (C) 2021  Xomon Xihau
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { Collection } = require("discord.js");
const random = require("random");

module.exports = {
  name: "qt",
  aliases: ["quote"],
  run: (msg, args, logger) => {
    if (args.length === 0)
      return msg.channel.send("Please provide an argument!! [Ex: !qt yc]");
    const name = new Collection();
    name.set("bb", "Yun_Qianying");
    name.set("cw", "Chi_Wuyao");
    name.set("cy", "Cang_Yue");
    name.set("cyc", "Chu_Yuechan");
    name.set("cz", "Caizhi");
    name.set("fx", "Feng_Xue'er");
    name.set("hc", "Huan_Caiyi");
    name.set("hl", "He_Ling");
    name.set("jas", "Jasmine");
    name.set("jx", "Jun_Xilei");
    name.set("lde", "Huan_Caiyi");
    name.set("mb", "Mu_Bingyun");
    name.set("mf", "Mu_Feixue");
    name.set("mx", "Mu_Xuanyin");
    name.set("qy", "Yun_Qianying");
    name.set("sl", "Su_Ling'er");
    name.set("smy", "Shui_Meiyin");
    name.set("xl", "Xiao_Lingxi");
    name.set("xq", "Xia_Qingyue");
    name.set("yc", "Yun_Che");
    name.set("yqy", "Yun_Qianying");
    name.set("yw", "Yun_Wuxin");

    if (name.has(args[0].toLowerCase())) {
      const url = `https://ni-tian-xie-shen-against-the-gods.fandom.com/wiki/${name.get(
        args[0].toLowerCase()
      )}/Quotes`;

      fetch(url)
        .then((res) => {
          if (res.ok) return res;
          throw new Error();
        })
        .then((res) => res.text())
        .then((html) => {
          const $ = cheerio.load(html);
          const quotes = [];
          $("table")
            .has("i")
            .each((_, elem) => {
              const quote = $(elem).find("i").text().trim();
              const by = $(elem)
                .find("small")
                .text()
                .trim()
                .replace(/\[.*\]/, "");
              const sup = $(elem).find("sup").find("a").attr("href");
              const chap = $(sup).text().trim().replace(/^.*Ch/, "Ch");
              quotes.push({ quote: quote, by: by, chap: chap });
            });
          if (quotes.length === 0) return msg.channel.send("Not Found!!");
          const num = random.int(0, quotes.length - 1);
          const quote = quotes[num].quote;
          const by = quotes[num].by;
          const chap = quotes[num].chap;
          const m = ["```", quote, `${by} (${chap})`, "```"].join("\n");
          return msg.channel.send(m);
        })
        .catch((e) => {
          logger.log("error", e);
          return msg.channel.send("Something Went Wrong!!");
        });
    } else {
      const m = [
        "```",
        "🛠・Not Found!!",
        `👨🏻・${Array.from(name.keys()).join("、")}。`,
        "```",
      ].join("\n");
      return msg.channel.send(m);
    }
  },
};
