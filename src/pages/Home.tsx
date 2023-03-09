import { type ReactElement } from "react";
import FeedNav from "~/components/pages/home/FeedNav";
import Pagination from "~/components/common/Pagination";
import PreviewList from "~/components/common/PreviewList";
import tags from "~/test_data/tags";
import { useRecoilValue } from "recoil";
import userAtom from "~/recoil/atoms/userState";
import Banner from "../components/pages/home/Banner";
import TagList from "../components/pages/home/TagList";
import useArticleList from "../hooks/useArticleList";
import Loading from "../components/common/Loading";

const PAGE_SIZE = 10;

function Home(): ReactElement {
  const user = useRecoilValue(userAtom);

  const initialTag = user !== null ? "user" : "global";
  const fallback = { articles: [], articlesCount: 0 };
  const {
    data = fallback,
    isLoading,
    query,
    setTag,
    setPage,
  } = useArticleList({
    tag: initialTag,
    limit: PAGE_SIZE,
    page: 1,
  });

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNav
              defaultTag={initialTag}
              onChange={setTag}
              tag={query.tag}
            />

            <PreviewList articles={data.articles} />
            {isLoading && <Loading />}
            <Pagination
              initialPage={query.page}
              total={Math.ceil(data.articlesCount / PAGE_SIZE)}
              onChange={setPage}
            />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList tagList={tags} onClick={setTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
