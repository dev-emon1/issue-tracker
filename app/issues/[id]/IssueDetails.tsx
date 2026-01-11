import { StatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3 my-2">
        <StatusBadge status={issue.status} />
        <Text size="2">{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card variant="surface" className="p-2 mb-4 prose w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
