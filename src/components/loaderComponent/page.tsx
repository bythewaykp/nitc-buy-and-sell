import Styles from "./page.module.css";
export default () => {
    return (
        <div className={Styles.contain}>
            <span className={Styles.loader}></span>
        </div>
    );
};
