'use client';

import { motion } from 'framer-motion';

const examples = [
  { id: 1, type: 'image', color: 'from-purple-500 to-indigo-600', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, type: 'image', color: 'from-pink-500 to-rose-500', span: 'col-span-1' },
  { id: 3, type: 'video', color: 'from-neongreen to-teal-500', span: 'col-span-1' },
  { id: 4, type: 'image', color: 'from-amber-400 to-orange-500', span: 'col-span-1 md:col-span-2' },
  { id: 5, type: 'image', color: 'from-blue-500 to-cyan-500', span: 'col-span-1' },
];

export function ExamplesGallery() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030609]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
              Student <span className="text-neongreen glow-text">Masterpieces</span>
            </h2>
            <p className="text-gray-400 max-w-xl font-inter">
              See what our community is creating. From photorealistic portraits to cinematic video sequences.
            </p>
          </div>
          <button className="mt-6 md:mt-0 text-white font-medium border-b border-neongreen pb-1 hover:text-neongreen transition-colors">
            View All Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {examples.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 0.98 }}
              className={`rounded-2xl overflow-hidden relative group cursor-pointer ${item.span}`}
            >
              {/* Placeholder for actual AI generated assets, using vibrant gradients */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-transparent transition-colors duration-500" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <span className="text-white/30 font-bold text-2xl tracking-widest font-outfit uppercase mix-blend-overlay">
                  {item.type === 'video' ? 'AI Video' : 'AI Image'}
                </span>
              </div>

              {/* Hover overlay info */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-darkspace/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <p className="text-white font-medium">Prompt Engineering</p>
                <p className="text-neongreen text-sm flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neongreen animate-pulse"></span>
                  Created by Student #{item.id}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
