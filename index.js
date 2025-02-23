import express from "express";
import bodyParser from "body-parser"
import axios from "axios";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));



app.get("/", async (req,res)=>{
    res.render("index.ejs");

});



app.post("/getmeme",async (req,res)=>{
    var memeCount = req.body.count;
    var subred = req.body.subreddit;

    console.log("The count entered by user is: "+memeCount);
    console.log("The subreddit entered by user is: "+subred);

    var params = {
        count: memeCount,
        subreddit: subred,
    };

    // Axios
    try {
        const response = await axios.get("https://meme-api.com/gimme");
        const result = JSON.stringify(response.data);
        var memeLinksList = response.data.preview;
        // console.log(result);
        console.log("List of memes: "+memeLinksList);
        console.log("Count of Memes sent by API: "+memeLinksList.length);

        // console.log("The 2nd meme in the list is: "+memeLinksList.preview[1]);
        res.render("memes.ejs", {
            memeList: memeLinksList,
        });

    } catch (error) {
        console.log("Failed to make request");
        console.error("Failed to make request:", error.message);
        res.render("memes.ejs", {
          error: error.message,
        });
    }


});



app.listen(port, ()=>{
    console.log("App is live at port "+port);
});




