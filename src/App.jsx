// import Introduction from './components/Introduction';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Project from './pages/ProjectPage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './ui/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
// import BrowserRouter from 'react-dom';
// const StyledApp = styled.div`
//   /* background-color: red; *
// `;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  // return (
  //   <>
  //     <GlobalStyles />
  //     <StyledApp>
  //       <Dashboard />
  //       <input />
  //     </StyledApp>
  //   </>
  // );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="project/:id" element={<Project />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route
              path="resetPassword/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '12px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },

          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </>
  );
}

export default App;
