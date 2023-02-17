import { type ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleMeta from "~/components/pages/article/ArticleMeta";
import AuthNotice from "~/components/pages/article/AuthNotice";
import CommentForm from "~/components/pages/article/CommentForm";
import articles from "~/test_data/articles";
import comments from "~/test_data/comments";
import user from "~/test_data/user";
import CommentList from "../components/pages/article/CommentList";
import PreviewTagList from "../components/pages/home/PreviewTagList";

function Article(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleSlug } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [article, setArticle] = useState(articles[0]);

  const handleSubmit = (body: string): void => {
    console.log(article.slug, body);
  };
  const handleDelete = (id: number): void => {
    console.log(article.slug, id);
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <PreviewTagList tagList={article.tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {user === null ? (
              <AuthNotice />
            ) : (
              <CommentForm image={user.image} onSubmit={handleSubmit} />
            )}
            <CommentList comments={comments} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
