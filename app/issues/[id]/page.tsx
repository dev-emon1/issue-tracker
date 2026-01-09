import StatusBadge from "@/app/components/StatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = Number(id);
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex align="center" gap="4" className="my-2">
        <StatusBadge status={issue.status} />
        <Text size="2">{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card variant="surface" className="p-4 mb-4 prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
