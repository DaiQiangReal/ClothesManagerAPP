/*
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-27 17:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/runAndroid.js
 */
let  exec = require('child_process').execSync; 
let fs=require('fs')

runCmd('yarn build')
fs.exists('./www',(exist)=>{
    if(exist){
        runCmd('rm -r ./www/*')
    }else{
        runCmd('mkdir www')
    }
})
setTimeout(()=>{
    runCmd('cp -r ./dist/* www');
    runCmd('npx cap copy')
    runCmd('npx cap open android')
},500)


function runCmd(cmd){
    exec(cmd,(err,stdOut,stdErr)=>{
        console.log(stdOut,err,stdErr);
    })
}
