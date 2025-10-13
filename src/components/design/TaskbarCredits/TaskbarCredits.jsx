
export const TaskbarTabs = () => {
  const tabs = [
    {
      name: "Developed by Pieter Luypaert :)",
    },
  ];

  return (
    <div className="credits">
      {tabs.map((tab, index) => (
        <div key={index} className="tab">
          {tab.name}
        </div>
      ))}
    </div>
  );
};
