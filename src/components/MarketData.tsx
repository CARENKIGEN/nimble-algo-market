
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Mock data for demonstration
const generateMockData = () => {
  const data = [];
  let price = 50000;
  for (let i = 0; i < 100; i++) {
    price += (Math.random() - 0.5) * 1000;
    data.push({
      time: new Date(Date.now() - (100 - i) * 60000).toLocaleTimeString(),
      price: price,
      volume: Math.random() * 1000000
    });
  }
  return data;
};

export const MarketData = () => {
  const [marketData, setMarketData] = useState(generateMockData());
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');

  const cryptoPairs = [
    { symbol: 'BTC/USDT', price: 51247.83, change: 2.34, changePercent: 4.78 },
    { symbol: 'ETH/USDT', price: 3021.45, change: -45.67, changePercent: -1.49 },
    { symbol: 'ADA/USDT', price: 0.5847, change: 0.0234, changePercent: 4.17 },
    { symbol: 'SOL/USDT', price: 124.73, change: 8.92, changePercent: 7.71 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cryptoPairs.map((pair) => (
              <div 
                key={pair.symbol}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPair === pair.symbol ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                }`}
                onClick={() => setSelectedPair(pair.symbol)}
              >
                <div className="flex items-center space-x-3">
                  <div className="font-medium text-white">{pair.symbol}</div>
                  {pair.changePercent > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">${pair.price.toLocaleString()}</div>
                  <div className={`text-sm ${pair.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {pair.change > 0 ? '+' : ''}{pair.change.toFixed(2)} ({pair.changePercent > 0 ? '+' : ''}{pair.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">{selectedPair} Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
