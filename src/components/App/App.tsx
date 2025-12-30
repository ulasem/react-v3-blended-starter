import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { Post } from "../../types/post";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../../services/postService";
import EditPostForm from "../EditPostForm/EditPostForm";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const posts = data ?? [];
  const totalPages = Math.ceil(100 / 8); // JSONPlaceholder: 100 постів

  const queryClient = useQueryClient();
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post deleted successfully!");
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={searchQuery} onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            setIsCreatePost(true);
            setIsEditPost(false);
            setIsModalOpen(true);
          }}
        >
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isCreatePost && <CreatePostForm onClose={() => setIsModalOpen(false)} />}
          {isEditPost && editedPost && (
            <EditPostForm initialValues={editedPost} onClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}

      {posts.length > 0 && (
        <PostList
          posts={posts}
          toggleModal={() => setIsModalOpen(true)}
          toggleEditPost={(post) => {
            setEditedPost(post);
            setIsEditPost(true);
            setIsModalOpen(true);
          }}
          onDelete={(id) => deletePostMutation(id)}
        />
      )}
    </div>
  );
}
