import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const timeRanges = ['24h', '1d', '3d', '1w', '3w', '1m'];
const data = {
  labels: timeRanges,
  datasets: [
    {
      label: 'Points',
      data: [4000, 7000, 2000, 6000, 3000, 1500],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      tension: 0.4
    }
  ]
};

const chartConfig = {
  type: 'line' as const,
  data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 8000,
        ticks: {
          stepSize: 2000,
          callback: (value: number) => `${value / 1000}k`
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
};

export function StatisticsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        // Create new chart
        chartInstance.current = new Chart(ctx, chartConfig);
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}