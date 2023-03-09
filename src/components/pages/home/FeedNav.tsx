import { type ReactElement } from "react";
import TabItem from "~/components/common/Tabs/TabItem";
import Tabs from "~/components/common/Tabs/index";
import { type Tag } from "~/types";
import { useRecoilValue } from "recoil";
import userAtom from "~/recoil/atoms/userState";

interface FeedNavProps {
  tag: Tag;
  defaultTag: string;
  onChange: (feed: string) => void;
}

function FeedNav({ tag, defaultTag, onChange }: FeedNavProps): ReactElement {
  const user = useRecoilValue(userAtom);

  const hasAdditionalTag = tag !== "user" && tag !== "global";

  return (
    <div className="feed-toggle">
      <Tabs defaultValue={tag ?? defaultTag} onChange={onChange} key={tag}>
        {user !== null ? (
          <TabItem to="/" name="user">
            Your Feed
          </TabItem>
        ) : null}
        <TabItem to="/" name="global">
          Global Feed
        </TabItem>
        {hasAdditionalTag ? (
          <TabItem to="/" name={tag}>
            <i className="ion-pound" /> {tag}
          </TabItem>
        ) : null}
      </Tabs>
    </div>
  );
}

export default FeedNav;
