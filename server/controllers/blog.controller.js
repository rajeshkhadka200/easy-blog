import User from "../models/user.model.js";
import moment from "moment";
import axios from "axios";
import fetch from "node-fetch";
import { getIdBypath } from "../services/getdevId.js";
import blogModal from "../models/blog.modal.js";

// this is the code for posting the blog in hashnode and in dev
export const postBlog = async (req, res) => {
  console.log("testing");
  const { blog } = req.body;
  const { user_id } = req.body;
  const { post_to } = req.body.blog;
  console.log(post_to);

  const user = await User.findById(user_id);
  const { api_token } = user;
  const { hashnode_authorization, hashnode_publicationId, dev_apikey } =
    api_token;

  const blogOndb = {
    title: blog.title,
    markdown: blog.markdown,
    cover: "",
    original_link: "",
    remote_id: {
      dev: "",
      hashnode: "",
    },
    published_by: user_id,
    published_on: moment().format("ll"),
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
    // let auth = "5131be37-f7e2-4634-9b29-e9660b76bc3a";
    // let hashnode_publicationId = "637f63cd0d2fc8df7adde9d2";
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
            coverImageURL: "https://blog.rajeshkhadka.info.np/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1662197975991%2FJMSSoi4TI.png%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75"
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
      console.log(data);
      const { _id, title } = data.data.createPublicationStory.post;
      blogOndb.remote_id.hashnode = _id;
      console.log(_id,title);
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
  const {hashnode_authorization} =req.body;
  
  // delete from hashnode
  const hashnodeUrl = "https://api.hashnode.com";
  const query = `
  mutation deletePost {
    deletePost(id : "${hashnodeblogid}") {
      code,
      success,
      message,
    }
  }`

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
