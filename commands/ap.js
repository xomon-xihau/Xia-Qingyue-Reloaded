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
    const p = pics.get(args[0]);
    if (p) {
      let num = 0;
      if (
        p.length > 1 &&
        !isNaN(args[1]) &&
        args[1] < p.length &&
        args[1] > 0
      ) {
        num = args[1];
      } else {
        num = random.int(0, p.length - 1);
      }
      return msg.channel.send({ files: [p[num]] });
    } else {
      return msg.channel.send("Not Found!!");
    }
  },
};