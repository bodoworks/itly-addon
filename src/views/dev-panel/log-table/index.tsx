import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { format } from "date-fns";
import dot from "dot-object";
import isEmpty from "lodash/isEmpty";
import React, { ReactElement, useState } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectLogs } from "../../../redux/selectors";
import { Log } from "../../../types";
import { Toolbar } from "./toolbar";

const TableContainer = styled.div`
    padding-top: 10px;
`;

export function LogTable(): ReactElement {
    const logs = useSelector(selectLogs);
    const [filterText, setFilterText] = useState("");
    const [flattenArgs, setFlattenArgs] = useState(false);

    function onFilterEventChange(value: string): void {
        setFilterText(value);
    }

    function onFlattenArgsChange(checked: boolean): void {
        setFlattenArgs(checked);
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
            width: "7%",
            render(tstamp): ReactElement {
                return <span>{format(tstamp, "HH:mm:ss.SSS")}</span>;
            },
            defaultSortOrder: "descend",
            sorter(a, b): number {
                return a.tstamp - b.tstamp;
            },
        },
        {
            title: "Event",
            dataIndex: "event",
            width: "10%",
            render(event): ReactElement {
                return <span>{event}</span>;
            },
            sorter(a, b): number {
                return String(a.event).localeCompare(String(b.event));
            },
        },
        {
            title: "Properties",
            dataIndex: "properties",
            width: "35%",
            render(args): ReactElement {
                const newArgs = flattenArgs ? dot.dot(args ?? {}) : args;

                if (isEmpty(newArgs)) {
                    return <span />;
                }

                return (
                    <ReactJson
                        src={newArgs}
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
                onFilterEventChange={onFilterEventChange}
                onFlattenArgsChange={onFlattenArgsChange}
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
