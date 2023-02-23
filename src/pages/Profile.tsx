import { type ReactElement } from "react";
import { redirect, useParams } from "react-router-dom";
import ArticleNav from "~/components/pages/profile/ArticleNav";
import Pagination from "~/components/common/Pagination";
import UserInfo from "~/components/pages/profile/UserInfo";
import articles from "~/test_data/articles";
import profile from "~/test_data/profile";
import PreviewList from "~/components/common/PreviewList";

function Profile(): ReactElement | null {
  const { username } = useParams();

  if (username === undefined) {
    redirect("/");
    return null;
  }
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <UserInfo
                image={profile.image}
                username={profile.username}
                bio={profile.bio}
                following={profile.following}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleNav username={profile.username} />

            <PreviewList articles={articles} />
            <Pagination
              total={20}
              onChange={(page) => {
                console.log(page);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
