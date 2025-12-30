import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// interface FetchPosts {
//   posts: Post[];
// }

export const fetchPosts = async (searchText: string = "", page: number = 1) => {
  const res = await axios.get<Post[]>("/posts", {
    params: {
      ...(searchText !== "" && { q: searchText }),
      _page: page,
      _limit: 8,
    },
  });

  return res.data;
};

interface CreatedPost {
  title: string;
  body: string;
}

export const createPost = async (newPost: CreatedPost): Promise<Post> => {
  const { data } = await axios.post<Post>("/posts", newPost);
  return data;
};

interface UpdatePostData {
  title?: string;
  body?: string;
}

export const editPost = async (postId: number, newDataPost: UpdatePostData) => {
  const { data } = await axios.patch<Post>(`/posts/${postId}`, newDataPost);
  return data;
};

export const deletePost = async (postId: number) => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);
  return data;
};
