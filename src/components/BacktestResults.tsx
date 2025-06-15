
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PlayCircle, Download, Calendar } from 'lucide-react';

// Mock backtest data
const generateBacktestData = () => {
  const data = [];
  let portfolioValue = 50000;
  let benchmarkValue = 50000;
  
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (365 - i));
    
    portfolioValue += (Math.random() - 0.45) * 500; // Slightly positive bias
    benchmarkValue += (Math.random() - 0.48) * 300; // Market performance
    
    data.push({
      date: date.toISOString().split('T')[0],
      portfolio: portfolioValue,
      benchmark: benchmarkValue,
      drawdown: Math.max(0, (Math.max(...data.map(d => d?.portfolio || portfolioValue)) - portfolioValue) / Math.max(...data.map(d => d?.portfolio || portfolioValue)) * 100)
    });
  }
  return data;
};

const monthlyReturns = [
  { month: 'Jan', returns: 8.2 },
  { month: 'Feb', returns: -2.1 },
  { month: 'Mar', returns: 15.7 },
  { month: 'Apr', returns: 4.3 },
  { month: 'May', returns: -5.8 },
  { month: 'Jun', returns: 12.4 },
  { month: 'Jul', returns: 3.9 },
  { month: 'Aug', returns: 7.6 },
  { month: 'Sep', returns: -1.2 },
  { month: 'Oct', returns: 9.8 },
  { month: 'Nov', returns: 6.1 },
  { month: 'Dec', returns: 2.7 }
];

export const BacktestResults = () => {
  const [backtestData] = useState(generateBacktestData());
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [isBacktesting, setIsBacktesting] = useState(false);

  const runBacktest = () => {
    setIsBacktesting(true);
    // Simulate backtest execution
    setTimeout(() => {
      setIsBacktesting(false);
    }, 3000);
  };

  const finalValue = backtestData[backtestData.length - 1]?.portfolio || 50000;
  const totalReturn = ((finalValue - 50000) / 50000) * 100;
  const maxDrawdown = Math.max(...backtestData.map(d => d.drawdown));

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Backtest Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="start-date" className="text-white">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-white">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={runBacktest}
                disabled={isBacktesting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {isBacktesting ? 'Running...' : 'Run Backtest'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
              </div>
              <div className="text-sm text-slate-400">Total Return</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">1.34</div>
              <div className="text-sm text-slate-400">Sharpe Ratio</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{maxDrawdown.toFixed(2)}%</div>
              <div className="text-sm text-slate-400">Max Drawdown</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">127</div>
              <div className="text-sm text-slate-400">Total Trades</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Portfolio Performance</CardTitle>
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={backtestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Line type="monotone" dataKey="portfolio" stroke="#3B82F6" strokeWidth={2} name="Strategy" dot={false} />
                <Line type="monotone" dataKey="benchmark" stroke="#6B7280" strokeWidth={2} name="Benchmark" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Monthly Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Bar dataKey="returns" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
