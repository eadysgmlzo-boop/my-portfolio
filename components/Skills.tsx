"use client";


import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Skill } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const skillsData: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 80, category: 'Backend' },
  { name: 'Gemini API', level: 92, category: 'AI/ML' },
  { name: 'Tailwind', level: 98, category: 'Frontend' },
  { name: 'Figma', level: 75, category: 'Design' },
];

const radarData = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
  { subject: 'AI/LLM', A: 90, fullMark: 100 },
  { subject: 'UI/UX', A: 80, fullMark: 100 },
  { subject: 'Soft Skills', A: 85, fullMark: 100 },
];

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Colors based on theme for charts
  const barColor1 = theme === 'dark' ? '#06b6d4' : '#0891b2';
  const barColor2 = theme === 'dark' ? '#8b5cf6' : '#7c3aed';
  const gridColor = theme === 'dark' ? '#334155' : '#cbd5e1';
  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tooltipBg = theme === 'dark' ? '#1a1a2e' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#e2e8f0';
  const tooltipText = theme === 'dark' ? '#ffffff' : '#0f172a';

  return (
    <div className="h-full overflow-y-auto p-4 md:p-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-txt-main">{t('skills.title')}</h2>
        <p className="text-txt-muted mb-12 max-w-2xl">
          {t('skills.desc')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Bar Chart Section */}
          <div className="bg-glass/5 border border-glass/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />
            <h3 className="text-xl font-mono mb-6 flex items-center gap-2 text-txt-main">
              <span className="text-primary">&gt;</span> {t('skills.core')}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(var(--color-glass), 0.05)' }}
                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }}
                  />
                  <Bar dataKey="level" barSize={12} radius={[0, 4, 4, 0]}>
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? barColor1 : barColor2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart Section */}
          <div className="bg-glass/5 border border-glass/10 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-full -ml-16 -mb-16 pointer-events-none" />
             <h3 className="text-xl font-mono mb-6 flex items-center gap-2 text-txt-main">
              <span className="text-secondary">&gt;</span> {t('skills.radar')}
            </h3>
            <div className="h-[300px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke={gridColor} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke={barColor2}
                    strokeWidth={2}
                    fill={barColor2}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Other Tools Grid */}
        <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-txt-main">{t('skills.other')}</h3>
            <div className="flex flex-wrap gap-4">
                {['Git', 'Docker', 'AWS', 'Firebase', 'Next.js', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redux', 'Jest'].map((tool, i) => (
                    <motion.span 
                        key={tool}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 bg-glass/5 border border-glass/10 rounded-lg text-sm text-txt-muted hover:border-primary hover:text-primary transition-colors cursor-default"
                    >
                        {tool}
                    </motion.span>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
