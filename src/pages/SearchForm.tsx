import {Checkbox, MenuItem, Select, TextField} from "@mui/material";
import React from "react";
import {useForm} from "react-hook-form";
import Button from "../components/Button";
import {useAppDispatch} from "../store/store.ts";
import {fetchHistograms, getPosts} from "../store/slices/postSlice.ts";

type SearchValues = {
    inn: number;
    tonality: string;
    onlyRiskFactors: boolean;
    onlyMainRole: boolean;
    maxFullness: boolean;
    inBusinessNews: boolean;
    excludeTechNews: boolean;
    excludeAnnouncements: boolean;
    excludeDigests: boolean;
    searchContext: string;
    startDate: Date;
    endDate: Date;
    limit: number;
};

type Props = {
    setSearchResultVisible: (searchMode: boolean) => void;
};

const SearchForm: React.FC<Props> = ({setSearchResultVisible}: Props) => {
    const {
        register, handleSubmit, formState: {errors}, watch
    } = useForm<SearchValues>();

    const dispatch = useAppDispatch();
    const onSubmit = async (data: SearchValues) => {
        setSearchResultVisible(true);
        await dispatch(fetchHistograms(data));
        await dispatch(getPosts(data));
    };

    const startDate = watch("startDate");
    const endDate = watch("endDate");


    return (<div className="px-10 sm:px-2 flex justify-between sm:flex-col items-stretch gap-10">
        <div>
            <div className="text-[40px] sm:text-[34px] font-[Ferry] sm:flex">
                <div className="">НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ.</div>
                <span className="lg:hidden md:hidden top-[270px] right-[40px] absolute">
            <img src="/icons/Document.svg" alt="docs" className="h-[71px]"/>
          </span>
            </div>
            <div className="mt-2 text-[20px] sm:text-[18px] mb-10">
                <div>Задайте параметры поиска.</div>
                <div>Чем больше заполните, тем точнее поиск</div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[10px] shadow-2xl p-5 flex gap-5 sm:flex-col"
            >
                <div className="flex flex-col gap-5 text-[18px]">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="inn">ИНН компании*</label>
                        <div className="w-[65%] sm:w-full">
                            <TextField
                                {...register("inn", {
                                    required: "ИНН обязателен", validate: {
                                        onlyNumbers: (value: string | number) => /^\d+$/.test(value as string) || "Введите корректные данные",
                                    }, min: {
                                        value: 100000000, message: "ИНН должен быть не меньше 9 цифр",
                                    }, max: {
                                        value: 99999999999, message: "ИНН должен быть не больше 11 цифр",
                                    },
                                })}
                                id="inn"
                                size="small"
                                error={!!errors.inn}
                                helperText={errors.inn?.message}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tonality">Тональность</label>
                        <Select
                            size="small"
                            className="w-[65%] sm:w-full"
                            defaultValue="any"
                            id="tonality"
                            {...register("tonality")}
                        >
                            <MenuItem value="any">Любая</MenuItem>
                            <MenuItem value="negative">Негативная</MenuItem>
                            <MenuItem value="positive">Позитивная</MenuItem>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="limit">Количество документов к выдаче*</label>
                        <div className="w-[65%] sm:w-full">
                            <TextField
                                {...register("limit", {
                                    required: "Обязательное поле", min: 1, max: 1000,
                                })}
                                id="limit"
                                size="small"
                                type="number"
                                placeholder="От 1 до 1000"
                                error={!!errors.limit}
                                className={'w-full'}
                            />
                            <div className="text-red-400 text-center text-[13px]">
                                {errors?.limit?.message}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 my-5">
                        <label>Диапазон поиска*</label>
                        <div className="flex gap-5 sm:flex-col">
                            <TextField
                                {...register("startDate", {
                                    required: true, validate: {
                                        notAfterEnd: (value) => !endDate || new Date(value) <= new Date(endDate) || "Start date cannot be after the end date",
                                    }
                                })}
                                type="date"
                                size="small"
                                placeholder="Дата начала"
                                error={!!(errors.endDate || errors.startDate)}
                            />
                            <TextField
                                {...register("endDate", {
                                    required: true, validate: {
                                        notBeforeStart: (value) => !startDate || new Date(value) >= new Date(startDate) || "g",
                                        notInFuture: (value) => new Date(value) <= new Date() || "End date cannot be in the future",
                                    }
                                })}
                                type="date"
                                size="small"
                                placeholder="Дата начала"
                                error={!!(errors.endDate || errors.startDate)}
                            />
                        </div>
                        <div
                            className={'text-red-400 text-center text-[14px]'}>{(errors.endDate || errors.startDate) && "Введите корректные данные"}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="sm:hidden">
                        <div>
                            <Checkbox {...register("maxFullness")} size="small"/> Признак
                            максимальной полноты
                        </div>
                        <div>
                            <Checkbox {...register("inBusinessNews")} size="small"/>{" "}
                            Упоминания в бизнес-контекте
                        </div>
                        <div>
                            <Checkbox {...register("onlyMainRole")} size="small"/> Главная
                            роль в публикации
                        </div>
                        <div>
                            <Checkbox {...register("onlyRiskFactors")} size="small"/>{" "}
                            Публикации только с риск-факторами
                        </div>
                        <div>
                            <Checkbox {...register("excludeTechNews")} size="small"/> Включать
                            технические новости рынков
                        </div>
                        <div>
                            <Checkbox {...register("excludeAnnouncements")} size="small"/>{" "}
                            Включать анонсы и календари
                        </div>
                        <div>
                            <Checkbox {...register("excludeDigests")} size="small"/> Включать
                            сводки новостей
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="sm:w-full">
                            <Button disabled={!watch('inn')}>Поиск</Button>
                            <div className="text-[#949494] text-[14px]">
                                * Обязательные к заполнению поля
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div className="w-[75%] sm:w-full sm:flex sm:justify-end">
            <div className="w-full flex justify-between sm:hidden">
                <img src="/icons/Document.svg" alt={"document"}/>
                <img src="/icons/Folders.svg" alt={"folders"}/>
            </div>
            <div className="flex justify-end">
                <img src="/images/search-bg.png" alt={"search-bg"}/>
            </div>
        </div>
    </div>);
};

export default SearchForm;
