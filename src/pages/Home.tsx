import BasicLayout from "../layouts/BasicLayout.tsx";
import Main from "../components/Home/Main.tsx";

const Home = () => {
    return (
        <div>
            <BasicLayout>
                <h1 className="text-3xl font-semibold">홈</h1>
                <Main/>
            </BasicLayout>
        </div>
    );
};

export default Home;