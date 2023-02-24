import { useRef, useState, type ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "~/components/common/Input";
import Textarea from "~/components/common/Textarea";
import useTagInput from "~/hooks/useTagInput";
import { type Article } from "~/types";
import Tags from "../components/pages/editor/Tags";
import ErrorMessage from "../components/common/ErrorMessage";
import articles from "../test_data/articles";

function Editor(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleSlug } = useParams();
  const {
    tag,
    tagList,
    setTagList,
    handleChangeTag,
    handleAddTag,
    handleDeleteTag,
  } = useTagInput();
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (): void => {
    if (form.current === null) {
      return;
    }

    setIsLoading(true);

    const {
      articleTitle: { value: title },
      description: { value: description },
      body: { value: body },
    } = form.current;

    console.log(title, description, body, tagList);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (articleSlug === undefined) {
      return;
    }
    // api
    setArticle(articles[0]);
    setTagList(articles[0].tagList);
  }, [articleSlug, setTagList]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessage message="title can't be blank" />

            <form ref={form}>
              <fieldset disabled={isLoading}>
                <Input
                  type="text"
                  placeholder="Article Title"
                  large
                  name="articleTitle"
                  defaultValue={article?.title}
                />
                <Input
                  type="text"
                  placeholder="What's this article about?"
                  name="description"
                  defaultValue={article?.description}
                />

                <Textarea
                  rows={8}
                  placeholder="Write your article (in markdown)"
                  name="body"
                  defaultValue={article?.body}
                />

                <Tags
                  placeholder="Enter tags"
                  name="tagList"
                  tag={tag}
                  tagList={tagList}
                  onAdd={handleAddTag}
                  onDelete={handleDeleteTag}
                  onChange={handleChangeTag}
                />

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
