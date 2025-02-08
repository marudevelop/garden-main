import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

export interface userInfo {
    consumptionHabit: string;
    usingPurpose: string;
    gender: string;
    age: number;
    goalBudget: string;
    categories: {
        식비: number;
        의류: number;
        여가: number;
        교통: number;
        기타: number;
    }
}


Chart.register(...registerables);

const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ✅ 슬라이더 값 -> 한글 문구 매핑
function getConsumptionText(value: number): string {
    switch (value) {
        case 0:
            return "거의 안씀";
        case 5:
            return "조금만 씀";
        case 10:
            return "그럭저럭";
        case 15:
            return "좀 씀";
        case 20:
            return "좀 많이 씀";
        case 25:
            return "엄청 씀!";
        default:
            return `${value}%`;
    }
}

const UserInfo: React.FC = () => {
    const navigate = useNavigate();

    // 단계별 진행 상태
    const [step, setStep] = useState(1);

    // Step 1: 소비 습관 슬라이더
    const [consumptionHabit, setConsumptionHabit] = useState(50);
    const spendingLevels = [
        "💰 엄청 절약하는 편!",
        "🔍 좀 절약하는 편!",
        "⚖️ 절약하려 노력하는 편!",
        "💸 돈이 새어나가는 편!",
        "🛍️ 돈이 펑펑나가는 편!",
    ];
    const spendingIndex = Math.min(Math.floor(consumptionHabit / 20), 4);
    const spendingText = spendingLevels[spendingIndex];

    // Step 2: 사용 이유 다중 선택
    const [usingPurpose, setUsingPurpose] = useState<string[]>([]);
    const handleReasonClick = (reason: string) => {
        setUsingPurpose((prev) =>
            prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
        );
    };

    // Step 3: 성별 & 나이
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");

    // Step 4: 한 달 소비 목표
    const [goalBudget, setGoalBudget] = useState("");

    // Step 5: 5가지 카테고리 (0~25, 5단위)
    const [categories, setCategories] = useState({
        식비: 0,
        의류: 0,
        여가: 0,
        교통: 0,
        기타: 0,
    });

    // "다시 알려주세요!" 팝업
    const [showResetMessage, setShowResetMessage] = useState(false);

    // 폼 리셋 → Step 1 & 팝업
    const resetForm = () => {
        setConsumptionHabit(50);
        setUsingPurpose([]);
        setGender("");
        setAge("");
        setGoalBudget("");
        setCategories({ 식비: 0, 의류: 0, 여가: 0, 교통: 0, 기타: 0 });
        setStep(1);

        setShowResetMessage(true);
        setTimeout(() => setShowResetMessage(false), 1000);
    };

    // "지금 바로 시작하기!" → localStorage 저장 & /home 이동
    const handleStart = () => {
        const userData = {
            consumptionHabit,         // 0 ~ 100 정수
            usingPurpose,  // string[]
            gender,           // string
            age,              // string
            goalBudget,       // string
            categories,       // { [카테고리]: number } -> 숫자(0,5,10,15,20,25)
        };

        // JSON으로 직렬화하여 localStorage에 저장
        localStorage.setItem("userInfo", JSON.stringify(userData));

        // /home으로 이동
        navigate("/home");
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center relative">

                {/* "다시 알려주세요!" 팝업 메시지 */}
                {showResetMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg"
                    >
                        다시 알려주세요!
                    </motion.div>
                )}

                {/* --- Step 1: 소비 습관 --- */}
                {step === 1 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariant}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            📊 당신의 소비 습관을 알려주세요!
                        </h2>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={consumptionHabit}
                            onChange={(e) => setConsumptionHabit(Number(e.target.value))}
                            className="w-full my-4"
                        />
                        <div className="text-lg font-medium text-blue-600">{spendingText}</div>
                        <button
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300"
                            onClick={() => setStep(2)}
                        >
                            확인 ✅
                        </button>
                    </motion.div>
                )}

                {/* --- Step 2: 사용 이유 --- */}
                {step === 2 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariant}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            ❓ 어떤 이유로 사용하고 싶나요?
                        </h2>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {["절약하고 싶어서!", "소비습관 바꾸기!", "더 스마트한 소비!", "예산 계획 세우기!"].map(
                                (reason) => (
                                    <button
                                        key={reason}
                                        className={`py-2 px-4 rounded-lg font-medium border transition-all duration-300 ${
                                            usingPurpose.includes(reason)
                                                ? "bg-blue-500 text-white"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() => handleReasonClick(reason)}
                                    >
                                        {reason}
                                    </button>
                                )
                            )}
                        </div>
                        <button
                            className={`mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 ${
                                usingPurpose.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={usingPurpose.length === 0}
                            onClick={() => setStep(3)}
                        >
                            확인 ✅
                        </button>
                    </motion.div>
                )}

                {/* --- Step 3: 성별 & 나이 --- */}
                {step === 3 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariant}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            🙋‍♂️ 정보를 알려주세요!
                        </h2>

                        {/* 성별 */}
                        <div className="mb-6">
                            <div className="flex gap-3 justify-center">
                                {["남성", "여성", "기타"].map((g) => (
                                    <button
                                        key={g}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            g === gender
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        onClick={() => setGender(g)}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 나이 */}
                        <div className="w-full mb-6">
                            <label className="block text-left text-gray-600 font-medium mb-1">
                                나이
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="나이를 입력하세요"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 ${
                                !gender || !age ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={!gender || !age}
                            onClick={() => setStep(4)}
                        >
                            확인 ✅
                        </button>
                    </motion.div>
                )}

                {/* --- Step 4: 한달 저축 목표 --- */}
                {step === 4 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariant}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            🏦 한 달 저축 목표
                        </h2>
                        <div className="w-full mb-6">
                            <label className="block text-left text-gray-600 font-medium mb-1">
                                한 달에 얼마를 저축하고 싶나요?
                            </label>
                            <input
                                type="number"
                                value={goalBudget}
                                onChange={(e) => setGoalBudget(e.target.value)}
                                placeholder="예: 1000000"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 ${
                                !goalBudget ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={!goalBudget}
                            onClick={() => setStep(5)}
                        >
                            확인 ✅
                        </button>
                    </motion.div>
                )}

                {/* --- Step 5: 교통비 + 4가지 카테고리 + 차트 --- */}
                {step === 5 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariant}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900">
                            📊 소비 패턴 분석
                        </h2>

                        <p className="mt-2 font-bold text-blue-500">
                            "주로 어디에 많이 소비하시나요?"
                        </p>

                        {/* 4가지 카테고리 슬라이더 */}
                        <div className="w-full my-4">
                            {Object.keys(categories).map((key) => (
                                <div key={key} className="mb-4 text-left">
                                    <label className="text-gray-700 font-medium">{key}</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={25}
                                        step={5}
                                        value={categories[key]}
                                        onChange={(e) =>
                                            setCategories((prev) => ({
                                                ...prev,
                                                [key]: Number(e.target.value),
                                            }))
                                        }
                                        className="w-full"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                    {/* 숫자(%) 대신 "거의 안씀" 등 한글 문구 표시 */}
                                        {getConsumptionText(categories[key])}
                  </span>
                                </div>
                            ))}
                        </div>

                        {/* 차트 표시 */}
                        <Bar
                            data={{
                                labels: Object.keys(categories),
                                datasets: [
                                    {
                                        label: "소비 비중",
                                        data: Object.values(categories),
                                        backgroundColor: "rgba(59, 130, 246, 0.7)",
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        display: false,
                                    },
                                    x: {
                                        display: true,
                                    },
                                },
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value = context.parsed.y as number;
                                                if (value >= 15) {
                                                    return "소비 비중: 높음";
                                                } else if (value >= 10) {
                                                    return "소비 비중: 중간";
                                                } else {
                                                    return "소비 비중: 낮음";
                                                }
                                            },
                                        },
                                    },
                                },
                            }}
                        />

                        {/* 현재 입력 결과 요약 */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeVariant}
                            className="mt-6 p-4 bg-gray-100 rounded-lg text-left w-full"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                📌 현재 입력하신 결과
                            </h3>
                            <p className="text-gray-600">
                                💰 소비 습관: <span className="font-bold">{spendingText}</span>
                            </p>
                            <p className="text-gray-600">
                                📍 사용 이유:{" "}
                                <span className="font-bold">{usingPurpose.join(", ")}</span>
                            </p>
                            <p className="text-gray-600">
                                🙋‍♀️ 성별: <span className="font-bold">{gender}</span>, 나이:{" "}
                                <span className="font-bold">{age}</span>
                            </p>
                            <p className="text-gray-600">
                                🏦 한 달 저축 목표: <span className="font-bold">{goalBudget}</span>
                            </p>
                            <p className="text-gray-600 mt-2">
                                가장 많이 배정된 카테고리:{" "}
                                <span className="font-bold text-blue-600">
                  {(() => {
                      const maxValue = Math.max(...Object.values(categories));
                      const topKeys = Object.keys(categories).filter(
                          (key) => categories[key] === maxValue
                      );
                      return topKeys.join(", ");
                  })()}
                </span>
                            </p>
                        </motion.div>

                        <div className="mt-6 flex gap-4">
                            {/* localStorage 저장 후 /home 이동 */}
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
                                onClick={handleStart}
                            >
                                지금 바로 시작하기! 🚀
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300"
                                onClick={resetForm}
                            >
                                아니요 ❌
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
