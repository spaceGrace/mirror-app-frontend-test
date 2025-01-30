import { Button, List } from "antd";
import { usePosts } from "../../api/hooks/posts";
import { useSettings } from "../../api/hooks/settings";
import { PaginationConfig } from "antd/es/pagination";
import { useEffect, useState } from "react";
import { IPost } from "../../types";
import { paginateArr } from "../../utils";
import ItemCard from "../ItemCard";
import "./List.css";

const MainList = () => {
  const { data } = usePosts();
  const { data: settings } = useSettings();
  const [items, setItems] = useState<IPost[]>([]);
  const [currPage, setCurrPage] = useState(1);

  const pageSize =
    !!settings &&
    settings?.layout.params[settings?.layout.current].columns *
      settings?.layout.params[settings?.layout.current].rows;

  const isPagination = settings?.navigation === "pagination";

  const pagination = isPagination
    ? ({
        pageSize: pageSize || 10,
        position: "bottom",
        align: "center",
        showSizeChanger: false,
      } as PaginationConfig)
    : undefined;

  const handleLoadMore = () => {
    const curr = currPage + 1;
    const arr = data && pageSize ? paginateArr(data, curr, pageSize) : [];
    setCurrPage(curr);
    setItems((old) => [...old, ...arr]);
  };

  useEffect(() => {
    switch (settings?.navigation) {
      case "pagination":
        setItems(data || []);
        break;
      case "load-more":
        setItems(data?.splice(0, pageSize || 10) || []);
        break;
      default:
        setItems([]);
        break;
    }
  }, [data, pageSize, settings?.navigation]);

  return (
    <>
      <List
        pagination={pagination}
        grid={{
          gutter: 6,
          column:
            settings?.layout.params[settings?.layout.current].columns || 5,
        }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <ItemCard item={item} />
          </List.Item>
        )}
      />
      {!isPagination && data?.length !== items.length ? (
        <div className="masonry_pagination">
          <Button onClick={handleLoadMore}>Load more</Button>
        </div>
      ) : null}
    </>
  );
};

export default MainList;
