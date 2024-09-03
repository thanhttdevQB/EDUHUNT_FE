import { useRouter } from "next/navigation";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button icon={<LeftOutlined />} onClick={() => router.back()}>
      Back
    </Button>
  );
};

export default BackButton;
