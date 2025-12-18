import React from "react";
import Feature from "./Feature";
import "./Listing.css";
import { motion } from "framer-motion";

const Listing = ({ data, open }) => {
  const { image, pureList, nameProducts, type, reference, stack } = data;

  return (
    <motion.div className="listing" onClick={open} whileHover={{ scale: 1.1 }}>
      <div className="listing__content">
        <div className="listing__image-container">
          <img
            className="listing__image"
            alt={nameProducts}
            src={image}
          />
        </div>
        <div className="listing__details">
          <div className="listing__type">{type}</div>
          <div className="listing__row">
            <span className="listing__price">{pureList}</span>
          </div>
          <div className="listing__row">
            <span className="listing__address">{nameProducts}</span>
          </div>
          <div className="listing__row">
            <Feature iconName={"FaInfoCircle"} iconLabel={reference} />
            <Feature iconName={"FaLayerGroup"} iconLabel={stack} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
