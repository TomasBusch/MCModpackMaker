// import Navbar from '../navbar/navbar';
import { Link, Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/default/defaultLayout";
import Search from "../screens/search/search";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Dashboard from "../screens/dashboard/dashboard";
// import styles from './app.module.scss';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="h-screen bg-zinc-900 text-zinc-300">
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
              <Route path="*" element={<NoMatch />} />
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