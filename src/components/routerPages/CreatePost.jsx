import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { API_BASE_URL } from "../../apijs/config";
import { useNavigate } from "react-router-dom";
import { Preloader } from "../Preloader";
export const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const createPost = async (formData) => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      body: formData,
    });
    const serverResponse = await response.json();
    if (serverResponse.status === "success") {
      console.log("worck");
      navigate("/post/" + serverResponse.id);
    }
    setLoading(false);
  };
  const handleSubmit = (formData) => {
    console.log(...formData);
    createPost(formData);
  };

  return (
    <main className="container main" id="blog">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <article className="post-page">
            <h1 className="post-page__title">Create post</h1>

            <form action={handleSubmit} className="post-page__form">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  name="content"
                  className="form-control"
                  id="content"
                  placeholder="Content"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  name="cover"
                  type="file"
                  className="form-control"
                  id="image"
                  placeholder="Image"
                />
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? <Preloader /> : "Create post"}
              </button>
            </form>
          </article>
        </div>
      </div>
    </main>
  );
};
