
import { useNavigate } from 'react-router-dom';
import MinecraftLogo from '../../../assets/MCBlueprintLogo.svg';
import * as HeroIcons from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const goBack = () => {
      navigate(-1);
  };
  
  return (
    <>
    <div className="flex items-center justify-center w-full h-full p-4">
        <div className="bg-zinc-800/50 w-[100%] rounded-md border-zinc-700 border p-4 flex flex-col items-center pt-8 gap-y-8 max-w-[32em] relative backdrop-blur-md">
          <button onClick={goBack} className='absolute top-0 right-0 p-3 border rounded-md bg-zinc-700/50 border-zinc-600 backdrop-blur-md'><HeroIcons.ArrowUturnLeftIcon className='h-4'/></button>
            <div className='flex flex-col items-center'>
                <img src={MinecraftLogo} className="h-10"/>
                <span className='font-bold'>Modpack Maker</span>
            </div>
            <div className='w-[60%] h-[1px] bg-zinc-700'></div>
            <div className='w-full'>
                <label className='ml-2 text-sm font-medium text-zinc-400'>Email:</label>
                <input type="email" className="w-full h-10 mb-4 border rounded-md bg-zinc-700/50 border-zinc-600 backdrop-blur-md"></input>
                <label className='ml-2 text-sm font-medium text-zinc-400'>Password:</label>
                <input type="password" className="w-full h-10 mb-4 border rounded-md bg-zinc-700/50 border-zinc-600 backdrop-blur-md"></input>
            </div>
            <button className="w-32 p-2 mt-auto bg-blue-500 rounded-md justify-self-end">Login</button>
        </div>
    </div>
    </>
  );
}
