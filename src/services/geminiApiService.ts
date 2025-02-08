import { GoogleGenerativeAI } from '@google/generative-ai';

// API 키를 문자열로 전달하여 클라이언트 생성
const client = new GoogleGenerativeAI("AIzaSyAO12QI7oyghignZhGHIPSIbqvyzOzQ4do");

// 모델 인스턴스를 생성할 때 generation configuration을 함께 설정
const model = client.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
    },
});

// Google Gemini API를 사용하여 AI 응답을 받아오는 함수
export const fetchAIResponse = async (userText: string): Promise<string> => {
    try {
        const response = await model.generateContent(userText);
        return response.response.text();
    } catch (error) {
        console.error("Error fetching AI response: ", error);
        return "오류가 발생했습니다. 다시 시도해주세요.";
    }
};