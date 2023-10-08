import GoogleMapReact from "google-map-react";

import useStyles from "./styles";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    places && (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBMPo2BnYCle_9a0AsQWqPtLxtCYTGYxI0" }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
        >
          {places.length &&
            places.map((place, i) => (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {!matches ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      className={classes.typography}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {" "}
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                      alt={place.name}
                    />
                    <Rating
                      name="read-only"
                      size="small"
                      alt={place.name}
                      value={Number(place.rating)}
                      readOnly
                    />
                  </Paper>
                )}
              </div>
            ))}
        </GoogleMapReact>
      </div>
    )
  );
};

export default Map;
