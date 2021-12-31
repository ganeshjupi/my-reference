import React, { useState, useEffect, useRef } from "react";

const HourlyAnalytics = () => {
  const isMounted = useRef(null);

  const [fetching, setFetching] = useState(true);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    loadDevices();
    return () => (isMounted.current = false);
  }, []);

  const loadDevices = () => {
    setFetching(true);
    deviceService.getAll().then(
      (res) => {
        if (isMounted.current) {
          setDevices(res);
        }
      },
      (err) => {
        console.log(err);
        if (isMounted.current) {
          setFetching(false);
        }
      }
    );
  };

  return <>{fetching ? <p>Loading</p> : <p>{JSON.stringify(devices)}</p>}</>;
};

export default HourlyAnalytics;
