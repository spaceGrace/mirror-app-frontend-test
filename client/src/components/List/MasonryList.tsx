import { useCallback, useEffect, useState } from "react";
import { usePosts } from "../../api/hooks/posts";
import { IPost } from "../../types";
import { useSettings } from "../../api/hooks/settings";
import { masonryArr, paginateArr } from "../../utils";
import { Button, Pagination } from "antd";
import "./List.css";
import ItemCard from "../ItemCard";

const MasonryList = () => {
  const { data } = usePosts();
  const { data: settings } = useSettings();
  const [currPage, setCurrPage] = useState(1);
  const [items, setItems] = useState<IPost[][]>([]);
  const columns =
    settings?.layout.params[settings?.layout.current].columns || 10;
  const rows = settings?.layout.params[settings?.layout.current].rows || 5;

  const pageSize = columns * rows;

  const isPagination = settings?.navigation === "pagination";

  const handleStartArr = useCallback(() => {
    const pagArr = data ? paginateArr([...data], 1, pageSize) : [];
    const mArr = masonryArr(pagArr, columns, rows);
    setItems(mArr);
  }, [columns, data, pageSize, rows]);

  const handleChangePage = useCallback(
    (page: number) => {
      const pagArr = data ? paginateArr([...data], page, pageSize) : [];
      const mArr = masonryArr(pagArr, columns, rows);

      const newMArr =
        page !== 1 && !isPagination
          ? items.map((item, index) => {
              return [...item, ...mArr[index]];
            })
          : mArr;

      setItems(newMArr);
      setCurrPage(page);
    },
    [columns, data, isPagination, items, pageSize, rows]
  );

  useEffect(() => {
    handleStartArr();
  }, [handleStartArr]);

  return (
    <>
      <div className="masonry">
        {items.map((arr) => {
          return (
            <div key={`masonry_${arr[0].id}`} className="masonry_item">
              {arr.map((item) => {
                return <ItemCard item={item} />;
              })}
            </div>
          );
        })}
      </div>
      <div className="masonry_pagination">
        {isPagination ? (
          <Pagination
            current={currPage}
            pageSize={pageSize}
            total={data?.length}
            onChange={handleChangePage}
            showSizeChanger={false}
          />
        ) : (
          <Button onClick={() => handleChangePage(currPage + 1)}>
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

export default MasonryList;
