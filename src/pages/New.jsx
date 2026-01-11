import Header from "../components/Header";
import Button from "../components/Button";
import Edidtor from "../components/Editor";
const New = () => {
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} />}
      />
      <Edidtor />
    </div>
  );
};

export default New;
