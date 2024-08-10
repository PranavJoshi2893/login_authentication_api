const app = require("./app");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT,HOST,()=>{
    console.log(`[ready] http:${HOST}:${PORT}`)
});
