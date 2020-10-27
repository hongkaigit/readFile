const {cache}=require("../config/config");

function refreshRes(stats,res) {
  const {
    masxAge,
    expire,
    cacheControl,
    lastModified,
    etag
  }=cache;
  if(expire){
    res.setHeader("Expire",(new Date(Date.now()+masxAge*6000)).toUTCString())
  }

  if(cacheControl){
    res.setHeader("Cache-Control",`public,max-age=${masxAge}`);
  }

  if(lastModified){
    res.setHeader("Last-Modified",stats.mtime.toUTCString())
  }

  if(etag){
    res.setHeader("ETag",`${stats.size}-${stats.mtime}`)
  }
}

module.exports=function isFresh(stats,req,res) {
  refreshRes(stats,res);

  const lastModified=req.headers("if-modified-since");
  const ETag=req.headers("if-none-match");

  if(!lastModified&&!ETag){
    return false;
  }
  if(lastModified&&lastModified!=res.getHeader("Last-Modified")){
    return false;
  }
  if(ETag&&ETag!=res.getHeader("ETag")){
    return false;
  }
  return true;
}