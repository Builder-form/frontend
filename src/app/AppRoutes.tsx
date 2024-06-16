import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Places } from '../pages/Places';
import { Test } from '../pages/Test';
import { Favorites } from '../pages/Favorites';
import { Recommendations } from '../pages/Recommendations';
import { PlacePage } from '../pages/PlacePage';
import { Profile } from '../pages/Profile';
import { About } from '../pages/About';
import { Chat } from '../pages/Chat';
import { DefaultPage } from '../pages/DefaultPage';
import { RoutesPage } from '../components/Routes';
import { Login } from '../pages/Login';


export const AppRoutes = () => {
  return (
    <Routes>
        <Route element={<DefaultPage></DefaultPage>}>
          <Route path='/auth/login' element={<Login></Login>}></Route>
          <Route path='auth/onBoarding/:params' element={<Test/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/places' element={<Places/>}></Route>
          <Route path='/favorites' element={<Favorites/>}></Route>
          <Route path='/recommendations' element={<Recommendations/>}></Route>
          <Route path='/places/:id' element={<PlacePage/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/chat/:chatID' element={<Chat/>}></Route>
          <Route path='/routes' element={<RoutesPage/>}></Route>
        </Route>
 
    </Routes>
  );
};