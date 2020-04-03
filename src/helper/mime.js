const path=require("path");
const mimetypes={
  "doc" :    "application/msword",
  "docx" :  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",


  "xls " :   "application/vnd.ms-excel application/x-excel",
  "xlsx" :   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "ppt"   :  "application/vnd.ms-powerpoint",
  "pptx"  :  "application/vnd.openxmlformats-officedocument.presentationml.presentation",



  "pdf"  :   "application/pdf",
  "swf"  :  "application/x-shockwave-flash",
  "dll"  :    "application/x-msdownload",

  "exe"  :  "application/octet-stream",
  "msi"  :  "application/octet-stream",

  "rar"   :  "application/octet-stream",
  "tar"  :   "application/x-tar",
  "zip"  :  "application/x-zip-compressed",
  "mp3"  :  "audio/mpeg",

  "bmp"  :   "image/bmp",
  "gif"  :   "image/gif",
  "png"  :  "image/png",
  "jpe" :"image/jpeg",
  "jpeg" :"image/jpeg",
  "jpg"  :   "image/jpeg",

  "txt"   :  " text/plain",
  "xml"   :  "text/xml",
  "html"  :   "text/html",
  "css"   :   "text/css",
  "js"    :   " text/javascript",
  "json":"application/json",
  "svg":"image/svg+xml"
}

module.exports=(filepath)=>{
  const ext=path.extname(filepath)
    .split(".").pop().toLowerCase();
  if(!ext){
    ext=path.basename(filepath);
  }
  return mimetypes[ext]||mimetypes.txt
}