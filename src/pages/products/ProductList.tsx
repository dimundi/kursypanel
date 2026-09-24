import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUrlProductList } from "../../interfaces/IUrl";
import { CATEGORY_CHOICES } from "../../components/Enumerators";
import IProducts from "../../interfaces/IProducts";
import ProductListTable from "./ProductListTable";
import RequestClass from "../../classes/RequestClass";
import Wait from "../../components/elements/Wait";
import ProdBreadCrumb from "./ProdBreadCrumb";
import PageTitle from "../../components/layout/PageTitle";

const ProductList = () => {
    const urlParams = useParams<IUrlProductList>();
    /* informowanie o błędach API */
    const [notification, setNotification] = useState<JSX.Element | String>();

    // const navigation = useNavigate();

    /* czy wysłać zapytanie do API o produkty */
    // const [requestAPI] = useState(1);

    /* wszystkie dane związane z produktem (odczytane z API)*/
    const [products, setProducts] = useState<IProducts>({
        products: [
            // {name: "Praca z uczniami z wykorzystaniem Microsoft 365, Teams ", c: COURSE_TYPES_CHOICES.COURSE_TYPE_STATIONARY},
            // {name: "Wykorzystanie platformy Zoom do pracy z uczniami i rodzicami"},
            // {name: "Interakcje z uczniami online.  "},
            // {name: "Jak przygotować filmy instruktażowe na potrzeby zdalnej edukacji "},
            // {name: "Praca, praca i tylko praca "},
        ],
    });

    /* ---------------------------------------
       realizacja zapytania
       ---------------------------------------*/
    const succ_callback = (result: any) => {
        //setProducts(result)
        // let prod:IProducts;
        // prod = result
        // let products = result.products
        // let specialOffer = result.specialOffer
        // console.log(products)
        // console.log(specialOffer)
        // //console.log (Object.values(result))
        // //setProducts(Object.values(result))
        // // console.log(result.products)
        // // console.log(result.specialOffer)
        // //setProducts({...products, products: result.products, specialOffer: result.specialOffer })
        // setProducts({...products, products: products, specialOffer: specialOffer })
        // console.log(products)

        /* przypisuję dane domyślne */
        // if (urlParams.categoryId === CATEGORY_CHOICES.CATEGORY_CLOSE) {

        let prod: IProducts;
        prod = result;

        /* zanim wpiszemy do hook'a wprawdzam kilka modyfikacji */

        /* modyfikacja 1 - sprawdzam jakie są typy kursów w obrębie kursów */

        prod.products?.forEach((kurs) => {
            kurs.inStore?.forEach((inStore) => {
                if (inStore.courseType) {
                    if (kurs.avCourseTypes === undefined) {
                        kurs.avCourseTypes = [];
                    }

                    if (!kurs.avCourseTypes?.includes(inStore.courseType)) kurs.avCourseTypes?.push(inStore.courseType);
                }
            });
        });

        setProducts(prod);
        //setProducts({...products, products:prod})
        // }
    };

    const err_callback = (result: any) => {
        setNotification(RequestClass.errorAlert(result));
        // if (setIsUserInfoRead)
        //     setIsUserInfoRead(true)
    };

    /* raz, na począku wysyłam zapytanie */
    useEffect(() => {
        RequestClass.makeRequest("prod/" + urlParams.categoryId + "/", null, succ_callback, err_callback);
    }, [urlParams.categoryId]);

    /* ustawiam, że dane zostały odczytane */
    // useEffect(() => {
    //     // console.log("Dane zostały odczytane?")

    //     if (products.products !== undefined) {
    //         Object.values(products.products).forEach((element:IProduct)  => {
    //         });
    //     }
    //     setDataRead(true)

    // }, [products])

    return (
        <>
            <PageTitle>
                <ProdBreadCrumb categoryId={urlParams.categoryId} />
                {urlParams.categoryId === CATEGORY_CHOICES.CATEGORY_CLOSE && (
                    <div>Webinary, szkolenia stacjonarne, wyjazdy szkoleniowo-integracyjne</div>
                )}
                {urlParams.categoryId === CATEGORY_CHOICES.CATEGORY_OPEN && <div>Webinary i szkolenia dla wszystkich</div>}
                {urlParams.categoryId === CATEGORY_CHOICES.CATEGORY_ECOURSE && <div>Ekursy</div>}
            </PageTitle>

            {products.products !== undefined && products.products.length > 0 ? (
                <ProductListTable products={products} />
            ) : (
                <div className="container mt-2 mb-2 pl-2 pr-2">{!notification && <Wait text="Pobieranie listy produktów." />}</div>
            )}
            <div className="container mt-2 mb-2 pl-2 pr-2">{notification}</div>
        </>
    );
};

export default ProductList;
