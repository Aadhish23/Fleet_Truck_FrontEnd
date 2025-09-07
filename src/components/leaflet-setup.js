// src/utils/leaflet-setup.js
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Fix for default markers in React applications
// This solves the issue where markers don't show up properly
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
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