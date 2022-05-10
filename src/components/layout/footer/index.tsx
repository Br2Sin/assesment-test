import { LinkButton } from "../../button";

const Footer = () => {
  return (
    <footer className="flex flex-col pt-8 pb-4 px-4 relative gap-6 z-0">
      <div className="flex justify-center sm:justify-end px-2 sm:px-8">
        <div className="bg-gray-400 w-32 h-32 sm:w-44 sm:h-44 lg:w-60  lg:h-60 rounded-full absolute transform left-0 sm:left-1/4  bottom-0 -translate-x-1/2 md:-translate-x-full  translate-y-1/2"></div>
        <div className="flex gap-2 sm:gap-6 justify-around w-full sm:w-max xs:flex-row flex-col">
          <LinkButton icon="/assets/icon/ico_discord.svg" name="Join Discord" link="https://discord.gg/ftWxVrWXxT"/>
          <LinkButton icon="/assets/icon/ico_twitter.svg" name="Join Twitter" link="https://twitter.com/nftbooking"/>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NFTBOOKING
      </p>
    </footer>
  );
};

export default Footer;
