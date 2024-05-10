import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CryptoChart = ({ data, name }) => {
  // Reformatăm datele pentru a fi compatibile cu recharts
  const formattedData = data.map((item, index) => ({ name: index, value: item }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;
