import React from 'react';
import CourseShopList from './CourseShopList';

const shop = () =>  {
    return (
    <section className="hero is-medium is-primary is-bold">
    <div className="hero-body">
        <div className="container">

            <header className="level">
            <div className="level-left">
                <div className="level-item">
                <h1 className="title ml-1">Witaj w sklepie z kursami!</h1>
                </div>
            </div>
            </header>

            <CourseShopList></CourseShopList>

        </div>
        </div>
    </section>
    );
}
 
export default shop;