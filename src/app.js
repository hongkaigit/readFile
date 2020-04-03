const http=require("http");
const chalk=require("chalk");
const path=require("path");
const config=require("./config/config");
const route=require("./helper/route");

const server=http.createServer((req,res)=>{
    const filepath=path.join(config.root,req.url); 
    route(req,res,filepath);
});

server.listen(config.port,config.hostname,()=>{ 
    console.log('服务器运行在'+chalk.green(`http://${config.hostname}:${config.port}/`));
})