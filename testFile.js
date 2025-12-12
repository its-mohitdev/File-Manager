import {log} from "node:console";
import {Stats} from "node:fs";
import * as fs from "node:fs/promises";
import path from "node:path";
// import * as fs from 'node:fs';

const name = process.argv;
// console.log(name);

export async function deleteFile(filePath) {
  await fs.unlink(filePath);
}

export async function listItems(itemPath) {
  const items = await fs.readdir(itemPath, {withFileTypes: true});
  return items.map((item) => {
    return {
      name: item.name,
      type: item.isDirectory() ? "folder" : "file",
      path : path.join(import.meta.dirname , item.name)
    };
  });
}
listItems("./");

export async function createFile(fileName, content = "") {
  await fs.writeFile(fileName, content);
}

export async function createFolder(folderName) {
  await fs.mkdir(folderName, {recursive: true});
}
// createFolder();

export async function deleteFolder(pathname) {
  try {
    await fs.rm(pathname, {recursive: true, force: true});
  } catch (error) {
    console.log(error);
  }
}
// deleteFolder("./nodejs/hello.txt")

export async function writeToFile(filePath, content = " ") {
  await fs.appendFile(filePath, content);
}

//stat  cmd -- to get the file data
async function getFileInfo(filePath) {
  const stats = await fs.stat(filePath);

  return {
    size: `${(stats.size / 1024).toFixed(2)} KB`,
    created: stats.birthtime.toLocaleString(),
    modified: stats.mtime.toLocaleString(),
  };
}

//  getFileInfo("./hello.txt").then(data =>{
//     console.log(data);
// })

// using Asyn/await - avoids callback hell
// async function createFile(pathname) {
//   try {
//     await fs.writeFile(pathname, "Hello nodejs\n");
//     await fs.appendFile(pathname, "Txt...");
//   } catch (error) {
//     console.log(error, "Error");
//   }

//Better approch to write code in the production
//It waits until the line 11 executes completly (but remember its all happening asynchronsouly)
// Handle error using try catch.
// Confusion -- You think that code is running sycnc as it runs line by line but its not blocking main thread it suspends(executes) each line
// }

// createFile("./hello.txt")

// function createFile(pathname) {
//   //sync
//   fs.writeFileSync(pathname,"hello node js!\n")
//   fs.appendFileSync(pathname,"hello js!")

//   //async
//   //error first callback
//   fs.writeFile(pathname, "helloooo\n", (err) => {
//     if (err) {
//       console.log("Something went wrong while creating file");
//       return;
//     }
//     console.log("Task compelete");
//   });

//   fs.appendFile(pathname, "append", (err) => {
//     if (err) {
//       console.log("Something went wrong while creating file");
//       return;
//     }
//   });
//   console.log("File has been created");
// }
