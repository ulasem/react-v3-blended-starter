import { Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost, onDelete }: PostListProps) {
  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              onClick={() => {
                toggleEditPost(post);
                toggleModal();
              }}
              className={css.edit}
            >
              Edit
            </button>
            <button onClick={() => onDelete(post.id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
