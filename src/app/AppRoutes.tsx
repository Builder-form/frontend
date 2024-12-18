import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { DefaultPage } from '../pages/DefaultPage';
import { CreateProject } from '../pages/CreateProject';
import { ProjectPage } from '../pages/Project';
import { ProjectView } from '../pages/ProjectView';
import { Login } from '../pages/Login';
import { EmailCode } from '../pages/EmailCode';
import { Registration } from '../pages/Registration';
import { Account } from '../pages/Account';
import { AgreePage } from '../pages/Agree';
// import { Login } from '../pages/Login';


export const AppRoutes = () => {
  return (
    <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/login/code' element={<EmailCode></EmailCode>}></Route>
          <Route path='/register' element={<Registration></Registration>}></Route>
          <Route path='/project/:id/view' element={<ProjectView></ProjectView>}></Route>
        <Route element={<DefaultPage></DefaultPage>}>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/agree' element={<AgreePage></AgreePage>}></Route>
          <Route path='/project/create' element={<CreateProject/>}></Route>
          <Route path='/project/:id/' element={<ProjectPage></ProjectPage>}></Route>
          <Route path='/account' element={<Account></Account>}></Route>
        </Route>
    </Routes>
  );
};