import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { format } from "date-fns";
import isEmpty from "lodash/isEmpty";
import React, { ReactElement, useState } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectLogs } from "../../../redux/selectors";
import { LogType } from "../../../redux/types";
import { Log, SegmentType } from "../../../types";
import { Toolbar } from "./toolbar";

const TableContainer = styled.div`
    padding-top: 10px;
`;

interface Props {
    logType: LogType;
}

export function LogTable({ logType }: Props): ReactElement {
    const logs = useSelector(selectLogs(logType));
    const [filterText, setFilterText] = useState("");

    function onFilterEventChange(value: string): void {
        setFilterText(value);
    }

    function getFilteredLogs(): Log[] {
        return logs.filter((log: Log): boolean => {
            return String(log.event)
                .toLowerCase()
                .includes(filterText.toLowerCase());
        });
    }

    const filteredLogs = getFilteredLogs();

    const columns: ColumnProps<Log>[] = [
        {
            title: "Time",
            dataIndex: "tstamp",
            width: "5%",
            render(tstamp: Log["tstamp"]): ReactElement {
                try {
                    return <span>{format(tstamp, "HH:mm:ss.SSS")}</span>;
                } catch {
                    return <span>Error: {tstamp}</span>;
                }
            },
            defaultSortOrder: "descend",
            sorter(a: Log, b: Log): number {
                return a.tstamp - b.tstamp;
            },
        },
        {
            title: "Domain",
            dataIndex: "domain",
            width: "7%",
            render(domain: Log["domain"]): ReactElement {
                return <span>{domain}</span>;
            },
            sorter(a: Log, b: Log): number {
                return String(a.domain).localeCompare(String(b.domain));
            },
        },
        ...(logType === LogType.SEGMENT
            ? [
                  {
                      title: "Type",
                      dataIndex: "segmentType",
                      width: "7%",
                      render(segmentType: SegmentType): ReactElement {
                          return <span>{segmentType}</span>;
                      },
                  },
              ]
            : []),
        {
            title: "Event",
            dataIndex: "event",
            width: "10%",
            render(event: Log["event"]): ReactElement {
                return <span>{event}</span>;
            },
            sorter(a: Log, b: Log): number {
                return String(a.event).localeCompare(String(b.event));
            },
        },
        {
            title: "Properties",
            dataIndex: "properties",
            width: "35%",
            render(args: Log["properties"]): ReactElement {
                if (!args || isEmpty(args)) {
                    return <span />;
                }

                return (
                    <ReactJson
                        src={args}
                        theme="rjv-default"
                        displayDataTypes={false}
                        collapsed
                        name={false}
                    />
                );
            },
        },
    ];

    return (
        <div>
            <Toolbar
                logType={logType}
                onFilterEventChange={onFilterEventChange}
            />

            <TableContainer>
                <Table
                    dataSource={filteredLogs}
                    columns={columns}
                    rowKey="_guid"
                    size="small"
                    showSorterTooltip={false}
                    pagination={{ pageSize: 30 }}
                />
            </TableContainer>
        </div>
    );
}
