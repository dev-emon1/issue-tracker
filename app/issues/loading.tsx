"use client";
import { Skeleton, IssueActions } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const LoadingSkeleton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // show skeleton only if loading takes >= 200ms
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const issues = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
  }));

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Skeleton width={140} />
                <div className="block md:hidden mt-1">
                  <Skeleton width={80} />
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <Skeleton width={80} />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <Skeleton width={100} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingSkeleton;
