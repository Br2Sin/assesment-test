interface typeSectionBlock {
  title: string;
  desc: string;
  count: number;
  icon: string;
}
const SectionBlock = (props: typeSectionBlock) => {
  const { title, desc, count, icon } = props;
  return (
    <div className="border border-app-black-dark bg-gray-300 px-6  flex">
      <div className="w-2/3 space-y-4 py-4">
        <p className="uppercase text-gray-600 text-xl font-extrabold">
          {title}
        </p>
        <p className="text-xs text-gray-800">{desc}</p>
      </div>
      <div className="w-1/3 relative flex items-end justify-start">
        <img
          src={`/assets/icon/${icon}`}
          alt={title}
          className="absolute w-12 md:w-2/3 top-2 right-0"
        />
        <div className="w-20 h-20 bg-app-red flex items-center justify-center">
          <p className="text-gray-200 text-4xl font-bold z-20">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionBlock;
