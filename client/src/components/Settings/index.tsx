import { Button, Flex, Input, Spin, Typography } from "antd";
import { useSettings } from "../../api/hooks/settings";
import { useCallback, useEffect } from "react";
import { usePosts } from "../../api/hooks/posts";
import { useUsers } from "../../api/hooks/users";

const Settings = () => {
  const { data, isLoading, refetch, isRefetching } = useSettings();
  const { refetch: refetchPosts } = usePosts()
  const { refetch: refetchUsers } = useUsers();

  const handleRefetch = useCallback(() => {
    refetch();
    refetchPosts();
    refetchUsers();
  }, [refetch, refetchPosts, refetchUsers]);

  useEffect(() => {
    handleRefetch()
  }, [handleRefetch])

  return (
    <Flex vertical gap="middle">
      {isLoading || isRefetching ? (
        <Spin />
      ) : (
        <>
          <Button onClick={handleRefetch}>Refresh</Button>
          <div>
            <Typography.Title type="success" level={5}>Template</Typography.Title>
            <Input readOnly value={data?.layout.current} />
          </div>
          <div>
            <Typography.Title type="success" level={5}>Card</Typography.Title>
            <Input readOnly value={data?.template} />
          </div>
          <div>
            <Typography.Title type="success" level={5}>Navigation</Typography.Title>
            <Input readOnly value={data?.navigation} />
          </div>
          <div>
            <Typography.Title type="success" level={5}>Columns</Typography.Title>
            <Input readOnly value={data?.layout.params[data?.layout.current].columns} />
          </div>
          <div>
            <Typography.Title type="success" level={5}>Rows</Typography.Title>
            <Input readOnly value={data?.layout.params[data?.layout.current].rows} />
          </div>
        </>
      )}
    </Flex>
  );
};

export default Settings;
