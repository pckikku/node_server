const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  return res.send("hi");
});
app.use(express.json());

// Don't change path it will change on another place
const news_path = "./dbs/news.json";
const kikku_path = "./dbs/kikku.json";
const branch_path = "./dbs/branch.json";
app.get("/news", async (req, res) => {
  await fs.readFile(news_path, (err, data) => {
    data = JSON.parse(data);
    res.json(data);
  });
});
app.post("/news", async (req, res) => {
  const { text, link, status } = req.body;
  const datum = {
    id: 0,
    text,
    link,
    status,
  };

  await fs.readFile(news_path, async (err, data) => {
    const file_data = JSON.parse(data);
    file_data.map((t) => {
      console.log(t.id);
      if (t.id === undefined || t.id === null || t.id === 0) {
        datum.id = 1;
      } else datum.id = t.id + 1;
    });
    file_data.push(datum);

    await fs.writeFile(news_path, JSON.stringify(file_data), (err) => {
      if (err) {
        console.log(err);
      } else res.json(file_data);
    });
  });
});
app.put("/news/:id", async (req, res) => {
  const id = req.params.id;
  const { text, link, status } = req.body;
  await fs.readFile(path, async (err, data) => {
    const file_data = JSON.parse(data);
    file_data.map((t) => {
      if (t.id === Number(id)) {
        t.text = text === undefined || text === t.text ? t.tex : text;
        t.link = link === undefined || link === t.link ? t.link : link;
      }
    });
    await fs.writeFile(news_path, JSON.stringify(file_data), (err) => {
      if (err) {
        res.json({ msg: "an error occured" });
      } else res.json(file_data);
    });
  });
});

app.delete("/news/:id", async (req, res) => {
  const id = req.params.id;
  await fs.readFile(news_path, async (err, data) => {
    data = JSON.parse(data);
    let filtered_data = data.filter((t, index, arr) => {
      if (t.id !== Number(id)) {
        return t;
      }
    });
    console.log(filtered_data);
    fs.writeFile(news_path, JSON.stringify(filtered_data), (err) => {
      if (err) {
        console.log(err);
        res.json({ msg: "error occured" });
      } else {
        res.json({ msg: "Deleted Successful!" });
      }
    });
  });
});

const paid_path = "./dbs/paid_list.json";

app.get("/paid_customers", async (req, res) => {
  await fs.readFile(paid_path, (err, data) => {
    if (err) res.json({ msg: "an error occured" });
    else res.json(JSON.parse(data));
  });
});

const repl_path = "./dbs/phv.json";

app.get("/email_phone_verfication", async (req, res) => {
  await fs.readFile(repl_path, (err, data) => {
    if (err) res.json({ msg: "an error occured" });
    else res.json(JSON.parse(data));
  });
});

app.post("/hi", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//get data for role
app.get("/hello", async (req, res) => {
  await fs.readFile(kikku_path, (err, data) => {
    data = JSON.parse(data);
    res.json(data);
  });
});

//role update details
app.post("/updaterole", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//deleterole
app.post("/deleterole", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//get data for branch
app.get("/branch", async (req, res) => {
  await fs.readFile(branch_path, (err, data) => {
    data = JSON.parse(data);
    res.json(data);
  });
});

//branch create
app.post("/branchpost", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//branch update
app.post("/updatebranch", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//delete branch
app.post("/deletepost", (req, res) => {
  let kikk = req.body;
  // console.log("working",new Date(),kikk);
  console.log(kikk);
  res.json({ msg: "passed" });
});

//192.168.1.35
let domainer = "192.168.1.29";
// 'localhost'
app.listen(8000, () => {
  console.log("connected...");
});
