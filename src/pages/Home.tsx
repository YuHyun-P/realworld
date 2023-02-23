import { type ReactElement } from "react";
import FeedNav from "~/components/pages/home/FeedNav";
import Pagination from "~/components/common/Pagination";
import PreviewList from "~/components/common/PreviewList";
import articles from "~/test_data/articles";
import tags from "~/test_data/tags";
import Banner from "../components/pages/home/Banner";
import TagList from "../components/pages/home/TagList";

function Home(): ReactElement {
  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNav
              current="global"
              onChange={(feed) => {
                console.log(feed);
              }}
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
              <TagList
                tagList={tags}
                onClick={(tag) => {
                  console.log(tag);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
