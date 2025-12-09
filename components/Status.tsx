"use client";


import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Wifi, Battery, Server } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const data = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: Math.floor(Math.random() * 30) + 70,
}));

const StatusCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-glass/5 border border-glass/10 p-6 rounded-2xl flex items-center justify-between">
        <div>
            <p className="text-txt-muted text-xs font-mono uppercase tracking-widest mb-1">{title}</p>
            <p className="text-2xl font-bold text-txt-main">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-opacity-20 ${color.replace('text-', 'bg-')} ${color}`}>
            {icon}
        </div>
    </div>
);

const Status: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const activities = t('status.activities') as any[];
  
  const chartColor = theme === 'dark' ? '#06b6d4' : '#0891b2';

  return (
    <div className="h-full overflow-y-auto p-4 md:p-12 pb-24">
       <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <h2 className="text-2xl font-bold text-txt-main">{t('status.title')}: <span className="text-green-500">{t('status.operational')}</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatusCard title={t('status.availability')} value="99.9%" icon={<Activity size={24} />} color="text-green-400" />
            <StatusCard title={t('status.focus')} value={t('status.focusVal')} icon={<Cpu size={24} />} color="text-purple-400" />
            <StatusCard title={t('status.caffeine')} value="85%" icon={<Battery size={24} />} color="text-orange-400" />
            <StatusCard title={t('status.network')} value="500 Mbps" icon={<Wifi size={24} />} color="text-cyan-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-glass/5 border border-glass/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2 text-txt-main"><Server size={18} /> {t('status.latency')}</h3>
                    <span className="text-xs font-mono text-green-400">42ms</span>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} dot={false} />
                            <YAxis hide domain={[0, 100]} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-glass/5 border border-glass/10 rounded-2xl p-6">
                <h3 className="font-bold mb-6 text-txt-main">{t('status.recent')}</h3>
                <div className="space-y-4">
                    {activities.map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className={`w-2 h-2 mt-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-purple-500'} shadow-[0_0_8px_currentColor] opacity-80`} />
                            <div>
                                <p className="text-sm text-txt-main">{item.text}</p>
                                <p className="text-xs text-txt-muted">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Status;
