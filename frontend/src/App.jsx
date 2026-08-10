import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import NavBar from 'Components/ui/NavBar';
import Feeds from './pages/Feeds';
import FeedItemsByFeed from './pages/FeedItemsByFeed';
import AllFeedItems from './pages/AllFeedItems';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from 'Components/ui/Footer';
import PersonalFeeds from './pages/PersonalFeeds';
import PersonalFeedItems from './pages/PersonalFeedItems';
import Folders from './pages/Folders';

const App = () => {
    return(
        <BrowserRouter>
            <NavBar>
            </NavBar>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/feeds" element={<Feeds />} />
                <Route path="/feeds/:feedId" element={<FeedItemsByFeed />} />
                <Route path="/feed-items" element={<AllFeedItems />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/personal-feeds" element={<PersonalFeeds />} />
                <Route path="/personal-feed-items" element={<PersonalFeedItems />} />
                <Route path="/folders" element={<Folders />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
};

export default App;