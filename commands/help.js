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

module.exports = {
  name: "help",
  run: (msg) => {
    const m = [
      "```",
      "[ab]",
      "Get the full form",
      "Alias: abbreviation",
      "Example: !ab yc",
      "",
      "[ap]",
      "Get the atg character pic",
      "Alias: atgp",
      "Example: !ap yc or !ap yc 2",
      "",
      "[chap]",
      "Get the info of latest chap number",
      "Example: !chap",
      "",
      "[em]",
      "Example: !em xqbestgirl",
      "",
      "[insult]",
      "Insult someone in xq style",
      "Example: !insult yun che or !insult @someone",
      "",
      "[lnmtl]",
      "Get the lastes chap link",
      "Example: !lnmtl",
      "",
      "[qt]",
      "Get the quote of atg character",
      "Alias: quote",
      "Example: !qt xq",
      "",
      "[time]",
      "Get china time",
      "Alias: mtime",
      "Example: !time",
      "",
      "[wechat]",
      "Get the text of wechat",
      "Example: !wechat Nab_R46Lmu72u0-9LyMf3g",
      "",
      "[yn]",
      "Example: !yn Some random question?",
      "```",
    ].join("\n");
    return msg.channel.send(m, { split: true });
  },
};
