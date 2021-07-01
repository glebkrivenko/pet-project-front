//ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
const App = observer(() => {
  const { user } = useContext(Context);
  // локальное состояние отвечающее за то,идет ли загрузка страницы или нет
  //на страницу добавляется лоудинг, затем отправляется запрос на проверку пользователя,
  //и после того, как нам вернулся ответ, мы это состояние делаем false
  const [loading, setLoading] = useState(true);

  //этот запрос необходимо отправляеть один раз,при первой загрузке приложения
  useEffect(() => {
    check()
      .then((data) => {
        //если выполнилась успешно
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
