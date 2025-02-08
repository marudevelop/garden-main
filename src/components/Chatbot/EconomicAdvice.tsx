import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchAIResponse } from "../../services/geminiApiService.ts";
import {getUserInfo} from "../../services/userInfoStoreService.ts";
import {getTasks} from "../../services/taskStoreService.ts";

interface Message {
    sender: "bot" | "user";
    text: string;
}

const generatePrompt = (messages:string): string => {
    const userInfo = getUserInfo();
    const tasks = getTasks();

    const userInfoString = userInfo
    ? `
    성별: ${userInfo.gender},
    나이: ${userInfo.age},
    소비습관 점수: ${userInfo.consumptionHabit},
    사용 목적: ${userInfo.usingPurpose},
    목표 예산: ${userInfo.goalBudget}원`
        : "사용자 정보가 없습니다.";

    // 최근 수입/사용 내역 문자열화 (최대 5개)
    const taskHistory = tasks
        .slice(-5)
        .map(task => `${task.date} - ${task.content}: ${task.amount.toLocaleString()}원`)
        .join('\n');

    return `
    나는 너의 친한 대학생 친구야.
    정말 솔직하게 편하게 얘기해줘. 알겠어?

    이건 내 정보야:
    ${userInfoString}

    이건 내 최근 수입/사용 내역이야:
    ${taskHistory}

    경제적 조언이 필요해. 좀 도와줘. 그리고 3줄 이내로 짧게 조언해줘.
    다음은 대화 내역이야: ${messages}
    `;
}

const EconomicAdvice: React.FC = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "안녕? 나는 조언봇이야! 도움이 필요하니? 내가 도와줄게!" }
    ]);
    const [isFetching, setIsFetching] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isFetching) return;

        setIsFetching(true);

        // 사용자 메시지 추가
        const userMessage: Message = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // 최근 대화 내역 (마지막 5개)
        const recentMessages = messages
            .slice(-5)
            .map(
                (msg) => ` ${msg.sender === "user" ? "사용자" : "AI"}: ${msg.text}`
            )
            .join("\n");

        const aiPrompt = generatePrompt(recentMessages);

        // 입력창 초기화
        setInput("");

        try {
            const aiResponse = await fetchAIResponse(aiPrompt);
            if (aiResponse) {
                const aiMessage: Message = { sender: "bot", text: aiResponse };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            }
        } catch (error) {
            console.error("AI 응답 오류:", error);
        } finally {
            setIsFetching(false);  // AI 요청 종료
        }

    };

    return (
        <div className="flex flex-col rounded-2xl h-full bg-gradient-to-b from-indigo-50 to-white">
            {/* 메시지 대화 창 */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                        } mb-4`}
                    >
                        <div
                            className={`max-w-full md:max-w-lg p-4 md:p-6 rounded-2xl shadow-lg ${
                                message.sender === "user"
                                    ? "bg-blue-500 text-white rounded-br-none border border-blue-400"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                            }`}
                        >
                            <p className="text-base md:text-lg leading-relaxed">
                                {message.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 메시지 입력 창 */}
            <div className="p-4 bg-white">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        className="flex-1 p-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        placeholder="메시지를 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-200 focus:outline-none text-lg transform hover:scale-105"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EconomicAdvice;
