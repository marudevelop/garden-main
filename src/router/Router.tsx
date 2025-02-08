import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "../pages/Home.tsx";
import Chatbot from "../pages/Chatbot.tsx";
import Calendar from "../pages/Calendar.tsx";
import Index from "../pages/Index.tsx";
import UserInfo from "../pages/UserInfoPage";

// 페이지 전환 애니메이션 옵션 (적용할 페이지에만 사용)
const pageTransition = {
    initial: { opacity: 0, backgroundColor: "white" },
    animate: {
        opacity: 1,
        backgroundColor: "transparent",
        transition: { duration: 0.5 }
    },
    exit: {
        opacity: 0,
        backgroundColor: "white",
        transition: { duration: 0.5 }
    },
};

const Router: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* transition 효과 적용 */}
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageTransition}
                            style={{ minHeight: "100vh" }}
                        >
                            <Index />
                        </motion.div>
                    }
                />
                <Route
                    path="/userinfo"
                    element={
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageTransition}
                            style={{ minHeight: "100vh" }}
                        >
                            <UserInfo />
                        </motion.div>
                    }
                />


                <Route path="/home" element={<Home />}/>
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </AnimatePresence>
    );
};

export default Router;
