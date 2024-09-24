const TourMapInfo = ({ tour , position }) => {
    return (
      <div id="content">
        <div id="siteNotice"></div>
        <h1 id="firstHeading" className="firstHeading">
         {position}
        </h1>
        <div id="bodyContent">
          <p>{tour?.description}</p>
          <p>
            Attribution: {tour.title}
          </p>
        </div>
      </div>
    );
  };
  
  export default TourMapInfo;