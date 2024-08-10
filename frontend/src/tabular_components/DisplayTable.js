import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RangeSelector from './RangeSelector';
import CreateRow from './CreateRow';
import ModifyRow from './ModifyRow';
import ColumnDropdown from './ColumnDropdown';
import ColumnStatistics from './ColumnStatistics';
import SortDropdown from './SortDropdown';
import ExportCSV from './ExportCSV'; 

const DisplayTable = () => {
    const [data, setData] = useState({ rows: [{}], table_name: '', row_count: 0 });
    const [selectedColumn, setSelectedColumn] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tabular_data/display');
            setData(response.data);
            if (response.data.rows.length > 0) {
                const firstColumn = Object.keys(response.data.rows[0]).find(key => key !== 'uuid');
                setSelectedColumn(firstColumn);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDataFetched = (newData) => {
        setData(newData);
    };

    const handleModification = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columnNames = Object.entries(data.rows[0])
        .filter(([key]) => key !== 'uuid')
        .map(([key]) => key);

    return (
        <div className="spacy y-8">
            {data.table_name !== '' ? (
                <>
                    <div className="p-4 sm:p-8 my-4 sm:my-8 bg-white rounded-lg shadow-md">
                        <div className="text-center my-8 sm:my-12">
                            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 mb-2 sm:mb-4">
                                Table: {data.table_name}
                            </p>
                            <p className="text-sm sm:text-lg md:text-xl text-blue-950 font-light">
                                Perform CRUD operations, sort, and explore detailed insights for better data handling
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:justify-end">
                            <ExportCSV />
                            <ColumnDropdown 
                                columns={columnNames} 
                                selectedColumn={selectedColumn} 
                                onColumnChange={setSelectedColumn} 
                            />
                            <SortDropdown data={data} setData={setData} />
                            <RangeSelector total={data.row_count} onDataFetched={handleDataFetched} />
                        </div>

                        <div className="overflow-x-auto mb-8 w-full">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-blue-900 text-white">
                                        {columnNames.map((col) => (
                                            <th key={col} className="py-2 px-3 sm:px-4 border-b text-sm sm:text-lg font-semibold">
                                                {col}
                                            </th>
                                        ))}
                                        <th className="py-2 px-3 sm:px-4 border-b text-sm sm:text-lg font-semibold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.rows.map((row) => (
                                        <ModifyRow
                                            key={row['uuid']}
                                            row={row}
                                            columns={columnNames}
                                            onModify={handleModification}
                                        />
                                    ))}
                                    <CreateRow
                                        columns={columnNames}
                                        onCreate={fetchData}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8">
                        <ColumnStatistics selectedColumn={selectedColumn} />
                    </div>
                </>
            ) : (
                <>
                <h2 className="text-5xl font-extrabold mb-4 text-center leading-tight">
                    Upload a CSV File to Get Started
                </h2>
                <p className="text-xl text-gray-300 mb-8 text-center font-light">
                    View and manipulate your uploaded csv below.
                </p>
                </>
            )}
        </div>
    );
};

export default DisplayTable;
