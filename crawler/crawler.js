const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const mysql = require("mysql");
// const connStr = require("./../tools/connectionString.js");

// var conn = mysql.createConnection(connStr.con);

// conn.connect(function(error){
//  if(error) throw error;
//  console.log("DB connected");
// });

const connectingString = {
  host: "140.136.149.224",
  port: 3306,
  user: "admin",
  password: "draw0931",
  database: "DrawAndGuess"
};



// const phrase = function () {
//   request({
//     url: "https://github.com/wainshine/Chinese-Names-Corpus/blob/master/Chinese_Dict_Corpus/ChengYu_Corpus%EF%BC%885W%EF%BC%89.txt#L14", // Spolify
//     method: "GET"
//   }, function (error, response, body) {
//     if (error || !body) {
//       return;
//     }
//     const $ = cheerio.load(body); // 載入 body
//     const result = []; // 建立一個儲存結果的容器
//     //const table1 = $("blob-num js-line-number"); 
//     const table2 = $("td.blob-code-inner");

//     for (let i = 3; i < table2.length; i++) { 
//         //const song_name = table1.eq(i).text();
//         const singer = table2.eq(i).text();
//         const phrases = singer.replace("\n", "");
//       // 建立物件並(push)存入結果
//       result.push(Object.assign({ phrases }));
//     }
//     // 在終端機(console)列出結果
//     console.log(result);
//     //寫入 result.json 檔案
//     //fs.writeFileSync("result.json", JSON.stringify(result));
//   });
// };

// phrase();

const noun1 = function () {
  var conn = mysql.createConnection(connectingString);
    conn.connect(function(error){
      if(error) throw error;
      console.log("Coneected");
    });
  request({
    url: "https://cidian.911cha.com/cixing_dongci.html",
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
    const result = []; // 建立一個儲存結果的容器
    
    const table2 = $("div.mcon.f14 ul li a");

    

    for (let i = 0; i < table2.length; i=i+2) { 
        //const song_name = table1.eq(i).text();
        const phrases = table2.eq(i).text();

      // 建立物件並(push)存入結果
      str = "Insert into `phrase`(name) Values(\""+phrases+"\")";
      console.log(str);
      conn.query(str, function(error, result, feilds){
        if(error) throw error;
      });

      //result.push(Object.assign({ phrases }));
    }
    // 在終端機(console)列出結果
    //console.log(result);
    //寫入 result.json 檔案
    //fs.writeFileSync("result.json", JSON.stringify(result));
  });

  // conn.end(function(error){
  //   if(error) throw error;
  // });
};

noun1();

// const noun2 = function () {
//   request({
//     url: "https://cidian.911cha.com/cixing_dongci_p2.html",
//     method: "GET"
//   }, function (error, response, body) {
//     if (error || !body) {
//       return;
//     }
//     const $ = cheerio.load(body); // 載入 body
//     const result = []; // 建立一個儲存結果的容器
    
//     const table2 = $("div.mcon.f14 ul li a");

//     for (let i = 0; i < table2.length; i=i+2) { 
//         //const song_name = table1.eq(i).text();
//         const phrases = table2.eq(i).text();

//       // 建立物件並(push)存入結果
//       result.push(Object.assign({ phrases }));
//     }
//     // 在終端機(console)列出結果
//     console.log(result);
//     //寫入 result.json 檔案
//     //fs.writeFileSync("result.json", JSON.stringify(result));
//   });
// };

// noun2();

// const noun3 = function () {
//   request({
//     url: "https://cidian.911cha.com/cixing_dongci_p3.html",
//     method: "GET"
//   }, function (error, response, body) {
//     if (error || !body) {
//       return;
//     }
//     const $ = cheerio.load(body); // 載入 body
//     const result = []; // 建立一個儲存結果的容器
    
//     const table2 = $("div.mcon.f14 ul li a");

//     for (let i = 0; i < table2.length; i=i+2) { 
//         //const song_name = table1.eq(i).text();
//         const phrases = table2.eq(i).text();

//       // 建立物件並(push)存入結果
//       result.push(Object.assign({ phrases }));
//     }
//     // 在終端機(console)列出結果
//     console.log(result);
//     //寫入 result.json 檔案
//     //fs.writeFileSync("result.json", JSON.stringify(result));
//   });
// };

// noun3();