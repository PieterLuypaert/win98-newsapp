import { TaskbarTab } from "./TaskbarTab";

export const TaskbarTabs = () => {
  const tabs = [
    {
      name: "Developed by Pieter Luypaert",
    },
  ];

  return (
    <div className="credits">
      {tabs.map((tab, index) => (
        <TaskbarTab key={index} tab={tab} />
      ))}
    </div>
  );
};
