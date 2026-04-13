import React from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';

const Schedule: React.FC = () => {
  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Schedule</h1>
      
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="bg-[#dcfce7] rounded-xl p-4 text-center min-w-[80px]">
                <span className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-1">OCT</span>
                <span className="block text-3xl font-bold text-green-900">11</span>
            </div>
            
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Moving Assistance - Sector 3</h3>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400"/> 10:00 AM - 2:00 PM
                    </span>
                    <span className="flex items-center gap-1.5 text-green-700 font-bold">
                        <DollarSign size={16} /> 200 RON
                    </span>
                </div>
            </div>

            <button className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                Details
            </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="bg-[#dcfce7] rounded-xl p-4 text-center min-w-[80px]">
                <span className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-1">OCT</span>
                <span className="block text-3xl font-bold text-green-900">12</span>
            </div>
            
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Moving Assistance - Sector 3</h3>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400"/> 10:00 AM - 2:00 PM
                    </span>
                    <span className="flex items-center gap-1.5 text-green-700 font-bold">
                        <DollarSign size={16} /> 200 RON
                    </span>
                </div>
            </div>

            <button className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                Details
            </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="bg-[#dcfce7] rounded-xl p-4 text-center min-w-[80px]">
                <span className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-1">OCT</span>
                <span className="block text-3xl font-bold text-green-900">13</span>
            </div>
            
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Moving Assistance - Sector 3</h3>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400"/> 10:00 AM - 2:00 PM
                    </span>
                    <span className="flex items-center gap-1.5 text-green-700 font-bold">
                        <DollarSign size={16} /> 200 RON
                    </span>
                </div>
            </div>

            <button className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                Details
            </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;