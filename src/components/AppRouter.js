//Навигация по страницам
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";

const AppRouter = () => {
  // для проверки авторизирован ли пользователь
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      {/*Если те маршруты не отрабатываются,то отрабатывается Redirect*/}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};
export default AppRouter;
