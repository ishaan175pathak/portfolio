import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "./Logo";

const Navbar = () => {
    return (
        <nav className="bg-black/50 text-white font-bold w-full h-[5rem] flex items-center fixed top-0 left-0 z-50">
            
            <div className="flex-1 flex items-center justify-center">
                <Logo withText={true} height={40} /> 
            </div>

            <div className="flex flex-row items-center gap-4 mr-10">
                
                <a className="bg-indigo-900 cursor-pointer hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" href="#resume">
                    Resume
                </a>
            </div>

        </nav>
    );
};

export default Navbar;