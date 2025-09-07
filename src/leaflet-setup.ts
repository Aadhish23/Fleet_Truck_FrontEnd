import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom truck icon function
export const createTruckIcon = (status = 'active', size = [30, 30]) => {
  const getColor = (status) => {
    switch (status) {
      case 'active': return '#10b981'; // green
      case 'drowsy': return '#f59e0b'; // yellow
      case 'low-fuel': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const color = getColor(status);
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${size[0]}px;
        height: ${size[1]}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
      ">
        🚛
      </div>
    `,
    className: 'custom-truck-marker',
    iconSize: size,
    iconAnchor: [size[0]/2, size[1]/2],
    popupAnchor: [0, -size[1]/2]
  });
};

// Export L for convenience
export default L;