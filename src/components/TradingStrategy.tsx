
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, Settings } from 'lucide-react';

export const TradingStrategy = () => {
  const [strategyEnabled, setStrategyEnabled] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('sma_crossover');
  const [parameters, setParameters] = useState({
    fastMA: 9,
    slowMA: 21,
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    positionSize: 10
  });

  const strategies = [
    { value: 'sma_crossover', label: 'SMA Crossover', description: 'Simple Moving Average crossover strategy' },
    { value: 'rsi_mean_reversion', label: 'RSI Mean Reversion', description: 'RSI-based mean reversion strategy' },
    { value: 'bollinger_bands', label: 'Bollinger Bands', description: 'Bollinger Bands breakout strategy' },
    { value: 'macd_divergence', label: 'MACD Divergence', description: 'MACD signal line crossover strategy' }
  ];

  const handleParameterChange = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Trading Strategy Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="strategy-select" className="text-white">Strategy Type</Label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select a strategy" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {strategies.map((strategy) => (
                      <SelectItem key={strategy.value} value={strategy.value} className="text-white hover:bg-slate-700">
                        <div>
                          <div className="font-medium">{strategy.label}</div>
                          <div className="text-sm text-slate-400">{strategy.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="strategy-enabled" 
                  checked={strategyEnabled}
                  onCheckedChange={setStrategyEnabled}
                />
                <Label htmlFor="strategy-enabled" className="text-white">
                  Enable Strategy
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fast-ma" className="text-white">Fast MA Period</Label>
                  <Input
                    id="fast-ma"
                    type="number"
                    value={parameters.fastMA}
                    onChange={(e) => handleParameterChange('fastMA', parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="slow-ma" className="text-white">Slow MA Period</Label>
                  <Input
                    id="slow-ma"
                    type="number"
                    value={parameters.slowMA}
                    onChange={(e) => handleParameterChange('slowMA', parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rsi-period" className="text-white">RSI Period</Label>
                  <Input
                    id="rsi-period"
                    type="number"
                    value={parameters.rsiPeriod}
                    onChange={(e) => handleParameterChange('rsiPeriod', parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="position-size" className="text-white">Position Size (%)</Label>
                  <Input
                    id="position-size"
                    type="number"
                    value={parameters.positionSize}
                    onChange={(e) => handleParameterChange('positionSize', parseInt(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={() => setStrategyEnabled(!strategyEnabled)}
              className={strategyEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            >
              {strategyEnabled ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Strategy
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Strategy
                </>
              )}
            </Button>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              Test Strategy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Strategy Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">67.4%</div>
              <div className="text-sm text-slate-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">1.85</div>
              <div className="text-sm text-slate-400">Profit Factor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">-8.2%</div>
              <div className="text-sm text-slate-400">Max Drawdown</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">1.2</div>
              <div className="text-sm text-slate-400">Sharpe Ratio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
