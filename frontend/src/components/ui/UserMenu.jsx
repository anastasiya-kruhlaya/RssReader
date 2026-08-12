import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'Actions/authActions';

export default function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
    };

    const closeMenu = () => setOpen(false);

    return (
        <div className="user-menu" ref={menuRef}>
            <button className="user-menu__trigger" onClick={() => setOpen((o) => !o)}>
                {user?.userName || user?.email || 'Account'} ▾
            </button>

            {open && (
                <ul className="user-menu__dropdown">
                    <li>
                        <NavLink 
                            to="/profile" 
                            onClick={closeMenu}
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/personal-feeds" 
                            onClick={closeMenu}
                        >
                            My Feeds
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/personal-feeditems" 
                            onClick={closeMenu}
                        >
                            My Feed Items
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/folders" 
                            onClick={closeMenu}
                        >
                            My Folders
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            className="user-menu__logout" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}