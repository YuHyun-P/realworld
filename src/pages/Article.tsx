import { type ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleMeta from "~/components/pages/article/ArticleMeta";
import AuthNotice from "~/components/pages/article/AuthNotice";
import CommentForm from "~/components/pages/article/CommentForm";
import CommentList from "~/components/pages/article/CommentList";
import Content from "~/components/pages/article/Content";
import articles from "~/test_data/articles";
import comments from "~/test_data/comments";
import user from "~/test_data/user";
import { type Article } from "~/types";

function ArticlePage(): ReactElement {
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
  const handleToggleFollow = (value: boolean): void => {
    console.log(article.author.username, value);
    setArticle({ ...article, author: { ...article.author, following: value } });
  };
  const handleToggleFavorite = ({
    favorited,
    favoritesCount,
  }: Pick<Article, "favorited" | "favoritesCount">): void => {
    setArticle({
      ...article,
      favorited,
      favoritesCount,
    });
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            onToggleFollow={handleToggleFollow}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>

      <div className="container page">
        <Content body={article.body} tagList={article.tagList} />

        <hr />

        <div className="article-actions">
          <ArticleMeta
            article={article}
            onToggleFollow={handleToggleFollow}
            onToggleFavorite={handleToggleFavorite}
          />
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

export default ArticlePage;
