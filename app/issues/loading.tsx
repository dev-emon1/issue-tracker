"use client";

import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "../components/IssueActions";

const LoadingSkeleton = () => {
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
                <Skeleton width={120} />
                <div className="block md:hidden">
                  <Skeleton width={80} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton width={80} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton width={80} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingSkeleton;
