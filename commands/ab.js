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
  name: "ab",
  aliases: ["abbreviation"],
  run: (msg, args, logger) => {
    if (args.length === 0)
      return msg.channel.send("Please provide an argument!! [Ex: !ab yc]");
    const url =
      "https://ni-tian-xie-shen-against-the-gods.fandom.com/wiki/Against_the_Gods_Wiki:Data";
    fetch(url)
      .then((res) => {
        if (res.ok) return res;
        throw new Error();
      })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const ab = new Collection();
        $("tr").each((_, x) => {
          const a = $(x).find("td").first().text().trim();
          const b = $(x).find("td").find("a").text().trim();
          if (a !== "" && b !== "") {
            ab.set(a, b);
          }
        });
        ab.delete("Quotes");
        ab.delete("Songs");
        const p = args[0].toUpperCase();
        const ans = ab.get(p);
        if (ans) {
          const m = ["```", `${p}・${ans}`, "```"].join("\n");
          return msg.channel.send(m);
        }
        return msg.channel.send("Not Found!!");
      })
      .catch((e) => {
        logger.log("error", e);
        return msg.channel.send("Something Went Wrong!!");
      });
  },
};
