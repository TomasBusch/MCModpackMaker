import ModpackList from './modpackList';

export default function Dashboard() {
  return (
    <>
    <div className="flex flex-col items-center justify-items-center">
      <h1 className='mt-4 text-2xl font-bold'>Modpacks</h1>
      <ModpackList modpacks={["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"]}/>
    </div>
    </>
  );
}
