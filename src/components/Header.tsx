import React, {useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/store";
import {getInfo, logout} from "../store/slices/authSlice";

const Header: React.FC = () => {
    const {info} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInfo());
    }, []);

    const [menu, setMenu] = React.useState<boolean>(false);

    const handleClose = () => setMenu(false);
    const handleOpen = () => setMenu(true);

    return (<header className="flex items-center px-10 sm:px-4">
        <div className="w-[70%]">
            <NavLink to="/">
                <img src="/icons/logo.svg" alt="scan"/>
            </NavLink>
        </div>

        <div className="flex justify-between items-center w-full">
        <span className="flex gap-10 sm:hidden">
          <a href="/#main">Главная</a>
          <a href="/#services">Тарифы</a>
          <NavLink to="/">FAQ</NavLink>
        </span>
            {info ? (<div className="flex justify-between w-[50%] sm:w-full items-center">

          <span
              className="rounded-[5px] bg-[#D9D9D9]/30  w-[175px] flex flex-col justify-center p-2 sm:items-start items-end">
            <div className="text-[10px] flex items-center gap-2 sm:flex-col sm:gap-0 sm:items-start">
              <span className="text-black/40">Использовано компаний </span>
              <span className="font-bold text-[14px]">{info.usedCompanyCount}</span>
            </div>
            <div className="text-[10px] flex items-center gap-2 sm:flex-col sm:gap-0 sm:items-start">
              <span className="text-black/40">Лимит по компаниям</span>
              <span className="font-bold text-[#8AC540] text-[14px]">{info.companyLimit}</span>
            </div>
          </span>

                <span className="flex gap-2 sm:hidden">
          <div className="flex flex-col items-end">
            <div>Алексей А.</div>
            <div className="text-xs cursor-pointer text-black/40" onClick={() => dispatch(logout())}>Выйти</div>
          </div>
          <div>
            <img
                src="/icons/test-avatar.svg"
                className="border w-12 h-12 rounded-full" alt={"avatar"}
            />
          </div>
        </span>
            </div>) : <div className="flex gap-3 items-center sm:hidden">
                <NavLink to="/login"
                         className="border-r-2 text-black/40 border-[#029491] px-3">Зарегистрироваться</NavLink>
                <NavLink to="/login" className="bg-[#7CE3E1] font-semibold p-1 px-3 rounded-[5px]">Войти</NavLink>
            </div>}
            <span className="lg:hidden md:hidden flex justify-end w-full">
          <img src="/icons/three-lines.svg" className={'cursor-pointer'} alt="menu" onClick={handleOpen}/>
                {menu && (<div
                    className="menu-opened bg-[#029491] pb-3 h-screen z-[9999999] fixed top-0 w-screen left-0 flex flex-col px-6 p-5 overflow-hidden text-xl gap-2 "
                >
                    <div className={'w-full flex justify-between -mt-10 items-center'}>
                        <img src={"/icons/white-logo.svg"} alt={"scan"}/>
                        <div
                            onClick={handleClose}
                            className="cursor-pointer mr-2"
                        >
                            <img
                                src="/icons/close.svg"
                                alt="close"
                                height={27.5}
                                width={27.5}
                            />
                        </div>
                    </div>
                    <div className="text-center items-center mt-[5vh] flex flex-col text-2xl gap-5 px-10">
                        <a onClick={handleClose} href="/#main">
                            Главная
                        </a>
                        <a onClick={handleClose} href="/#services">
                            Тарифы
                        </a>
                        <Link onClick={handleClose} to="#partners">
                            FAQ
                        </Link>
                        {!info ? <div className={'flex flex-col gap-3 w-full mt-10'}>
                            <button onClick={handleClose} className={'text-white/40'}>Зарегистрироваться</button>
                            <NavLink to={'/login'} onClick={handleClose}>
                                <button className={'bg-[#7CE3E1] font-semibold py-2 w-full rounded-[5px]'}>Войти
                                </button>
                            </NavLink>
                        </div> : <button onClick={() => dispatch(logout())} className={'bg-[#7CE3E1] font-semibold py-2 w-full rounded-[5px]'}>Выйти из аккаунта
                        </button>
                        }
                    </div>
                </div>)}
        </span>
        </div>
    </header>);
};

export default Header;
