import React from "react";
import { Link } from "react-router";

export const Post = ({ cover, content, title, id }) => {
  return (
    <article className="post">
      <div className="post__img-wrapper">
        <img src={cover} alt={title} />
      </div>
      <div className="post__content">
        <h2>{title}</h2>
        <p>{content.slice(0, 50)}...</p>
        <p>
          <Link to={`post/${id}`}>Read more</Link>
        </p>
      </div>
    </article>
  );
};
