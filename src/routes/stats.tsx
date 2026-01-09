import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { FaCode, FaClock, FaProjectDiagram, FaLaptopCode, FaArrowLeft } from 'react-icons/fa';

// Import data directly from the JSON file since it's available locally
import WakapiData from '../../wakapi_summary.json';

export const Route = createFileRoute('/stats')({
  component: Stats,
})

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#e0e7ff', '#6366f1'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, key }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] font-mono">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

function Stats() {
  // Transform data for charts
  const languageData = WakapiData.languages.map(lang => ({
    name: lang.key,
    value: lang.total,
    time: formatTime(lang.total)
  })).sort((a, b) => b.value - a.value).slice(0, 6);

  const projectData = WakapiData.projects.map(proj => ({
    name: proj.key,
    value: proj.total,
    time: formatTime(proj.total)
  })).sort((a, b) => b.value - a.value).slice(0, 5);

  const editorData = WakapiData.editors.map(ed => ({
    name: ed.key,
    value: ed.total
  }));

  const totalSeconds = WakapiData.languages.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl relative">
      {/* Dynamic Background - Consistent with Home */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-primary/30 backdrop-blur-sm"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Coding <span className="text-gradient">Activity</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A glimpse into my development habits, preferred languages, and project time distribution over the last week.
            </p>
        </motion.div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-hover glass p-6 rounded-2xl border-l-4 border-l-primary"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <FaClock size={20} />
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded border border-white/5">Last 7 Days</span>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-foreground">{formatTime(totalSeconds)}</h3>
            <p className="text-muted-foreground text-sm">Total Coding Time</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-hover glass p-6 rounded-2xl border-l-4 border-l-blue-500"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <FaCode size={20} />
                </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-foreground">{languageData[0]?.name || 'N/A'}</h3>
            <p className="text-muted-foreground text-sm">Most Used Language</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-hover glass p-6 rounded-2xl border-l-4 border-l-green-500"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <FaProjectDiagram size={20} />
                </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-foreground">{projectData[0]?.name || 'N/A'}</h3>
            <p className="text-muted-foreground text-sm">Most Active Project</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-hover glass p-6 rounded-2xl border-l-4 border-l-purple-500"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <FaLaptopCode size={20} />
                </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-foreground">{editorData[0]?.name || 'N/A'}</h3>
            <p className="text-muted-foreground text-sm">Preferred Editor</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Languages Chart */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-3xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-purple-400 rounded-full"/>
                Languages
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={languageData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            stroke="none"
                            paddingAngle={5}
                        >
                            {languageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(30, 27, 75, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                            itemStyle={{ color: '#e0e7ff' }}
                            formatter={(value: number) => formatTime(value)}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
                {languageData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        {entry.name}
                    </div>
                ))}
            </div>
        </motion.div>

        {/* Projects Chart */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass p-8 rounded-3xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"/>
                Projects Activity
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={projectData}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff05" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                            width={100}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip 
                            cursor={{ fill: '#ffffff05' }}
                            contentStyle={{ backgroundColor: 'rgba(30, 27, 75, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                            itemStyle={{ color: '#e0e7ff' }}
                            formatter={(value: number) => formatTime(value)}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {projectData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* Editors Chart */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass p-8 rounded-3xl lg:col-span-2 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -z-10 group-hover:bg-green-500/10 transition-colors" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-400 rounded-full"/>
                Editors & Environment
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                {editorData.map((editor, index) => (
                    <div key={index} className="bg-secondary/30 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:bg-secondary/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary font-bold shadow-inner">
                            {index + 1}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{editor.name}</h4>
                            <p className="text-sm text-muted-foreground">{formatTime(editor.value)}</p>
                        </div>
                        <div className="ml-auto">
                            <div className="text-xs font-mono bg-white/5 px-2 py-1 rounded border border-white/5 text-primary/80">
                                {((editor.value / totalSeconds) * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </main>
  );
}
