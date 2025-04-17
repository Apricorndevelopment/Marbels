
export function StoneLib() {
  const marbels = [
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel1.jpg" },
    { name: "Marble (3456) ", icon: "/mar_pics/marbel2.jpg" },
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel3.jpg" },
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel4.jpg" },
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel5.jpg" },
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel6.jpg" },
    { name: "Marble (3456)  ", icon: "/mar_pics/marbel7.jpg" },
  ];
  return (
    <aside className="p-5">
      <h3 className="font-bold text-3xl">Stone Library</h3>
      <div className="flex flex-wrap bg-white shadow-lg border sm:ps-5 items-center justify-center sm:justify-start gap-7 sm:gap-10 mt-7">
        {marbels.map((marbel, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-col gap-6 hover:bg-green-100 transition-colors duration-200 px-4 py-6"
          >
            <img className="border-0 rounded-[50%] w-20 h-20" src={marbel.icon} alt={marbel.name}/>
            <span className="text-gray-700 font-medium text-center">{marbel.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-gray-700">From over 200+ countries with more than 20,000+ </p>
    </aside>
  );
}
