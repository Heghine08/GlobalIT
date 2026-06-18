const Post = require("../models/Post");
async function createPost(userId, title, content, tags) {
  return await Post.create({
    author: userId,
    title,
    content,
    tags,
  });
}
async function getAllPosts(status) {
  return await Post.find(
    status ? { status } : {}
  ).populate("author");
}
async function getPostById(id) {
  const post = await Post.findById(id);

  post.views += 1;

  await post.save();

  return post;
}
async function updatePost(
  id,
  userId,
  changes
) {
  const post = await Post.findById(id);

  if (
    post.author.toString() !==
    userId.toString()
  ) {
    throw new Error("Access denied");
  }

  Object.assign(post, changes);

  await post.save();

  return post;
}
async function deletePost(
  id,
  userId
) {
  const post = await Post.findById(id);

  if (
    post.author.toString() !==
    userId.toString()
  ) {
    throw new Error("Access denied");
  }

  await Post.findByIdAndDelete(id);
}
async function getPostsByUser(userId) {
  return await Post.find({
    author: userId,
  });
}
async function getStats() {
  const totalPosts = await Post.countDocuments();

  const publishedPosts = await Post.countDocuments({
    status: "published",
  });

  const topAuthorData = await Post.aggregate([
    {
      $group: {
        _id: "$author",
        postsCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        postsCount: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return {
    totalPosts,
    publishedPosts,
    topAuthor:
      topAuthorData.length > 0
        ? topAuthorData[0]._id
        : null,
  };
}
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser,
  getStats,
};