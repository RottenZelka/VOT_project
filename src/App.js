import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import SchoolLogin from './components/SchoolLogin';
import SchoolSignup from './components/SchoolSignup';
import CountryList from './components/CountryList';
import SchoolTypeList from './components/SchoolTypeList';
import SchoolList from './components/SchoolList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/loginSchool" element={<SchoolLogin />} />
                <Route path="/signupSchool" element={<SchoolSignup />} />
                <Route path="/countries" element={<CountryList />} />
                <Route path="/school_types" element={<SchoolTypeList />} />
                <Route path="/schools" element={<SchoolList />} />
            </Routes>
        </Router>
    );
};

export default App;
