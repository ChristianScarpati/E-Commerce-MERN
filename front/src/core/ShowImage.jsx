import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product-image" >
      <img
        src={`${API}/${url}/photos/${item._id}`}
        alt={item.name}
        className=""
        style={{display:"block", maxHeight: "308px", maxWidth: "300px", margin:"auto" }}
      />
    </div>
  );
};

export default ShowImage;
