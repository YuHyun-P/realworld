import { type ReactElement } from "react";
import Tabs from "~/components/common/Tabs";
import TabItem from "~/components/common/Tabs/TabItem";

interface ArticleNavProps {
  username: string;
  defaultTab?: string;
  onChange: (tab: string) => void;
}

function ArticleNav({
  username,
  defaultTab,
  onChange,
}: ArticleNavProps): ReactElement {
  return (
    <div className="articles-toggle">
      <Tabs onChange={onChange} defaultValue={defaultTab}>
        <TabItem name="author" to={`/profile/${username}`}>
          My Articles
        </TabItem>
        <TabItem name="favorited" to={`/profile/${username}/favorites`}>
          Favorited Articles
        </TabItem>
      </Tabs>
    </div>
  );
}

export default ArticleNav;
