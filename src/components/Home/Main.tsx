import './Main.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Main() {
    const navigate = useNavigate();

    const [ChangeButton, setChangeButton] = useState(false);
    const [year, setYear] = useState(0);
    const [change, setChange] = useState(year);
    const [plus, setPlus] = useState(0);
    const [minus, setMinus] = useState(0);
    const [all, setAll] = useState(0);

    const today = new Date();
    const last = 120000;
    const realmonth = (year-last)/(12-today.getMonth())
    const month = (plus-minus > realmonth) ? Number(realmonth.toFixed()) : plus-minus;

    useEffect(() => {
        let a = localStorage.getItem("userInfo");
        console.log(a);
        setYear(JSON.parse(a)['goalBudget']*12);
        let li = localStorage.getItem("tasks");
        let lis = JSON.parse(li);
        let sum = 0;
        for(let i=0; i<lis.length; i++){
            if(lis[i]['amount'] >= 0) {
                setPlus(plus + lis[i]['amount']);
                sum += lis[i]['amount'];
            }
            else {
                setMinus(minus + lis[i]['amount']);
                sum += lis[i]['amount'];
            }
            setAll(sum);
        }
    },[]);

    return (
        <div className="home">
            <div>
                <p className="big-p">{today.getMonth()+1}월 현황</p>
                <div className='flex flex-home flex-home-text'>
                    <div>
                        <div className='flex'><p>수입&nbsp;</p><p style={{fontWeight: "800", color: "blue"}}>{plus.toLocaleString('ko-KR')}</p><p>원</p></div>
                        <div className='flex'><p>지출&nbsp;</p><p style={{fontWeight: "800", color: "red"}}>{minus.toLocaleString('ko-KR')}</p><p>원</p></div>
                        <div className='flex flex-box'><div><p style={{color: "white"}}>{plus >= minus ? '+' : '-'}&nbsp;{Math.abs(plus-minus).toLocaleString('ko-KR')}원</p></div></div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div>
                <p className="big-p">나의 목표</p>
                <div className='flex flex-home flex-home-text2'>
                    <div>
                        <div className="circle-graph">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="beige" strokeWidth="10" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="green"
                                    strokeWidth="10"
                                    strokeDasharray={"calc(calc(" + last + "/" + year + " * 100) * calc(2*3.14*40) / 100) calc(2*3.14*40)"}
                                    transform="rotate(-90)  translate(-100)"
                                />
                            </svg>
                            <p>{(last/year*100).toFixed()}%</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex'><p style={{fontSize: "15px", margin: "3px 5px 0px 0px"}}>이달 목표&nbsp;</p><p style={{fontWeight: "800", color: "green"}}>{month.toLocaleString('ko-KR')}</p><p>원</p></div>
                        <div className='flex'><p style={{fontSize: "15px", margin: "3px 5px 0px 0px"}}>올해 목표&nbsp;</p><p style={{fontWeight: "800", color: "green"}}>{year.toLocaleString('ko-KR')}</p><p>원</p></div>
                    </div>
                    <div onClick={() => setChangeButton(!ChangeButton)} className='text-button'>목표 수정하기 {'>'}</div>
                </div>
            </div>
            <div>
                <p className="big-p">나의 자산</p>
                <div className='flex flex-money'>
                    <p>💵 {all.toLocaleString('ko-KR')}원</p>
                    <div onClick={() => navigate(`/calendar`)}>자산 관리</div>
                </div>
            </div>
            {ChangeButton && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-4">올해 목표 수정</h3>
                        <input
                            type="number"
                            className="w-full p-2 mb-4 border rounded"
                            placeholder="금액"
                            value={change}
                            onChange={(e) => setChange(Number(e.target.value))}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setChangeButton(!ChangeButton)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                취소
                            </button>
                            <button
                                onClick={() => {
                                    setYear(change);
                                    setChangeButton(!ChangeButton);
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                수정
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
  }
  
  export default Main;