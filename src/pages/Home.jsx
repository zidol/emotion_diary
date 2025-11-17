// React에서 useState, useContext 훅을 가져온다.
// - useState: 컴포넌트 내부에서 상태값 관리할 때 사용
// - useContext: Context에 저장된 전역 상태를 꺼내 쓸 때 사용
import { useState, useContext } from "react";

// App 컴포넌트에서 만든 일기 상태(Context)를 가져온다.
// DiaryStateContext에는 전체 일기 데이터 배열이 들어있다고 가정.
import { DiaryStateContext } from "../App";

// 공통 UI 컴포넌트들 import
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

/**
 * 특정 기준 날짜(pivotDate)를 기준으로,
 * 그 달에 해당하는 일기들만 필터링해서 반환하는 함수.
 *
 * @param {Date} pivotDate - 기준이 되는 날짜(년/월을 사용)
 * @param {Array} data - 전체 일기 데이터 배열
 * @returns {Array} - 해당 월에 작성된 일기들만 모아서 반환
 */
const getMonthlyDate = (pivotDate, data) => {
  // 해당 달의 시작 시간(예: 2025-11-01 00:00:00)의 타임스탬프(ms)
  const beginTime = new Date(
    pivotDate.getFullYear(), // 기준 날짜의 연도
    pivotDate.getMonth(), // 기준 날짜의 월 (0부터 시작)
    1, // 1일
    0, // 0시
    0, // 0분
    0 // 0초
  ).getTime();

  // 해당 달의 마지막 시간(예: 2025-11-30 23:59:59)의 타임스탬프(ms)
  const endTime = new Date(
    pivotDate.getFullYear(), // 기준 날짜의 연도
    pivotDate.getMonth() + 1, // 다음 달 0일 = 이번 달 마지막 날
    0, // 0일 → 이전 달의 마지막 날을 의미
    23, // 23시
    59, // 59분
    59 // 59초
  ).getTime();

  // createdDate 값이 해당 월의 시작~끝 범위에 포함되는 일기만 남긴다.
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

// Home 페이지 컴포넌트
const Home = () => {
  // App에서 제공해주는 DiaryStateContext에서 전체 일기 데이터를 꺼낸다.
  const data = useContext(DiaryStateContext);

  // 현재 화면에서 기준이 되는 날짜 상태값.
  // 기본값은 "오늘 날짜"로 설정.
  const [pivotDate, setPivotDate] = useState(new Date());

  // 현재 pivotDate를 기준으로 필터링된 "해당 월의 일기 데이터"를 가져온다.
  const monthlyData = getMonthlyDate(pivotDate, data);

  // 다음 달로 이동하는 함수
  const onIncreaseMonth = () => {
    // setPivotDate로 새로운 Date 객체를 만들어서 상태 업데이트
    // 월 + 1을 해주면 다음 달이 된다.
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  // 이전 달로 이동하는 함수
  const onDecreaseMonth = () => {
    // 월 - 1을 해주면 이전 달이 된다.
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // 실제 화면에 렌더링되는 JSX
  return (
    <div>
      {/* 상단 헤더 영역 */}
      <Header
        // 현재 기준 날짜의 연/월을 문자열로 표시
        // getMonth()는 0부터 시작하므로 +1 해줘야 실제 달 숫자.
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        // 왼쪽 버튼: 이전 달로 가는 버튼
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        // 오른쪽 버튼: 다음 달로 가는 버튼
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      {/* 현재 달에 해당하는 일기 리스트를 렌더링 */}
      <DiaryList data={monthlyData} />
    </div>
  );
};

// Home 컴포넌트를 기본(default)로 export → 다른 파일에서 import 가능
export default Home;
