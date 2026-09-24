import { useForm } from "react-hook-form";
import { Input } from "../../components/forms/Input";
import IProducts, { IProduct } from "../../interfaces/IProducts";
import ProductListTableElement from "./ProductListTableElement";
import { useState } from "react";
import { COURSE_TYPES_CHOICES, CUSTOM_LINK_TYPE } from "../../components/Enumerators";
import { Link } from "react-router-dom";
import CustomLinks from "../../components/elements/CustomLinks";
import BodyContainer from "../../components/layout/BodyContainer";
import ProductListOffers from "./ProductListOffers";

const ProductListTable = (props: { products: IProducts }) => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    enum SORT_TYPE_CHOICES {
        NAME_AZ = "Sortuj po nazwie A..Z",
        NAME_ZA = "Sortuj po nazwie Z..A",
    }

    type sortTypesType = SORT_TYPE_CHOICES.NAME_AZ | SORT_TYPE_CHOICES.NAME_ZA;

    /* czy menu sortowania szkoleń jest rozwinięte */
    const [isDropdownFilterActive, setDropdownFilterActive] = useState(false);
    /* typ sortowania szkoleń */
    const [sortType, setSortType] = useState<sortTypesType>(SORT_TYPE_CHOICES.NAME_AZ);
    /* fraza do filtrowania */
    const [filterPhrase, setFilterPhrase] = useState("");
    const [filterCourseTypes, setFilterCourseTypes] = useState<COURSE_TYPES_CHOICES[]>([
        COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE,
        COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY,
        COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR,
    ]);
    /* ilość kolumn dla preferowanych produktów - zmienia się w zleżności od MOBILE/DESKTOP */
    // const [recommendedProdColumns] = useState(isMobile ? 1 : 3);

    function onFiltrujButton(data: any) {
        // console.log("B")
        // console.log(data)

        if (data.phrase.length > 0) {
            setFilterPhrase(data.phrase.toLowerCase());
        } else {
            setFilterPhrase("");
        }

        setFilterCourseTypes([
            data[`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE]
                ? COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE
                : COURSE_TYPES_CHOICES.COURSE_TYPE_UNKNOWN,
            data[`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY]
                ? COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY
                : COURSE_TYPES_CHOICES.COURSE_TYPE_UNKNOWN,
            data[`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR]
                ? COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR
                : COURSE_TYPES_CHOICES.COURSE_TYPE_UNKNOWN,
        ]);
    }

    /* procedura sortowania i filtrowania kursów  */
    // let productsPromList:any[] = []     // lista produktów promowanych
    //let product = props.products        // lista produktów -> to będziemy

    if (props.products.products) {
        /* etap pierwszy -> sortowanie listy wszystkich kursów */
        props.products.products.sort(function (a, b) {
            if (a.prodDef?.name && b.prodDef?.name) {
                if (a.prodDef?.name < b.prodDef?.name) {
                    if (sortType === SORT_TYPE_CHOICES.NAME_ZA) {
                        return 1;
                    } else return -1;
                }
                if (a.prodDef?.name > b.prodDef?.name) {
                    if (sortType === SORT_TYPE_CHOICES.NAME_AZ) {
                        return 1;
                    } else return -1;
                }
            }
            return 0;
        });

        /* etap drugi -> filtrowanie listy kursów promowanych */

        // props.products.specialOffer?.forEach( (specialOffer:ISpecialOffer) => {
        //     productsPromList.push(<ProductListTilesElement inStore={specialOffer.inStore} prodDef={specialOffer.prodDef} />)
        // } )

        // for (let i=0; i < recommendedProdColumns; i++)  {
        //     productsPromList.push(<ProductListTilesElement product={props.products.products[i]} index={i}/>)
        // }
    }

    /* funkcja filtrowania */
    function filterIt(a: IProduct) {
        //console.log(filterCourseTypes)

        let ret = false; // ta zamienna przechowuje wynik filtrowania

        /* filtrowanie frazy */
        if (filterPhrase.length > 0) {
            /* po nazwie */
            if (a.prodDef?.name) {
                if (a.prodDef.name.toLowerCase().includes(filterPhrase)) {
                    ret = true;
                }
            }

            /* po obszarach tematycznych */
            if (ret === false) {
                a.prodDef?.at?.forEach((at: string) => {
                    if (at.toLowerCase().includes(filterPhrase)) {
                        ret = true;
                        return;
                    }
                });
            }
        } else {
            ret = true;
        }

        /* typy kursów */
        if (ret === true) {
            /* przynajmniej jeden typ kursu musi być na liście filtrowanych */
            ret = false;
            filterCourseTypes.forEach((ct) => {
                if (a.avCourseTypes?.includes(ct)) {
                    ret = true;
                    return;
                }
            });
        }
        return ret;
    }

    /* przełączanie stron */
    // function paginationOnClick(pg: number) {
    //     console.log(pg);
    // }

    /* lista posortownych i przefiltrowanych produktów -> to wyświetlam */
    // let productsFiltered = props.products?.products?.filter(filterIt)

    function handleKeyPress(e: any) {
        // console.log(e)
        // console.log(e.value)
        // console.log(e.target)
        if (e.keyCode === 13) {
            // console.log("JESTEM")
            // e.preventDefault();
            return handleSubmit(onFiltrujButton)();
        }
    }

    return (
        <>
            <BodyContainer noPadding={true}>
                <ProductListOffers products={props.products} />
            </BodyContainer>

            <BodyContainer className="mt-5">
                <CustomLinks linkType={CUSTOM_LINK_TYPE.REWERS_COURSE_OFFER} className="is-size-3 is-size-4-mobile" />
                <div className="mb-1 mt-2 is-size-5-mobile is-size-4">Wyszukiwarka szkoleń</div>
            </BodyContainer>

            <BodyContainer noPadding={true}>
                {/****************************************************
                    Wyszukiwarka
              ****************************************************/}
                <div className="mb-4">
                    <article className="notification  px-5 is-primary">
                        <form onSubmit={handleSubmit(onFiltrujButton)} onKeyUp={handleKeyPress}>
                            <Input id="phrase" register={register} required={false} placeholder="wpisz poszukiwaną frazę"></Input>
                            <div className="level mt-1">
                                <div className="level-item level-left">
                                    <Input
                                        id={`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_WEBINAR}
                                        type="checkbox"
                                        className="ml-5"
                                        label="webinar"
                                        register={register}
                                        required={false}
                                        defaultChecked={true}
                                    ></Input>
                                    <Input
                                        id={`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY}
                                        type="checkbox"
                                        className="ml-5"
                                        label="szkolenie stacjonarne"
                                        register={register}
                                        required={false}
                                        defaultChecked={true}
                                    ></Input>
                                    <Input
                                        id={`courseType_` + COURSE_TYPES_CHOICES.COURSE_TYPE_ECOURSE}
                                        type="checkbox"
                                        className="ml-5"
                                        label="e-kurs"
                                        register={register}
                                        required={false}
                                        defaultChecked={true}
                                    ></Input>
                                </div>
                            </div>
                            <div className="is-flex is-flex-wrap-wrap ">
                                {/* <div className="level"> */}
                                <div className="is-justify-content-left">
                                    {/* <button className="button is-secondary" onClick={handleSubmit(onFiltrujButton)}>Szukaj </button> */}
                                    <button className=" button is-secondary">
                                        {/* has-background-danger"> */}
                                        Szukaj{" "}
                                    </button>
                                </div>

                                <div className="is-justify-content-right">
                                    {/* Sortuj:<br/> */}
                                    <div className={`dropdown ${isDropdownFilterActive ? "is-active" : ""}`}>
                                        <div
                                            className="dropdown-trigger"
                                            onClick={() => {
                                                setDropdownFilterActive(!isDropdownFilterActive);
                                            }}
                                        >
                                            <button className="is-size-6 button is-primary" aria-haspopup="true" aria-controls="dropdown-menu">
                                                <span>{sortType}</span>
                                                <span className="icon is-small">
                                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>

                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <a
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSortType(SORT_TYPE_CHOICES.NAME_AZ);
                                                        setDropdownFilterActive(false);
                                                    }}
                                                >
                                                    {SORT_TYPE_CHOICES.NAME_AZ}
                                                </a>
                                                <a
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setSortType(SORT_TYPE_CHOICES.NAME_ZA);
                                                        setDropdownFilterActive(false);
                                                    }}
                                                >
                                                    {SORT_TYPE_CHOICES.NAME_ZA}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </article>
                </div>
                {/****************************************************
                    Wyszukiwarka - KONIEC
              ****************************************************/}

                {/* <Pagination maxPage={3} currPage={1} handleOnClick={paginationOnClick}/> */}
            </BodyContainer>

            <BodyContainer noPadding={true}>
                {props.products?.products?.filter(filterIt).map((product, index) => (
                    <ProductListTableElement key={index} product={product} />
                ))}

                <div className=" box is-size-5 mb-1 is-size-6-mobile">
                    Nie możesz znaleźć interesującego Ciebie szkolenia <Link to="/zapytanie">napisz do nas.</Link>
                </div>
            </BodyContainer>
        </>
    );
};

export default ProductListTable;
