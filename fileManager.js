import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process";
import chalk from "chalk";
import {createFolder, createFile} from "./testFile.js";

//3.creating interface for input output uisng(readline)
const rl = readline.createInterface({input: stdin, output: stdout});

async function menu() {
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
      createFile(filePath, intialContent);

      console.log(chalk.cyan("File Created ✅"));
      break;
  }
}
menu();
