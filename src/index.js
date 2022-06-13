#!/usr/bin/env node
"use strict";
const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;
const configFiles = {};
const configFolderPath = path.resolve(__dirname, "config");
(async () => {
  const files = await readdir(configFolderPath).catch(console.log);
  for (let i of files) {
    const gitignoreFileName = i.split(".")[0];
    configFiles[gitignoreFileName] = await readFile(
      path.resolve(configFolderPath, i)
    ).catch(console.log);
  }
  const { language } = await inquirer.prompt([
    {
      type: "list",
      message: "Which Language do you want to generate the .gitignore for?",
      name: "language",
      choices: Object.keys(configFiles),
    },
  ]);
  let config = await readFile(
    path.resolve(configFolderPath, `${language}.gitignore`)
  ).catch(console.log);
  const folderPath = path.join(process.cwd(), ".gitignore");
  await writeFile(folderPath, configFiles[language]).catch(console.log);
})();
