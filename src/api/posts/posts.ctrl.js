const Post = require('../../models/post');
const mongoose = require('mongoose');
const Joi = require('joi');

const { ObjectId } = mongoose.Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  return next();
};

exports.write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  console.log(schema);
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

exports.list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, error);
  }
};

exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const posts = await Post.findById(id).exec();
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, error);
  }
};

exports.remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (error) {
    ctx.throw(500, error);
  }
};

exports.update = async (ctx) => {
  const { id } = ctx;

  try {
    const post = await Post.findOneAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
