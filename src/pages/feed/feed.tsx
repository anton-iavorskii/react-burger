import FeedOInformation from "../../components/feed-information/feed-information";
import FeedOrders from "../../components/feed-orders/feed-orders";
import FeedStyles from "./feed.module.css";

const FeedPage = (): JSX.Element => {
  return (
    <div className={FeedStyles.container}>
      <header className={FeedStyles.header}>
        <h1 className="pt-10 pb-5 text text_type_main-large">Лента заказов</h1>
      </header>
      <div className={FeedStyles.sectionsWrapper}>
        <section
          className={`custom-scroll ${FeedStyles.section} ${FeedStyles.section__scroll}`}
        >
          <FeedOrders />
        </section>
        <section
          className={`custom-scroll ${FeedStyles.section} ${FeedStyles.section__scroll}`}
        >
          <FeedOInformation />
        </section>
      </div>
    </div>
  );
};

export default FeedPage;
