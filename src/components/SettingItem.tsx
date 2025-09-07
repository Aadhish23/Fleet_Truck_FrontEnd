import React from 'react';

interface Props {
  label: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<Props> = ({ label, children }) => (
  <div className="flex justify-between items-center p-4 transition-all hover:bg-blue-50 hover:shadow rounded-md">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div>{children}</div>
  </div>
);

export default SettingItem;
