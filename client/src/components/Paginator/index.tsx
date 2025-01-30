import { Button, Pagination, Spin } from "antd";
import { useSettings } from "../../api/hooks/settings";

type PaginatorProps = {
  currentPage: number;
  total: number;
  setData: (type: string, page: number) => void;
};

const Paginator = ({ currentPage, total, setData }: PaginatorProps) => {
  const { data } = useSettings();

  const handleSetPage = (type: string, page: number) => {
    setData(type, page);
  };

  const paginationSwitcher = () => {
    switch (data?.navigation) {
      case "pagination":
        return (
          <Pagination
            total={total}
            onChange={(page) => handleSetPage("pagination", page)}
            current={currentPage}
          />
        );
      case "load-more":
        return (
          <Button onClick={() => handleSetPage("load-more", currentPage + 1)}>
            Load more
          </Button>
        );
      default:
        return <p>ERROR: No available navigation!</p>;
    }
  };

  return <div>{data ? paginationSwitcher() : <Spin />}</div>;
};

export default Paginator;
