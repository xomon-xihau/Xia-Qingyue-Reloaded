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
const pics = require("../util/emote.js");
module.exports = {
  name: "em",
  aliases: ["emote"],
  run: (msg, args) => {
    if (args.length === 0) {
      return msg.channel.send("Plz provide an argument!! [Ex: !em xqbestgirl]");
    }
    const p = pics.get(args[0]);
    if (p) {
      return msg.channel.send({ files: [p] });
    }
    return msg.channel.send("Not Found!!");
  },
};
