import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPostById } from "../../apijs/api";
import { updatePost } from "../../apijs/api";
import { Preloader } from "../Preloader";

export const EditPage = () => {
  const [title, setTitle] = useState(""); //заголовок поста
  const [cover, setCover] = useState(null); //новое изображение, выбранное пользователем
  const [currentImage, setCurrentImage] = useState(null);//текущее изображение поста (которое уже хранится в базе)
  const [newImageCover, setNewImageCover] = useState(null);//превью нового изображения (создаётся через URL.createObjectURL).
  const [content, setContent] = useState("");//текст поста.
  const [loading, setLoading] = useState(false);//индикатор загрузки при получении данных.
  const [savePost, setSavePost] = useState(false);//индикатор сохранения при отправке формы.
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setTitle(response.title || "");
        setContent(response.content || "");
        setCurrentImage(response.cover || null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!cover) {
      setNewImageCover(null);
      return;
    }
    const url = URL.createObjectURL(cover);
    setNewImageCover(url);
    return () => URL.revokeObjectURL(url);
  }, [cover]);

  console.log(newImageCover);

  const updatePostForm = (e) => {
    e.preventDefault();
    setSavePost(true);
    (async () => {
      try {
        const response = await updatePost(id, { title, content, cover });
        setCover(null);
        navigate("/post/" + (response.id ?? id));
      } catch (error) {
        console.log(error);
      } finally {
        setSavePost(false);
      }
    })();
  };

  return (
    <main className="container main" id="blog">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <article className="post-page">
            <h1 className="post-page__title">Create post</h1>
            {loading ? (
              <Preloader />
            ) : (
              <form onSubmit={updatePostForm} className="post-page__form">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={({ target }) => {
                      setTitle(target.value);
                    }}
                    value={title}
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
                    onChange={({ target }) => {
                      setContent(target.value);
                    }}
                    value={content}
                    name="content"
                    className="form-control"
                    id="content"
                    placeholder="Content"
                  ></textarea>
                </div>
                {currentImage && (
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Текущее изображение поста
                    </label>
                    <img src={currentImage} alt="current image" />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Загрузите новое изображение поста
                  </label>
                  <input
                    onClick={(e) => {
                      e.currentTarget.value = "";
                    }}
                    onChange={(e) => setCover(e.target.files?.[0] || null)}
                    name="cover"
                    type="file"
                    className="form-control"
                    id="image"
                    placeholder="Image"
                    accept="image/*"
                  />
                </div>
                {newImageCover && (
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Педварительное изображения поста
                    </label>
                    <img src={newImageCover} alt="current image" />
                  </div>
                )}

                <button type="submit" disabled={savePost} className="btn">
                  {savePost ? "saving..." : "Update Post"}
                </button>
              </form>
            )}
          </article>
        </div>
      </div>
    </main>
  );
};
