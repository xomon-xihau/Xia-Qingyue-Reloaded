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
const { config } = require("dotenv");
const winston = require("winston");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

config({
  path: `${__dirname}/.env`,
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" }),
  ],
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

const xq = new Client({
  disableEveryone: true,
});

xq.commands = new Collection();
xq.aliases = new Collection();
const cooldowns = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  xq.commands.set(command.name, command);
}

xq.login(process.env.TOKEN);
process.on("uncaughtException", (err) => logger.log("error", err));

xq.on("debug", (m) => logger.log("debug", m));
xq.on("warn", (m) => logger.log("warn", m));
xq.on("error", (m) => logger.log("error", m));

xq.once("ready", () => {
  logger.log("info", `${xq.user.username} is now online!`);

  xq.user
    .setActivity("Yun Che from Null Absyss!!", { type: "WATCHING" })
    .then((presence) =>
      logger.log("info", `Activity set to ${presence.activities[0].name}`)
    )
    .catch((err) => logger.log("error", err));
});

xq.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!msg.content.match(/^(!|\-\-|\?)/)) return;

  const message = msg.content.match(
    /^(?<prefix>(!|\-\-|\?))\s*(?<cmd>\w+)(?:\s*(?<args>.+))?$/
  ).groups;

  if (typeof message === "undefined") return;

  const prefix = message.prefix.trim();
  const cmd = message.cmd.trim().toLowerCase();

  let command = xq.commands.get(cmd);
  if (!command) {
    command = xq.commands.get(xq.aliases.get(cmd));
  }

  if (command) {
    logger.log("info", `Prefix: ${prefix}`);
    logger.log("info", `Cmd: ${cmd}`);

    const args =
      typeof message.args !== "undefined"
        ? message.args.trim().split(/ +/g)
        : "";

    logger.log("info", `Args: ${args}`);
    command.run(msg, args, xq);
  }
});
