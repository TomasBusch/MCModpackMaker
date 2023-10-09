// import Navbar from '../navbar/navbar';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Link, Route, Routes } from "react-router-dom";
import DefaultLayout from "./routes/layouts/default/defaultLayout";
import Dashboard from "./routes/screens/dashboard/dashboard";
import Search from "./routes/screens/search/search";
// import backgroundImage from "./assets/images/background/pexels-johannes-plenio-1103970.jpg";
import FullPageLayout from './routes/layouts/fullpage/fullpageLayout';
import Login from './routes/screens/login/login';
import Register from './routes/screens/register/register';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="h-screen bg-zinc-900 text-zinc-300 antialiased" 
    // style={{
    //   backgroundImage: `url(${backgroundImage})`,
    //   backgroundSize: 'cover',
      
    // }}
    >
          {/* Routes nest inside one another. Nested route paths build upon
                parent route paths, and nested route elements render inside
              parent route elements. See the note about <Outlet> below. */}
          <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="search" element={<Search />} />

              {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            </Route>
            <Route element={<FullPageLayout />}>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
          </QueryClientProvider>
        </div>
    );
  }

  function Home() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }

  function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }