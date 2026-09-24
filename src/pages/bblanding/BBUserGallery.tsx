import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BBUserGallery = () => {
    return (
        <section className="py-4 has-background-white-ter">
            <nav className="level">
                <div className="level-item has-text-centered">
                    <Carousel
                        showThumbs={false}
                        centerMode={true}
                        width={720}
                        infiniteLoop={true}
                        swipeable={true}
                        dynamicHeight={true}
                        autoPlay={true}
                        showStatus={false}
                        centerSlidePercentage={100}
                    >
                        <div>
                            <img src={require("../../static/bbgallery/6.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/7.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/8.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/5.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/1.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/2.jpg")} />
                        </div>
                        <div>
                            <img src={require("../../static/bbgallery/3.jpg")} />
                        </div>
                    </Carousel>
                </div>
            </nav>
        </section>
    );
};
export default BBUserGallery;
