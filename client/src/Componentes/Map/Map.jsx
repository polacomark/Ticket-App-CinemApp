const Map = () => {
  return (
    <iframe
      styles={{ width: "600px", height: "450px", style: "border:0" }}
      title="map"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC8lil0NDnA9OspX7huK70yGV1no1ljirI&q=Space+Needle,Seattle+WA"
    ></iframe>
  );
};

export default Map;
