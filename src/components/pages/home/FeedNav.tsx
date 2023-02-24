import { type ReactElement } from "react";
import TabItem from "~/components/common/Tabs/TabItem";
import Tabs from "~/components/common/Tabs/index";
import { type Tag } from "~/types";

interface FeedNavProps {
  tag: Tag | null;
  defaultTag: string;
  onChange: (feed: string) => void;
}

function FeedNav({ tag, defaultTag, onChange }: FeedNavProps): ReactElement {
  return (
    <div className="feed-toggle">
      <Tabs defaultValue={tag ?? defaultTag} onChange={onChange} key={tag}>
        <TabItem to="/" name="user">
          Your Feed
        </TabItem>
        <TabItem to="/" name="global">
          Global Feed
        </TabItem>
        {tag !== null ? (
          <TabItem to="/" name={tag}>
            <i className="ion-pound" /> {tag}
          </TabItem>
        ) : null}
      </Tabs>
    </div>
  );
}

export default FeedNav;
