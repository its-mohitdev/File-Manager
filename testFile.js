import {log} from "node:console";
import {Stats} from "node:fs";
import * as fs from "node:fs/promises";
// import * as fs from 'node:fs';

const name = process.argv;
const date = new Date().getHours();
// console.log(name);
// coole.log(date);

//creating file using write api
// function createFile(pathname){
//     //sync
//     // fs.writeFileSync(pathname,"hello node js!\n")
//     // fs.appendFileSync(pathname,"hello js!")

//     //async
//     //error first callback
//     fs.writeFile(pathname ,"helloooo\n" , (err)=>{
//         if(err){
//             console.log("Something went wrong while creating file");
//             return;
//         }
//        console.log("Task compelete");
//     })

//     fs.appendFile(pathname,"append",(err)=>{
//           if(err){
//             console.log("Something went wrong while creating file");
//             return;
//         }
//     })
//     console.log("File has been created");
// }

//using Asyn/await - avoids callback hell
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

//create file
export async function createFile(fileName,content = ''){
  await fs.writeFile(fileName, content)
}

//create folder
export async function createFolder(folderName) {
  await fs.mkdir(folderName, {recursive: true});
}
// createFolder();

//delete cmd
async function deleteFolder(pathname) {
  try {
    await fs.rm(pathname);
  } catch (error) {
    console.log(error);
  }
}

// deleteFolder("./nodejs/hello.txt")

//stat  cmd -- to get the file data
// async function getFileInfo(filePath) {
//    const stats = await fs.stat(filePath)

//    return {
//     size : `${(stats.size/1024).toFixed(2)} KB`,
//     created : stats.birthtime.toLocaleString(),
//     modified: stats.mtime.toLocaleString()
//    }
// }
//  getFileInfo("./hello.txt").then(data =>{
//     console.log(data);
// })
