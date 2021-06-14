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

module.exports = {
  name: "wechat",
  run: (msg, args, logger) => {
    if (args.length === 0)
      return msg.channel.send(
        "Please provide an argument. [Ex: !wechat Nab_R46Lmu72u0-9LyMf3g]"
      );
    const url = `https://mp.weixin.qq.com/s/${args[0]}`;
    fetch(url)
      .then((res) => {
        if (res.ok) return res;
        throw new Error();
      })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const title = $('meta[property="og:title"]').attr("content");
        const author =
          $("a#js_name").text().trim() ||
          $(".account_nickname_inner").text().trim();
        const content = [];
        $("div#js_content")
          .find("p")
          .each((_, elem) => {
            const p = $(elem).text().trim();
            if (p !== "") content.push(p);
          });
        const m = [
          "```",
          `Title・${title}`,
          `Author・${author}`,
          content.join("\n"),
          "```",
        ].join("\n");
        return msg.channel.send(m, { split: true });
      })
      .catch((e) => {
        logger.log("error", e);
        return msg.channel.send("Something Went Wrong!!");
      });
  },
};
