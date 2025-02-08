import BasicLayout from "../layouts/BasicLayout.tsx";
import EconomicAdvice from "../components/Chatbot/EconomicAdvice.tsx";

const Chatbot = () => {
    return (
        <div>
            <BasicLayout>
                <EconomicAdvice />
            </BasicLayout>
        </div>
    );
};

export default Chatbot;