"use client";

import { useEffect, useState, useRef } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock initial data
const initialData = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(Date.now() - (19 - i) * 1000).toISOString(),
  price: 100 + Math.random() * 10,
  isNew: false,
}));

export default function RealTimeChart() {
  const [data, setData] = useState(initialData);
  const [darkMode, setDarkMode] = useState(true);
  const [isRunning, setIsRunning] = useState(true);
  const prevDataRef = useRef([...initialData]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setData((currentData) => {
        prevDataRef.current = [...currentData];
        const lastPrice = currentData[currentData.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.5) * 2;
        const newDataPoint = {
          time: new Date().toISOString(),
          price: newPrice,
          isNew: true,
        };
        const updatedData = currentData.map((point) => ({ ...point, isNew: false }));
        return [...updatedData.slice(1), newDataPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-background min-h-screen p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>BTC/USD Real-Time Chart</CardTitle>
              <CardDescription>Live price updates every second</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Dark Mode</span>
              {/* <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} /> */}
              <span className="text-sm text-muted-foreground">Live Updates</span>
              {/* <Switch checked={isRunning} onCheckedChange={() => setIsRunning(!isRunning)} /> */}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line">
              <TabsList>
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
              </TabsList>
              <TabsContent value="line">
                <ChartContainer config={{ price: { label: "Price", color: "hsl(var(--chart-1))" } }}>
                  <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="time" tickFormatter={formatTime} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${Number(value).toFixed(2)}`} />} />
                    <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="area">
                <ChartContainer config={{ price: { label: "Price", color: "hsl(var(--chart-1))" } }}>
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="time" tickFormatter={formatTime} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${Number(value).toFixed(2)}`} />} />
                    <Area type="monotone" dataKey="price" stroke="var(--color-price)" fillOpacity={0.2} />
                  </AreaChart>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}