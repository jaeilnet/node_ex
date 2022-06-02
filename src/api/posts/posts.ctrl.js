const Post = require('../../models/post');

exports.write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
exports.list = (ctx) => {};
exports.read = (ctx) => {};
exports.remove = (ctx) => {};
exports.update = (ctx) => {};
