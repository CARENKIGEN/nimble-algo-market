
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const portfolioData = [
  { name: 'BTC', value: 15000, percentage: 30, color: '#F7931A' },
  { name: 'ETH', value: 12500, percentage: 25, color: '#627EEA' },
  { name: 'ADA', value: 7500, percentage: 15, color: '#0033AD' },
  { name: 'SOL', value: 5000, percentage: 10, color: '#9945FF' },
  { name: 'USDT', value: 10000, percentage: 20, color: '#26A17B' }
];

const recentTrades = [
  { id: 1, pair: 'BTC/USDT', type: 'BUY', amount: 0.5, price: 51000, pnl: 247.50, time: '2 min ago' },
  { id: 2, pair: 'ETH/USDT', type: 'SELL', amount: 2.0, price: 3020, pnl: -45.00, time: '15 min ago' },
  { id: 3, pair: 'ADA/USDT', type: 'BUY', amount: 1000, price: 0.58, pnl: 125.30, time: '1 hour ago' },
];

export const Portfolio = () => {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              {portfolioData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">${item.value.toLocaleString()}</div>
                      <div className="text-slate-400 text-sm">{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    trade.type === 'BUY' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                  }`}>
                    {trade.type}
                  </div>
                  <div>
                    <div className="text-white font-medium">{trade.pair}</div>
                    <div className="text-slate-400 text-sm">{trade.amount} @ ${trade.price}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </div>
                  <div className="text-slate-400 text-sm">{trade.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
