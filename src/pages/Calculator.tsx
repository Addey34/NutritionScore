import React from 'react';
import FoodSelector from '../components/FoodSelector';
import Layout from '../components/Layout';

export const Calculator: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calculator</h1>
      <FoodSelector />
    </div>
    </Layout>
  );
};


