import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати теги',
    });
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати статті',
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate('user');

    if (!post) {
      return res.status(404).json({
        message: 'Стаття не знайдена',
      });
    }

    const postToUpdate = { viewsCount: post.viewsCount + 1 };
    await PostModel.findByIdAndUpdate(postId, postToUpdate);

    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати статтю',
    });
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося створити статтю',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Стаття не знайдена',
      });
    }

    return res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося видалити статтю',
    });
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(404).json({
        message: 'Стаття не знайдена',
      });
    }

    const post = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    };
    const postUpdated = await PostModel.findByIdAndUpdate(postId, post, {new: true});

    return res.json(postUpdated);

    // await PostModel.updateOne(
    //   {
    //     _id: postId,
    //   }, 
    //   {
    //     title: req.body.title,
    //     text: req.body.text,
    //     imageUrl: req.body.imageUrl,
    //     tags: req.body.tags,
    //     user: req.userId,
    //   },
    // )

    // return res.json({
    //   success: true,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося обновити статтю',
    });
  }
}
