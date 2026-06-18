require("./db");

const Post = require("./models/Post");

async function test() {
  const post = await Post.create({
    title: "First Post",
    content: "Hello MongoDB",
    tags: ["mongodb", "nodejs"],
  });

  console.log(post);
}

test();