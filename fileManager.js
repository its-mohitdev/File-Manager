#!/usr/bin/env node

import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process";
import chalk from "chalk";
import {
  createFolder,
  createFile,
  writeToFile,
  deleteFolder,
  deleteFile,
  listItems,
} from "./testFile.js";

//3.creating interface for input output uisng(readline)
const rl = readline.createInterface({input: stdin, output: stdout});

async function menu() {
  console.clear();
  console.log(chalk.blue.bold("🗃️  File System Manager"));

  //1. having an array of list
  const options = [
    "Create Folder",
    "Create File",
    "Write To File",
    "Delete Folder",
    "Delete File",
    "List Items",
    "Exit",
  ];

  //2. iterating throug each value
  options.forEach((opt, i) =>
    console.log(`${chalk.yellow(i + 1)} ${chalk.green(opt)}`)
  );

  //4.asking the question from the user and waits using promises
  const answer = await rl.question(chalk.cyan("\nSelect Option : "));

  //5. excute diff cmd for diff inputs
  switch (answer) {
    case "1":
      const folderPath = await rl.question(chalk.cyan("\nFolder Name : "));
      await createFolder(folderPath);

      console.log(chalk.cyan("Folder Created ✅"));
      break;

    case "2":
      const filePath = await rl.question(chalk.cyan("\nFile Path : "));
      const intialContent = await rl.question(chalk.cyan("\nInital Content: "));
      await createFile(filePath, intialContent);

      console.log(chalk.cyan("File Created ✅"));
      break;

    case "3":
      const appendFilePath = await rl.question(
        chalk.cyan("\nWhere to write : ")
      );
      const fileContent = await rl.question(chalk.cyan("\nContent : "));
      await writeToFile(appendFilePath, fileContent);

      console.log("Content Added successfully✅");
      break;

    case "4":
      const deleteFolderPath = await rl.question(
        chalk.cyan("\nFolder to delete : ")
      );
      await deleteFolder(deleteFolderPath);

      console.log("Directory Deleted successfully 🚮");
      break;

    case "5":
      const deleteFilePath = await rl.question(
        chalk.cyan("\nFile to delete : ")
      );
      await deleteFile(deleteFilePath);

      console.log("File Deleted successfully 🚮");
      break;

    case "6":
      const itemPath = await rl.question(chalk.cyan("\nWhich Folder Files : "));
      const items = await listItems(itemPath);

      console.log(chalk.cyan("\nContent"));

      items.forEach((item) => {
        const icon = item.type === "folder" ? "📂" : "🗄️";
        console.log(`${icon} ${chalk.yellow(item.name)} \n${item.path}`);
      });
      break;

    case "7":
      rl.close();
      return;
  }

  await rl.question(chalk.cyan("\nPress ENTER to continue : "));
  menu(); //recursion : call the same functioninto the function
}

menu();
