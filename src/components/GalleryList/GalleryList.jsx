import css from "./GalleryList.module.css";
const GalleryList = ({ data }) => {
  return (
    <ul className={css.gallery}>
      {data.map(({ id, largeImageURL, tags }) => (
        <li className={css.item} key={id}>
          <img src={largeImageURL} alt={`${tags}`} />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
