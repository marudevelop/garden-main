import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: "/home", label: "홈", icon: Home },
        { path: "/chatbot", label: "챗봇", icon: User },
        { path: "/calendar", label: "가계부", icon: Calendar },
    ];

    return (
        <aside className="w-64 h-screen bg-white/50 backdrop-blur-xl border-r border-gray-200 shadow-xl p-6 flex flex-col" style={{height: "100%"}}>
            {/* 로고 */}
            <div className="text-2xl font-bold text-blue-600 text-center py-10 tracking-tight">
                WON MILLION
            </div>

            {/* 메뉴 리스트 */}
            <nav className="flex flex-col gap-y-6">
                {navItems.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path;

                    return (
                        <Link key={path} to={path}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1.05 }}
                                className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200 ease-in-out 
                                    ${isActive
                                    ? "bg-blue-100 text-blue-600 shadow-md scale-105"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                                }`}
                            >
                                <Icon size={24} className={isActive ? "text-blue-600" : "text-gray-500"} />
                                <span className="text-lg font-medium">{label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
