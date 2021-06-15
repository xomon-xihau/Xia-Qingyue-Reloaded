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
/**
 * -- Importing --
 * dotenv     -> for .env files
 * winston    -> logger
 * discord.js -> discord api wrapper
 * fs         -> to import all commands files (commands/*.js)
 */
const { config } = require("dotenv");
const winston = require("winston");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

/**
 * -- ENV --
 * TOKEN -> disord token
 */
config({
  path: `${__dirname}/.env`,
});

/**
 * -- Logger --
 * Initializes logger
 * Will display log on screen and also store it in log file
 * Example:
 * [INFO] - Xia Qingyue in now Online.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" }),
  ],
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

/**
 * -- Client --
 * xq is the discord client
 * the disableEveryone prevents the client to ping @everyone
 */
const xq = new Client({
  disableEveryone: true,
});

/**
 * -- Collection --
 * commands, aliases, cooldown
 */
xq.commands = new Collection();
xq.aliases = new Collection();
xq.cooldowns = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  xq.commands.set(command.name, command);
}

/**
 * -- Login --
 */
xq.login(process.env.TOKEN);

/**
 * -- Error Handling --
 */
process.on("uncaughtException", (err) => logger.log("error", err));

xq.on("debug", (m) => logger.log("debug", m));
xq.on("warn", (m) => logger.log("warn", m));
xq.on("error", (m) => logger.log("error", m));

/**
 * -- Ready Event --
 * [INFO] - Xia Qingyue is now online!
 * Activity -> Watching Yun Che from Null Absyss!!
 */
xq.once("ready", () => {
  logger.log("info", `${xq.user.username} is now online!`);

  xq.user
    .setActivity("Yun Che from Null Absyss!!", { type: "WATCHING" })
    .then((presence) =>
      logger.log("info", `Activity set to ${presence.activities[0].name}`)
    )
    .catch((err) => logger.log("error", err));
});

/**
 * -- Message Event --
 * */
xq.on("message", (msg) => {
  /**
   * -- Early Return (I) --
   * If the author is bot.
   * If message was not sent in server
   * If message was not in acg server's marshole.
   */
  if (msg.author.bot) return;
  if (!msg.guild) return;
  /*
  if (
    msg.guild.id === "442546874793328640" &&
    msg.channel.id !== "566710843232878610"
  )
    return;
  */
  /**
   * -- Parsing --
   * parse message to get prefix, cmd and args
   * return early if message isn't in particular format
   */
  if (!msg.content.match(/^(!|\-\-|\?)/)) return;

  const message = msg.content.match(
    /^(?<prefix>(!|\-\-|\?))(?:\s*(?<cmd>\w+))?(?:\s*(?<args>.+))?$/
  ).groups;

  const prefix = message.prefix.trim();

  if (typeof message.cmd === "undefined") return;

  const cmd = message.cmd.trim().toLowerCase();
  const command =
    xq.commands.get(cmd) ||
    xq.commands.find((c) => c.aliases && c.aliases.includes(cmd));

  /**
   * -- command --
   */
  if (command) {
    /**
     * -- Cooldown --
     */
    const { cooldowns } = xq;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 6) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const m = [
          "```",
          "🏵・cooldown",
          `🛠・${command.name}`,
          `⏳・${timeLeft.toFixed(0)} second(s) left`,
          `👨🏻・${msg.author.tag}`,
          "```",
        ].join("\n");
        return msg.channel.send(m);
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    /**
     * -- Execution --
     */
    logger.log("info", `Prefix: ${prefix}`);
    logger.log("info", `Cmd: ${cmd}`);

    const args =
      typeof message.args !== "undefined"
        ? message.args.trim().split(/ +/g)
        : "";

    logger.log("info", `Args: ${args}`);
    try {
      command.run(msg, args, logger, xq);
    } catch (e) {
      logger.log("error", e);
      return msg.channel.send("Something Went Wrong!!");
    }
  }
});
