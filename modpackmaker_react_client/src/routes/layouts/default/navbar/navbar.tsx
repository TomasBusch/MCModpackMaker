import { Link } from "react-router-dom";
import * as HeroIcons from "@heroicons/react/24/outline";
import MinecraftLogo from '../../../../assets/MCBlueprintLogo.svg';

export default function Navbar(){
    return(
        <>
        <div className="z-50 flex items-center w-full p-2 px-4 border-b shadow-md md:p-4 border-zinc-700 bg-zinc-800/50 text-zinc-300 backdrop-blur-md">
        <HeroIcons.Bars3Icon className="absolute h-8 justify-self-start md:hidden" />
        <div className="z-50 flex items-center justify-around flex-1">
            <div className="flex items-center">
                <img src={MinecraftLogo} className="h-10"/>
                <p className="ml-3 font-bold text-inherit">Modpack Maker</p>
            </div>
            <div className="items-center hidden gap-4 md:flex">
                <div>
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to="/search">Search</Link>
                    </div>
                </div>
                <div>
                    <div>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
            </div>
            <div className="items-center hidden gap-4 md:flex">
                <Link to="/register"><button className="w-20 px-2 py-1 bg-green-700 rounded shadow-lg text-zinc-100 hover:bg-green-600">Register</button></Link>
                <Link to="/login"><button className="w-20 px-2 py-1 rounded shadow-lg bg-sky-700 text-zinc-100 hover:bg-sky-600">Log In</button></Link>
            </div>
        </div>
        </div>
        </>
    );
}