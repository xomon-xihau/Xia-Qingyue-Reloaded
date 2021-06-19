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
const Epub = require("epub-gen");

module.exports = {
  name: "wnmtl",
  run: (msg, args, logger) => {
    if (args.length === 0)
      return msg.channel.send(
        "Please provide an argument. [Ex: !wnmtl 645235-fairness]"
      );
    const url = `https://www.wnmtl.org/novel/against-the-gods/${args[0]}`;
    fetch(url)
      .then((res) => {
        if (res.ok) return res;
        console.log(res.status);
        console.log(res.statusText);
        throw new Error();
      })
      .then((res) => res.text())
      .then((html) => {
        const $ = cheerio.load(html);
        const og_title = $('meta[property="og:title"]')
          .attr("content")
          .replace("Against the Gods - ", "")
          .replace(" - WNMTL", "");
        const content = [];
        $("div.text-left")
          .find("p")
          .each((_, elem) => {
            const p = $(elem).text().trim();
            if (p !== "") content.push(`<p>${p}</p>`);
          });
        if (content.length === 0) return msg.channel.send("No content found!!");
        const option = {
          cover: "atg-cover.jpg",
          title: og_title,
          author: "Mars Gravity (火星引力)",
          publisher: "wnmtl",
          lang: "en",
          content: [{ title: og_title, data: content.join("\n") }],
        };
        new Epub(option, `${og_title}.epub`).promise.then(
          () => msg.channel.send({ files: [`${og_title}.epub`] }),
          (err) => {
            logger.log("error", err);
            return msg.channel.send("Epub Generation Failed!!");
          }
        );
      })
      .catch((e) => {
        logger.log("error", e);
        return msg.channel.send("Something Went Wrong!!");
      });
  },
};
