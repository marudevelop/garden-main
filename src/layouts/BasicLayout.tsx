import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

interface BasicLayoutProps {
    children?: ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen min-w-[1024px] bg-gray-50">
            {/* 전체 레이아웃: Sidebar + Main Content */}
            <div className="flex flex-1">
                {/* ✅ Sidebar (고정 크기 & 깔끔한 디자인) */}
                <div className="w-64 flex-shrink-0 bg-white shadow-xl border-r border-gray-200">
                    <Sidebar />
                </div>

                {/* ✅ Main Content */}
                <div className="flex flex-col flex-1 p-6">
                    <main className="flex-1 bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
                        {children || <Outlet />}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BasicLayout;
