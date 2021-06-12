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
  name: "chap",
  aliases: ["chapter"],
  cooldown: 5,
  description: "Get the info of latest chapter from Zongheng",
  usage: "chap",
  run: (msg) => {
    const url = "http://book.zongheng.com/book/408586.html";
    fetch(url)
      .then((res) => {
        if (res.ok) return res;
        throw new Error();
      })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const chap = $(".book-new-chapter a").text().trim();
        let time = $(".time").text().split("· ")[1].trim();
        const words = new Collection();
        words.set("分钟前", "minute(s) ago");
        words.set("小时前", "hour(s) ago");
        words.set("天前", "day(s) ago");
        words.set("周前", "week(s) ago");
        const t = words.get(time.replace(/(\d+)/g, ""));
        if (t) {
          time += ` [TL: ${time.match(/(\d+)/g)[0]} ${t}]`;
        }
        return msg.channel.send(`Chap: ${chap}\nTime: ${time}`);
      })
      .catch(console.error);
  },
};
