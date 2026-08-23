import React, { useEffect, useState } from 'react';

const EnvTest = () => {
  const [envVars, setEnvVars] = useState<Record<string, any>>({});

  useEffect(() => {
    setEnvVars({
      'import.meta.env.VITE_GEMINI_API_KEY': import.meta.env.VITE_GEMINI_API_KEY,
      'import.meta.env.MODE': import.meta.env.MODE,
      'import.meta.env.DEV': import.meta.env.DEV,
      'import.meta.env.PROD': import.meta.env.PROD,
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Environment Variables Test</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
};

export default EnvTest;
