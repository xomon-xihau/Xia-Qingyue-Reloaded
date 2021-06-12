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

module.exports = {
  name: "lnmtl",
  cooldown: 5,
  description: "Get the link of latest chapter from LNMTL",
  usage: "lnmtl",
  run: (msg) => {
    const url = "https://lnmtl.com/novel/against-the-gods";
    fetch(url)
      .then((res) => {
        if (res.ok) return res;
        throw new Error();
      })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const chap = $("a.chapter-link").attr("href");
        return msg.channel.send(chap);
      })
      .catch(console.error);
  },
};
