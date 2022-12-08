import User from "../models/user.model.js";
import moment from "moment";
import axios from "axios";
import fetch from "node-fetch";
import { getIdBypath } from "../services/getdevId.js";
import blogModal from "../models/blog.modal.js";

// this is the code for posting the blog in hashnode and in dev
export const postBlog = async (req, res) => {
  const { blog } = req.body;
  const { user_id, profile_pic } = req.body;
  const { post_to } = req.body.blog;
  const user = await User.findById(user_id);
  const { api_token } = user;
  const { hashnode_authorization, hashnode_publicationId, dev_apikey } =
    api_token;
  //remove all white spaces from the image url
  const cover = req.body.cover.replace(/\s/g, "");
  const blogOndb = {
    title: blog.title,
    markdown: blog.markdown,
    cover: cover,
    original_link: "",
    remote_id: {
      dev: "",
      hashnode: "",
    },
    published_by: user_id,
    published_on: moment().format("ll"),
    published_by_profile: profile_pic,
  };

  if (post_to.dev) {
    const Devurl = "https://dev.to/api/articles";
    if (!user) {
      res.status(400).json({
        message: "Something went wrong",
      });
      return;
    }

    try {
      const resfromDev = await axios.post(
        Devurl,
        {
          article: {
            title: blog.title,
            body_markdown: blog.markdown,
            published: true,
            tags: ["test"],
            cover_image: cover,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": dev_apikey,
          },
        }
      );
      const location = resfromDev.headers.location;
      blogOndb.original_link = location;
      const DevBlogid = await getIdBypath(location);
      blogOndb.remote_id.dev = DevBlogid;
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Sorry, we are unable to post, DEV",
      });
      return;
    }
  }

  // post to hashnode
  if (post_to.hashnode) {
    const hashnodeMarkdown = blog.markdown.replace(/\n/g, "<br>");

    const hashnodeUrl = "https://api.hashnode.com";
    try {
      const query = `
      mutation CreatePublicationStory {
        createPublicationStory(
          publicationId: "${hashnode_publicationId}",
          input: {
            title: "${blog.title}",
            subtitle : "🔥",
            slug : "${blog.title}",
            contentMarkdown: "${hashnodeMarkdown}",
            tags: [],
            coverImageURL: "${cover}",
          }
        ) {
          code
          success
          message
          post {
           _id,
          title, 
          } 
        }
      }
      `;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": hashnode_authorization,
        },
        body: JSON.stringify({ query }),
      };
      const resfromHashnode = await fetch(hashnodeUrl, options);
      const data = await resfromHashnode.json();
      const { _id } = data.data.createPublicationStory.post;
      blogOndb.remote_id.hashnode = _id;
    } catch (error) {
      console.log(error);

      res.status(400).json({
        message: "Sorry, we are unable to post, Hashnode",
      });
      return;
    }
  }
  // post to db
  try {
    const posted = new blogModal(blogOndb);
    await posted.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Sorry, we are unable to post, DB",
    });
  }

  res.status(200).json({
    message: "Blog posted successfully",
  });
};

// this is the code for deleting the blog
export const deleteBlog = async (req, res) => {
  const { hashnodeblogid, mongoblogid } = req.params;
  const { hashnode_authorization } = req.body;

  // delete from hashnode
  const hashnodeUrl = "https://api.hashnode.com";
  const query = `
  mutation deletePost {
    deletePost(id : "${hashnodeblogid}") {
      code,
      success,
      message,
    }
  }`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": hashnode_authorization,
    },
    body: JSON.stringify({ query }),
  };
  try {
    const resfromHashnode = await fetch(hashnodeUrl, options);
    const data = await resfromHashnode.json();
    if (!data) {
      return;
    }
    // delete from mongo
    const deleted = await blogModal.findByIdAndDelete(mongoblogid);
    res.status(200).json({
      data,
      deleted,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Unable to delete",
    });
    return;
  }
};

// get blog by id
export const getBlogById = async (req, res) => {
  const { blogid } = req.params;
  try {
    const blog = await blogModal.findOne({
      _id: blogid,
    });
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Unable to get blog",
    });
    return;
  }
};
// update to the hashnode and dev
export const updateBlog = async (req, res) => {
  const { blog, api_token, remote_id } = req.body; // api token is the user api token
  const { dev_apikey, hashnode_publicationId, hashnode_authorization } =
    api_token;
  const { hashid, mongoid, devid } = remote_id;
  const { title, markdown, cover } = blog;
  console.log("blog", blog);

  // update to dev
  const Devurl = `https://dev.to/api/articles/${devid}`;
  if (devid !== "") {
    try {
      const devRes = axios.put(
        Devurl,
        {
          article: {
            title: title,
            body_markdown: markdown,
            published: true,
            tags: ["test"],
            cover_image: cover,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": dev_apikey,
          },
        }
      );
      console.log("updated in dev");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
        message: "Unable to update to dev",
      });
      return;
    }
  }
  // update to hashnode
  if (hashid !== "") {
    const hashnodeMarkdown = markdown.replace(/\n/g, "<br>");
    const hashnodeUrl = "https://api.hashnode.com";
    const query = `
  mutation updateStory {
    updateStory (
      postId : "${hashid}",
      input : {
        title : "${title}",
        contentMarkdown : "${hashnodeMarkdown}",
        isPartOfPublication : {
          publicationId : "${hashnode_publicationId}",
        },
        tags : []
        coverImageURL : "${cover}",
      }
    ){
      code,
      success,
      post{
        title,
        _id
      }
    }
  }
  `;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : hashnode_authorization,
      },
      body: JSON.stringify({ query }),
    };

    try {
      const resfromHashnode = await fetch(hashnodeUrl, options);
      const data = await resfromHashnode.json();
      console.log("updated in hashnode");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
        message: "Unable to update to hashnode",
      });
      return;
    }
  }
  // update to mongo
  try {
    const updated = await blogModal.findByIdAndUpdate(mongoid, {
      title: blog.title,
      markdown: blog.markdown,
    });
    res.status(200).json({
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
      message: "Unable to update to mongo",
    });
    return;
  }
};

// development controller
export const getAllBlog = async (req, res) => {
  const allBlog = await blogModal.find();
  res.status(200).send(allBlog);
  return;
};

export const deletemany = async (req, res) => {
  await blogModal.deleteMany();
  res.status(200).json({
    message: "deleted",
  });
};

export const searchBlog = async (req, res) => {
  const { search } = req.params;
  const regex = new RegExp(search, "i");
  const searchBlog = await blogModal.find({
    $or: [{ title: regex }, { markdown: regex }],
  });

  res.status(200).send(searchBlog);
  return;
};
