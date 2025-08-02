import { useEffect, useState } from "react";


const ResourceAllocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      fetch("http://localhost:5000/resources")
        .then(res => res.json())
        .then(rawData => {
          setData(rawData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default ResourceAllocation;