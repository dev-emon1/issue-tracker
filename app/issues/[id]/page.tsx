import { prisma } from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { StatusBadge } from "@/app/components";

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
    <Box className="max-w-3xl">
      <Heading>{issue.title}</Heading>
      <Flex align="center" gap="4" className="my-2">
        <StatusBadge status={issue.status} />
        <Text size="2">{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card variant="surface" className="p-4 mb-4 prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  );
};

export default IssueDetailsPage;
