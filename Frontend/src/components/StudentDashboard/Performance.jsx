import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Clock, 
  GraduationCap, 
  CalendarCheck, 
  Moon, 
  Smartphone, 
  BrainCircuit,
  TrendingUp,
  Activity,
  BarChart3,
  Target,
  Library
} from 'lucide-react';
import StudentLayout from './StudentLayout';

const Performance = () => {
  const [formData, setFormData] = useState({
    semester: '',
    studyHours: '',
    lastExamScore: '',
    attendance: '',
    sleepHours: '',
    socialMediaHours: '',
    conceptUnderstanding: ''
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReport({
        score: "88%",
        status: "Excellent",
        feedback: "Based on your inputs, your study-to-sleep ratio places you in the top percentile of students. Keep maintaining this healthy balance for optimal academic outcomes."
      });
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const inputs = [
    { label: "Current Semester", name: "semester", icon: Book, type: "number", max: 8 },
    { label: "Daily Study Hours", name: "studyHours", icon: Clock, type: "number", max: 24 },
    { label: "Last Exam Score (%)", name: "lastExamScore", icon: GraduationCap, type: "number", max: 100 },
    { label: "Attendance Rate (%)", name: "attendance", icon: CalendarCheck, type: "number", max: 100 },
    { label: "Nightly Sleep (Hours)", name: "sleepHours", icon: Moon, type: "number",  max: 24 },
    { label: "Social Media (Hours/Day)", name: "socialMediaHours", icon: Smartphone, type: "number",max: 24 },
    { label: "Concept Clarity (1-10)", name: "conceptUnderstanding", icon: BrainCircuit, type: "number", max: 10 },
  ];

  return (
    <StudentLayout>
      <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
        
          <div className="mb-8 flex items-center justify-between">
            <div>
              <motion.h1 variants={itemVariants} className="text-3xl font-bold text-slate-800 tracking-tight flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-green-300" />
                Performance Analytics
              </motion.h1>
              <motion.p variants={itemVariants} className="text-slate-500 mt-2 text-md max-w-2xl">
                Enter your details to get a comprehensive breakdown of your performance.
              </motion.p>
            </div>
            
            {report && (
              <motion.div variants={itemVariants} className="hidden lg:flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium border border-green-200">
                <Target className="w-5 h-5" />
                <span>On Track: {report.score}</span>
              </motion.div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
      
              <div className="lg:col-span-3 p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {inputs.map((field, idx) => (
                      <motion.div 
                        key={idx} 
                        variants={itemVariants}
                        className={field.name === 'conceptUnderstanding' ? 'md:col-span-2' : ''}
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          {field.label}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <field.icon size={18} strokeWidth={2} />
                          </div>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            required
                            min="0"
                            max={field.max}
                            step="any"
                            className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center py-3.5 px-6 font-semibold rounded-xl text-white bg-green-300 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Data...
                        </>
                      ) : (
                        "Generate Report"
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>

        
              <div className="lg:col-span-2 bg-slate-50 p-6 sm:p-8 flex flex-col justify-center min-h-[350px]">
                
                <div className="h-full flex flex-col justify-center">
                  {report ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5 border-[6px] border-white shadow-sm">
                        <span className="text-2xl font-bold text-blue-700">{report.score}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{report.status} Trajectory</h3>
                      <p className="text-slate-600 leading-relaxed text-sm mb-6">
                        {report.feedback}
                      </p>
                      
                      <button 
                        onClick={() => setReport(null)}
                        className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-semibold w-full"
                      >
                        Reset Form
                      </button>
                    </motion.div>
                  ) : (
                    <div className="mx-auto">
                      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5 shadow-sm">
                        <div className="flex items-center text-slate-800 font-semibold mb-3">
                          <Activity className="h-5 w-5 text-blue-500 mr-2" />
                          Track Your Impact
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Your physical habits directly influence your academic success. By logging these metrics, we can help identify areas of improvement and ensure you don't burn out during crucial study periods.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-indigo-50 p-2 rounded-lg mr-3">
                           <Library className='h-4 w-4 to-blue-800 '/>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800">Study to Score Ratio</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Assessing efficiency against time spent.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-teal-50 p-2 rounded-lg mr-3">
                            <Moon className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800">Rest Dynamics</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Correlating sleep habits with concept retention.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </StudentLayout>
  );
};

export default Performance;
