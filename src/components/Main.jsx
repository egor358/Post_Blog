import React, { useState } from "react";
import { ResentPost } from "./ResentPost";
import { getPosts } from "../apijs/api";
import { useEffect } from "react";
import { Preloader } from "./Preloader";
import { ProductList } from "./ProductList";

import { About } from "./About";

export const Main = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Не удалось загрузить посты");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
console.log(posts);

  return (
    <main>
      <main className="container main" id="blog">
        <div className="row">
          <div className="col-md-8">
            <h3 className="main__title">Blog posts</h3>
            <div className="posts_row">
              <div className="posts-wrapper">
                {loading ? <Preloader /> : <ProductList posts={posts} />}
                {!loading && posts.length === 0 && "постов нет"}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <About />
            <ResentPost />
          </div>
        </div>
      </main>
    </main>
  );
};
