import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVizGallery = () => {
    const publicationData = [
        { year: '2018', papers: 2 },
        { year: '2019', papers: 3 },
        { year: '2020', papers: 5 },
        { year: '2021', papers: 4 },
        { year: '2022', papers: 7 },
        { year: '2023', papers: 6 },
    ];

    const topicData = [
        { name: 'Statistics', value: 40 },
        { name: 'Machine Learning', value: 30 },
        { name: 'Biostats', value: 20 },
        { name: 'Other', value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: 'var(--vscode-editor-bg)', border: '1px solid var(--vscode-border)', padding: '10px' }}>
                    <p style={{ margin: 0 }}>{`${label ? label + ' : ' : ''}${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-4 h-100" style={{ color: 'var(--vscode-text)', overflowY: 'auto' }}>
            <h2 className="mb-4">Data Visualization Gallery</h2>
            <p className="mb-4" style={{ opacity: 0.8 }}>Interactive charts powered by Recharts.</p>

            <div className="row g-4">
                {/* Line Chart */}
                <div className="col-12 col-xl-6">
                    <div className="p-3 rounded h-100" style={{ border: '1px solid var(--vscode-border)', backgroundColor: 'var(--vscode-editor-bg)' }}>
                        <h5 className="mb-3 text-center">Publication Growth</h5>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={publicationData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-editor-lineHighlightBorder)" />
                                    <XAxis dataKey="year" stroke="var(--vscode-text)" />
                                    <YAxis stroke="var(--vscode-text)" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="papers" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="col-12 col-xl-6">
                    <div className="p-3 rounded h-100" style={{ border: '1px solid var(--vscode-border)', backgroundColor: 'var(--vscode-editor-bg)' }}>
                        <h5 className="mb-3 text-center">Citations per Year</h5>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={publicationData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--vscode-editor-lineHighlightBorder)" />
                                    <XAxis dataKey="year" stroke="var(--vscode-text)" />
                                    <YAxis stroke="var(--vscode-text)" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="papers" fill="#82ca9d" name="Citations (x10)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="col-12 col-xl-6">
                    <div className="p-3 rounded h-100" style={{ border: '1px solid var(--vscode-border)', backgroundColor: 'var(--vscode-editor-bg)' }}>
                        <h5 className="mb-3 text-center">Research Topics</h5>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={topicData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {topicData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataVizGallery;
