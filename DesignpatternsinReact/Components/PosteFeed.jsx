import React from "react";
import PostesCard from "./PostesCard";
import PropTypes from "prop-types";
PosteFeed.propTypes = {
  postes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function PosteFeed({ postes }) {
  return (
    <div className="post-item">
      {postes.map((post) => (
        <PostesCard key={post.id} poste={post} />
      ))}
    </div>
  );
}
