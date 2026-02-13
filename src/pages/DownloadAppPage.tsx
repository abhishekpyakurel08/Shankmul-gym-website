import React from 'react';
import { Navigate } from 'react-router-dom';

const DownloadAppPage: React.FC = () => {
  return <Navigate to="/download" replace />;
};

export default DownloadAppPage;
