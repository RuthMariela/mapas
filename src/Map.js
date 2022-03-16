import React from "react";
import ReactDOM from "react";
import mapboxgl from "mapbox-gl";
import Marker from "mapbox-gl";
import "./style.css";

mapboxgl.accessToken='pk.eyJ1IjoicnV0aG1hcmllbGEiLCJhIjoiY2wwcmN6cTM0MDJhYTNjbzlmZ3lvMzZtcCJ9.8w5DmFreMFypI_R7EfynXw';

const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.07068648108039, -11.991040674544259]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.06323533709676, -11.987496214248857]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };


class Mapp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lng:-77.06126546085237,
            lat:-11.993997815380975,
            zoom: 13
        }
    }
        componentDidMount(){
            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
            })
        
        for (const feature of geojson.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 30 }) // add popups
                    .setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
                )                             
                .addTo(map);
        }
        
       // var marker = new mapboxgl.Marker().setLngLat([-77.06126546085237, -11.993997815380975])
       // .setPopup(new mapboxgl.Popup({ offset: 30})).addTo(map);
                     
    }

    render(){
        return(
           <div ref={el => this.mapContainer = el} style={{width:'100%', height:'100vh'}}> 
           </div>
            
        )
    }
}

export default Mapp;