import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useAppSelector } from "../store/store";

const reasons = [
  {
    id: 1,
    icon: "time",
    value: "Высокая и оперативная скорость обработки заявки",
  },
  {
    id: 2,
    icon: "search",
    value:
      "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    id: 3,
    icon: "security",
    value:
      "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
];

const services = [
  {
    id: 1,
    icon: "idea",
    title: "Beginner",
    description: "Для небольшого исследования",
    isActive: true,
    color: "#FFB64F",
    price: 1200,
    finalPrice: 799,
    credit: 150,
    points: [
      {
        id: 1,
        title: "Безлимитная история запросов",
      },
      {
        id: 2,
        title: "Безопасная сделка",
      },
      {
        id: 3,
        title: "Поддержка 24/7",
      },
    ],
  },
  {
    id: 2,
    icon: "aim",
    title: "Pro",
    description: "Для HR и фрилансеров",
    isActive: false,
    color: "#7CE3E1",
    price: 2600,
    finalPrice: 1299,
    credit: 279,
    points: [
      {
        id: 1,
        title: "Все пункты тарифа Beginner",
      },
      {
        id: 2,
        title: "Экспорт истории",
      },
      {
        id: 3,
        title: "Рекомендации по приоритетам",
      },
    ],
  },
  {
    id: 3,
    icon: "computer",
    title: "Business",
    color: "black",
    description: "Для корпоративных клиентов",
    isActive: false,
    price: 3700,
    finalPrice: 2379,
    credit: 150,
    points: [
      {
        id: 1,
        title: "Все пункты PRO",
      },
      {
        id: 2,
        title: "Безлимитное количество запросов",
      },
      {
        id: 3,
        title: "Приоритетная поддержка",
      },
    ],
  },
];

const Home: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
            dots: false
        },
      },
    ],
    arrows: false,
      adaptiveHeight: true, // Автоматическая подгонка высоты
  };

  const { info } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const sliderRef = useRef<Slider | null>(null);

  return (
    <div className="flex flex-col gap-[100px] px-10 sm:px-2 sm:mt-5">
      <div
        id="main"
        className="flex sm:flex-col justify-between items-center w-full h-full"
      >
        <div>
          <div>
            <div className="text-5xl sm:text-[38px] sm:leading-[33.6px] font-['Ferry'] font-[1000]">
              СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН
            </div>
            <div className="text-[20px] w-[80%] sm:w-full sm:text-[18px] sm:mt-3">
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(info ? "/search" : "/login")}
              className="rounded-[8px] mt-14 bg-[#5970FF] w-[335px] h-[59px] sm:w-full text-white"
            >
              Запросить данные
            </button>
          </div>
        </div>
        <div className="w-full">
          <img
            src="/images/landing_welcome.png"
            className="w-full h-auto"
            alt="welcome"
          />
        </div>
      </div>

      <div>
        <div className="text-[45px] font-[Ferry] font-black mb-10">
          ПОЧЕМУ ИМЕННО МЫ
        </div>
        <div className="flex justify-between">
          <button className="bg-none">
            <img
              src="/icons/arrow.svg"
              className="rotate-180 cursor-pointer h-[75px] z-[99999]"
              onClick={() => sliderRef.current?.slickPrev()}
            />
          </button>
          <div className="w-[95%] sm:w-[85%]">
            <Slider {...settings} ref={sliderRef}>
              {reasons.map((reason) => (
                <div className="min-h-[200px] sm:min-h-[25vh] -p-[15px] sm:w-full p-5 shadow-xl rounded-[10px] ">
                  <div>
                    <img src={`/icons/${reason.icon}.svg`} alt="why we are" />
                  </div>
                  <div className="text-[18px] mt-3">{reason.value}</div>
                </div>
              ))}
            </Slider>
          </div>
          <button>
            <img
              src="/icons/arrow.svg"
              className="cursor-pointer h-[75px]"
              onClick={() => sliderRef.current?.slickNext()}
            />
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <img
          src="/images/landing_approve.png"
          className="sm:object-cover sm:h-[40vh] sm:object-left "
          alt="approve"
        />
      </div>

      <div id="services">
        <div className="text-[45px] font-[Ferry] font-black mb-10">
          НАШИ ТАРИФЫ
        </div>

        <div className="flex gap-5 justify-center sm:flex-col">
          {services.map((service) => (
            <div
              className={`rounded-[10px] flex flex-col items-stretch w-[33%] sm:w-full shadow-2xl ${
                service.isActive && `border-[${service.color}] border-2`
              }`}
            >
              <div
                  style={{
                    background: service.color,
                    color: service.color === 'black' ? 'white' : 'black'
                  }}
                className={`bg-[${service.color}] ${
                  service.color === "#000000" && "text-white"
                } rounded-t-[5px] px-4 p-3 flex w-full justify-between border-b`}
              >
                <div>
                  <div className="text-[30px]">{service.title}</div>
                  <div className="text-[18px]">{service.description}</div>
                </div>
                <div>
                  <img
                    src={`/icons/${service.icon}.svg`}
                    alt={service.icon}
                    className="h-[80px] w-[80px] flex-grow"
                  />
                </div>
              </div>

              <div className="p-3">
                <div className="flex justify-end h-7">
                  {service.isActive && info && (
                    <div className="p-0.5 px-3 bg-[#3BA5E0] text-white rounded-[10px]">
                      Текущий тариф
                    </div>
                  )}
                </div>

                <div className="text-[30px] flex gap-4 ">
                  <span>{service.finalPrice} ₽</span>
                  <span className="text-[25px] text-black/50 line-through">
                    {service.price} ₽
                  </span>
                </div>
                <div className="font-[18px]">
                  или <span>{service.credit} ₽/мес.</span> при рассрочке 24 мес.
                </div>

                <div className="mt-14">
                  <div className="font-semibold text-[20px] mb-2">
                    В тариф входит
                  </div>

                  <div>
                    {service.points.map((point) => (
                      <div key={point.id} className="flex gap-2 text-[18px]">
                        <img src="/icons/approve.svg" alt="approve" />{" "}
                        {point.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  {service.isActive && info ? (
                    <button className="w-full py-3 rounded-[5px] bg-[#D2D2D2]">
                      Перейти в личный кабинет
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!info) {
                          navigate("/login");
                        }
                      }}
                      className="w-full rounded-[5px] py-3 bg-[#5970FF] text-white "
                    >
                      Подробнее
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
