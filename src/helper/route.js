const fs=require("fs");
const path=require("path");
const promisify=require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars=require("handlebars");
const config=require("../config/config");
const mime=require("../helper/mime");
const compress=require("./compress");


const tplpath=path.join(__dirname,"../template/dir.tpl");
const source=fs.readFileSync(tplpath);
const template=handlebars.compile(source.toString());

module.exports=async function (req,res,filepath) {
  try {
    const stats=await stat(filepath);
    if(stats.isFile()){
         res.statusCode=200;
         res.setHeader("Conten-Type",mime(filepath));
         let rs=fs.createReadStream(filepath);
         if(filepath.match(config.compress)){
          rs=compress(rs,req,res); 
         }
         rs.pipe(res);
     }else if(stats.isDirectory()){
       const files=await readdir(filepath);
       res.statusCode=200;
       res.setHeader("Conten-Type","text/html");
       const dir=path.relative(config.root,filepath);
       const data={
         title:path.basename(filepath),
         dir:dir?`/${dir}`:'',
         files
       }
       res.end(template(data));
     }
  } catch (error) {
      res.statusCode=404;
      res.end(`${filepath} is not a directory or file`);
  }
}