var generateMessage = (from, text)=>{
    return {
        from, text, createdAt:new Date().getTime()
    };
};

var generateLocationMessage = (from, lat, long)=>{
    return {
        from,
        url: `www.google.com/map?q=${lat},${long}`,
        createdAt:new Date().getTime()
    };
};
module.exports={generateMessage,generateLocationMessage};