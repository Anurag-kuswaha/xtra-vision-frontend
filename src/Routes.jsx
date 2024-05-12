import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
const Header = lazy(() => import('./Components/Header'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Meeting = lazy(() => import('./Pages/Meeting'));
const ThankYou = lazy(() => import('./Pages/ThankYou'));
const ListOfMeeting = lazy(() => import('./Pages/ListOfMeeting'))
const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route element={<Header />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/list" element={<ListOfMeeting />}></Route>
            </Route>
            <Route path="/meeting/:meetingId" element={<Meeting />}></Route>
            <Route path="/thankyou" element={<ThankYou />}></Route>
        </Routes>
    )
}

export default WebRoutes