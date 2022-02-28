const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const posts = [
  {
    id: 1,
    userId: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    userId: 1,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    userId: 1,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];
//all Posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

//find  post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) res.status(404).send("Not Found");
  res.send(post);
});

//post a new post
app.post("/posts", (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(40).required(),
    body: Joi.string().min(10).max(50).required(),
  });
  const newPost = {
    id: posts.length + 1,
    userId: 10,
    title: req.body.title,
    body: req.body.body,
  };
  const result = schema.validate(newPost);

  if (result.error) {
    res.status(400).send(result.error.details);
  }

  posts.push(newPost);
  res.send(newPost);
});

//Editing post #put Method

app.put("/posts/:id", (req, res) => {
  //find post
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  //if not exist show 404 error
  if (!post) res.status(404).send("Not Found");
  res.send(post);
  //if exsit validate
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(40),
    body: Joi.string().min(10).max(50),
  });

  const UpdatedPost = {
    title: req.body.title,
    body: req.body.body,
  };

  const result = schema.validate(UpdatedPost);

  if (result.error) {
    res.status(400).send(result.error.details);
  }
  //send to database
  post.title = req.body.title;
  post.body = req.body.body;
});

//Deleting post
app.delete("/posts/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  if(!post) res.status(404).send("Not found")
  const index =posts.indexOf(post)
  posts.splice(index,1)
  res.send(post)
  
  

});

const Port = process.env.PORT || 1810;

app.listen(Port, () => {
  console.log(`${Port} is starting now ...`);
});
