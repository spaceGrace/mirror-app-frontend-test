import { usePosts } from "../../api/hooks/posts";
import { useSettings } from "../../api/hooks/settings";
import MainList from "../List";
import MasonryList from "../List/MasonryList";
import { Spin } from "antd";

const LayoutController = () => {
  const { data, isRefetching } = usePosts();
  const { data: settings } = useSettings();

  const template = settings?.layout.current;

  const templateSwitcher = () => {
    switch (template) {
      case "grid":
        return <MainList />;
      case "masonry":
        return <MasonryList />;

      default:
        return <p>ERROR: No available template</p>;
    }
  };

  return (
    <main>
      {data && settings && !isRefetching ? templateSwitcher() : <Spin />}
    </main>
  );
};

export default LayoutController;
