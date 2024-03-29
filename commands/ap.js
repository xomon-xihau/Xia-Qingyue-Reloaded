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
const pics = require("../util/pics.js");
const random = require("random");
module.exports = {
  name: "ap",
  aliases: ["atgp"],
  run: (msg, args) => {
    if (args.length === 0) {
      return msg.channel.send(
        "Plz provide an argument!! [Ex: !ap yc] or [Ex: !ap yc 2]"
      );
    }
    const p = pics.get(args[0].toLowerCase());
    if (p) {
      let num = 0;
      const len = p["p"].length;
      if (args.length > 1 && !isNaN(args[1]) && args[1] > 0) {
        if (args[1] > len) {
          const rem = args[1] % len;
          num = rem === 0 ? len - 1 : rem - 1;
        } else {
          num = args[1] - 1;
        }
      } else {
        num = random.int(0, len - 1);
      }
      const file = p["p"][num];
      const type = file.split("/")[1];
      const ftn = type === "o" ? "wechat" : "manhua";

      let line = `[There are ${len} pics of ${p["n"]} in db]`;
      if (len === 1) line = `[There is only 1 pic of ${p["n"]} in db]`;

      return msg.channel.send(
        [`[Pic No. ${num + 1}] [${ftn}]`, line].join("\n"),
        {
          files: [file],
        }
      );
    } else {
      const m = [
        "```",
        "🛠・Not Found!!",
        `🖼・${Array.from(pics.keys()).join("、")}。`,
        "```",
      ].join("\n");
      return msg.channel.send(m);
    }
  },
};
