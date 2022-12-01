import User from "../models/user.model.js";
import moment from "moment";
import axios from "axios";
import { getIdBypath } from "../services/getdevId.js";
export const postBlog = async (req, res) => {
  const { blog } = req.body;
  const { user_id } = req.body;
  const { post_to } = req.body.blog;

  const user = await User.findById(user_id);
  const { api_token } = user;

  const blogOndb = {
    title: blog.title,
    markdown: blog.markdown,
    cover: blog.cover,
    original_link: "",
    remote_id: {
      dev: "",
      hashnode: "",
    },
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
            "api-key": "yNecF91d29yAA3F8SLKbHeDA",
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
        message: "Sorry, we are unable to post",
      });
      return;
    }
  }

  // post to hashnode
  if (post_to.hashnode) {
    const hashnodeUrl = "https://api.hashnode.com";
    let auth = "5131be37-f7e2-4634-9b29-e9660b76bc3a";
    let hashnode_publicationId = "637f63cd0d2fc8df7adde9d2";
    try {
      // post to hashnode with new syntax with response

      const options = {
        method: "POST",
        url: hashnodeUrl + "/",
        headers: {
          "Content-Type": "application/json",
          "authorization": auth,
        },
        data: {
          query: `mutation {
            createPublicationStory(
              input: {
                title: "This article is published via, hashnode api-02"
                subtitle : "🔥"
                slug : "via-api",
                contentMarkdown: "This article is published via, hashnode api"
                tags: []
                coverImageURL: "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
              }
              publicationId: "637f63cd0d2fc8df7adde9d2"
            ) {
              _id
              title
              post {
                _id
              }
            }
          }`,
        },
      };

      // make a axios request to hashnode
      const resfromHashnode = await axios(options);
      const { data } = resfromHashnode.data;
      const { createPublicationStory } = data;
      console.log(createPublicationStory);
      const { _id, slug } = createPublicationStory;
      blogOndb.remote_id.hashnode = _id;
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Sorry, we are unable to post from hashnode",
      });
      return;
    }
  }

  // save on db
};
