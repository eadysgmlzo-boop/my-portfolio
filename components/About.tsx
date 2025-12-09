"use client";


import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Award, Briefcase, GraduationCap, Activity, Video, Users, CheckCircle, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  // Safely cast translations to expected types
  const profile = t('about.profile') as { role: string; email: string; phone: string; status: string; location: string };
  const bio = t('about.bio') as { title: string; p1: string; p2: string };
  const experience = t('about.experience') as { title: string; items: any[] };
  const education = t('about.education') as { title: string; school: string; grad: string; activities: any[] };
  const currentFocus = t('about.currentFocus') as { title: string; items: string[] };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity size={20} />;
      case 'Video': return <Video size={20} />;
      case 'Users': return <Users size={20} />;
      default: return <Award size={20} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 pb-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8"
      >
        
        {/* Left Column: Profile Card */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
            <motion.div variants={itemVariants} className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                    src="/profile-avatar.png"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-3xl font-bold text-white mb-1">Tim Dev</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-sm mb-4">
                        {profile.role}
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white/80 text-sm">
                            <Mail size={16} className="text-primary" />
                            <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 text-sm">
                            <Phone size={16} className="text-secondary" />
                            <span>{profile.phone}</span>
                        </div>
                         <div className="flex items-center gap-3 text-white/80 text-sm">
                            <MapPin size={16} className="text-accent" />
                            <span>{profile.location}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Status Card */}
            <motion.div variants={itemVariants} className="bg-glass/5 backdrop-blur-sm border border-glass/10 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl text-green-500">
                         <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-txt-muted uppercase tracking-wider">Current Status</p>
                        <p className="text-txt-main font-bold">{profile.status}</p>
                    </div>
                </div>
            </motion.div>

            {/* Recent Focus / Tasks Card */}
            <motion.div variants={itemVariants} className="bg-glass/5 backdrop-blur-sm border border-glass/10 rounded-2xl p-6 flex-1">
                 <h4 className="text-xs font-bold text-txt-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target size={16} className="text-accent" />
                    {currentFocus?.title}
                 </h4>
                 <div className="space-y-3">
                    {currentFocus?.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-surface/30 rounded-xl border border-glass/5 hover:border-primary/20 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
                            <span className="text-sm text-txt-main leading-snug">{item}</span>
                        </div>
                    ))}
                 </div>
            </motion.div>
        </div>

        {/* Right Column: Bio, Exp, Edu */}
        <div className="w-full md:w-2/3 space-y-8">
            
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-surface/50 to-glass/5 backdrop-blur-md border border-glass/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
                
                <h2 className="text-3xl font-bold mb-6 text-txt-main flex items-center gap-3">
                    <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                    {bio.title}
                </h2>
                <div className="prose prose-lg prose-invert text-txt-muted leading-relaxed space-y-4">
                    <p>{bio.p1}</p>
                    <p className="text-txt-main font-medium italic pl-4 border-l-2 border-secondary/50">
                        "{bio.p2}"
                    </p>
                </div>
            </motion.div>

            {/* Experience Section */}
            <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-6 text-txt-main flex items-center gap-3">
                    <Briefcase size={24} className="text-primary" /> {experience.title}
                </h2>
                <div className="space-y-6">
                    {experience.items.map((job: any, index: number) => (
                        <div key={index} className="bg-glass/5 border border-glass/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-txt-main">{job.role}</h3>
                                <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">{job.period}</span>
                            </div>
                            <p className="text-secondary font-medium mb-4">{job.company}</p>
                            <p className="text-txt-muted mb-4">{job.desc}</p>
                            <div className="space-y-2">
                                {job.achievements.map((achievement: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-txt-muted/80">
                                        <CheckCircle size={14} className="text-accent mt-1 flex-shrink-0" />
                                        <span>{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Education & Activities */}
            <motion.div variants={itemVariants}>
                 <h2 className="text-2xl font-bold mb-6 text-txt-main flex items-center gap-3">
                    <GraduationCap size={24} className="text-secondary" /> {education.title}
                </h2>
                
                <div className="bg-glass/5 border border-glass/10 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center">
                         <div>
                            <h3 className="text-xl font-bold text-txt-main">{education.school}</h3>
                            <p className="text-txt-muted">Bachelor's Degree</p>
                         </div>
                         <div className="text-right">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                {education.grad}
                            </span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {education.activities.map((act: any, idx: number) => (
                        <div key={idx} className="bg-glass/5 p-4 rounded-xl border border-glass/5 flex flex-col gap-3 hover:bg-glass/10 transition-colors">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${idx === 0 ? 'bg-orange-500' : idx === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}>
                                {getActivityIcon(act.icon)}
                            </div>
                            <div>
                                <h4 className="font-bold text-txt-main text-sm mb-1">{act.name}</h4>
                                <p className="text-xs text-txt-muted leading-relaxed">{act.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default About;
