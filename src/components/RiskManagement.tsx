
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

export const RiskManagement = () => {
  const [stopLossEnabled, setStopLossEnabled] = useState(true);
  const [takeProfitEnabled, setTakeProfitEnabled] = useState(true);
  const [maxDrawdownEnabled, setMaxDrawdownEnabled] = useState(true);
  
  const [riskSettings, setRiskSettings] = useState({
    stopLossPercent: 5,
    takeProfitPercent: 10,
    maxDrawdownPercent: 15,
    maxPositionSize: 20,
    maxDailyLoss: 1000,
    riskPerTrade: 2
  });

  const handleRiskSettingChange = (key: string, value: number) => {
    setRiskSettings(prev => ({ ...prev, [key]: value }));
  };

  const currentDrawdown = 8.3;
  const dailyPnL = -234.56;
  const riskScore = 6.7; // Out of 10

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Risk Management Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="stop-loss" className="text-white">Stop Loss</Label>
                <Switch 
                  id="stop-loss"
                  checked={stopLossEnabled}
                  onCheckedChange={setStopLossEnabled}
                />
              </div>
              {stopLossEnabled && (
                <div>
                  <Label className="text-slate-300">Stop Loss Percentage: {riskSettings.stopLossPercent}%</Label>
                  <Slider
                    value={[riskSettings.stopLossPercent]}
                    onValueChange={(value) => handleRiskSettingChange('stopLossPercent', value[0])}
                    max={20}
                    min={1}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="take-profit" className="text-white">Take Profit</Label>
                <Switch 
                  id="take-profit"
                  checked={takeProfitEnabled}
                  onCheckedChange={setTakeProfitEnabled}
                />
              </div>
              {takeProfitEnabled && (
                <div>
                  <Label className="text-slate-300">Take Profit Percentage: {riskSettings.takeProfitPercent}%</Label>
                  <Slider
                    value={[riskSettings.takeProfitPercent]}
                    onValueChange={(value) => handleRiskSettingChange('takeProfitPercent', value[0])}
                    max={50}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="max-drawdown" className="text-white">Max Drawdown Limit</Label>
                <Switch 
                  id="max-drawdown"
                  checked={maxDrawdownEnabled}
                  onCheckedChange={setMaxDrawdownEnabled}
                />
              </div>
              {maxDrawdownEnabled && (
                <div>
                  <Label className="text-slate-300">Max Drawdown: {riskSettings.maxDrawdownPercent}%</Label>
                  <Slider
                    value={[riskSettings.maxDrawdownPercent]}
                    onValueChange={(value) => handleRiskSettingChange('maxDrawdownPercent', value[0])}
                    max={30}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Max Position Size: {riskSettings.maxPositionSize}%</Label>
                <Slider
                  value={[riskSettings.maxPositionSize]}
                  onValueChange={(value) => handleRiskSettingChange('maxPositionSize', value[0])}
                  max={50}
                  min={5}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="max-daily-loss" className="text-white">Max Daily Loss ($)</Label>
                <Input
                  id="max-daily-loss"
                  type="number"
                  value={riskSettings.maxDailyLoss}
                  onChange={(e) => handleRiskSettingChange('maxDailyLoss', parseFloat(e.target.value))}
                  className="bg-slate-800 border-slate-700 text-white mt-2"
                />
              </div>

              <div>
                <Label className="text-slate-300">Risk Per Trade: {riskSettings.riskPerTrade}%</Label>
                <Slider
                  value={[riskSettings.riskPerTrade]}
                  onValueChange={(value) => handleRiskSettingChange('riskPerTrade', value[0])}
                  max={10}
                  min={0.5}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Save Risk Settings
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Current Drawdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-400">{currentDrawdown}%</div>
              <Progress value={currentDrawdown} max={riskSettings.maxDrawdownPercent} className="h-2" />
              <p className="text-xs text-slate-500">
                {(riskSettings.maxDrawdownPercent - currentDrawdown).toFixed(1)}% until limit
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Daily P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${dailyPnL.toFixed(2)}
              </div>
              <Progress 
                value={Math.abs(dailyPnL)} 
                max={riskSettings.maxDailyLoss} 
                className="h-2" 
              />
              <p className="text-xs text-slate-500">
                ${(riskSettings.maxDailyLoss - Math.abs(dailyPnL)).toFixed(2)} until limit
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${
                riskScore <= 3 ? 'text-green-400' : 
                riskScore <= 7 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {riskScore}/10
              </div>
              <Progress value={riskScore * 10} className="h-2" />
              <p className="text-xs text-slate-500">
                {riskScore <= 3 ? 'Low Risk' : riskScore <= 7 ? 'Moderate Risk' : 'High Risk'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Risk Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <div className="text-yellow-400 font-medium">Approaching Drawdown Limit</div>
                <div className="text-sm text-slate-400">Current drawdown is 55% of maximum allowed</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <Shield className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <div className="text-blue-400 font-medium">Risk Management Active</div>
                <div className="text-sm text-slate-400">All risk controls are properly configured and active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
