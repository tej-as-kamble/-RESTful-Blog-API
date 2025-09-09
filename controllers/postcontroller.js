const Post = require("../models/Post");

// Create a Post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Please provide title and content" });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user, // comes from authMiddleware
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    console.error("Create Post error:", err.message);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get single Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) return res.status(404).json({ msg: "Post not found" });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update a Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    // only author can update
    if (post.author.toString() !== req.user) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Delete a Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.author.toString() !== req.user) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await post.deleteOne();
    return res.json({ msg: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
