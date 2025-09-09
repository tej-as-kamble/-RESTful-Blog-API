const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postcontroller");
const authMiddleware = require("../middlewares/authmiddlewares");

// Protected: Create Post
router.post("/", authMiddleware, createPost);

// Public: Get All Posts
router.get("/", getPosts);

// Public: Get Single Post
router.get("/:id", getPost);

// Protected: Update Post
router.put("/:id", authMiddleware, updatePost);

// Protected: Delete Post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
