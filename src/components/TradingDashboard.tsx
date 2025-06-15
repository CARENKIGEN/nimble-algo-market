
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketData } from './MarketData';
import { Portfolio } from './Portfolio';
import { TradingStrategy } from './TradingStrategy';
import { BacktestResults } from './BacktestResults';
import { RiskManagement } from './RiskManagement';
import { TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';

export const TradingDashboard = () => {
  const [totalPnL, setTotalPnL] = useState(1247.83);
  const [portfolioValue, setPortfolioValue] = useState(50000);
  const [winRate, setWinRate] = useState(67.4);
  const [isTrading, setIsTrading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Algorithmic Trading Bot
          </h1>
          <p className="text-slate-400">Professional cryptocurrency trading platform</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Total P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500">+12.4% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                ${portfolioValue.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Total assets</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {winRate}%
              </div>
              <p className="text-xs text-slate-500">Last 30 trades</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isTrading ? 'text-blue-400' : 'text-orange-400'}`}>
                {isTrading ? 'Active' : 'Paper'}
              </div>
              <p className="text-xs text-slate-500">Trading mode</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-800">Dashboard</TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-800">Portfolio</TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-slate-800">Strategy</TabsTrigger>
            <TabsTrigger value="backtest" className="data-[state=active]:bg-slate-800">Backtest</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-slate-800">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketData />
              <Portfolio />
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Portfolio />
          </TabsContent>

          <TabsContent value="strategy">
            <TradingStrategy />
          </TabsContent>

          <TabsContent value="backtest">
            <BacktestResults />
          </TabsContent>

          <TabsContent value="risk">
            <RiskManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
