import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category;

    return (
        <div className="directory-item-container">
            {/* Pay attention to this single close tagged div element, use inspect. */}
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
};

export default DirectoryItem;