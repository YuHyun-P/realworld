import { useRef, useState, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import Input from "~/components/common/Input";
import Textarea from "~/components/common/Textarea";
import useTagInput from "~/hooks/useTagInput";
import Tags from "../components/pages/editor/Tags";
import ErrorMessage from "../components/common/ErrorMessage";

function Editor(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { articleSlug } = useParams();
  const { tag, tagList, handleChangeTag, handleAddTag, handleDeleteTag } =
    useTagInput();
  const [isLoading, setIsLoading] = useState(false);

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
                />
                <Input
                  type="text"
                  placeholder="What's this article about?"
                  name="description"
                />

                <Textarea
                  rows={8}
                  placeholder="Write your article (in markdown)"
                  name="body"
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
