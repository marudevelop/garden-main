import React, { useState } from "react";
import { Task } from "../../services/taskStoreService.ts";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarViewProps {
    tasks: Task[];
    onAddTask: (task: Task) => void;
}

const getWeekday = (date: string) => new Date(date).getDay();

const getDayFromDate = (date: string) => date.split("-")[2];

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2, ease: "easeIn" }
    },
};

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, onAddTask }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [newTaskContent, setNewTaskContent] = useState("");
    const [newTaskAmount, setNewTaskAmount] = useState<number>(0);

    const startDayOfMonth = getWeekday("2025-02-01");
    const daysInFebruary = Array.from({ length: 28 }, (_, i) => {
        const date = `2025-02-${String(i + 1).padStart(2, "0")}`;
        const tasksForDate = tasks.filter((t) => t && t.date === date);
        return { date, tasks: tasksForDate };
    });

    const handleAddTask = () => {
        if (selectedDate && newTaskContent.trim()) {
            const newTask: Task = {
                id: Date.now(),
                content: newTaskContent,
                date: selectedDate,
                amount: newTaskAmount,
            };
            onAddTask(newTask);
            setNewTaskContent("");
            setNewTaskAmount(0);
            setSelectedDate(null);
        }
    };

    return (
        <div className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">캘린더</h2>
            <div className="grid grid-cols-7 gap-4 text-center text-gray-500 font-semibold">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>
            <div className="grid grid-cols-7 gap-4">
                {/* 2월 1일 이전 요일에 맞춰 빈칸 */}
                {Array.from({ length: startDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                ))}

                {/* 각 날짜 별 Task와 합산 표시 */}
                {daysInFebruary.map(({date}) => {
                    const dateTasks = tasks.filter((t) => t && t.date && t.date === date);  // 날짜에 해당하는 Task만 가져오기
                    const dateTotal = dateTasks.reduce((sum, task) => sum + task.amount, 0);
                    const dateDay = getDayFromDate(date);
                    return (
                        <div
                            key={date}
                            className="bg-white p-4 rounded-lg shadow text-center overflow-hidden cursor-pointer hover:shadow-lg transition"
                            onClick={() => setSelectedDate(date)}
                        >
                            <p className="text-sm font-medium text-xl font-bold text-gray-600">{dateDay}</p>
                            <div className="flex flex-col justify-center items-center flex-1 min-h-7">
                                {dateTasks.length > 0 ? (
                                    <>
                                        {dateTasks.map((task) => (
                                            <p key={task.id} className="font-medium text-sm text-gray-800">
                                                {task.content}
                                            </p>
                                        ))}
                                        <p className={`font-bold mt-1 ${dateTotal > 0 ? "text-blue-500" : "text-red-500"}`}>
                                            {dateTotal.toLocaleString()}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-400"></p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Task 추가 모달 */}
            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg max-w-md w-full mx-4"
                        >
                            {/* 헤더 */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {selectedDate}: 기록 추가
                                </h3>
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* 종류 선택 */}
                            <div className="mb-4">
                                <select
                                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={newTaskContent}
                                    onChange={(e) => setNewTaskContent(e.target.value)}
                                >
                                    <option value="">종류 선택</option>
                                    <option value="수입">수입</option>
                                    <option value="의류비">의류비</option>
                                    <option value="식비">식비</option>
                                    <option value="여가비">여가비</option>
                                    <option value="교통비">교통비</option>
                                    <option value="기타비">기타비</option>
                                </select>
                            </div>

                            {/* 금액 입력 */}
                            <div className="mb-6">
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="금액"
                                    value={newTaskAmount}
                                    onChange={(e) => setNewTaskAmount(Number(e.target.value))}
                                />
                            </div>

                            {/* 버튼 영역 */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleAddTask}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    추가
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CalendarView;