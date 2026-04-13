
import React, { useState } from 'react';
import { Send, ChevronLeft } from 'lucide-react';

const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const showList = !activeChat; 
  const showChat = activeChat;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)] flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
          Messages <span className="text-sm font-normal text-green-700 bg-green-100 px-2 py-0.5 rounded-full">2 Active</span>
      </h1>
      
      <div className="flex flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col absolute inset-0 md:relative bg-white z-10 transition-transform duration-300 ${activeChat ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="p-4 border-b border-gray-50">
                <input type="text" placeholder="Search messages..." className="w-full bg-gray-50 rounded-lg px-4 py-2 text-sm focus:outline-none" />
            </div>
            <div className="overflow-y-auto flex-1">
                <div onClick={() => setActiveChat('1')} className="p-4 hover:bg-green-50 cursor-pointer border-l-4 border-green-700 bg-green-50/50">
                    <div className="flex items-center gap-3">
                        <img src="https://picsum.photos/40/40?random=20" className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-gray-900 text-sm truncate">Client Name</h4>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Today</span>
                            </div>
                            <p className="text-xs text-green-700 font-medium truncate">Re: Moving Task</p>
                            <p className="text-xs text-gray-500 truncate">Hey, are you still available...</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => setActiveChat('2')} className="p-4 hover:bg-gray-50 cursor-pointer border-l-4 border-transparent">
                    <div className="flex items-center gap-3">
                        <img src="https://picsum.photos/40/40?random=21" className="w-10 h-10 rounded-full object-cover grayscale opacity-70" />
                        <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-gray-600 text-sm truncate">Elena G.</h4>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Yesterday</span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium truncate">Re: Assembly</p>
                            <p className="text-xs text-gray-400 truncate">Great, thanks!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`flex-1 flex flex-col bg-[#fafafa] absolute inset-0 md:relative z-0 md:z-auto transition-transform duration-300 ${activeChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                     <button onClick={() => setActiveChat(null)} className="md:hidden p-2 -ml-2 text-gray-600">
                         <ChevronLeft size={24} />
                     </button>
                     <img src="https://picsum.photos/40/40?random=20" className="w-8 h-8 rounded-full object-cover" />
                     <div>
                        <h3 className="font-bold text-sm text-gray-900">Client Name</h3>
                        <p className="text-xs text-gray-500">Online now</p>
                     </div>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
                 <div className="flex justify-center">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Today</span>
                 </div>

                 <div className="flex items-end gap-2">
                    <img src="https://picsum.photos/40/40?random=20" className="w-6 h-6 rounded-full mb-1" />
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[85%] text-sm text-gray-700">
                        Hi! Are you available this Saturday for the moving task?
                    </div>
                 </div>

                 <div className="flex items-end gap-2 justify-end">
                    <div className="bg-green-700 text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[85%] text-sm">
                        Yes, I can be there by 10 AM. Does that work?
                    </div>
                 </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition text-sm"
                    />
                    <button className="w-12 h-12 bg-green-700 hover:bg-green-800 text-white rounded-xl flex items-center justify-center transition shadow-lg shadow-green-900/20">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
