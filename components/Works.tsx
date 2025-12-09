"use client";


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, FolderOpen, LayoutGrid, List as ListIcon, X, CheckCircle, Layers, Trophy, AlertCircle, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Project } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorksProps {
  setSidebarVisible?: (visible: boolean) => void;
}

const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gradient-to-br from-surface to-glass/20 flex flex-col items-center justify-center text-txt-muted p-4`}>
        <ImageOff size={32} className="mb-2 opacity-50" />
        <span className="text-xs text-center opacity-70">Image not available</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

const Works: React.FC<WorksProps> = ({ setSidebarVisible }) => {
  const { t, language } = useLanguage();
  const projects = t('works.projects') as Project[];
  
  // Extract unique categories dynamically
  const categories = Array.from(new Set(projects.map(p => p.category)));
  
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update category when language changes
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
        setActiveCategory(categories[0]);
    }
  }, [language, projects, activeCategory]);

  // Handle Sidebar Visibility based on Modal State
  useEffect(() => {
    if (setSidebarVisible) {
      if (selectedId) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    }
    return () => {
      if (setSidebarVisible) setSidebarVisible(true);
    };
  }, [selectedId, setSidebarVisible]);

  // Reset image index when opening a new project
  useEffect(() => {
    if (selectedId) {
        setCurrentImageIndex(0);
    }
  }, [selectedId]);

  // Filter projects
  const filteredProjects = projects.filter(project => project.category === activeCategory);
  const selectedProject = projects.find(p => p.id === selectedId);

  // Helper to get all images for the carousel
  const getProjectImages = (project?: Project) => {
      if (!project) return [];
      return [project.image, ...(project.gallery || [])];
  };

  const projectImages = getProjectImages(selectedProject);

  const handleNextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-12 pb-24 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-txt-main">{t('works.title')}</h2>
            <p className="text-txt-muted">{t('works.desc')}</p>
          </div>

          {/* View Toggle */}
          <div className="flex bg-glass/5 rounded-lg p-1 border border-glass/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-surface shadow-sm text-primary' : 'text-txt-muted hover:text-txt-main'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-surface shadow-sm text-primary' : 'text-txt-muted hover:text-txt-main'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-glass/5 text-txt-muted hover:bg-glass/10 hover:text-txt-main border border-glass/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid/List */}
        <motion.div 
          layout
          className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layoutId={`card-container-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => { setSelectedId(project.id); }}
                className={`group cursor-pointer bg-glass/5 border border-glass/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 ${viewMode === 'list' ? 'flex flex-col md:flex-row h-auto md:h-56' : ''}`}
              >
                {/* Card Image */}
                <motion.div 
                  layoutId={`card-image-${project.id}`}
                  className={`relative overflow-hidden ${viewMode === 'list' ? 'w-full md:w-72 h-48 md:h-full shrink-0' : 'w-full aspect-video'}`}
                >
                   <ImageWithFallback 
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full flex justify-between items-center">
                           <span className="text-white text-xs font-mono uppercase tracking-wider">{t('works.modal.visit')}</span>
                           <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                               <ArrowUpRight size={16} />
                           </div>
                      </div>
                  </div>
                </motion.div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
                  {/* Subtle Glow Effect */}
                  <div className="absolute -right-10 -top-10 w-20 h-20 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors" />

                  <div>
                    <motion.h3 layoutId={`card-title-${project.id}`} className="text-xl font-bold text-txt-main mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </motion.h3>
                    <motion.p layoutId={`card-desc-${project.id}`} className="text-sm text-txt-muted line-clamp-2 mb-4">
                      {project.description}
                    </motion.p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-glass/10 rounded-md text-txt-muted/90 font-mono border border-glass/5 group-hover:border-primary/20 transition-colors">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="text-xs px-2.5 py-1 bg-glass/10 rounded-md text-txt-muted/90 font-mono border border-glass/5">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
             {/* Backdrop */}
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 md:p-8"
             >
                {/* Modal Container */}
                <motion.div
                    layoutId={`card-container-${selectedId}`}
                    className="w-full max-w-6xl h-full md:h-[85vh] bg-surface rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-glass/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 z-[70] p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
                    >
                        <X size={24} />
                    </button>

                    {/* Left: Visuals Carousel */}
                    <div className="w-full md:w-7/12 h-[35vh] md:h-full bg-black relative group select-none flex items-center justify-center bg-zinc-900">
                         <motion.div 
                             layoutId={`card-image-${selectedId}`} 
                             className="w-full h-full relative"
                         >
                            <AnimatePresence mode='wait'>
                                <motion.div 
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full"
                                >
                                    <ImageWithFallback
                                        src={projectImages[currentImageIndex]}
                                        alt={`${selectedProject.title} view ${currentImageIndex + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Gradient Overlay for Controls */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                            {/* Navigation Arrows */}
                            {projectImages.length > 1 && (
                                <>
                                    <button 
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {projectImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                                className={`h-1.5 rounded-full transition-all shadow-sm ${
                                                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/60'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                         </motion.div>
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-5/12 h-full overflow-y-auto p-6 md:p-10 bg-surface">
                        <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.2 }}
                        >
                            <motion.h2 layoutId={`card-title-${selectedId}`} className="text-3xl md:text-4xl font-bold text-txt-main mb-6 leading-tight">
                                {selectedProject.title}
                            </motion.h2>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-primary/5 text-primary rounded-lg text-sm font-mono border border-primary/10">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <motion.p layoutId={`card-desc-${selectedId}`} className="text-txt-muted leading-relaxed mb-8 text-lg font-light">
                                {selectedProject.fullDescription || selectedProject.description}
                            </motion.p>
                            
                            {/* Key Features */}
                            {selectedProject.features && (
                                <div className="mb-8 p-6 bg-glass/5 rounded-2xl border border-glass/10">
                                    <h3 className="font-bold text-txt-main mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                        <Layers size={18} className="text-accent" /> {t('works.modal.features')}
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedProject.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-txt-muted text-sm group">
                                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                                <span className="group-hover:text-txt-main transition-colors">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6 mb-8">
                                {/* Challenges */}
                                {selectedProject.challenges && (
                                    <div className="bg-glass/5 p-5 rounded-2xl border border-glass/10">
                                        <h4 className="font-bold text-txt-main mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <AlertCircle size={18} className="text-orange-500" /> {t('works.modal.challenges')}
                                        </h4>
                                        <p className="text-sm text-txt-muted leading-relaxed">{selectedProject.challenges}</p>
                                    </div>
                                )}

                                 {/* Results */}
                                 {selectedProject.results && (
                                    <div className="bg-glass/5 p-5 rounded-2xl border border-glass/10">
                                        <h4 className="font-bold text-txt-main mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                                            <Trophy size={18} className="text-yellow-500" /> {t('works.modal.results')}
                                        </h4>
                                        <p className="text-sm text-txt-muted leading-relaxed">{selectedProject.results}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
             </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Works;
