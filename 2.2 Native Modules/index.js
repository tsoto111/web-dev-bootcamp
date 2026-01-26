import { error } from "console";
import fs from "fs";

// ===========================================
// How to write to a file
// ===========================================
// fs.writeFile("message_tavo.txt", "Hello from node js.", (err) => {
//     if (err) throw err
//     console.log("The file has been saved!")
// })

// ===========================================
// How to read from a file
// ===========================================
fs.readFile("message_tavo.txt", 'utf8', (err, data) => {
    if (err) throw error
    console.log(data);
})