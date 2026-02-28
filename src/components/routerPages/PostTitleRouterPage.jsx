import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getPostById } from "../../apijs/api";
import { About } from "../About";
import { ResentPost } from "../ResentPost";
import { Preloader } from "../Preloader";
import { Link } from "react-router";
import { deletePost } from "../../apijs/api";

export const PostTitleRouterPage = ({}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  console.log(post);

  const handleDelete = () => {
    (async () => {
      try {
        setLoading(true);
        const response = await deletePost(id);
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <main className="container main" id="blog">
      <div className="row">
        <div className="col-md-8">
          {loading && <Preloader />}
          {post && (
            <article className="post-page">
              <h1 className="post-page__title">{post.title}</h1>

              <div className="post-page__img-wrapper">
                {/* <img class="post-page__img" src="./img/big/01.jpg" alt=""> */}
                <img src={post.cover} alt={post.title} />
              </div>

              <div className="post-page__content">{post.content}</div>
              <div>
                <Link to={`/edit/${post.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          )}
        </div>

        <div className="col-md-4">
          <About />
          <ResentPost />
        </div>
      </div>
    </main>
  );
};
