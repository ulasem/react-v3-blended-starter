import { ErrorMessage, Field, Form, Formik } from "formik";

import css from "./EditPostForm.module.css";
import { Post, validationSchema } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  initialValues: Post;
  onClose: () => void;
}

export default function EditPostForm({ initialValues, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Post) => editPost(values.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post edited successfully!");
      onClose();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => mutate(values)}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
