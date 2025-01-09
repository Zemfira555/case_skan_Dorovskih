import {useAppSelector} from "../store/store.ts";
import React, {useEffect, useState} from "react";
import {Post} from "../types/types.ts";
import Button from "../components/Button.tsx";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

const SearchResult: React.FC = (): React.ReactNode => {
    const {posts, histograms, pending} = useAppSelector(state => state.post);
    const [histogramsPage, setHistogramsPage] = useState<number>(1);
    const [currentHistograms, setCurrentHistograms] = useState<{ value: string; date: Date }[]>([]);
    const shouldValuesCount = window.innerWidth > 1324 ? 8 : window.innerWidth < 1324 && window.innerWidth > 768 ? 3 : window.innerWidth <= 768 ? 1 : 8;
    const nextHistograms = () => setHistogramsPage(prev => Math.ceil(histograms.length / shouldValuesCount) > prev ? prev + 1 : prev);
    const prevHistograms = () => setHistogramsPage(prev => prev > 1 ? prev - 1 : 1);

    const [postsPage, setPostsPage] = useState<number>(10);
    const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
    const showMore = () => setPostsPage(prev => prev + 10);

    useEffect(() => {
        setCurrentPosts(posts.slice(0, postsPage));
    }, [postsPage, currentPosts.length, posts.length]);


    useEffect(() => {
        setCurrentHistograms(histograms.slice((histogramsPage - 1) * shouldValuesCount, histogramsPage * shouldValuesCount))
    }, [histogramsPage, shouldValuesCount, histograms.length]);

    return (<div className="px-10 sm:px-2">
        <div className="flex justify-between sm:flex-col items-center">
            <div className="flex flex-col gap-10 sm:gap-2 w-[50%] sm:w-full">
                <div className="font-[Ferry] text-6xl sm:text-4xl w-[100%]">
                    ИЩЕМ. СКОРО БУДУТ РЕЗУЛЬТАТЫ
                </div>
                <div className="w-[80%] text-3xl sm:text-xl">
                    Поиск может занять некоторое время, просим сохранять терпение.
                </div>
            </div>
            <div>
                <img src="/images/searching.png" className="w-[40vw] sm:w-full" alt="search"/>
            </div>
        </div>

        <div>
            <div className="font-[Ferry] text-4xl">ОБЩАЯ СВОДКА</div>
            <div className="text-xl text-[#949494] mt-5">
                Найдено {histograms.length} вариантов
            </div>


            <div className={'my-3 flex'}>
                <button onClick={prevHistograms}><img src={"/icons/arrow.svg"} className={'rotate-180 fill-black'}
                                                      alt={'arrow'}/>
                </button>
                <div
                    className={'rounded-md grid-cols-9 sm:grid-rows-1 md:grid-cols-4 sm:grid-cols-1 grid border-2 w-full border-[#029491] text-xl'}>
                    <div className={"bg-[#029491] gap-3 text-white p-3 grid sm:grid-cols-3 sm:grid-rows-1 grid-rows-3"}>
                        <div>
                            Период
                        </div>
                        <div>
                            Всего
                        </div>
                        <div>
                            Риски
                        </div>
                    </div>
                    {pending ? <div className="grid lg:absolute place-items-center grid-cols-[2/10] grid-rows-[1/-1] sm:col-span-full sm:row-start-2 py-3 lg:w-[93%] lg:mt-4"
                                    style={{
                                         }} >
                            <CircularProgress/>
                        <div className={"sm:hidden text-center"}>Загружаем данные</div>
                    </div> : currentHistograms.map(value => <div
                        className={'gap-3 p-3 grid grid-rows-3 sm:border-none border-r-2 border-gray-400 text-center my-1'}>
                        <div>
                            {new Date(value.date).toLocaleDateString('ru-RU', {
                                year: "numeric", month: "2-digit", day: "2-digit"
                            })}
                        </div>
                        <div>
                            {value?.value}
                        </div>
                        <div>
                            0
                        </div>
                    </div>)}

                </div>
                <button onClick={nextHistograms}><img src={"/icons/arrow.svg"} className={'fill-current text-black'} alt={'arrow'}/></button>
            </div>
        </div>

        {pending ? <div className={'flex justify-self-center items-self-center'}><CircularProgress/></div> : <div>
            <div className="font-[Ferry] text-4xl">СПИСОК ДОКУМЕНТОВ</div>

            <div className="flex gap-10 sm:flex-col flex-wrap">
                {currentPosts.map((post: Post) => (<div
                    className="shadow-2xl w-[47%] overflow-hidden flex flex-col gap-3 p-5 rounded-[10px] sm:w-full">
                    <div className="flex gap-2 text-xl text-[#949494]">
                <span>
                  {new Date(post.issueDate).toLocaleDateString("ru-RU", {
                      month: "2-digit", year: "numeric", day: "2-digit",
                  })}
                </span>
                        <span className="underline">{post.source.name}</span>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className={' max-h-20 overflow-hidden text-ellipsis line-clamp-3'}
                             dangerouslySetInnerHTML={{__html: post.title.markup.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/AGN #\$&: NOFEED/g, '')}}
                        />
                        <div>
                  <span className="p-1 px-3 rounded-[8px] bg-[#FFB64F] ">
                    {post.attributes.isDigest ? "Сводки новостей" : post.attributes.isTechNews ? "Технические новости" : post.attributes.isAnnouncement ? "Анонсы и события" : "Прочие новости"}
                  </span>
                        </div>
                    </div>

                    <div
                        className="max-h-[400px] overflow-hidden text-ellipsis line-clamp-3"
                        dangerouslySetInnerHTML={{
                            __html: post.content.markup
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&amp;/g, '&')
                                .replace(/AGN #\$&: NOFEED/g, '')
                        }}
                    />

                    <div className="flex justify-between items-end mt-auto">
                <Link to={post.url}>
                  <button className="bg-[#7CE3E1] p-3 px-5 rounded-[5px] text-[16px] ">
                    Читать в источнике
                  </button>
                </Link>
                        <span className="text-[#949494] text-xl">
                  {post.attributes.wordCount} слова
                </span>
                    </div>
                </div>))}
            </div>
            {currentPosts.length < posts.length && <div className={'mt-5 w-[20%] sm:w-full flex justify-self-center'}>
                <Button disabled={false} onClick={showMore}>Показать больше</Button>
            </div>}

        </div>}

    </div>);
};

export default SearchResult;
