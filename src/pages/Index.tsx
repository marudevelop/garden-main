import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Banknote, ArrowRight } from 'lucide-react';
import './Index.css';

// 각 섹션별 애니메이션 Variants
const heroVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: 'easeOut' }
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1, ease: 'easeOut' }
    },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2 }
    },
};

const MovingBlurBackground: React.FC = () => {
    const navigate = useNavigate();
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: impactRef, inView: impactInView } = useInView({ threshold: 0.3, triggerOnce: false });
    const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3, triggerOnce: false });

    return (
        // 최상위 컨테이너에 우주 느낌의 어두운 배경 적용
        <div className="relative bg-gradient-to-t from-gray-900 to-black min-h-screen overflow-y-auto flex flex-col px-16">

            {/* Blob 애니메이션 (배경) - 가장 아래층 */}
            <div className="fixed inset-0 -z-10 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                    <div className="absolute top-0 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* 우주 배경 효과 (별, 행성) - 최상위 div에 적용 */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 기존 별 3개 */}
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '20%', left: '30%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '50%', left: '70%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '80%', left: '40%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* 추가 별 3개 */}
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '10%', left: '80%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '40%', left: '50%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                />
                <motion.div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: '70%', left: '80%' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                />

                {/* 행성 애니메이션 */}
                <motion.div
                    className="absolute"
                    style={{
                        top: '10%',
                        left: '20%',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#facc15',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: 250, y: -150, opacity: 1 }}
                    transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        top: '60%',
                        left: '70%',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#93c5fd',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: -150, y: -100, opacity: 1 }}
                    transition={{ duration: 12, ease: 'linear', repeat: Infinity, repeatType: 'mirror', delay: 1 }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        top: '80%',
                        left: '30%',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#f472b6',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: -200, y: -50, opacity: 1 }}
                    transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror', delay: 2 }}
                />
            </motion.div>

            {/* 메인 콘텐츠 (텍스트, 버튼 등) */}
            <div className="relative z-10 flex flex-col items-center px-8 space-y-12">
                {/* Hero 섹션 */}
                <motion.section
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? 'visible' : 'hidden'}
                    variants={heroVariants}
                    className="min-h-[80vh] flex flex-col justify-center text-center relative overflow-hidden"
                >
                    {/* 회전하는 배경 원 대신 로고 이미지 사용 */}
                    <motion.div
                        className="absolute inset-0 flex justify-center items-center pointer-events-none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <img
                            src="/circle.png"
                            alt="circle"
                            className="w-64 h-64 rounded-full opacity-20 object-cover"
                        />
                    </motion.div>
                    <div className="relative">
                        <div className="flex items-center gap-3 justify-center">
                            <ShieldCheck className="text-blue-500 w-16 h-16" />
                            <h1 className="text-6xl font-bold text-white drop-shadow-md">WON MILLION</h1>
                        </div>
                        <h2 className="text-2xl font-light text-gray-300 mt-4">당신의 재산을 지켜드려요!</h2>
                    </div>
                </motion.section>

                {/* Impact 섹션 - heroVariants 사용 */}
                <motion.section
                    ref={impactRef}
                    initial="hidden"
                    animate={impactInView ? 'visible' : 'hidden'}
                    variants={heroVariants}
                    className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    {/* 중앙에서 펼쳐지는 방어막 효과 */}
                    <motion.div
                        className="absolute flex justify-center items-center pointer-events-none"
                        initial={{ scale: 0, opacity: 0.9 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
                    >
                        <div className="w-64 h-64 border-4 border-green-400 rounded-full" />
                    </motion.div>
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <Banknote className="text-green-500 w-12 h-12" />
                            <h1 className="text-4xl font-semibold text-white leading-relaxed">
                                안심하세요, 저희가 지켜드립니다.
                            </h1>
                        </div>
                        <p className="text-lg text-gray-300 mt-4">
                            당신의 충동적 소비를 막아드리겠습니다. <br />
                            지금 바로 안전한 재정관리를 경험해보세요!
                        </p>
                    </div>
                </motion.section>

                {/* CTA 섹션 - heroVariants 사용 */}
                <motion.section
                    ref={aboutRef}
                    initial="hidden"
                    animate={aboutInView ? 'visible' : 'hidden'}
                    variants={heroVariants}
                    className="min-h-[80vh] flex flex-col justify-center text-center relative overflow-hidden"
                >
                    <h2 className="text-white opacity-90 text-5xl font-bold">For Your Future</h2>
                    {/* WonLogo 이미지를 중앙에 배치하고, object-contain으로 전체가 보이도록 설정 */}
                    <motion.img
                        src="/WonLogo.png"
                        alt="Project Won Logo"
                        className="mx-auto w-40 h-40 rounded-full object-contain"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                    {/* 버튼 컨테이너 중앙 정렬 */}
                    <div className="relative mt-4 flex justify-center">
                        <motion.button
                            onClick={() => navigate('/userinfo')}
                            variants={buttonVariants}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 pr-5 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 text-base focus:outline-none"
                        >
                            <span className="animate-bounce">🚀</span>
                            지금 바로 시작하기
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default MovingBlurBackground;
