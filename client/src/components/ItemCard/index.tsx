import { Badge, Card, Divider } from "antd";
import { IPost } from "../../types";
import { useSettings } from "../../api/hooks/settings";
import { useUsers } from "../../api/hooks/users";
import { formatDate } from "../../utils";

type ItemCardProps = {
  item: IPost;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const { data: settings } = useSettings();
  const { data: users } = useUsers();

  const currentUser = users?.find((i) => i.id === item.userId);

  return (
    <Card
      hoverable={settings?.template === "hover"}
      title={currentUser?.username}
      extra={<span>{formatDate(new Date(item.date))}</span>}
      key={item.id}
    >
      <p>{item.caption}</p>
      <Divider />
      <div>
        Likes:{" "}
        <Badge
          count={item.likes}
          style={{ backgroundColor: "blue" }}
          overflowCount={999}
        />{" "}
        Comments:{" "}
        <Badge
          count={item.comments}
          style={{ backgroundColor: "green" }}
          overflowCount={999}
        />
      </div>
    </Card>
  );
};

export default ItemCard;
