const Footer: React.FC = () => {
  return (
    <footer className="bg-[#029491] mt-[100px] sm:mt-[20px]  sm:w-full px-10 sm:p-0 flex justify-between  items-center text-white">
      <div>
        <img src="/icons/white-logo.svg" alt="white-logo" />
      </div>
      <div className={'text-end'}>
        <div>г. Москва, Цветной б-р, 40</div>
        <div>+7 495 771 21 11</div>
        <div>info@skan.ru</div>
        <div className="mt-3">Copyright. 2022</div>
      </div>
    </footer>
  );
};

export default Footer;
