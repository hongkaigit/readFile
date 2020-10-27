module.exports={
  root:process.cwd(),
  hostname:"127.0.0.1",
  port:"3000",
  compress:/\.(html|js|css|md)$/,
  cache:{
    masxAge:600,
    expire:true,
    cacheControl:true,
    lastModified:true,
    etag:true
  }
}