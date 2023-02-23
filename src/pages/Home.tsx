import { type ReactElement, useState } from "react";
import FeedNav from "~/components/pages/home/FeedNav";
import Pagination from "~/components/common/Pagination";
import PreviewList from "~/components/common/PreviewList";
import articles from "~/test_data/articles";
import tags from "~/test_data/tags";
import Banner from "../components/pages/home/Banner";
import TagList from "../components/pages/home/TagList";

function Home(): ReactElement {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleChangeFeed = (feed: string): void => {
    setSelectedTag(null);
    // api
  };
  const handleClickTag = (tag: string): void => {
    setSelectedTag(tag);
    // api
  };

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNav
              defaultTag="global"
              onChange={handleChangeFeed}
              tag={selectedTag}
            />
            <PreviewList articles={articles} />
            <Pagination
              total={20}
              onChange={(page) => {
                console.log(page);
              }}
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList tagList={tags} onClick={handleClickTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
