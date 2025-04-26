import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try
    {
        const random_id = Math.floor(Math.random() * 51) + 1;
        const response = await axios.get('https://gsi.fly.dev/characters/' + random_id);
        const character = response.data;
        console.log(character);
        const name = character.result.name;
        const type = character.result.vision;
        const weapon = character.result.weapon;
        const region = character.result.region[0];

        console.log(name, type, weapon, region);

        res.render("index.ejs",
            {
                name: name,
                type: type,
                weapon: weapon,
                region: region
            });
    }
    catch(error)
    {
        console.error("Error fetching data from API:", error.message);
        res.status(404).send("Error: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});